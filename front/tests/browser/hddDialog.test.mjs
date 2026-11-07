import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

test('HDD callback traps keyboard focus, makes the page inert, and restores focus and scroll styles', async () => {
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, new URL(req.url, 'http://localhost').pathname)
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html')
      const data = await readFile(path)
      res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
      res.end(data)
    } catch { res.writeHead(404); res.end() }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  let browser
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 1000 } })
    await context.route('**/*', route => {
      const url = new URL(route.request().url())
      if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
      if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
      return route.continue()
    })
    const page = await context.newPage()
    await page.goto(base + '/services/hdd', { waitUntil: 'networkidle' })
    await page.evaluate(() => { document.body.style.overflow = 'auto' })
    const opener = page.locator('[data-callback-open]').first()
    const dialog = page.locator('[data-callback]')
    await opener.click()
    assert.equal(await dialog.evaluate(element => element instanceof HTMLDialogElement && element.open), true)
    assert.equal(await page.locator('[name=cbname]').evaluate(element => element === document.activeElement), true)
    const focusInside = () => dialog.evaluate(element => element.contains(document.activeElement))
    for (const key of ['Tab', 'Shift+Tab']) {
      for (let step = 0; step < 18; step++) {
        await page.keyboard.press(key)
        assert.equal(await focusInside(), true, `${key} must stay inside the callback`)
      }
    }
    await page.evaluate(() => document.querySelector('header .logo').focus())
    assert.equal(await focusInside(), true, 'the native modal must prevent focus on page content')
    await page.keyboard.press('Escape')
    await page.waitForFunction(() => !document.querySelector('[data-callback]').open)
    assert.equal(await opener.evaluate(element => element === document.activeElement), true)
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'auto')
    assert.equal(await page.evaluate(() => document.body.classList.contains('is-locked')), false)
    await opener.click()
    await dialog.locator('[name=cbname]').fill('Сохранённое имя')
    await dialog.locator('button[data-callback-close]').click()
    await opener.click()
    assert.equal(await dialog.locator('[name=cbname]').inputValue(), 'Сохранённое имя')
    await dialog.locator('button[data-callback-close]').click()
    assert.equal(await dialog.isVisible(), false)
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'auto')
    await context.close()
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
