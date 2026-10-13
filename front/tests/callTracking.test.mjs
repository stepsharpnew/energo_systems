import test from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_PHONE_NUMBER, getFilledLabelsArray, requestTrackingNumber } from '../utils/callTracking.js'

test('the fallback is the number supplied for call tracking', () => {
  assert.equal(DEFAULT_PHONE_NUMBER, '74951780118')
})

test('labels preserve the provider order, decode query values and exclude unrelated parameters', () => {
  const search = '?yclid=456&utm_term=%D0%93%D0%9D%D0%91+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&utm_source=yandex&utm_campaign=summer%2Bautumn&utm_content=banner&utm_medium=cpc&gclid=123&_openstat=campaign&utm_referer=https%3A%2F%2Fexample.com%2F&email=private%40example.com'
  assert.deepEqual(getFilledLabelsArray(search, 'https://search.example/results'), [
    { type: '_openstat', value: 'campaign' },
    { type: 'utm_source', value: 'yandex' },
    { type: 'utm_campaign', value: 'summer+autumn' },
    { type: 'utm_medium', value: 'cpc' },
    { type: 'utm_term', value: 'ГНБ Москва' },
    { type: 'utm_content', value: 'banner' },
    { type: 'gclid', value: '123' },
    { type: 'yclid', value: '456' },
    { type: 'utm_referer', value: 'https://example.com/' },
    { type: 'http_referer', value: 'https://search.example/results' },
  ])
})

test('direct visits omit empty labels; a referrer alone is sufficient', () => {
  assert.deepEqual(getFilledLabelsArray(''), [])
  assert.deepEqual(getFilledLabelsArray('?utm_source=&utm_campaign&unknown=value'), [])
  assert.deepEqual(getFilledLabelsArray('', 'https://example.com/article'), [
    { type: 'http_referer', value: 'https://example.com/article' },
  ])
})

test('visits without attribution do not request a tracking number', async () => {
  let calls = 0
  const phone = await requestTrackingNumber([], async () => { calls++; throw new Error('Unexpected request') })
  assert.equal(phone, null)
  assert.equal(calls, 0)
})

test('a request sends the supplied labels once as JSON to the call-tracking endpoint', async () => {
  const labels = [{ type: 'utm_source', value: 'yandex' }]
  let calls = 0
  const phone = await requestTrackingNumber(labels, async (url, options) => {
    calls++
    const endpoint = new URL(url)
    assert.equal(endpoint.protocol, 'https:')
    assert.equal(endpoint.hostname, '1ats.ru')
    assert.equal(endpoint.pathname, '/vats/api/callTracking/getNumber')
    assert.equal(options.method, 'POST')
    assert.equal(new Headers(options.headers).get('content-type'), 'application/json')
    assert.equal(options.body, JSON.stringify(labels))
    assert.ok(options.signal instanceof AbortSignal)
    assert.equal(options.signal.aborted, false)
    return { status: 200, text: async () => '74951234567' }
  })
  assert.equal(calls, 1)
  assert.equal(phone, '74951234567')
})

test('plain phone responses accept formatting and normalize the domestic prefix', async () => {
  for (const value of ['74951234567', '+7 (495) 123-45-67', '8 (495) 123-45-67', '  84951234567\n']) {
    const phone = await requestTrackingNumber([{ type: 'yclid', value: '123' }], async () => ({
      status: 200,
      text: async () => value,
    }))
    assert.equal(phone, '74951234567', value)
  }
})

test('blank, malformed and HTML responses cannot replace the fallback', async () => {
  for (const value of ['', ' \n ', '4951234567', '749512345678', '+14951234567', 'call 74951234567', '<span>74951234567</span>', '<img src=x onerror=alert(1)>', '{"phone":"74951234567"}']) {
    const phone = await requestTrackingNumber([{ type: 'utm_source', value: 'test' }], async () => ({
      status: 200,
      text: async () => value,
    }))
    assert.equal(phone, null, value)
  }
})

test('HTTP failures and other success statuses do not replace the fallback', async () => {
  for (const status of [201, 204, 400, 429, 500]) {
    const phone = await requestTrackingNumber([{ type: 'utm_source', value: 'test' }], async () => ({
      status,
      text: async () => '74951234567',
    }))
    assert.equal(phone, null, String(status))
  }
})

test('network, cancellation and body-reading errors preserve the fallback', async () => {
  const labels = [{ type: 'http_referer', value: 'https://example.com/' }]
  for (const error of [new TypeError('Failed to fetch'), new DOMException('The request was aborted', 'AbortError')]) {
    assert.equal(await requestTrackingNumber(labels, async () => { throw error }), null)
  }
  assert.equal(await requestTrackingNumber(labels, async () => ({
    status: 200,
    text: async () => { throw new Error('Unable to read response') },
  })), null)
})
