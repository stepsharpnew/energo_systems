<template>
  <section class="request-card" aria-labelledby="equipment-request-title">
    <div class="request-heading">
      <div>
        <p class="request-kicker">Заявка на подбор</p>
        <h2 id="equipment-request-title">Уточним параметры {{ equipment.name }}</h2>
        <p>
          {{ isTechnicalQuestionnaire
            ? 'Ответьте на технические вопросы — данные попадут инженеру в структурированном виде.'
            : 'Опишите объект и задачу. Инженер свяжется с вами для уточнения комплектации.' }}
        </p>
      </div>

      <a
        v-if="equipment.questionnaireFile"
        class="download-link"
        :href="equipment.questionnaireFile"
        download
      >
        <span aria-hidden="true">DOCX</span>
        Скачать опросный лист
      </a>
    </div>

    <div v-if="isTechnicalQuestionnaire" class="stepper" aria-label="Этапы анкеты">
      <div class="stepper-meta">
        <span>Шаг {{ currentStep + 1 }} из {{ totalSteps }}</span>
        <strong>{{ currentStepTitle }}</strong>
      </div>
      <div class="stepper-track" aria-hidden="true">
        <span :style="{ width: `${progress}%` }" />
      </div>
      <ol>
        <li
          v-for="(step, index) in questionnaire.steps"
          :key="step.title"
          :class="{ active: index === currentStep, complete: index < currentStep }"
        >
          <span>{{ index + 1 }}</span>
          <span>{{ step.title }}</span>
        </li>
        <li :class="{ active: isContactStep }">
          <span>{{ questionnaire.steps.length + 1 }}</span>
          <span>Контакты</span>
        </li>
      </ol>
    </div>

    <div v-if="submitState === 'success'" class="success-state" role="status" aria-live="polite" tabindex="-1" ref="successPanel">
      <span class="success-mark" aria-hidden="true">✓</span>
      <div>
        <h3>Заявка отправлена</h3>
        <p>Спасибо. Мы получили параметры и свяжемся с вами по указанным контактам.</p>
        <button type="button" @click="resetForm">Отправить ещё одну заявку</button>
      </div>
    </div>

    <form v-else ref="requestForm" class="request-form" @submit.prevent="submitRequest">
      <fieldset
        v-if="isTechnicalQuestionnaire && !isContactStep"
        ref="technicalStep"
        class="form-section"
      >
        <legend>{{ activeTechnicalStep.title }}</legend>
        <p v-if="activeTechnicalStep.description" class="section-description">
          {{ activeTechnicalStep.description }}
        </p>

        <div class="field-grid">
          <label
            v-for="field in activeTechnicalStep.fields"
            :key="field.key"
            class="field"
            :class="{ wide: field.type === 'textarea' }"
          >
            <span>{{ field.label }}<b v-if="field.required" aria-hidden="true"> *</b></span>
            <textarea
              v-if="field.type === 'textarea'"
              v-model.trim="answers[field.key]"
              :name="field.key"
              autocomplete="off"
              :required="field.required"
              :placeholder="field.placeholder || 'Укажите данные'"
              rows="4"
              maxlength="1500"
            />
            <select
              v-else-if="field.type === 'select'"
              v-model="answers[field.key]"
              :name="field.key"
              autocomplete="off"
              :required="field.required"
            >
              <option value="">Выберите вариант</option>
              <option v-for="option in field.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <input
              v-else
              v-model.trim="answers[field.key]"
              :name="field.key"
              autocomplete="off"
              :type="field.type === 'number' ? 'number' : 'text'"
              :required="field.required"
              :placeholder="field.placeholder || 'Введите значение'"
              :min="field.type === 'number' ? '0' : undefined"
              maxlength="300"
            >
          </label>
        </div>
      </fieldset>

      <fieldset v-else class="form-section contact-section">
        <legend>{{ isTechnicalQuestionnaire ? 'Контактные данные и объект' : 'Расскажите о задаче' }}</legend>
        <p class="section-description">
          Поля со звёздочкой обязательны. Заявка уйдёт напрямую в отдел продаж.
        </p>

        <div class="field-grid">
          <label class="field">
            <span>Имя<b aria-hidden="true"> *</b></span>
            <input v-model.trim="contact.name" name="name" type="text" required minlength="2" maxlength="80" autocomplete="name" placeholder="Как к вам обращаться…">
          </label>

          <label class="field">
            <span>Организация <em>необязательно</em></span>
            <input v-model.trim="contact.organization" name="organization" type="text" maxlength="160" autocomplete="organization" placeholder="Название компании…">
          </label>

          <label class="field">
            <span>Телефон <em>необязательно</em></span>
            <input
              :value="contact.phone"
              name="phone"
              type="tel"
              maxlength="18"
              autocomplete="tel"
              inputmode="tel"
              pattern="\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}"
              placeholder="Например, +7 (495)-178-01-18"
              @input="onPhoneInput"
              @keydown="handlePhoneKeydown"
            >
          </label>

          <label class="field">
            <span>Email<b aria-hidden="true"> *</b></span>
            <input v-model.trim="contact.email" name="email" type="email" required maxlength="254" autocomplete="email" spellcheck="false" placeholder="Например, name@company.ru">
          </label>

          <label class="field wide">
            <span>Регион или город объекта<b aria-hidden="true"> *</b></span>
            <input v-model.trim="contact.location" name="location" type="text" required minlength="2" maxlength="180" autocomplete="address-level2" placeholder="Например, Московская область, Солнечногорск…">
          </label>

          <label class="field wide">
            <span>{{ isTechnicalQuestionnaire ? 'Дополнительные требования' : 'Описание задачи и техническое задание' }}<b v-if="!isTechnicalQuestionnaire" aria-hidden="true"> *</b></span>
            <textarea
              v-model.trim="contact.comment"
              name="comment"
              :required="!isTechnicalQuestionnaire"
              rows="5"
              maxlength="3000"
              :placeholder="isTechnicalQuestionnaire
                ? 'Особенности объекта, присоединения, доставки и другие данные'
                : 'Назначение оборудования, известные параметры, количество и особенности объекта'"
            />
          </label>
        </div>

        <label class="consent-field">
          <input v-model="contact.consent" name="consent" type="checkbox" required>
          <span>
            Даю ООО «Энергосистемы»
            <NuxtLink to="/personal-data-consent" target="_blank">согласие на обработку персональных данных</NuxtLink>
            для ответа на заявку.
          </span>
        </label>
        <p class="privacy-note">
          Порядок обработки описан в
          <NuxtLink to="/privacy" target="_blank">политике обработки персональных данных</NuxtLink>.
        </p>
      </fieldset>

      <p v-if="submitState === 'error'" class="form-error" role="alert" aria-live="assertive">
        Не удалось отправить заявку. Позвоните нам или попробуйте ещё раз немного позже.
      </p>

      <div class="form-actions">
        <button
          v-if="isTechnicalQuestionnaire && currentStep > 0"
          class="back-button"
          type="button"
          @click="previousStep"
        >
          Назад
        </button>
        <button
          v-if="isTechnicalQuestionnaire && !isContactStep"
          class="submit-button"
          type="button"
          @click="nextStep"
        >
          Следующий шаг
          <span aria-hidden="true">→</span>
        </button>
        <button
          v-else
          class="submit-button"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Отправляем…' : 'Отправить заявку' }}
          <span v-if="!isSubmitting" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { handlePhoneInput, handlePhoneKeydown } from '~/utils/phoneFormatter'

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  questionnaire: {
    type: Object,
    default: null,
  },
})

