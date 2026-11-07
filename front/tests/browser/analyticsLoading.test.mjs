import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { METRIKA_ID } from '../../lib/browser/analytics.js'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }
const metrikaSdk = `(${function () {
  const events = Array.from(window.ym?.a || [], args => Array.from(args))
  const state = window.__metrikaLoadingTest = {
    loads: (window.__metrikaLoadingTest?.loads || 0) + 1,
    queued: events.slice(),
    events,
  }
  window.ym = (...args) => { state.events.push(args) }
}})()`
const novofonSdk = `(${function () {
  const installed = typeof window.__cs_onReplacePhones === 'function'
  const before = document.querySelector('h1')?.outerHTML
  const veto = installed && window.__cs_onReplacePhones([
    { id: 'selector=span', raw: '74951287470', text: '+7 (495) 128-74-70' },
  ]) === false
  window.__novofonLoadingTest = {
    loads: (window.__novofonLoadingTest?.loads || 0) + 1,
    installed,
    veto,
    preservedHeading: document.querySelector('h1')?.outerHTML === before,
  }
}})()`

test('optional SDKs load after paint while analytics preserves early events and SPA page views', async () => {
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
  const landing = `${base}/?${new URLSearchParams({ utm_source: 'yandexdirect', utm_campaign: 'analytics-regression', yclid: 'early-click-123' })}`
  const referrer = 'https://yandex.ru/'
  let browser, releaseSdk
  const sdkGate = new Promise(resolve => { releaseSdk = resolve })
  const errors = []
  let leadRequests = 0
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.setDefaultTimeout(10000)
    page.on('pageerror', error => errors.push(error.message))
    await context.route('**/*', async route => {
      const url = new URL(route.request().url())
      let sdk
      if (url.hostname === 'mc.yandex.ru' && url.pathname === '/metrika/tag.js') sdk = metrikaSdk
      if (url.hostname === 'widget.novofon.ru' && url.pathname === '/novofon.js') sdk = novofonSdk
      if (sdk) {
        await sdkGate
        return route.fulfill({ status: 200, contentType: 'application/javascript', headers: { 'Timing-Allow-Origin': '*' }, body: sdk })
      }
      if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
      if (url.pathname.startsWith('/api/')) {
        leadRequests++
        return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
      }
      return route.continue()
    })

    // Keep both SDK responses pending across DOMContentLoaded. The small inline
    // bootstrap must already accept goals before either external SDK executes.
    await page.goto(landing, { waitUntil: 'domcontentloaded', referer: referrer })
    await page.evaluate(counter => {
      window.__analyticsDocumentMarker = 'same document'
      window.ym(counter, 'reachGoal', 'before_sdk_response')
    }, METRIKA_ID)
    const beforeSdk = await page.evaluate(() => ({
      metrika: window.__metrikaLoadingTest,
      novofon: window.__novofonLoadingTest,
      queued: Array.from(window.ym.a || [], args => Array.from(args)),
      referrer: document.referrer,
    }))
    assert.equal(beforeSdk.metrika, undefined)
    assert.equal(beforeSdk.novofon, undefined)
    assert.equal(beforeSdk.referrer, referrer)
    assert.deepEqual(beforeSdk.queued.map(event => event[1]), ['init', 'hit', 'reachGoal'])
    assert.equal(beforeSdk.queued[1][2], landing)
    assert.equal(beforeSdk.queued[1][3].referer, referrer)
    releaseSdk()
    await page.waitForFunction(() => window.__metrikaLoadingTest && window.__novofonLoadingTest)
    const loaded = await page.evaluate(() => ({ metrika: window.__metrikaLoadingTest, novofon: window.__novofonLoadingTest }))
    assert.equal(loaded.metrika.loads, 1)
    assert.deepEqual(loaded.metrika.queued.map(event => event[1]), ['init', 'hit', 'reachGoal'])
    assert.equal(loaded.metrika.events.filter(event => event[1] === 'init').length, 1)
    assert.equal(loaded.metrika.events.filter(event => event[1] === 'hit').length, 1, 'mounting must not duplicate the early initial hit')
    assert.equal(loaded.metrika.events.find(event => event[1] === 'reachGoal')[2], 'before_sdk_response')
    assert.deepEqual(loaded.novofon, { loads: 1, installed: true, veto: true, preservedHeading: true })

    await page.waitForFunction(() => performance.getEntriesByType('resource').filter(entry => /(?:mc\.yandex\.ru\/metrika\/tag\.js|widget\.novofon\.ru\/novofon\.js)/.test(entry.name)).length === 2)
    const timing = await page.evaluate(() => ({
      paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      requests: performance.getEntriesByType('resource').filter(entry => /(?:mc\.yandex\.ru\/metrika\/tag\.js|widget\.novofon\.ru\/novofon\.js)/.test(entry.name)).map(entry => ({ name: entry.name, start: entry.startTime })),
    }))
    if (timing.paint !== undefined) {
      for (const request of timing.requests) assert.ok(request.start >= timing.paint, `${request.name} must be requested after first contentful paint`)
    }

    await page.locator('.hdd-link').click()
    await page.waitForURL(url => url.pathname === '/services/hdd')
    await page.waitForFunction(() => window.__metrikaLoadingTest.events.filter(event => event[1] === 'hit').length === 2)
    const serviceUrl = page.url()
    let events = await page.evaluate(() => window.__metrikaLoadingTest.events)
    let hits = events.filter(event => event[1] === 'hit')
    assert.deepEqual(hits.map(event => event[2]), [landing, serviceUrl])
    assert.equal(hits[1][3].referer, landing)
    assert.equal(await page.evaluate(() => window.__analyticsDocumentMarker), 'same document', 'the link must exercise SPA navigation')

    // Router afterEach may also run for a duplicated navigation. It must leave
    // both counters untouched, while a real return visit produces one new hit.
    await page.evaluate(async () => {
      const router = document.getElementById('__nuxt').__vue_app__.config.globalProperties.$router
      await router.push(router.currentRoute.value.fullPath)
      await new Promise(requestAnimationFrame)
    })
    events = await page.evaluate(() => window.__metrikaLoadingTest.events)
    assert.equal(events.filter(event => event[1] === 'hit').length, 2)
    await page.evaluate(() => document.getElementById('__nuxt').__vue_app__.config.globalProperties.$router.push('/'))
    await page.waitForFunction(() => window.__metrikaLoadingTest.events.filter(event => event[1] === 'hit').length === 3)
    const final = await page.evaluate(() => ({ metrika: window.__metrikaLoadingTest, novofon: window.__novofonLoadingTest, marker: window.__analyticsDocumentMarker }))
    hits = final.metrika.events.filter(event => event[1] === 'hit')
    assert.equal(hits[2][2], landing, 'returning home must retain the original campaign query')
    assert.equal(page.url(), landing)
    assert.equal(hits[2][3].referer, serviceUrl)
    assert.equal(final.metrika.events.filter(event => event[1] === 'init').length, 1)
    assert.equal(final.metrika.loads, 1)
    assert.equal(final.novofon.loads, 1)
    assert.equal(final.marker, 'same document')
    assert.equal(leadRequests, 0)
    assert.deepEqual(errors, [])
  } finally {
    releaseSdk()
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
