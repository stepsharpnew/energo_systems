import test from 'node:test'
import assert from 'node:assert/strict'
import { useGeneratorQuiz } from '../composables/useGeneratorQuiz.js'
import { formatPhoneNumber } from '../utils/phoneFormatter.js'

function completeQuiz(quiz) {
  quiz.selectOption('heating')
  quiz.selectOption('lights')
  assert.equal(quiz.moveStep(1), true)
  quiz.selectOption('100-200')
  quiz.moveStep(1)
  quiz.selectOption('help')
  quiz.moveStep(1)
  quiz.selectOption('month')
  quiz.moveStep(1)
  Object.assign(quiz.contact, { name: '  Тест  ', phone: formatPhoneNumber('89991234567'), consent: true })
}

test('empty steps cannot advance; progress and back navigation preserve choices', () => {
  const quiz = useGeneratorQuiz()
  assert.equal(quiz.progress.value, 20)
  assert.equal(quiz.canContinue.value, false)
  assert.equal(quiz.moveStep(1), false)
  assert.equal(quiz.moveStep(-1), false)
  quiz.selectOption('lights')
  quiz.selectOption('heating')
  assert.equal(quiz.currentStep.value, 0)
  quiz.moveStep(1)
  assert.equal(quiz.progress.value, 40)
  assert.equal(quiz.moveStep(1), false)
  quiz.selectOption('100-200')
  quiz.moveStep(-1)
  assert.deepEqual(quiz.answers.loads, ['lights', 'heating'])
  quiz.moveStep(1)
  assert.equal(quiz.answers.area, '100-200')
})

test('whole house is exclusive in both directions; toggling off the final option disables next', () => {
  const quiz = useGeneratorQuiz()
  quiz.selectOption('lights')
  quiz.selectOption('heating')
  quiz.selectOption('whole-house')
  assert.deepEqual(quiz.answers.loads, ['whole-house'])
  quiz.selectOption('water')
  quiz.selectOption('water')
  assert.deepEqual(quiz.answers.loads, ['water'])
  quiz.selectOption('water', false)
  assert.equal(quiz.canContinue.value, false)
})

test('single choice replaces the previous one; summary and request contain human-readable answers', async () => {
  let sent
  const quiz = useGeneratorQuiz(async (url, options) => { sent = { url, ...options }; return { ok: true, requestId: 'test' } })
  completeQuiz(quiz)
  quiz.moveStep(-1)
  quiz.selectOption('exploring')
  quiz.moveStep(1)
  assert.equal(quiz.progress.value, 100)
  assert.equal(await quiz.submit(), true)
  assert.equal(sent.url, '/api/lead')
  assert.equal(sent.retry, 0)
  assert.equal(sent.body.type, 'equipment')
  assert.equal(sent.body.name, 'Тест')
  assert.equal(sent.body.contact, '+7 (999)-123-45-67')
  assert.equal(sent.body.product, 'Подбор генератора — резервное питание')
  assert.equal(sent.body.consentVersion, '2026-07-13')
  assert.deepEqual(sent.body.answers, [
    { label: 'Что должно работать при отключении света?', value: ['Свет и розетки', 'Котёл отопления и насосы'] },
    { label: 'Какая площадь дома?', value: '100–200 м²' },
    { label: 'На каком топливе удобнее?', value: 'Подберите самый выгодный' },
    { label: 'Когда нужна установка?', value: 'Пока изучаю варианты' },
  ])
})

test('invalid contact or missing consent never submits', async () => {
  let calls = 0
  const quiz = useGeneratorQuiz(async () => { calls++; return { ok: true } })
  completeQuiz(quiz)
  for (const invalid of [{ name: ' А ' }, { name: 'а'.repeat(81) }, { phone: '+7 (999)' }, { consent: false }]) {
    const valid = { ...quiz.contact }
    Object.assign(quiz.contact, invalid)
    assert.equal(await quiz.submit(), false)
    Object.assign(quiz.contact, valid)
  }
  assert.equal(calls, 0)
})

test('pending submission blocks duplicate sends and navigation; success prevents resubmission', async () => {
  let resolveRequest
  let calls = 0
  const quiz = useGeneratorQuiz(() => { calls++; return new Promise((resolve) => { resolveRequest = resolve }) })
  completeQuiz(quiz)
  const pending = quiz.submit()
  assert.equal(quiz.isSubmitting.value, true)
  assert.equal(await quiz.submit(), false)
  assert.equal(quiz.moveStep(-1), false)
  quiz.reset()
  assert.equal(quiz.currentStep.value, 4)
  resolveRequest({ ok: true })
  assert.equal(await pending, true)
  assert.equal(await quiz.submit(), false)
  assert.equal(calls, 1)
})

for (const scenario of [
  { name: 'network failure', error: new TypeError('Failed to fetch'), limited: false },
  { name: 'HTTP 500', error: { statusCode: 500 }, limited: false },
  { name: 'HTTP 429', error: { response: { status: 429 } }, limited: true },
  { name: 'negative acknowledgement', response: { ok: false }, limited: false },
  { name: 'missing acknowledgement', response: undefined, limited: false },
]) {
  test(`${scenario.name} preserves answers and contacts and allows retry`, async () => {
    let fails = true
    const quiz = useGeneratorQuiz(async () => {
      if (!fails) return { ok: true }
      if (scenario.error) throw scenario.error
      return scenario.response
    })
    completeQuiz(quiz)
    const answers = structuredClone(JSON.parse(JSON.stringify(quiz.answers)))
    const contact = { ...quiz.contact }
    assert.equal(await quiz.submit(), false)
    assert.equal(quiz.submitState.value, 'error')
    assert.equal(quiz.errorMessage.value.includes('15 минут'), scenario.limited)
    assert.deepEqual(quiz.answers, answers)
    assert.deepEqual(quiz.contact, contact)
    fails = false
    assert.equal(await quiz.submit(), true)
    assert.equal(quiz.errorMessage.value, '')
  })
}

test('restart clears every answer, personal data and consent', async () => {
  const quiz = useGeneratorQuiz(async () => ({ ok: true }))
  completeQuiz(quiz)
  await quiz.submit()
  quiz.reset()
  assert.deepEqual(quiz.answers, { loads: [], area: '', fuel: '', timing: '' })
  assert.deepEqual(quiz.contact, { name: '', phone: '', consent: false })
  assert.equal(quiz.submitState.value, 'idle')
  assert.equal(quiz.currentStep.value, 0)
  assert.equal(quiz.progress.value, 20)
})
