<template>
  <section class="ktp-quiz" aria-labelledby="ktp-quiz-title">
    <header class="ktp-intro">
      <div>
        <p class="ktp-eyebrow">Подбор оборудования</p>
        <h2 id="ktp-quiz-title">КТП под ваш объект</h2>
        <p class="ktp-intro-copy">Укажите параметры — инженер подготовит предложение.</p>
      </div>
      <a v-if="questionnaireFile" class="ktp-download" :href="questionnaireFile" download>
        Опросный лист <span>DOCX</span>
        <VIcon :icon="icons.arrowdown" size="17" aria-hidden="true" />
      </a>
    </header>

    <div ref="quizFrame" class="ktp-frame">
      <div class="ktp-card">
        <div class="ktp-progress" role="progressbar" aria-label="Прогресс подбора КТП" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100" :aria-valuetext="`Шаг ${currentStep + 1} из ${totalSteps}`">
          <span :style="{ width: `${progress}%` }" />
        </div>

        <div v-if="submitState === 'success'" class="ktp-success" role="status">
          <span class="ktp-success-icon"><VIcon :icon="icons.success" size="32" aria-hidden="true" /></span>
          <h3 ref="stepHeading" tabindex="-1">Параметры КТП отправлены</h3>
          <p>Инженер изучит вашу заявку и свяжется с вами, чтобы уточнить комплектацию.</p>
          <button class="ktp-primary" type="button" @click="startAgain">Подобрать ещё одну КТП</button>
        </div>

        <form v-else ref="quizForm" class="ktp-form" :aria-busy="isSubmitting" novalidate @submit.prevent="handleSubmit">
          <header class="ktp-step-heading">
            <h3 id="ktp-step-title" ref="stepHeading" tabindex="-1">{{ isContactStep ? 'Куда отправить предложение?' : activeStep.title }}</h3>
            <p>{{ isContactStep ? 'Проверьте параметры и оставьте контакты для связи.' : activeStep.description }}</p>
          </header>

          <div v-if="!isContactStep" :key="currentStep" class="ktp-step-body" aria-labelledby="ktp-step-title">
            <div class="ktp-fields">
              <EquipmentQuizField v-for="field in activeStep.fields" :key="field.key" v-model="answers[field.key]" :field="field" />
            </div>
            <details v-if="activeStep.details" class="ktp-details">
              <summary>
                <span>{{ activeStep.detailsTitle }}<small>Необязательно{{ detailsCount ? ` · заполнено ${detailsCount}` : '' }}</small></span>
                <VIcon class="ktp-chevron" :icon="icons.dropdown" size="21" aria-hidden="true" />
              </summary>
              <div class="ktp-extra-fields">
                <EquipmentQuizField v-for="field in activeStep.details" :key="field.key" v-model="answers[field.key]" :field="field" compact />
              </div>
            </details>
          </div>

          <div v-else class="ktp-contact-layout">
            <aside class="ktp-summary" aria-labelledby="ktp-summary-title">
              <div class="ktp-summary-heading"><h4 id="ktp-summary-title">Ваша конфигурация</h4><span>КТП</span></div>
              <dl>
                <div><dt>Исполнение</dt><dd>{{ answers.transformerCount }} {{ transformerWord }} · {{ answers.housingMaterial }}</dd></div>
                <div><dt>Трансформатор</dt><dd>{{ answers.transformerType }} · {{ answers.transformerPower }}{{ answers.transformerPower === 'Другая' ? ' мощность' : ' кВА' }}</dd></div>
                <div><dt>Напряжение ВН / НН</dt><dd>{{ answers.hvVoltage }} / {{ answers.lvVoltage }} кВ</dd></div>
                <div><dt>Схема</dt><dd>{{ answers.stationCircuit }}</dd></div>
              </dl>
              <details class="ktp-all-answers">
                <summary>Все параметры ({{ summary.length }}) <VIcon :icon="icons.dropdown" size="18" aria-hidden="true" /></summary>
                <dl><div v-for="answer in summary" :key="answer.label"><dt>{{ answer.label }}</dt><dd>{{ answer.value }}</dd></div></dl>
              </details>
            </aside>

            <fieldset class="ktp-contact" :disabled="isSubmitting" aria-label="Контактные данные">
              <div class="ktp-contact-grid">
                <label class="ktp-input"><span>Имя</span><input ref="nameInput" v-model="contact.name" name="name" type="text" required minlength="2" maxlength="80" autocomplete="name" placeholder="Как к вам обращаться" @input="$event.target.setCustomValidity('')"></label>
                <label class="ktp-input"><span>Email</span><input ref="emailInput" v-model.trim="contact.email" name="email" type="email" required maxlength="254" autocomplete="email" spellcheck="false" placeholder="name@company.ru" @input="$event.target.setCustomValidity('')"></label>
                <label class="ktp-input"><span>Телефон <em>необязательно</em></span><input :value="contact.phone" name="phone" type="tel" maxlength="18" autocomplete="tel" inputmode="tel" pattern="\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}" placeholder="+7 (999)-123-45-67" @input="onPhoneInput" @keydown="handlePhoneKeydown"></label>
                <label class="ktp-input"><span>Город или регион объекта</span><input ref="locationInput" v-model="contact.location" name="location" type="text" required minlength="2" maxlength="180" autocomplete="address-level2" placeholder="Где будет установлена КТП" @input="$event.target.setCustomValidity('')"></label>
              </div>
              <details class="ktp-details ktp-contact-extra">
                <summary><span>Компания и комментарий<small>Необязательно</small></span><VIcon class="ktp-chevron" :icon="icons.dropdown" size="21" aria-hidden="true" /></summary>
                <div class="ktp-extra-fields">
                  <label class="ktp-input"><span>Организация</span><input v-model.trim="contact.organization" name="organization" type="text" maxlength="160" autocomplete="organization" placeholder="Название компании"></label>
                  <label class="ktp-input"><span>Комментарий к заявке</span><textarea v-model.trim="contact.comment" name="comment" maxlength="3000" rows="3" placeholder="Особенности объекта, сроки и условия доставки" /></label>
                </div>
              </details>
              <label class="ktp-consent"><input v-model="contact.consent" name="consent" type="checkbox" required><span>Даю ООО «Энергосистемы» <NuxtLink to="/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</NuxtLink> для ответа на заявку.</span></label>
              <p class="ktp-privacy">Подробнее — в <NuxtLink to="/privacy" target="_blank" rel="noopener">политике обработки персональных данных</NuxtLink>.</p>
              <p v-if="errorMessage" class="ktp-error" role="alert">{{ errorMessage }} <a href="tel:+74951780118">+7 (495) 178-01-18</a></p>
            </fieldset>
          </div>

          <footer class="ktp-actions">
            <span class="ktp-counter" aria-live="polite" aria-atomic="true">Шаг: <strong>{{ currentStep + 1 }}</strong> / {{ totalSteps }}</span>
            <div class="ktp-buttons">
              <button v-if="currentStep > 0" class="ktp-back" type="button" :disabled="isSubmitting" @click="changeStep(-1)"><VIcon :icon="icons.arrowleft" size="18" aria-hidden="true" /><span>Назад</span></button>
              <button v-if="!isContactStep" class="ktp-primary" type="button" :disabled="!canContinue" @click="changeStep(1)">Далее <VIcon :icon="icons.arrowright" size="20" aria-hidden="true" /></button>
              <button v-else class="ktp-primary" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Отправляем…' : 'Получить предложение' }}<VIcon v-if="!isSubmitting" :icon="icons.arrowright" size="20" aria-hidden="true" /></button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { aliases as icons } from 'vuetify/iconsets/mdi-svg'
