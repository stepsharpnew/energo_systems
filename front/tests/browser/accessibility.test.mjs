import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

async function assertModalKeyboard(page, dialog) {
  await page.waitForFunction(() => document.activeElement?.closest('[role="dialog"]'))
  assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true)
  const controls = await dialog.locator('a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled])').all()
  const visible = []
  for (const control of controls) if (await control.isVisible()) visible.push(control)
  assert.ok(visible.length > 1)
  await visible[0].focus()
  await page.keyboard.press('Shift+Tab')
  assert.equal(await visible.at(-1).evaluate(element => element === document.activeElement), true, 'Shift+Tab must wrap within the modal')
  await page.keyboard.press('Tab')
  assert.equal(await visible[0].evaluate(element => element === document.activeElement), true, 'Tab must wrap within the modal')
}

test('shared components retain accessible structure, contrast and keyboard behavior', async t => {
  const server = createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname
      if (pathname.startsWith('/api/')) {
        res.writeHead(503, { 'Content-Type': 'application/json' }); res.end('{"ok":false}'); return
      }
      let path = join(root, decodeURIComponent(pathname))
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html')
      res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
      res.end(await readFile(path))
    } catch { res.writeHead(404); res.end() }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  let browser
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    const scenarios = [
      ['homepage landmarks and keyboard skip link', 390, async page => {
        assert.equal(await page.locator('html').getAttribute('lang'), 'ru')
        assert.equal(await page.locator('main').count(), 1)
        assert.equal(await page.locator('main h1').count(), 1)
        await page.keyboard.press('Tab')
        const skip = page.locator('a[href="#main-content"]')
        assert.equal(await skip.evaluate(element => element === document.activeElement), true)
        await page.keyboard.press('Enter')
        assert.equal(await page.locator('#main-content').evaluate(element => element === document.activeElement), true)
      }],
      ['small text and primary actions meet AA contrast', 390, async page => {
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        const selectors = ['.request-button', '.directory-item.active', '.directory-item span', '.primary-action', '.equipment-teaser__cta', '.equipment-teaser__code', '.clients-section .section-kicker', '.motion-toggle']
        for (const selector of selectors) {
          const ratios = await page.locator(selector).evaluateAll(elements => {
            const parse = value => value.match(/[\d.]+/g).map(Number)
            const luminance = rgb => rgb.slice(0, 3).map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
            return elements.map(element => {
              let background = [255, 255, 255]
              const ancestors = []
              for (let node = element; node; node = node.parentElement) ancestors.unshift(node)
              for (const node of ancestors) {
                const color = parse(getComputedStyle(node).backgroundColor), alpha = color[3] ?? 1
                background = background.map((value, index) => color[index] * alpha + value * (1 - alpha))
              }
              const foreground = parse(getComputedStyle(element).color)
              const a = luminance(foreground), b = luminance(background)
              return (Math.max(a, b) + .05) / (Math.min(a, b) + .05)
            })
          })
          assert.ok(ratios.length, `${selector} must remain covered`)
          assert.ok(ratios.every(ratio => ratio >= 4.5), `${selector}: measured contrast ${ratios.join(', ')}`)
        }
      }],
      ['callback dialog traps focus and exposes a native service select', 390, async page => {
        const opener = page.locator('.request-button')
        await opener.click()
        const dialog = page.getByRole('dialog', { name: 'Заполните форму' })
        await dialog.waitFor()
        await assertModalKeyboard(page, dialog)
        assert.equal(await page.locator('#__nuxt').evaluate(element => element.inert), true, 'the background must be inert')
        await opener.focus()
        assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true)
        const service = dialog.getByLabel('Выберите услугу *')
        assert.equal(await service.evaluate(element => element.tagName), 'SELECT')
        await service.focus()
        assert.equal(await service.evaluate(element => element === document.activeElement), true)
        await service.selectOption('hdd')
        assert.equal(await service.inputValue(), 'hdd')
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
        await page.waitForFunction(() => !document.getElementById('__nuxt').inert)
        assert.equal(await opener.evaluate(element => element === document.activeElement), true)
      }],
      ['service dialog preserves focus through the contact form handoff', 1440, async page => {
        const opener = page.locator('.primary-action')
        await opener.click()
        const service = page.getByRole('dialog', { name: /ГНБ под ключ/ })
        await service.waitFor()
        await assertModalKeyboard(page, service)
        await page.keyboard.press('Escape')
        await service.waitFor({ state: 'hidden' })
        assert.equal(await opener.evaluate(element => element === document.activeElement), true)
        await opener.click()
        await service.locator('.order-button').click()
        const contact = page.getByRole('dialog', { name: 'Заполните форму' })
        await contact.waitFor()
        await assertModalKeyboard(page, contact)
        assert.equal(await contact.locator('select#service').inputValue(), 'hdd')
        assert.equal(await page.locator('#__nuxt').evaluate(element => element.inert), true)
        await page.keyboard.press('Escape')
        await contact.waitFor({ state: 'hidden' })
        await page.waitForFunction(() => !document.getElementById('__nuxt').inert && document.body.style.overflow !== 'hidden')
      }],
      ['mobile navigation closes with Escape and restores focus', 390, async page => {
        const opener = page.locator('.mobile-menu-toggle')
        await opener.click()
        const dialog = page.getByRole('dialog', { name: 'Меню', exact: true })
        await dialog.waitFor()
        await assertModalKeyboard(page, dialog)
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
        assert.equal(await opener.getAttribute('aria-expanded'), 'false')
        assert.equal(await opener.evaluate(element => element === document.activeElement), true)
        assert.equal(await page.locator('main').evaluate(element => element.inert), false)
      }],
      ['switching to desktop releases the hidden mobile menu', 390, async page => {
        const opener = page.locator('.mobile-menu-toggle')
        await opener.click()
        await page.getByRole('dialog', { name: 'Меню', exact: true }).waitFor()
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.waitForFunction(() => !document.querySelector('main').inert && document.body.style.overflow !== 'hidden')
        assert.equal(await opener.getAttribute('aria-expanded'), 'false')
        assert.equal(await page.getByRole('dialog', { name: 'Меню', exact: true }).count(), 0)
        await page.locator('.request-button').click()
        await page.getByRole('dialog', { name: 'Заполните форму' }).waitFor()
        await page.keyboard.press('Escape')
      }],
      ['SPA navigation releases shared modal isolation', 1440, async page => {
        await page.evaluate(() => { window.__accessibilityNavigation = 'same document' })
        await page.locator('.request-button').click()
        await page.getByRole('dialog', { name: 'Заполните форму' }).waitFor()
        await page.waitForFunction(() => document.getElementById('__nuxt').inert)
        await page.evaluate(() => document.getElementById('__nuxt').__vue_app__.config.globalProperties.$router.push('/equipment'))
        await page.waitForURL(base + '/equipment')
        await page.waitForFunction(() => !document.getElementById('__nuxt').inert && document.body.style.overflow !== 'hidden')
        assert.equal(await page.locator('main').evaluate(element => Boolean(element.closest('[inert]'))), false)
        await page.locator('.brand-link').click()
        await page.waitForURL(base + '/')
        assert.equal(await page.evaluate(() => window.__accessibilityNavigation), 'same document')
        await page.locator('.request-button').click()
        const dialog = page.getByRole('dialog', { name: 'Заполните форму' })
        await dialog.waitFor()
        await assertModalKeyboard(page, dialog)
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
        await page.waitForFunction(() => !document.getElementById('__nuxt').inert)
      }],
      ['service carousel changes only after a visitor action', 1440, async page => {
        await page.locator('.directory-item').nth(1).click()
        assert.equal((await page.locator('.slide-counter').innerText()).trim(), '02 / 10')
        // The former 6.5s autoplay must not replace content while someone reads it.
        await page.waitForTimeout(6800)
        assert.equal((await page.locator('.slide-counter').innerText()).trim(), '02 / 10')
        await page.getByRole('button', { name: 'Следующая услуга', exact: true }).click()
        assert.equal((await page.locator('.slide-counter').innerText()).trim(), '03 / 10')
      }],
    ]
    for (const [name, width, run] of scenarios) {
      await t.test(name, async () => {
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: name.includes('carousel') ? 'no-preference' : 'reduce' })
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
          await page.goto(base, { waitUntil: 'networkidle' })
          await run(page)
          assert.deepEqual(errors, [])
        } finally { await context.close() }
      })
    }
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
