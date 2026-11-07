import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
}

async function waitForAttribute(locator, name, value) {
  const element = await locator.elementHandle()
  try {
    await locator.page().waitForFunction(({ element, name, value }) => element.getAttribute(name) === value, { element, name, value })
  } finally {
    await element.dispose()
  }
}

async function assertBodyLocked(page, locked) {
  await page.waitForFunction(expected => document.body.classList.contains('is-locked') === expected, locked)
}

async function assertStickyHeader(page) {
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
  const top = await page.locator('header').evaluate(element => element.getBoundingClientRect().top)
  assert.ok(Math.abs(top) < 1, 'the landing header must stay pinned when the document scrolls')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
}

async function navigateInApp(page, base, path) {
  // Use Nuxt's installed router to exercise unmount/mount in the same document.
  // This is test-only access; it adds no navigation hooks to the application.
  await page.evaluate(async destination => {
    const router = document.getElementById('__nuxt')?.__vue_app__?.config.globalProperties.$router
    if (!router) throw new Error('The Nuxt router must be mounted before SPA navigation')
    await router.push(destination)
  }, path)
  await page.waitForURL(base + path)
  await page.locator('[data-quiz]').waitFor()
}

async function assertLazyCallback(page) {
  assert.equal(await page.locator('[data-modal]').count(), 0, 'closed callback markup must not be eagerly rendered')
  await page.keyboard.press('Tab')
  const skip = page.locator('.landing-skip-link')
  assert.equal(await skip.evaluate(element => element === document.activeElement), true)
  await page.keyboard.press('Enter')
  assert.equal(await page.locator('main').evaluate(element => element === document.activeElement), true)
  const opener = page.locator('[data-callback-open]').first()
  await opener.click()
  const dialog = page.locator('[data-modal]')
  await dialog.waitFor({ state: 'visible' })
  assert.equal(await dialog.evaluate(element => element.open), true, 'first populated request must open after async mount')
  const form = dialog.locator('[data-modal-form]')
  await form.locator('[name=name]').fill('Сохранённое имя')
  await form.locator('[name=phone]').fill('79990000000')
  await form.locator('[name=callbackTimeSlot]').selectOption('12:00–15:00')
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  await assertBodyLocked(page, false)
  assert.equal(await opener.evaluate(element => element === document.activeElement), true, 'closing must restore the original CTA focus')
  assert.equal(await dialog.count(), 1, 'the dialog stays mounted after first use')
  await opener.click()
  await dialog.waitFor({ state: 'visible' })
  assert.equal(await form.locator('[name=name]').inputValue(), 'Сохранённое имя')
  assert.equal(await form.locator('[name=phone]').inputValue(), '+7 (999) 000-00-00')
  assert.equal(await form.locator('[name=callbackTimeSlot]').inputValue(), '12:00–15:00')
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
}

