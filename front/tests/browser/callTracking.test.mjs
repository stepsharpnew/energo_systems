import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }
const phoneSelector = 'a[data-calltracking-phone="+74951795920"]'
const assignedPhone = { raw: '74951287470', text: '+7 (495) 128-74-70' }

// Run at the actual SDK execution point, before page.goto resolves. If the
// application has not installed its veto yet, reproduce the destructive rule.
const fakeSdk = `(${function () {
  const state = window.__callTrackingTest = { calls: [], loads: 1 }
  const protectedMarkup = () => [...document.querySelectorAll('span, h1, button, .office-addresses, .contact-label, .contact-icon, .btn-pill')]
    .filter(element => !element.closest('a[data-calltracking-phone]') && !element.querySelector('a[data-calltracking-phone]'))
    .map(element => element.outerHTML)
  state.replace = rules => {
    const before = protectedMarkup()
    const installed = typeof window.__cs_onReplacePhones === 'function'
    const veto = installed && window.__cs_onReplacePhones(rules) === false
    if (!veto && Array.isArray(rules)) {
      for (const rule of rules) {
        if (typeof rule?.id !== 'string' || !rule.id.startsWith('selector=')) continue
        for (const element of document.querySelectorAll(rule.id.slice(9))) element.innerHTML = rule.text
      }
    }
    state.calls.push({ installed, veto, before, after: protectedMarkup() })
    return veto
  }
  state.replace([{ id: 'selector=span', raw: '74951287470', text: '+7 (495) 128-74-70' }])
}})()`

async function assertSafeReplacement(page, expected = assignedPhone) {
  const calls = await page.evaluate(() => window.__callTrackingTest?.calls)
  assert.ok(calls?.length, 'the intercepted Novofon SDK must execute')
  for (const call of calls) {
    assert.equal(call.installed, true, 'the veto must exist before the SDK executes')
    assert.equal(call.veto, true, 'the SDK must never perform its own DOM replacement')
    assert.deepEqual(call.after, call.before, 'headings, controls, labels and decorative spans must stay intact')
  }
  const links = await page.locator(phoneSelector).evaluateAll(elements => elements.map(link => ({
    href: link.getAttribute('href'),
    text: link.querySelector('[data-calltracking-number]')?.textContent,
  })))
  assert.ok(links.length > 0, 'the page must contain explicitly tracked phone links')
  for (const link of links) {
    assert.equal(link.href, `tel:+${expected.raw}`)
    if (link.text !== undefined) assert.equal(link.text, expected.text)
  }
}

async function replace(page, id, phone = assignedPhone) {
  assert.equal(await page.evaluate(rule => window.__callTrackingTest.replace([rule]), { id, ...phone }), true)
  await assertSafeReplacement(page, phone)
}

async function assertLanding(page, kind) {
  assert.match(await page.locator('h1').innerText(), kind === 'hdd' ? /ГНБ под ключ/ : /Свет в доме не гаснет/)
  const heroButton = page.locator('.hero a.btn-pill[href="#quiz"]')
  assert.match(await heroButton.innerText(), /Рассчитать стоимость/)
  assert.equal(await heroButton.locator('.btn-pill__icon svg').count(), 1)
  const indicator = kind === 'hdd' ? '.opt__ind' : '.opt__mark'
  const indicators = await page.locator(`[data-quiz] ${indicator}`).allTextContents()
  assert.ok(indicators.length > 0)
  assert.ok(indicators.every(text => text.trim() === ''), 'quiz indicators must not contain a phone number')
  const secondary = page.locator('a[href="tel:+74951780118"]')
  assert.ok(await secondary.count() > 0)
  assert.match(await secondary.first().innerText(), /178-01-18/)
  assert.equal(await secondary.first().getAttribute('data-calltracking-phone'), null)

  // Use real clicks on labels/buttons to catch destroyed controls, then walk
  // all steps to confirm the final lead form remains reachable.
  if (kind === 'hdd' && process.env.CALL_TRACKING_SCREENSHOT_DIR) {
    await page.locator('.preloader').waitFor({ state: 'hidden' })
    await page.screenshot({ path: join(process.env.CALL_TRACKING_SCREENSHOT_DIR, 'energo-hdd-phone-fixed.png') })
  }
  await heroButton.click()
  if (kind === 'hdd' && process.env.CALL_TRACKING_SCREENSHOT_DIR) {
    await page.locator('[data-quiz]').screenshot({ path: join(process.env.CALL_TRACKING_SCREENSHOT_DIR, 'energo-hdd-quiz-fixed.png') })
  }
  const next = page.locator(kind === 'hdd' ? '[data-next]' : '[data-quiz-next]')
  assert.equal(await next.isEnabled(), false)
  assert.equal((await next.innerText()).trim(), 'Далее')
  for (let step = 0; step < 4; step++) {
    const active = page.locator(kind === 'hdd' ? '[data-quiz] fieldset.is-active' : '[data-quiz] .qstep:visible')
    await active.locator('label.opt').first().click()
    assert.equal(await next.isEnabled(), true)
    await next.click()
  }
  const form = page.locator(kind === 'hdd' ? '[data-quiz] form' : '[data-quiz-form]')
  await form.locator('[name=name]').fill('Проверка телефонов')
  await form.locator('[name=phone]').fill('79990000000')
  assert.equal(await form.locator('[name=name]').inputValue(), 'Проверка телефонов')
  assert.equal((await form.locator('[name=phone]').inputValue()).replace(/\D/g, ''), '79990000000')
  const counter = page.locator(kind === 'hdd' ? '[data-cur]' : '[data-quiz-n]')
  assert.equal(await counter.innerText(), '5')
}

