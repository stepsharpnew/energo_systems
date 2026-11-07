import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readdir, readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
async function collect(directory) {
  const result = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await collect(path))
    else if (entry.name === 'index.html') result.push(path)
  }
  return result
}

test('every prerendered route has server content and existing local link/asset targets', async () => {
  const pages = await collect(root)
  assert.ok(pages.length >= 29, 'all service, equipment and legal routes must be generated')
  const checked = new Set()
  for (const path of pages) {
    const html = await readFile(path, 'utf8')
    const route = '/' + path.slice(root.length).replace(/index\.html$/, '')
    if (route !== '/hdd/') {
      assert.match(html, /<html[^>]*lang="ru"/, route)
      assert.match(html, /<h1\b/, `${route} needs a server-rendered heading`)
      assert.doesNotMatch(html, /data:image\/(?:png|jpeg|webp);base64/, `${route} must not embed raster photos`)
    }
    const references = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1])
    for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
      references.push(...match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]))
    }
    for (const reference of references) {
      if (!reference.startsWith('/') || reference.startsWith('//')) continue
      const url = new URL(reference.replaceAll('&amp;', '&'), 'https://e-systems.su')
      if (url.pathname.startsWith('/api/') || checked.has(url.pathname)) continue
      checked.add(url.pathname)
      let target = join(root, decodeURIComponent(url.pathname))
      try {
        if ((await stat(target)).isDirectory()) target = join(target, 'index.html')
        assert.ok((await stat(target)).isFile())
      } catch {
        assert.fail(`${route} references a missing local target: ${reference}`)
      }
    }
  }
})

test('every route includes its required styles before hydration without speculative dialog downloads', async () => {
  const manifest = JSON.parse(await readFile(new URL('../../.nuxt/dist/server/client.manifest.json', import.meta.url), 'utf8'))
  const pages = await collect(root)
  for (const path of pages) {
    const route = ('/' + path.slice(root.length).replace(/index\.html$/, '')).replace(/\/$/, '') || '/'
    if (route === '/hdd') continue
    const candidates = route === '/' ? ['pages/index.vue'] : [
      `pages${route}.vue`, `pages${route}/index.vue`,
      route.startsWith('/services/') ? 'pages/services/[id].vue' : 'pages/equipment/[slug].vue',
    ]
    let source
    for (const candidate of candidates) {
      try { await stat(new URL('../../' + candidate, import.meta.url)); source = candidate; break } catch {}
    }
    assert.ok(source && manifest[source], `${route} needs its own SSR manifest entry; an async dependency must not absorb its page chunk`)
    const css = new Set(), visited = new Set()
    const visit = key => {
      if (visited.has(key)) return
      visited.add(key)
      for (const file of manifest[key]?.css || []) css.add('/_nuxt/' + file)
      for (const dependency of manifest[key]?.imports || []) visit(dependency)
    }
    visit(source)
    const html = await readFile(path, 'utf8')
    const styles = new Set([...html.matchAll(/<link\b(?=[^>]*\brel="stylesheet")[^>]*\bhref="([^"]+)"[^>]*>/g)].map(match => match[1]))
    for (const file of css) assert.ok(styles.has(file), `${route} must apply ${file} without JavaScript`)
    assert.doesNotMatch(html, /<link\b[^>]*\brel="prefetch"/, `${route} must defer speculative imports until interaction`)
  }
})

test('every prerendered route hydrates without runtime errors or hydration mismatches', async t => {
  const pages = await collect(root)
  const routes = pages.map(path => ('/' + path.slice(root.length).replace(/index\.html$/, '')).replace(/\/$/, '') || '/')
    .filter(route => route !== '/hdd')
    .sort()
  assert.ok(routes.length >= 28, 'the runtime sweep must cover all generated route families')
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' }
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
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
      // This is a rendering-only sweep: no production lead can be submitted.
      if (url.pathname.startsWith('/api/')) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' })
      return route.continue()
    })
    const page = await context.newPage()
    let errors = []
    page.on('pageerror', error => errors.push(`pageerror: ${error.message}`))
    page.on('console', message => {
      if (message.type() === 'error' || (message.type() === 'warning' && /hydrat|mismatch/i.test(message.text()))) {
        errors.push(`console ${message.type()}: ${message.text()}`)
      }
    })
    for (const route of routes) {
      await t.test(route, async () => {
        errors = []
        const response = await page.goto(base + route, { waitUntil: 'networkidle' })
        assert.equal(response.status(), 200)
        await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false)
        assert.equal(await page.locator('h1').isVisible(), true, 'the hydrated route must retain its heading')
        assert.deepEqual(errors, [])
      })
    }
    await context.close()
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