test('Vue landings preserve dependent answers, interactive sections and SPA cleanup', async t => {
  const server = createServer(async (req, res) => {
    // Even an unexpected request cannot reach the live lead API.
    if (new URL(req.url, 'http://localhost').pathname.startsWith('/api/')) {
      res.writeHead(503, { 'Content-Type': 'application/json' })
      res.end('{"ok":false}')
      return
    }
    try {
      let path = join(root, new URL(req.url, 'http://localhost').pathname)
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html')
      const data = await readFile(path)
      res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
      res.end(data)
    } catch {
      res.writeHead(404)
      res.end()
    }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  let browser
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    const scenarios = [
      ['UPS callback loads on first use, keeps fields and restores focus', '/services/ups', assertLazyCallback],
      ['DGU callback loads on first use, keeps fields and restores focus', '/services/dgu', assertLazyCallback],
      ['DGU clears incompatible objects and keeps custom power exclusive', '/services/dgu', async page => {
        await assertStickyHeader(page)
        const next = page.locator('[data-quiz-next]')
        const back = page.locator('[data-quiz-back]')
        const quiz = page.locator('[data-quiz-form]')
        assert.equal(await next.isEnabled(), false)
        await quiz.locator('label.opt:has(input[name=direction][value="Для бизнеса"])').click()
        await next.click()
        await quiz.locator('label.opt:has(input[name=object][value="Торговый центр"])').click()
        assert.equal(await next.isEnabled(), true)
        await back.click()
        await quiz.locator('label.opt:has(input[name=direction][value="Для строительства"])').click()
        await next.click()
        assert.equal(await quiz.locator('[name=object]:checked').count(), 0, 'an object from a previous direction must be cleared')
        assert.equal(await next.isEnabled(), false)
        assert.equal(await quiz.locator('[data-dir-group="Для бизнеса"]').isVisible(), false)
        await quiz.locator('label.opt:has(input[name=object][value="Строительная площадка"])').click()
        await next.click()
        await quiz.locator('label.opt:has(input[name=loads])').first().click()
        await next.click()
        const customPower = quiz.locator('[name=kw]')
        const powerRange = quiz.locator('label.opt:has(input[name=power][value="60–150 кВт"])')
        await customPower.fill('12')
        assert.equal(await next.isEnabled(), true)
        assert.match(await page.locator('[data-manager-text]').innerText(), /от 30 кВт/)
        await powerRange.click()
        assert.equal(await customPower.inputValue(), '')
        await customPower.fill('175')
        assert.equal(await quiz.locator('[name=power]:checked').count(), 0)
        await next.click()
        assert.equal(await page.locator('[data-quiz-n]').innerText(), '5')
        await back.click()
        assert.equal(await customPower.inputValue(), '175', 'going back must preserve the entered power')
      }],
      ['DGU gallery hands off to callback and Escape unlocks the page', '/services/dgu', async page => {
        const card = page.locator('[data-case-open="1"]')
        const gallery = page.locator('[data-cs-modal]')
        await card.click()
        await gallery.waitFor({ state: 'visible' })
        await assertBodyLocked(page, true)
        assert.match(await gallery.locator('[data-cs-count]').innerText(), /^1\s*\//)
        await gallery.locator('[data-cs-next]').click()
        assert.match(await gallery.locator('[data-cs-count]').innerText(), /^2\s*\//)
        await page.keyboard.press('Escape')
        await gallery.waitFor({ state: 'hidden' })
        await assertBodyLocked(page, false)
        // Keyboard activation and the gallery CTA must work as well as pointer clicks.
        await card.focus()
        await page.keyboard.press('Enter')
        await gallery.waitFor({ state: 'visible' })
        await gallery.locator('.cs__cta').click()
        await gallery.waitFor({ state: 'hidden' })
        const callback = page.locator('[data-modal]')
        await callback.waitFor({ state: 'visible' })
        assert.equal(await callback.locator('[data-modal-title]').innerText(), 'Похожий проект')
        await assertBodyLocked(page, true)
        await page.keyboard.press('Escape')
        await callback.waitFor({ state: 'hidden' })
        await assertBodyLocked(page, false)
      }],
      ['DGU hero shortcuts and catalogue filters agree', '/services/dgu', async page => {
        const catalogue = page.locator('#power')
        await page.locator('.hero__solutions [data-solution="industry"]').click()
        await waitForAttribute(catalogue.locator('.pw-filter [data-solution="industry"]'), 'aria-pressed', 'true')
        assert.equal(await catalogue.locator('[data-callback-title="ДГУ MTU"]').isVisible(), true)
        assert.equal(await catalogue.locator('[data-callback-title="ДГУ ММЗ"]').isVisible(), false)
        await catalogue.locator('.pw-filter [data-solution="med"]').click()
        assert.equal(await catalogue.locator('[data-callback-title="ДГУ Perkins"]').isVisible(), true)
        assert.equal(await catalogue.locator('[data-callback-title="ДГУ Doosan"]').isVisible(), false)
        assert.equal(await catalogue.locator('.pw-card--cta').isVisible(), true)
        await catalogue.locator('.pw-filter [data-solution="all"]').click()
        assert.equal(await catalogue.locator('.pw-card[hidden]').count(), 0)
      }],
      ['UPS solution tabs, runtime slider and process details remain interactive', '/services/ups', async page => {
        await assertStickyHeader(page)
        const solutions = page.locator('[data-sol]')
        const generatorTab = solutions.locator('[data-sol-tab="1"]')
        await generatorTab.click()
        await waitForAttribute(generatorTab, 'aria-selected', 'true')
        assert.match(await solutions.locator('[data-sol-title]').innerText(), /Энергия на время/)
        await page.keyboard.press('ArrowRight')
        await waitForAttribute(solutions.locator('[data-sol-tab="2"]'), 'aria-selected', 'true')
        assert.match(await solutions.locator('[data-sol-title]').innerText(), /ИБП подхватывает/)
        assert.equal(await solutions.locator('[role=tabpanel]').getAttribute('aria-labelledby'), 'soltab-2')
        const range = page.locator('[data-cfg-range]')
        const hours = async () => Number((await page.locator('[data-cfg-time]').innerText()).replace(',', '.').replace(/[^\d.]/g, ''))
        await range.focus()
        await page.keyboard.press('Home')
        const lowLoadHours = await hours()
        await page.keyboard.press('End')
        const highLoadHours = await hours()
        assert.ok(lowLoadHours > highLoadHours, 'a higher load must reduce the calculated battery runtime')
        assert.match(await page.locator('[data-cfg-out]').innerText(), /15[,.]0\s*кВт/)
        const process = page.locator('[data-process]')
        const firstToggle = process.locator('.chapter[data-chapter="0"] .chapter__tg')
        await firstToggle.click()
        await waitForAttribute(firstToggle, 'aria-expanded', 'true')
        await firstToggle.click()
        await waitForAttribute(firstToggle, 'aria-expanded', 'false')
        await process.locator('[data-go="3"]').click()
        const installation = process.locator('.chapter[data-chapter="2"]')
        await installation.locator('.chapter__tg').waitFor({ state: 'visible' })
        await waitForAttribute(installation.locator('.chapter__tg'), 'aria-expanded', 'true')
        assert.equal(await firstToggle.getAttribute('aria-expanded'), 'false')
      }],
      ['SPA navigation closes modals and remounts each landing once', '/services/ups', async page => {
        await page.evaluate(() => { window.__landingInteractionDocument = 'same document' })
        await navigateInApp(page, base, '/services/dgu')
        await page.locator('[data-callback-open]').first().click()
        await page.locator('[data-modal]').waitFor({ state: 'visible' })
        await assertBodyLocked(page, true)
        await navigateInApp(page, base, '/services/ups')
        await assertBodyLocked(page, false)
        await page.locator('[data-sol-tab="1"]').click()
        await waitForAttribute(page.locator('[data-sol-tab="1"]'), 'aria-selected', 'true')
        await navigateInApp(page, base, '/services/dgu')
        assert.equal(await page.evaluate(() => window.__landingInteractionDocument), 'same document')
        await page.locator('label.opt:has(input[name=direction][value="Для бизнеса"])').click()
        await page.locator('[data-quiz-next]').click()
        assert.equal(await page.locator('[data-quiz-n]').innerText(), '2', 'one click must advance exactly one step after remounting')
        assert.equal(await page.locator('[name=object]:checked').count(), 0)
        await page.locator('[data-case-open="1"]').click()
        await page.locator('[data-cs-modal]').waitFor({ state: 'visible' })
        await page.locator('[data-cs-next]').click()
        assert.match(await page.locator('[data-cs-count]').innerText(), /^2\s*\//)
        await page.keyboard.press('Escape')
        await assertBodyLocked(page, false)
      }],
    ]
    for (const [name, path, run] of scenarios) {
      await t.test(name, async () => {
        const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1365, height: 900 } })
        const page = await context.newPage()
        page.setDefaultTimeout(10000)
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await page.route('**/*', route => {
          const url = new URL(route.request().url())
          if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
          if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
          return route.continue()
        })
        try {
          await page.goto(base + path, { waitUntil: 'networkidle' })
          await run(page)
          assert.deepEqual(errors, [], 'landing interactions must not produce uncaught errors')
        } finally {
          await context.close()
        }
      })
    }
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
