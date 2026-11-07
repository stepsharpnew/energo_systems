import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import manifest from '../../data/imageManifest.json' with { type: 'json' }

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

test('equipment loads previews before opening the gallery and originals only after opening', async () => {
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
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    const originals = []
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('request', request => {
      const path = new URL(request.url()).pathname
      if (path.startsWith('/img/equipment/')) originals.push(path)
    })
    await page.route('**/*', route => {
      const url = new URL(route.request().url())
      return url.origin === base ? route.continue() : route.fulfill({ status: 200, body: '' })
    })
    await page.goto(base + '/equipment/mtp', { waitUntil: 'networkidle' })
    await page.locator('.equipment-gallery').scrollIntoViewIfNeeded()
    await page.locator('.equipment-gallery__thumbs img').last().waitFor()
    assert.deepEqual(originals, [], 'initial render, gallery preview and thumbnails must not fetch full originals')
    assert.match(await page.locator('.equipment-gallery__photo').getAttribute('src'), /^\/img\/previews\//)
    await page.locator('.equipment-gallery__open').click()
    await page.locator('.pswp--equipment').waitFor({ state: 'visible' })
    await page.waitForFunction(() => [...document.querySelectorAll('.pswp__img')].some(image => image.complete && image.naturalWidth > 0))
    assert.ok(originals.includes('/img/equipment/mtp-1.jpg'), 'opening fullscreen must load the original')
    const size = manifest['/img/equipment/mtp-1.jpg']
    assert.ok(await page.locator('.pswp__img').evaluateAll((images, width) => images.some(image => image.naturalWidth === width), size.width))
    await page.locator('.pswp__button--close').click()
    await page.locator('.pswp--equipment').waitFor({ state: 'hidden' })
    assert.deepEqual(errors, [])
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
