import test from 'node:test'
import assert from 'node:assert/strict'
import { useKtpQuiz } from '../composables/useKtpQuiz.js'
import { ktpFields, ktpQuizSteps } from '../assets/data/ktpQuiz.js'

function complete(quiz) {
  for (const step of quiz.steps) {
    for (const field of step.fields) {
      quiz.answers[field.key] = field.options?.[0] || (field.type === 'number' ? '2' : '4 линии по 100 А')
    }
    assert.equal(quiz.moveStep(1), true)
  }
  Object.assign(quiz.contact, { name: ' Тест ', email: 'test@example.com', location: ' Москва ', consent: true })
}

test('every original technical field is available exactly once; required fields remain visible', () => {
  const fields = ktpQuizSteps.flatMap((step) => [...step.fields, ...(step.details || [])])
  assert.equal(new Set(fields.map((field) => field.key)).size, ktpFields.length)
  assert.deepEqual(fields.map((field) => field.key).sort(), ktpFields.map((field) => field.key).sort())
  assert.ok(ktpQuizSteps.every((step) => (step.details || []).every((field) => !field.required)))
})

test('no defaults or skipped required steps; back retains custom count and all values', () => {
  const quiz = useKtpQuiz()
  assert.ok(Object.values(quiz.answers).every((value) => value === ''))
  assert.equal(quiz.moveStep(1), false)
  for (const value of ['0', '-1', '2.5', 'Infinity', '1e2']) {
    quiz.answers.transformerCount = value
    quiz.answers.housingMaterial = 'Металл'
    assert.equal(quiz.moveStep(1), false)
  }
  quiz.answers.transformerCount = '3'
  assert.equal(quiz.currentStep.value, 0)
  assert.equal(quiz.moveStep(1), true)
  assert.equal(quiz.moveStep(1), false)
  quiz.moveStep(-1)
  assert.equal(quiz.answers.transformerCount, '3')
  assert.equal(quiz.answers.housingMaterial, 'Металл')
})

test('submission preserves engineering labels, optional values and numeric strings in existing API contract', async () => {
  let sent
  const quiz = useKtpQuiz(async (url, options) => { sent = { url, ...options }; return { ok: true } })
  complete(quiz)
  quiz.answers.hvSwitchgearQuantity = '3'
  quiz.answers.airInputDisconnector = 'Нужно определить'
  assert.equal(quiz.progress.value, 100)
  assert.equal(await quiz.submit(), true)
  assert.equal(sent.url, '/api/lead')
  assert.equal(sent.body.product, 'КТП')
  assert.equal(sent.body.type, 'equipment')
  assert.equal(sent.body.consentVersion, '2026-07-13')
  assert.equal(sent.body.name, 'Тест')
  assert.equal(sent.body.location, 'Москва')
  assert.equal(sent.retry, 0)
  assert.deepEqual(sent.body.answers, quiz.summary.value)
  assert.ok(sent.body.answers.every((answer) => typeof answer.value === 'string'))
  assert.deepEqual(sent.body.answers.find((answer) => answer.label === 'Количество аппаратов на стороне ВН, шт.'), { label: 'Количество аппаратов на стороне ВН, шт.', value: '3' })
})

test('invalid contacts or modified required answers cannot be sent; phone remains optional', async () => {
  let calls = 0
  const quiz = useKtpQuiz(async () => { calls++; return { ok: true } })
  complete(quiz)
  for (const invalid of [{ name: ' ' }, { name: 'а'.repeat(81) }, { email: 'test@' }, { location: ' ' }, { phone: '+7 (999)' }, { consent: false }]) {
    const valid = { ...quiz.contact }
    Object.assign(quiz.contact, invalid)
    assert.equal(await quiz.submit(), false)
    Object.assign(quiz.contact, valid)
  }
  quiz.answers.outgoingLines = '   '
  assert.equal(await quiz.submit(), false)
  assert.equal(calls, 0)
})

test('pending request blocks resubmission, navigation and reset; only explicit acknowledgement succeeds', async () => {
  let resolve
  let calls = 0
  const quiz = useKtpQuiz(() => { calls++; return new Promise((done) => { resolve = done }) })
  complete(quiz)
  const pending = quiz.submit()
  assert.equal(quiz.isSubmitting.value, true)
  assert.equal(await quiz.submit(), false)
  assert.equal(quiz.moveStep(-1), false)
  quiz.reset()
  assert.equal(quiz.currentStep.value, 6)
  resolve({ ok: true })
  assert.equal(await pending, true)
  assert.equal(await quiz.submit(), false)
  assert.equal(calls, 1)
  quiz.reset()
  assert.equal(quiz.currentStep.value, 0)
  assert.equal(quiz.contact.consent, false)
  assert.ok(Object.values(quiz.answers).every((value) => value === ''))
})

for (const failure of [new TypeError('Network error'), { statusCode: 429 }, { status: 500 }, null]) {
  test(`failed submission (${failure?.statusCode || failure?.status || failure?.message || 'ok: false'}) retains data for retry`, async () => {
    let fail = true
    const quiz = useKtpQuiz(async () => {
      if (!fail) return { ok: true }
      if (failure) throw failure
      return { ok: false }
    })
    complete(quiz)
    const before = JSON.stringify({ answers: quiz.answers, contact: quiz.contact })
    assert.equal(await quiz.submit(), false)
    assert.equal(quiz.errorMessage.value.includes('15 минут'), failure?.statusCode === 429)
    assert.equal(JSON.stringify({ answers: quiz.answers, contact: quiz.contact }), before)
    fail = false
    assert.equal(await quiz.submit(), true)
  })
}
