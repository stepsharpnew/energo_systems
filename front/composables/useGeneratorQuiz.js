import { computed, reactive, ref } from 'vue'
import { generatorQuizQuestions as questions } from '../assets/data/generatorQuiz.js'

const emptyAnswers = () => Object.fromEntries(questions.map((question) => [question.id, question.multiple ? [] : '']))
const emptyContact = () => ({ name: '', phone: '', consent: false })

export function useGeneratorQuiz(request) {
  const currentStep = ref(0)
  const answers = reactive(emptyAnswers())
  const contact = reactive(emptyContact())
  const submitState = ref('idle')
  const errorMessage = ref('')
  const totalSteps = questions.length + 1
  const activeQuestion = computed(() => questions[currentStep.value])
  const isContactStep = computed(() => currentStep.value === questions.length)
  const isSubmitting = computed(() => submitState.value === 'pending')
  const progress = computed(() => ((currentStep.value + 1) / totalSteps) * 100)
  const isAnswered = (question) => question.multiple
    ? answers[question.id].length > 0
    : Boolean(answers[question.id])
  const canContinue = computed(() => Boolean(activeQuestion.value && isAnswered(activeQuestion.value)))
  const summary = computed(() => questions.map((question) => {
    const selected = question.options.filter((option) => question.multiple
      ? answers[question.id].includes(option.id)
      : answers[question.id] === option.id)
    return {
      label: question.title,
      value: question.multiple ? selected.map((option) => option.label) : selected[0]?.label || '',
    }
  }))

  function selectOption(optionId, checked = true) {
    const question = activeQuestion.value
    if (!question || isSubmitting.value || !question.options.some((option) => option.id === optionId)) return
    if (!question.multiple) {
      answers[question.id] = optionId
    } else if (!checked) {
      answers[question.id] = answers[question.id].filter((id) => id !== optionId)
    } else if (optionId === question.exclusiveOption) {
      answers[question.id] = [optionId]
    } else {
      answers[question.id] = [...new Set([
        ...answers[question.id].filter((id) => id !== question.exclusiveOption),
        optionId,
      ])]
    }
  }

  function moveStep(direction) {
    if (isSubmitting.value || submitState.value === 'success') return false
    if (direction === 1 && !canContinue.value) return false
    const next = currentStep.value + direction
    if (next < 0 || next >= totalSteps) return false
    currentStep.value = next
    submitState.value = 'idle'
    errorMessage.value = ''
    return true
  }

  async function submit() {
    if (isSubmitting.value || submitState.value === 'success' || !isContactStep.value) return false
    if (!questions.every(isAnswered) || contact.name.trim().length < 2 || contact.name.trim().length > 80
      || !/^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(contact.phone) || contact.consent !== true) return false

    submitState.value = 'pending'
    errorMessage.value = ''
    try {
      const response = await request('/api/lead', {
        method: 'POST',
        retry: 0,
        timeout: 20000,
        body: {
          type: 'equipment',
          product: 'Подбор генератора — резервное питание',
          name: contact.name.trim(),
          contact: contact.phone,
          answers: summary.value,
          consent: true,
          consentVersion: '2026-07-13',
        },
      })
      if (response?.ok !== true) throw new Error('Lead was not acknowledged')
      submitState.value = 'success'
      return true
    } catch (error) {
      const status = error?.statusCode || error?.status || error?.response?.status
      errorMessage.value = status === 429
        ? 'Слишком много попыток отправки. Ответы сохранены — попробуйте через 15 минут или позвоните нам.'
        : 'Не удалось подтвердить отправку заявки. Ответы сохранены — попробуйте ещё раз или позвоните нам.'
      submitState.value = 'error'
      return false
    }
  }

  function reset() {
    if (isSubmitting.value) return
    Object.assign(answers, emptyAnswers())
    Object.assign(contact, emptyContact())
    currentStep.value = 0
    submitState.value = 'idle'
    errorMessage.value = ''
  }

  return {
    questions, currentStep, answers, contact, totalSteps, activeQuestion, isContactStep,
    isSubmitting, progress, canContinue, summary, submitState, errorMessage,
    selectOption, moveStep, submit, reset,
  }
}
