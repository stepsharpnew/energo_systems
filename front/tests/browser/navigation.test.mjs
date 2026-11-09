import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const routes = ['/', '/services', '/services/road', '/equipment', '/equipment/ktp']
const sections = [
  ['О нас', 'about'], ['Проекты', 'projects'], ['Клиенты', 'clients'],
  ['Документы', 'certificates'], ['Контакты', 'contact'],
]

async function waitForSection(page, id) {
  await page.waitForFunction(id => {
    const section = document.getElementById(id)
    if (!section || document.body.style.overflow === 'hidden' || section.closest('[inert]')) return false
    const bounds = section.getBoundingClientRect()
    const nav = document.querySelector('.main-nav')
    const navBottom = nav && getComputedStyle(nav).position === 'sticky' ? nav.getBoundingClientRect().bottom : 0
    return bounds.top >= navBottom - 2 && bounds.top < navBottom + 30 && bounds.bottom > navBottom
  }, id)
}

async function openMenu(page, width) {
  if (width > 992) return page.locator('.desktop-nav')
  const toggle = page.getByRole('button', { name: 'Открыть меню', exact: true })
  await toggle.click()
  const menu = page.getByRole('dialog', { name: 'Меню', exact: true })
  await menu.waitFor({ state: 'visible' })
  return menu.locator('.mobile-menu-items')
}

test('shared navigation opens every destination on desktop, mobile and before hydration', async t => {
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
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
    for (const width of [1440, 390]) for (const route of routes) {
      await t.test(`${route} ${width}px`, async () => {
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
        const page = await context.newPage()
        page.setDefaultTimeout(10000)
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await context.route('**/*', request => new URL(request.request().url()).origin === base
          ? request.continue() : request.fulfill({ status: 200, body: '' }))
        try {
          for (const [label, id] of sections) {
            if (label === 'Клиенты' && route.startsWith('/equipment')) continue
            await page.goto(base + route, { waitUntil: 'networkidle' })
            await page.evaluate(() => { window.__navigationDocument = true })
            const menu = await openMenu(page, width)
            assert.equal(await menu.getByRole('button').count(), 0, 'destinations must be real links')
            const link = menu.getByRole('link', { name: label, exact: true })
            assert.equal(await link.getAttribute('href'), '/#' + id)
            await link.focus()
            await page.keyboard.press('Enter')
            await page.waitForURL(base + '/#' + id)
            await waitForSection(page, id)
            assert.equal(await page.evaluate(() => window.__navigationDocument), true, 'hydrated links must keep SPA navigation')
            if (width <= 992) {
              assert.equal(await page.getByRole('dialog', { name: 'Меню', exact: true }).count(), 0)
              assert.equal(await page.locator('.mobile-menu-toggle').getAttribute('aria-expanded'), 'false')
            }
          }

          // Exercise the main page and catalogue links, including a repeated
          // fragment click after scrolling away from the existing destination.
          await page.goto(base + route, { waitUntil: 'networkidle' })
          let menu = await openMenu(page, width)
          await menu.getByRole('link', { name: 'Услуги', exact: true }).click()
          const servicesUrl = route === '/' ? '/#services' : route === '/services' ? '/services#services-catalog' : '/services'
          await page.waitForURL(base + servicesUrl)
          if (servicesUrl.includes('#')) await waitForSection(page, servicesUrl.split('#')[1])
          menu = await openMenu(page, width)
          await menu.getByRole('link', { name: 'Главная', exact: true }).click()
          await page.waitForURL(base + (route === '/' ? '/#hero' : '/'))
          if (route === '/') {
            await waitForSection(page, 'hero')
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
            menu = await openMenu(page, width)
            await menu.getByRole('link', { name: 'Главная', exact: true }).click()
            await waitForSection(page, 'hero')
          }
          menu = await openMenu(page, width)
          await menu.getByRole('link', { name: 'Оборудование', exact: true }).click()
          await page.waitForURL(base + '/equipment')
          assert.deepEqual(errors, [], 'navigation must not produce uncaught errors')
        } finally { await context.close() }
      })
    }

    await t.test('desktop links work without JavaScript and preserve fragment offsets', async () => {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } })
      try {
        // The noscript Metrika pixel must not make this navigation check
        // depend on an external network request completing on the CI runner.
        await context.route('**/*', request => new URL(request.request().url()).origin === base
          ? request.continue() : request.fulfill({ status: 200, body: '' }))
        const page = await context.newPage()
        await page.goto(base + '/services/road')
        await page.locator('.desktop-nav').getByRole('link', { name: 'Контакты', exact: true }).click()
        await page.waitForURL(base + '/#contact')
        await waitForSection(page, 'contact')
      } finally { await context.close() }
    })
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