import EquipmentQuizField from './EquipmentQuizField.vue'
import { useKtpQuiz } from '~/composables/useKtpQuiz'
import { handlePhoneInput, handlePhoneKeydown } from '~/utils/phoneFormatter'

defineProps({ questionnaireFile: { type: String, default: '' } })
const { currentStep, activeStep, totalSteps, progress, answers, contact, summary, canContinue,
  isContactStep, isSubmitting, submitState, errorMessage, moveStep, submit, reset } = useKtpQuiz($fetch)
const quizFrame = ref(null)
const quizForm = ref(null)
const stepHeading = ref(null)
const nameInput = ref(null)
const locationInput = ref(null)
const emailInput = ref(null)
const detailsCount = computed(() => (activeStep.value?.details || []).filter((field) => answers[field.key]).length)
const transformerWord = computed(() => {
  const count = Number(answers.transformerCount)
  if (count % 100 >= 11 && count % 100 <= 14) return 'трансформаторов'
  if (count % 10 === 1) return 'трансформатор'
  return [2, 3, 4].includes(count % 10) ? 'трансформатора' : 'трансформаторов'
})

async function focusStep() {
  await nextTick()
  stepHeading.value?.focus({ preventScroll: true })
  const bounds = quizFrame.value?.getBoundingClientRect()
  if (bounds && (bounds.top < 84 || bounds.bottom > window.innerHeight - 24)) {
    quizFrame.value.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
}
function changeStep(direction) {
  if (direction === 1 && !quizForm.value?.reportValidity()) return
  if (moveStep(direction)) focusStep()
}
function onPhoneInput(event) { handlePhoneInput(event, (value) => { contact.phone = value }) }
async function handleSubmit() {
  if (isSubmitting.value) return
  if (!isContactStep.value) { changeStep(1); return }
  nameInput.value?.setCustomValidity(contact.name.trim().length < 2 ? 'Введите имя: не менее двух символов.' : '')
  locationInput.value?.setCustomValidity(contact.location.trim().length < 2 ? 'Укажите город или регион объекта.' : '')
  emailInput.value?.setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) ? '' : 'Введите полный email, например name@company.ru.')
  if (!quizForm.value?.reportValidity()) return
  if (await submit()) focusStep()
}
function startAgain() { reset(); focusStep() }
</script>