const consentVersion = '2026-07-13'
const currentStep = ref(0)
const requestForm = ref(null)
const technicalStep = ref(null)
const successPanel = ref(null)
const answers = reactive({})
const isSubmitting = ref(false)
const submitState = ref('idle')
const contact = reactive({
  name: '',
  organization: '',
  phone: '',
  email: '',
  location: '',
  comment: '',
  consent: false,
})

const isTechnicalQuestionnaire = computed(() => Boolean(props.questionnaire?.steps?.length))
const totalSteps = computed(() => isTechnicalQuestionnaire.value ? props.questionnaire.steps.length + 1 : 1)
const isContactStep = computed(() => !isTechnicalQuestionnaire.value || currentStep.value === props.questionnaire.steps.length)
const activeTechnicalStep = computed(() => props.questionnaire?.steps?.[currentStep.value] || { title: '', fields: [] })
const currentStepTitle = computed(() => isContactStep.value ? 'Контакты и объект' : activeTechnicalStep.value.title)
const progress = computed(() => ((currentStep.value + 1) / totalSteps.value) * 100)

const initializeAnswers = () => {
  props.questionnaire?.steps
    ?.flatMap((step) => step.fields)
    .forEach((field) => {
      answers[field.key] = ''
    })
}

initializeAnswers()

