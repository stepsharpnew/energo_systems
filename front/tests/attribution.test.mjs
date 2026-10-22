import test from 'node:test'
import assert from 'node:assert/strict'
import { createAttributionSession, getAttributionQuery, getLeadAttribution, withAttributionUrl } from '../utils/attribution.js'

const campaign = { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'sale' }

function memoryStorage(initial = null) {
  let value = initial
  return { getItem: () => value, setItem: (_, next) => { value = next } }
}

test('advertising visits retain their campaign across navigation and a full page reload', () => {
  const storage = memoryStorage()
  const session = createAttributionSession(() => storage)
  assert.deepEqual(session.resolve({ ...campaign, email: 'private@example.com' }), {
    ...campaign, email: 'private@example.com',
  })
  assert.deepEqual(session.resolve({ category: 'ktp' }), { ...campaign, category: 'ktp' })
  const reloaded = createAttributionSession(() => storage)
  const query = reloaded.resolve({})
  assert.deepEqual(query, campaign)
})

test('a new campaign replaces old tags and click IDs instead of mixing sources', () => {
  const storage = memoryStorage()
  const session = createAttributionSession(() => storage)
  session.resolve({ ...campaign, gclid: 'old-click', utm_content: 'old-banner' })
  const next = { utm_source: 'yandex', yclid: 'new-click' }
  assert.deepEqual(session.resolve(next), next)
  assert.deepEqual(session.resolve({}), next)
  assert.deepEqual(createAttributionSession(() => storage).resolve({}), next)
})

test('direct visits stay untagged and unrelated query parameters are never propagated', () => {
  const storage = memoryStorage()
  const session = createAttributionSession(() => storage)
  assert.deepEqual(session.resolve({ search: 'transformer' }), { search: 'transformer' })
  assert.deepEqual(session.resolve({}), {})
  assert.equal(storage.getItem(), null)
  assert.equal(withAttributionUrl('/equipment', 'https://e-systems.su/', {}), '/equipment')
})

test('blocked or corrupt session storage does not break navigation', () => {
  for (const getStorage of [
    () => { throw new Error('Access denied') },
    () => memoryStorage('{invalid json'),
    () => memoryStorage('null'),
  ]) {
    const session = createAttributionSession(getStorage)
    assert.deepEqual(session.resolve({}), {})
    session.resolve(campaign)
    assert.deepEqual(session.resolve({}), campaign)
  }
})

test('only supported, nonempty attribution values are retained', () => {
  assert.deepEqual(getAttributionQuery({
    utm_source: ['google', 'ignored'], utm_campaign: '', utm_medium: null,
    utm_content: {}, gclid: '123', yclid: '456', gbraid: '789', wbraid: 'abc',
    utm_id: 'sale-2026', email: 'private@example.com',
  }), { utm_source: 'google', utm_id: 'sale-2026', gclid: '123', yclid: '456', gbraid: '789', wbraid: 'abc' })
})

test('native links preserve destination queries, hashes and encoded campaign values', () => {
  const query = { ...campaign, utm_term: 'ГНБ Москва + область', gclid: 'a&b=c' }
  const result = new URL(withAttributionUrl('/equipment?category=ktp#request', 'https://e-systems.su/', query))
  assert.equal(result.pathname, '/equipment')
  assert.equal(result.hash, '#request')
  assert.deepEqual(Object.fromEntries(result.searchParams), { category: 'ktp', ...query })
  assert.equal(withAttributionUrl('/services?utm_source=yandex', result.href, query), '/services?utm_source=yandex')
})

test('external, contact, download, API and anchor links are left intact', () => {
  for (const href of [
    'https://example.com/', '//example.com/', 'mailto:sales@e-systems.su',
    'tel:+74951795920', 'javascript:void(0)', '/catalog.pdf', '/api/lead',
    '#contacts', '',
  ]) {
    assert.equal(withAttributionUrl(href, 'https://e-systems.su/', campaign), href)
  }
})

test('lead attribution excludes unrelated queries and falls back to the stored campaign', () => {
  assert.deepEqual(getLeadAttribution(), {}, 'prerendering must not read browser storage')
  const previousWindow = globalThis.window
  globalThis.window = { location: { search: '?' + new URLSearchParams({ ...campaign, email: 'private@example.test' }) }, sessionStorage: memoryStorage() }
  try {
    assert.deepEqual(getLeadAttribution(), campaign)
    window.location.search = '?category=ktp'
    assert.deepEqual(getLeadAttribution(), campaign)
    window.location.search = '?utm_source=yandex&yclid=new-click'
    assert.deepEqual(getLeadAttribution(), { utm_source: 'yandex', yclid: 'new-click' })
    window.location.search = ''
    assert.deepEqual(getLeadAttribution(), { utm_source: 'yandex', yclid: 'new-click' })
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('malformed URL metadata is omitted so it cannot prevent a valid lead submission', () => {
  assert.deepEqual(getAttributionQuery({
    utm_source: ' yandex ', utm_medium: '   ', utm_campaign: 'x'.repeat(1001),
    utm_content: 'banner\r\nInjected: value', utm_term: 'ГНБ + область & <тест>',
  }), { utm_source: 'yandex', utm_term: 'ГНБ + область & <тест>' })
})