<style scoped>
.ktp-quiz { --ktp-accent: #f7aa33; --ktp-ink: #23252a; --ktp-muted: #73767c; --ktp-line: #e3e4e2; max-width: 1000px; margin: 0 auto; color: var(--ktp-ink); }
.ktp-intro { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 24px; }
.ktp-eyebrow { margin: 0 0 8px; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #896124; }
.ktp-intro h2 { margin: 0; color: var(--ktp-ink); font-size: clamp(26px, 3vw, 32px); line-height: 1.2; letter-spacing: -.035em; font-weight: 600; }
.ktp-intro-copy { margin: 10px 0 0; color: var(--ktp-muted); font-size: 14px; line-height: 1.5; }
.ktp-download { display: inline-flex; align-items: center; flex-shrink: 0; gap: 8px; min-height: 40px; color: #555960; font-size: 12px; text-decoration: none; }
.ktp-download span { color: #7b7e84; font-size: 10px; letter-spacing: .05em; }
.ktp-download:hover { color: var(--ktp-ink); text-decoration: underline; }
.ktp-frame { padding: 7px; border-radius: 25px; background: #eeefec; scroll-margin-top: 88px; }
.ktp-card { overflow: hidden; border-radius: 18px; background: #fff; }
.ktp-progress { height: 3px; background: #e5e6e5; }
.ktp-progress span { display: block; height: 100%; border-radius: 4px; background: var(--ktp-accent); transition: width .22s ease; }
.ktp-form { padding: 27px 34px 24px; }
.ktp-step-heading { margin-bottom: 22px; }
.ktp-step-heading h3, .ktp-success h3 { margin: 0; color: var(--ktp-ink); font-size: 25px; font-weight: 600; line-height: 1.25; letter-spacing: -.025em; text-wrap: balance; }
.ktp-step-heading > p { margin: 9px 0 0; color: var(--ktp-muted); font-size: 14px; line-height: 1.55; }
.ktp-fields { display: grid; gap: 20px; }
.ktp-details { margin-top: 22px; border: 1px solid var(--ktp-line); border-radius: 12px; }
.ktp-details > summary { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 16px; list-style: none; cursor: pointer; font-size: 13px; line-height: 1.45; }
summary::-webkit-details-marker { display: none; }
.ktp-details summary small { display: block; margin-top: 3px; color: var(--ktp-muted); font-size: 11px; }
.ktp-details[open] > summary { border-bottom: 1px solid var(--ktp-line); }
.ktp-details[open] > summary .ktp-chevron { transform: rotate(180deg); }
.ktp-extra-fields { display: grid; gap: 22px; padding: 20px 16px; }
.ktp-actions { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 1px solid #eeefed; }
.ktp-counter { flex-shrink: 0; color: var(--ktp-muted); font-size: 13px; font-variant-numeric: tabular-nums; }
.ktp-counter strong { color: var(--ktp-ink); font-weight: 500; }
.ktp-buttons { display: flex; align-items: center; gap: 10px; }
.ktp-primary, .ktp-back { display: inline-flex; align-items: center; justify-content: center; gap: 14px; min-height: 46px; border-radius: 28px; padding: 0 24px; border: 1px solid transparent; font-family: inherit; font-size: 14px; line-height: 1.3; cursor: pointer; transition: background-color .15s; }
.ktp-primary { min-width: 142px; background: var(--ktp-accent); color: #25231f; font-weight: 600; }
.ktp-primary:hover:not(:disabled) { background: #f4b94f; }
.ktp-primary:disabled { background: #f3f1ed; color: #898782; cursor: not-allowed; }
.ktp-back { padding: 0 17px; gap: 8px; border-color: var(--ktp-line); color: #65686d; background: #fff; }
.ktp-back:hover:not(:disabled) { background: #f7f7f5; }
.ktp-back:disabled { opacity: .5; cursor: wait; }
a:focus-visible, button:focus-visible, summary:focus-visible, input:focus-visible, textarea:focus-visible, h3:focus-visible { outline: 2px solid var(--ktp-ink); outline-offset: 4px; }
h3:focus:not(:focus-visible) { outline: none; }
.ktp-contact-layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.4fr); gap: 28px; align-items: start; }
.ktp-summary { padding: 20px; border-radius: 13px; background: #f7f7f4; }
.ktp-summary-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 20px; }
.ktp-summary h4 { font-size: 14px; font-weight: 600; }
.ktp-summary-heading > span { color: #888880; font-size: 10px; letter-spacing: .1em; }
.ktp-summary dl { margin: 0; display: grid; gap: 16px; }
.ktp-summary dt { color: var(--ktp-muted); font-size: 11px; line-height: 1.45; margin-bottom: 4px; }
.ktp-summary dd { margin: 0; font-size: 13px; line-height: 1.5; overflow-wrap: anywhere; }
.ktp-all-answers { margin-top: 18px; padding-top: 14px; border-top: 1px solid #e3e4de; }
.ktp-all-answers summary { display: flex; justify-content: space-between; align-items: center; font-size: 12px; cursor: pointer; list-style: none; }
.ktp-all-answers dl { margin-top: 18px; }
.ktp-contact { border: 0; padding: 0; margin: 0; min-width: 0; }
.ktp-contact-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 14px; }
.ktp-input { display: grid; gap: 8px; min-width: 0; font-size: 12px; line-height: 1.4; }
.ktp-input > span { font-weight: 500; }
.ktp-input em { color: var(--ktp-muted); font-weight: 400; font-size: 10px; font-style: normal; }
.ktp-input input, .ktp-input textarea { box-sizing: border-box; width: 100%; min-height: 46px; padding: 12px; border: 1px solid var(--ktp-line); border-radius: 10px; background: #fff; color: var(--ktp-ink); font: inherit; font-size: 14px; line-height: 1.45; }
.ktp-input textarea { resize: vertical; }
.ktp-input input::placeholder, .ktp-input textarea::placeholder { color: #878a8d; opacity: 1; }
.ktp-contact-extra { margin-top: 18px; }
.ktp-consent { display: flex; align-items: flex-start; gap: 10px; margin-top: 20px; font-size: 11px; line-height: 1.6; color: #696c72; cursor: pointer; }
.ktp-consent input { flex-shrink: 0; width: 17px; height: 17px; margin-top: 1px; accent-color: var(--ktp-accent); }
.ktp-consent a, .ktp-privacy a, .ktp-error a { color: inherit; text-underline-offset: 2px; }
.ktp-privacy { margin: 9px 0 0 27px; color: #777b81; font-size: 10px; line-height: 1.6; }
.ktp-error { margin: 16px 0 0; padding: 12px; border-radius: 10px; background: #fff1ec; color: #923b26; font-size: 12px; line-height: 1.6; }
.ktp-error a { white-space: nowrap; }
.ktp-success { padding: 48px 32px; text-align: center; }
.ktp-success-icon { display: inline-grid; place-items: center; width: 64px; height: 64px; margin-bottom: 22px; border-radius: 50%; background: #fff5e5; color: #98631a; }
.ktp-success p { max-width: 470px; margin: 14px auto 28px; color: var(--ktp-muted); font-size: 15px; line-height: 1.6; }
@media (max-width: 767px) {
  .ktp-intro { align-items: flex-start; flex-direction: column; gap: 12px; margin-bottom: 18px; }
  .ktp-intro h2 { font-size: 27px; }
  .ktp-download { min-height: 32px; }
  .ktp-frame { padding: 5px; border-radius: 20px; }
  .ktp-card { border-radius: 15px; }
  .ktp-form { padding: 23px 19px 20px; }
  .ktp-step-heading h3 { font-size: 23px; }
  .ktp-step-heading { margin-bottom: 23px; }
  .ktp-step-heading > p { font-size: 13px; }
  .ktp-contact-layout { grid-template-columns: 1fr; gap: 22px; }
  .ktp-summary dl { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .ktp-summary .ktp-all-answers dl { grid-template-columns: 1fr; }
  .ktp-input input, .ktp-input textarea { font-size: 16px; }
  .ktp-consent { font-size: 12px; }
  .ktp-privacy { font-size: 11px; }
}
@media (max-width: 480px) {
  .ktp-form { padding: 21px 16px 18px; }
  .ktp-step-heading h3 { font-size: 22px; }
  .ktp-actions { flex-wrap: wrap; gap: 14px; margin-top: 24px; padding-top: 16px; }
  .ktp-buttons { gap: 8px; margin-left: auto; }
  .ktp-primary { min-width: 110px; padding: 0 19px; }
  .ktp-back { padding: 0 13px; }
  .ktp-back span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .ktp-contact-layout + .ktp-actions .ktp-counter { width: 100%; }
  .ktp-contact-layout + .ktp-actions .ktp-buttons { width: 100%; }
  .ktp-contact-layout + .ktp-actions .ktp-primary { flex: 1; }
  .ktp-contact-grid { grid-template-columns: 1fr; }
  .ktp-summary { padding: 17px; }
  .ktp-extra-fields { padding: 16px 12px; }
  .ktp-details > summary { padding: 13px; }
}
@media (prefers-reduced-motion: reduce) { .ktp-progress span, .ktp-primary, .ktp-back { transition: none; } }
</style>