const focusSection = () => {
  nextTick(() => {
    document.querySelector('#equipment-request')?.scrollIntoView({ behavior: 'auto', block: 'start' })
    const firstField = requestForm.value?.querySelector('input, select, textarea')
    firstField?.focus({ preventScroll: true })
  })
}

const nextStep = () => {
  const fields = technicalStep.value?.querySelectorAll('input, select, textarea') || []
  const invalidField = Array.from(fields).find((field) => !field.checkValidity())

  if (invalidField) {
    invalidField.reportValidity()
    invalidField.focus()
    return
  }

  currentStep.value += 1
  submitState.value = 'idle'
  focusSection()
}

const previousStep = () => {
  currentStep.value = Math.max(0, currentStep.value - 1)
  submitState.value = 'idle'
  focusSection()
}

const onPhoneInput = (event) => {
  handlePhoneInput(event, (value) => {
    contact.phone = value
  })
}

const buildAnswers = () => {
  if (!isTechnicalQuestionnaire.value) return []

  return props.questionnaire.steps.flatMap((step) => step.fields)
    .map((field) => ({
      label: field.label,
      value: answers[field.key],
    }))
    .filter((answer) => answer.value !== undefined && answer.value !== null && answer.value !== '')
}

const submitRequest = async () => {
  if (!requestForm.value?.checkValidity()) {
    requestForm.value?.reportValidity()
    return
  }

  isSubmitting.value = true
  submitState.value = 'idle'

  try {
    await $fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        type: 'equipment',
        product: props.equipment.name,
        name: contact.name,
        organization: contact.organization,
        contact: contact.phone,
        email: contact.email,
        location: contact.location,
        comment: contact.comment || undefined,
        answers: buildAnswers(),
        consent: contact.consent,
        consentVersion,
      },
    })

    submitState.value = 'success'
    nextTick(() => successPanel.value?.focus())
  } catch (error) {
    console.error('Ошибка отправки заявки на оборудование:', error)
    submitState.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.keys(answers).forEach((key) => delete answers[key])
  initializeAnswers()
  Object.assign(contact, {
    name: '',
    organization: '',
    phone: '',
    email: '',
    location: '',
    comment: '',
    consent: false,
  })
  currentStep.value = 0
  submitState.value = 'idle'
}
</script>

<style scoped>
.request-card {
  scroll-margin-top: 82px;
  padding: clamp(24px, 4vw, 52px);
  border: 1px solid #cbd9e3;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(16, 34, 52, 0.1);
}

.request-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 28px;
  padding-bottom: 26px;
  border-bottom: 1px solid #dbe5ec;
}

.request-kicker {
  margin: 0 0 8px;
  color: #f05a28;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h2,
h3,
p {
  margin-top: 0;
}

h2 {
  max-width: 700px;
  margin-bottom: 10px;
  color: #102234;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.08;
  text-wrap: balance;
}

.request-heading p:not(.request-kicker) {
  max-width: 720px;
  margin-bottom: 0;
  color: #647789;
  line-height: 1.65;
}

.download-link {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid #b9ccda;
  border-radius: 8px;
  color: #102234;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
}

.download-link span {
  padding: 5px 7px;
  border-radius: 4px;
  background: #eaf2f7;
  color: #2d7aac;
  font-size: 10px;
  letter-spacing: 0.08em;
}

.stepper {
  margin: 30px 0;
  padding: 20px;
  border-radius: 12px;
  background: #102234;
  color: #fff;
}

.stepper-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
}

.stepper-meta span {
  color: #a9c0d2;
}

.stepper-track {
  height: 4px;
  overflow: hidden;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.16);
}

.stepper-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #f05a28;
  transition: width 0.25s ease;
}

.stepper ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
  gap: 12px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.stepper li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #91a8ba;
  font-size: 12px;
  font-weight: 700;
}

