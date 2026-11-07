import assert from 'node:assert/strict'

// Run against the frontend nginx container or the public HTTPS origin.
// This checks responses, not copies of the nginx configuration.
const base = process.argv[2] || 'http://127.0.0.1:4173'
async function request(path) {
  const response = await fetch(new URL(path, base), {
    redirect: 'manual', headers: { 'Accept-Encoding': 'gzip' },
    signal: AbortSignal.timeout(15000),
  })
  return { response, body: await response.text() }
}

const home = await request('/')
assert.equal(home.response.status, 200)
assert.match(home.response.headers.get('cache-control') || '', /no-cache/)
assert.equal(home.response.headers.get('content-encoding'), 'gzip', 'HTML must be compressed')
assert.match(home.body, /<html[^>]*lang="ru"/)
assert.match(home.body, /<h1\b/, 'the first screen must exist in server HTML')

const assets = [...new Set(home.body.match(/\/_nuxt\/[^"\s<>]+\.(?:css|js)(?=["\s<>])/g))]
assert.ok(assets.some(path => path.endsWith('.css')) && assets.some(path => path.endsWith('.js')))
let compressedCss = false, compressedJs = false
for (const path of assets) {
  const { response, body } = await request(path)
  assert.equal(response.status, 200, path)
  assert.match(response.headers.get('cache-control') || '', /max-age=31536000.*immutable/, path)
  if (Buffer.byteLength(body) >= 1024) {
    assert.equal(response.headers.get('content-encoding'), 'gzip', `${path} must be compressed`)
    if (path.endsWith('.css')) compressedCss = true
    if (path.endsWith('.js')) compressedJs = true
  }
}
assert.ok(compressedCss && compressedJs)
const image = await request('/img/icons/favicon-32x32.png')
assert.equal(image.response.status, 200)
assert.match(image.response.headers.get('cache-control') || '', /max-age=2592000/)
const build = await request('/_nuxt/builds/latest.json')
assert.equal(build.response.status, 200)
assert.match(build.response.headers.get('cache-control') || '', /no-cache/)
assert.doesNotMatch(build.response.headers.get('cache-control') || '', /immutable/)
for (const path of ['/hdd', '/hdd/']) {
  const redirect = await request(`${path}?utm_source=delivery-check&yclid=123`)
  assert.equal(redirect.response.status, 301)
  const destination = new URL(redirect.response.headers.get('location'), base)
  assert.equal(destination.pathname.replace(/\/$/, ''), '/services/hdd')
  assert.equal(destination.searchParams.get('utm_source'), 'delivery-check')
  assert.equal(destination.searchParams.get('yclid'), '123')
  assert.equal(destination.origin, new URL(base).origin, 'redirect must not leak an internal proxy origin')
}
assert.equal((await request('/static-delivery-check-missing-route')).response.status, 404)
assert.equal((await request('/legacy.php')).response.status, 410)
console.log(`Static delivery OK: ${base}; ${assets.length} versioned assets, gzip, cache, SSR and redirects`)
