import { computed, reactive, ref } from 'vue'
import { ktpFields, ktpQuizSteps as steps } from '../assets/data/ktpQuiz.js'

const emptyContact = () => ({ name: '', organization: '', phone: '', email: '', location: '', comment: '', consent: false })
const emptyAnswers = () => Object.fromEntries(ktpFields.map((field) => [field.key, '']))
const phonePattern = /^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/

export function useKtpQuiz(request) {
  const currentStep = ref(0)
  const answers = reactive(emptyAnswers())
  const contact = reactive(emptyContact())
  const submitState = ref('idle')
  const errorMessage = ref('')
  const totalSteps = steps.length + 1
  const activeStep = computed(() => steps[currentStep.value])
  const isContactStep = computed(() => currentStep.value === steps.length)
  const isSubmitting = computed(() => submitState.value === 'pending')
  const progress = computed(() => ((currentStep.value + 1) / totalSteps) * 100)

  function validField(field) {
    const value = String(answers[field.key] ?? '').trim()
    if (!value) return !field.required
    if (field.type === 'select') return field.options.includes(value)
    if (field.type === 'number') return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) >= (field.key === 'transformerCount' ? 1 : 0)
    return value.length <= (field.type === 'textarea' ? 1500 : 300)
  }

  const canContinue = computed(() => Boolean(activeStep.value && [...activeStep.value.fields, ...(activeStep.value.details || [])].every(validField)))
  const summary = computed(() => ktpFields
    .map((field) => ({ label: field.label, value: String(answers[field.key] ?? '').trim() }))
    .filter((answer) => answer.value))

  function moveStep(direction) {
    if (isSubmitting.value || submitState.value === 'success' || ![-1, 1].includes(direction)) return false
    if (direction === 1 && !canContinue.value) return false
    const next = currentStep.value + direction
    if (next < 0 || next >= totalSteps) return false
    currentStep.value = next
    errorMessage.value = ''
    submitState.value = 'idle'
    return true
  }

  async function submit() {
    if (isSubmitting.value || submitState.value === 'success' || !isContactStep.value || !ktpFields.every(validField)) return false
    if (contact.name.trim().length < 2 || contact.name.trim().length > 80
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) || contact.email.length > 254
      || contact.location.trim().length < 2 || contact.location.trim().length > 180
      || (contact.phone && !phonePattern.test(contact.phone))
      || contact.organization.length > 160 || contact.comment.length > 3000 || contact.consent !== true) return false

    submitState.value = 'pending'
    errorMessage.value = ''
    try {
      const response = await request('/api/lead', {
        method: 'POST', retry: 0, timeout: 20000,
        body: {
          type: 'equipment', product: 'КТП', name: contact.name.trim(),
          organization: contact.organization.trim(), contact: contact.phone,
          email: contact.email.trim(), location: contact.location.trim(),
          comment: contact.comment.trim() || undefined, answers: summary.value,
          consent: true, consentVersion: '2026-07-13',
        },
      })
      if (response?.ok !== true) throw new Error('Lead was not acknowledged')
      submitState.value = 'success'
      return true
    } catch (error) {
      const status = error?.statusCode || error?.status || error?.response?.status
      errorMessage.value = status === 429
        ? 'Слишком много попыток. Попробуйте через 15 минут или позвоните нам. Введённые данные сохранены.'
        : 'Не удалось подтвердить отправку. Введённые данные сохранены — попробуйте ещё раз или позвоните нам.'
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

  return { steps, currentStep, activeStep, totalSteps, progress, answers, contact, summary, canContinue,
    isContactStep, isSubmitting, submitState, errorMessage, moveStep, submit, reset }
}
