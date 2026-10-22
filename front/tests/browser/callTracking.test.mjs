import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' }

test('call tracking changes only the header phone and keeps its dial link in sync', async () => {
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
    const page = await browser.newPage()
    page.setDefaultTimeout(10000)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === base
      ? route.continue()
      : route.fulfill({ status: 200, body: '' }))
    await page.goto(base, { waitUntil: 'networkidle' })
    const phone = page.locator('.header-contacts a[href^="tel:"]')
    const offices = await page.locator('.office-addresses').innerText()
    const labels = await page.locator('.contact-label').allTextContents()

    // A broad span selector previously replaced icons, addresses and email too.
    await page.locator('.contact-item span').evaluateAll(elements => {
      for (const element of elements) element.innerHTML = '+7 (495) 128-74-70'
    })
    await page.waitForFunction(() => document.querySelector('.header-contacts a[href^="tel:"]').getAttribute('href') === 'tel:+74951287470')
    assert.equal(await phone.count(), 1)
    assert.equal(await phone.innerText(), '+7 (495) 128-74-70')
    assert.equal(await page.locator('.office-addresses').innerText(), offices)
    assert.deepEqual(await page.locator('.contact-label').allTextContents(), labels)
    assert.equal(await page.locator('.header-contacts .contact-icon svg').count(), 3)
    assert.equal(await page.locator('.header-contacts a[href="mailto:sales@e-systems.su"]').innerText(), 'sales@e-systems.su')

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

    // Subsequent substitutions may update a text node or replace all link content.
    await phone.locator('span').evaluate(span => { span.firstChild.data = '8 (495) 128-74-71' })
    await page.waitForFunction(() => document.querySelector('.header-contacts a[href^="tel:"]').getAttribute('href') === 'tel:+74951287471')
    await phone.evaluate(link => { link.innerHTML = '+7 (495) 128-74-72' })
    await page.waitForFunction(() => document.querySelector('.header-contacts a[href^="tel:"]').getAttribute('href') === 'tel:+74951287472')

    await page.goto(base + '/equipment/mtp', { waitUntil: 'networkidle' })
    const custom = page.locator('a.phone-link.secondary-action')
    assert.equal(await custom.getAttribute('href'), 'tel:+74951795920')
    await custom.evaluate(link => { link.textContent = 'Связаться по телефону' })
    assert.equal(await custom.getAttribute('href'), 'tel:+74951795920')
    assert.deepEqual(errors, [])
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
