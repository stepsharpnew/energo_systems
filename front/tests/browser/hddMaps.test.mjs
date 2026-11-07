import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' }

test('HDD maps make no requests before scrolling toward contacts', async () => {
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
    const mapRequests = []
    await context.route('**/*', route => {
      const url = new URL(route.request().url())
      if (url.hostname === 'yandex.ru' && url.pathname.startsWith('/map-widget/')) {
        mapRequests.push(url.href)
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Test map</title><p>Map loaded</p>' })
      }
      if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
      if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
      return route.continue()
    })
    const page = await context.newPage()
    await page.goto(base + '/services/hdd', { waitUntil: 'networkidle' })
    assert.equal(mapRequests.length, 0, 'third-party maps must not compete with the first screen')
    const frames = page.locator('.maps iframe')
    assert.equal(await frames.count(), 2)
    const sources = await frames.evaluateAll(elements => elements.map(element => element.src))
    for (const frame of await frames.all()) {
      assert.equal(await frame.getAttribute('loading'), 'lazy')
      assert.ok(await frame.getAttribute('title'))
    }
    const responses = sources.map(source => page.waitForResponse(response => response.url() === source))
    await page.locator('.maps').scrollIntoViewIfNeeded()
    await Promise.all(responses)
    assert.equal(mapRequests.length, 2)
    assert.equal(await frames.evaluateAll(elements => elements.every(element => element.getBoundingClientRect().height > 0)), true)
    assert.equal(await page.locator('.map__cap a[href^="https://yandex.ru/maps/"]').count(), 2, 'address links remain available')
    await context.close()
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
