import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' }
const landings = [
  { route: '/services/hdd', sections: ['clients', 'solutions', 'conditions', 'prices', 'projects', 'guarantees', 'contacts'], stickyClass: 'is-on' },
  { route: '/services/ups', sections: ['audience', 'process', 'solutions', 'prices', 'projects', 'service', 'guarantees', 'contacts'] },
  { route: '/services/dgu', sections: ['clients', 'process', 'realized', 'power', 'projects', 'offers', 'faq', 'contacts'], stickyClass: 'is-visible' },
]

async function waitForContacts(page) {
  await page.waitForFunction(() => {
    const contacts = document.getElementById('contacts')
    if (!contacts) return false
    const bounds = contacts.getBoundingClientRect()
    return bounds.top >= -2 && bounds.top < 180 && bounds.bottom > innerHeight * .5
  })
}

test('landing deep links and keyboard anchors reveal deferred sections and retain usable contact controls', async t => {
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html')
      const body = await readFile(path)
      res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
      res.end(body)
    } catch { res.writeHead(404); res.end() }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  let browser
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    for (const landing of landings) for (const width of [390, 1440]) for (const reducedMotion of ['no-preference', 'reduce']) {
      await t.test(`${landing.route} ${width}px ${reducedMotion}`, async () => {
        const context = await browser.newContext({ reducedMotion, viewport: { width, height: 1000 } })
        try {
          await context.route('**/*', route => {
            const url = new URL(route.request().url())
            if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
            if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
            return route.continue()
          })
          const page = await context.newPage()
          const errors = []
          page.on('pageerror', error => errors.push(error.message))
          const response = await page.goto(base + landing.route, { waitUntil: 'networkidle' })
          assert.equal(response.status(), 200)
          const html = await response.text()
          for (const id of landing.sections) assert.match(html, new RegExp(`<section\\b[^>]*\\bid="${id}"`), `${id} must remain in the server HTML`)
          assert.match(html, /name="ctname"/, 'the complete contact form must be server-rendered')
          await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false)
          await page.evaluate(() => document.fonts.ready)
          // Jump before the lower sections have ever rendered. Returning to
          // the top after visiting contacts would reuse remembered real sizes
          // and could hide the smooth-scroll/placeholder regression.
          const desktopLink = page.locator('header .nav a[href="#contacts"]')
          const burger = page.locator('[data-burger]')
          if (await desktopLink.isVisible() || await burger.count()) {
            let contactsLink = desktopLink
            if (!await desktopLink.isVisible()) {
              await burger.click()
              contactsLink = page.locator('[data-drawer] a[href="#contacts"]')
            }
            await contactsLink.focus()
            await page.keyboard.press('Enter')
          } else {
            // HDD intentionally has no mobile menu. Exercise the same native
            // fragment navigation without adding a synthetic control to it.
            await page.evaluate(() => { window.location.hash = 'contacts' })
          }
          await waitForContacts(page)

          // A focused descendant must make a skipped section render and scroll
          // into view, including after jumping over its estimated placeholder.
          const name = page.locator('#contacts [name=ctname]')
          await name.focus()
          await name.fill('Проверка якорной ссылки')
          await page.keyboard.press('Tab')
          const phone = page.locator('#contacts [name=ctphone]')
          assert.equal(await phone.evaluate(element => element === document.activeElement), true)
          assert.equal(await phone.evaluate(element => {
            const bounds = element.getBoundingClientRect()
            return bounds.height > 0 && bounds.top >= 0 && bounds.bottom <= innerHeight
          }), true, 'keyboard focus must stay visible after deferred content renders')

          const submit = page.locator('#contacts .contacts__submit')
          await submit.scrollIntoViewIfNeeded()
          if (landing.stickyClass) {
            await page.waitForFunction(className => !document.querySelector('[data-sticky]').classList.contains(className), landing.stickyClass)
          }
          assert.equal(await submit.evaluate(element => {
            const bounds = element.getBoundingClientRect()
            const hit = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
            return hit === element || element.contains(hit)
          }), true, 'floating controls must not cover the contact submit button')

          assert.equal(await page.locator('#contacts h2').isVisible(), true, 'native anchors must reveal the lower section')
          assert.deepEqual(errors, [])
        } finally { await context.close() }
      })
    }
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