.stepper li > span:first-child {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 50%;
  font-size: 11px;
}

.stepper li.active,
.stepper li.complete {
  color: #fff;
}

.stepper li.active > span:first-child {
  border-color: #f05a28;
  background: #f05a28;
}

.stepper li.complete > span:first-child {
  border-color: #4d90bd;
  background: #2d7aac;
}

.request-form {
  padding-top: 30px;
}

.stepper + .request-form {
  padding-top: 0;
}

.form-section {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.form-section legend {
  margin-bottom: 8px;
  padding: 0;
  color: #102234;
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 900;
}

.section-description {
  margin-bottom: 24px;
  color: #647789;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.field {
  min-width: 0;
  display: grid;
  gap: 8px;
  color: #253d50;
  font-size: 14px;
  font-weight: 800;
}

.field.wide {
  grid-column: 1 / -1;
}

.field b {
  color: #f05a28;
}

.field em {
  margin-left: 5px;
  color: #708496;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 50px;
  padding: 13px 14px;
  border: 1px solid #bfcfda;
  border-radius: 8px;
  outline: none;
  background: #fbfcfd;
  color: #102234;
  font: inherit;
  font-weight: 500;
  overflow-wrap: anywhere;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.field select {
  appearance: auto;
  padding-right: 34px;
}

.field textarea {
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #2d7aac;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(45, 122, 172, 0.14);
}

.consent-field {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 24px;
  color: #42596b;
  font-size: 14px;
  line-height: 1.5;
}

.consent-field input {
  width: 20px;
  height: 20px;
  margin: 1px 0 0;
  accent-color: #2d7aac;
}

.consent-field a,
.privacy-note a {
  color: #1f6797;
  font-weight: 800;
}

.privacy-note {
  margin: 8px 0 0 32px;
  color: #748594;
  font-size: 13px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #e0e8ee;
}

.submit-button,
.back-button {
  min-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 22px;
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
}

.submit-button {
  border: 1px solid #f05a28;
  background: #f05a28;
  color: #fff;
}

.submit-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.back-button {
  border: 1px solid #b9cbd8;
  background: #fff;
  color: #102234;
}

.submit-button:not(:disabled):hover {
  background: #d94b1e;
}

.back-button:hover,
.download-link:hover {
  border-color: #2d7aac;
  color: #1f6797;
}

.submit-button:focus-visible,
.back-button:focus-visible,
.download-link:focus-visible,
.success-state button:focus-visible {
  outline: 3px solid rgba(45, 122, 172, 0.28);
  outline-offset: 3px;
}

.form-error {
  margin: 24px 0 0;
  padding: 14px 16px;
  border-left: 4px solid #b8352e;
  background: #fff2f1;
  color: #8c2721;
}

.success-state {
  display: flex;
  gap: 18px;
  margin-top: 30px;
  padding: 28px;
  border: 1px solid #badbc7;
  border-radius: 12px;
  outline: none;
  background: #f0faf4;
}

.success-state:focus-visible {
  outline: 3px solid rgba(35, 134, 76, 0.28);
  outline-offset: 4px;
}

.submit-button,
.back-button,
.download-link,
.success-state button {
  touch-action: manipulation;
}

.success-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #23864c;
  color: #fff;
  font-size: 24px;
  font-weight: 900;
}

.success-state h3 {
  margin-bottom: 6px;
  color: #102234;
  font-size: 24px;
}

.success-state p {
  margin-bottom: 16px;
  color: #486151;
}

.success-state button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #1f6797;
  font-weight: 900;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 760px) {
  .request-card {
    border-radius: 12px;
  }

  .request-heading,
  .stepper-meta {
    flex-direction: column;
  }

  .download-link {
    width: 100%;
    justify-content: center;
  }

  .stepper ol {
    grid-template-columns: 1fr 1fr;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .field.wide {
    grid-column: auto;
  }
}

@media (max-width: 480px) {
  .request-card {
    padding: 22px 16px;
  }

  .stepper {
    margin-inline: -4px;
    padding: 16px;
  }

  .stepper li > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .submit-button,
  .back-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stepper-track span,
  .field input,
  .field select,
  .field textarea {
    transition: none;
  }
}
</style>
