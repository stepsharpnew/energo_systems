import test from 'node:test'
import assert from 'node:assert/strict'
import { landingSubmitError, maskLandingPhone, submitLandingLead, validLandingPhone } from '../utils/landingLead.js'

test('landing phones accept local, international and legacy Russian input', () => {
  for (const value of ['79990000000', '89990000000', '9990000000', '+7 (999)-000-00-00']) {
    assert.equal(maskLandingPhone(value), '+7 (999) 000-00-00')
    assert.equal(validLandingPhone(maskLandingPhone(value)), true)
  }
  assert.equal(maskLandingPhone(''), '')
  assert.equal(validLandingPhone('+7 (999)'), false)
})

test('landing submission requires server acknowledgement and preserves API errors', async () => {
  const previousFetch = globalThis.fetch
  const payload = { type: 'service', name: 'Тест', contact: '89990000000', consent: true, service: 'Опрос по ДГУ', answers: [{ label: 'Направление', value: 'Для бизнеса' }] }
  try {
    let sent
    globalThis.fetch = async (url, request) => {
      assert.equal(url, '/api/lead')
      sent = JSON.parse(request.body)
      return { ok: true, json: async () => ({ ok: true }) }
    }
    assert.deepEqual(await submitLandingLead(payload), { ok: true })
    assert.equal(sent.contact, '+7 (999)-000-00-00')
    assert.equal(sent.consentVersion, '2026-07-13')
    assert.deepEqual(sent.answers, payload.answers)
    assert.deepEqual(sent.attribution, {})
    assert.equal(payload.contact, '89990000000')

    for (const result of [{ ok: false }, {}, null]) {
      globalThis.fetch = async () => ({ ok: true, json: async () => result })
      await assert.rejects(submitLandingLead(payload), /не подтверждена/)
    }
    globalThis.fetch = async () => ({ ok: false, status: 429 })
    await assert.rejects(submitLandingLead(payload), error => {
      assert.equal(error.status, 429)
      assert.match(landingSubmitError(error), /15 минут/)
      return true
    })
  } finally {
    globalThis.fetch = previousFetch
  }
})