test('call tracking cannot overwrite page content on SDK load or SPA navigation', async t => {
  const server = createServer(async (req, res) => {
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
    for (const scenario of ['header and SPA navigation', 'hdd', 'ups', 'custom phone label']) {
      await t.test(scenario, async () => {
        const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } })
        const page = await context.newPage()
        page.setDefaultTimeout(10000)
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await page.route('**/*', route => {
          const url = new URL(route.request().url())
          if (url.hostname === 'widget.novofon.ru' && url.pathname === '/novofon.js') {
            return route.fulfill({ status: 200, contentType: 'text/javascript', body: fakeSdk })
          }
          if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
          // Never allow these regression tests to submit a real lead.
          if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
          return route.continue()
        })
        try {
          const path = scenario === 'header and SPA navigation' ? '/' : scenario === 'custom phone label' ? '/equipment/mtp' : `/services/${scenario}`
          await page.goto(base + path, { waitUntil: 'networkidle' })
          await assertSafeReplacement(page)

          if (scenario === 'header and SPA navigation') {
            const phone = page.locator('.header-contacts a[href^="tel:"]')
            assert.equal(await phone.count(), 1)
            assert.equal(await page.locator('.header-contacts .contact-icon svg').count(), 3)
            assert.equal(await page.locator('.header-contacts a[href="mailto:sales@e-systems.su"]').innerText(), 'sales@e-systems.su')
            assert.match(await page.locator('.office-addresses').innerText(), /Солнечногорск/)
            assert.deepEqual(await page.locator('.contact-label').allTextContents(), ['Звонок по проекту', 'Офисы', 'Почта'])
            await replace(page, 'selector=.contact-item span')
            for (const width of [1576, 1280, 1024, 768, 390, 320]) {
              await page.setViewportSize({ width, height: 900 })
              const layout = await phone.evaluate(link => {
                const range = document.createRange()
                range.selectNodeContents(link.querySelector('span') || link)
                const box = link.getBoundingClientRect()
                const card = link.closest('.contact-item').getBoundingClientRect()
                return { lines: range.getClientRects().length, fits: box.left >= card.left && box.right <= card.right }
              })
              assert.equal(layout.lines, 1, `phone must not wrap at ${width}px`)
              assert.equal(layout.fits, true, `phone must fit its card at ${width}px`)
            }

            // Keep the existing text-node synchronization regression coverage.
            await phone.locator('span').evaluate(span => { span.firstChild.data = '8 (495) 128-74-71' })
            await page.waitForFunction(() => document.querySelector('.header-contacts a[href^="tel:"]').getAttribute('href') === 'tel:+74951287471')
            await phone.evaluate(link => { link.innerHTML = '+7 (495) 128-74-72' })
            await page.waitForFunction(() => document.querySelector('.header-contacts a[href^="tel:"]').getAttribute('href') === 'tel:+74951287472')

            await page.setViewportSize({ width: 1280, height: 900 })
            await page.evaluate(() => { window.__spaCallTrackingMarker = 'same document' })
            await page.locator('.hdd-link').click()
            await page.waitForURL(base + '/services/hdd')
            await page.locator('[data-quiz]').waitFor()
            assert.equal(await page.evaluate(() => window.__spaCallTrackingMarker), 'same document', 'exercise a client-side navigation')
            await replace(page, 'selector=span')
            await assertLanding(page, 'hdd')
          } else if (scenario === 'custom phone label') {
            const custom = page.locator('a.phone-link.secondary-action')
            assert.equal(await custom.innerText(), 'Позвонить менеджеру')
            assert.equal(await custom.getAttribute('href'), 'tel:+74951287470')
            const changed = { raw: '74951287471', text: '+7 (495) 128-74-71' }
            await replace(page, 'number=74951795920', changed)
            assert.equal(await custom.innerText(), 'Позвонить менеджеру')
            await custom.evaluate(link => { link.textContent = 'Связаться по телефону' })
            assert.equal(await custom.getAttribute('href'), 'tel:+74951287471')
          } else {
            await replace(page, 'number=74951795920')
            for (const rules of [null, {}, [null, 'span', { id: 'selector=[', raw: assignedPhone.raw }, { id: 'selector=span', raw: 'invalid' }]]) {
              assert.equal(await page.evaluate(value => window.__callTrackingTest.replace(value), rules), true)
            }
            await assertSafeReplacement(page)
            assert.equal(await page.evaluate(() => window.__callTrackingTest.replace([])), true)
            await assertSafeReplacement(page, { raw: '74951795920', text: '+7 (495) 179-59-20' })
            await replace(page, 'selector=span')
            if (scenario === 'hdd') assert.equal(await page.locator('.sticky-cta__call svg').count(), 1)
            await assertLanding(page, scenario)
          }
          assert.deepEqual(errors, [])
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
