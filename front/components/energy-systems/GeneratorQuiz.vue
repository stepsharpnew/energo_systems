<template>
  <section id="generator-quiz" class="generator-quiz" aria-labelledby="generator-quiz-title">
    <div class="quiz-container">
      <header class="quiz-intro">
        <p class="quiz-eyebrow">Резервное питание для дома</p>
        <h2 id="generator-quiz-title">Подберём генератор под ваши задачи</h2>
        <p>Ответьте на 4 вопроса — инженер подготовит конфигурацию и расчёт.</p>
      </header>

      <div ref="quizFrame" class="quiz-frame">
        <div class="quiz-card">
          <div
            class="quiz-progress"
            role="progressbar"
            aria-label="Прогресс подбора генератора"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuetext="`Шаг ${currentStep + 1} из ${totalSteps}`"
          >
            <span :style="{ width: `${progress}%` }" />
          </div>

          <div v-if="submitState === 'success'" class="quiz-success" role="status">
            <VIcon :icon="icons.success" size="36" aria-hidden="true" />
            <h3 ref="stepHeading" tabindex="-1">Заявка отправлена</h3>
            <p>Спасибо! Инженер получит ваши ответы и свяжется с вами по указанному телефону для подбора генератора.</p>
            <button class="quiz-primary" type="button" @click="startAgain">Пройти заново</button>
          </div>

          <form v-else ref="quizForm" class="quiz-form" :aria-busy="isSubmitting" novalidate @submit.prevent="handleSubmit">
            <fieldset v-if="!isContactStep" :key="activeQuestion.id" class="quiz-question" aria-labelledby="quiz-step-title" aria-describedby="quiz-step-hint">
              <h3 id="quiz-step-title" ref="stepHeading" tabindex="-1">{{ activeQuestion.title }}</h3>
              <p id="quiz-step-hint" class="quiz-hint">{{ activeQuestion.description }}</p>

              <div class="quiz-options">
                <label
                  v-for="option in activeQuestion.options"
                  :key="option.id"
                  class="quiz-option"
                  :class="{ selected: isSelected(option.id) }"
                >
                  <input
                    :type="activeQuestion.multiple ? 'checkbox' : 'radio'"
                    :name="`generator-${activeQuestion.id}`"
                    :value="option.id"
                    :checked="isSelected(option.id)"
                    :required="!activeQuestion.multiple"
                    @change="selectOption(option.id, $event.target.checked)"
                  >
                  <span class="option-mark" :class="{ 'radio-mark': !activeQuestion.multiple }" aria-hidden="true">
                    <VIcon v-if="isSelected(option.id)" :icon="icons.complete" size="16" />
                  </span>
                  <span>{{ option.label }}</span>
                </label>
              </div>
            </fieldset>

            <div v-else class="quiz-contact-step">
              <h3 id="quiz-step-title" ref="stepHeading" tabindex="-1">Оставьте контакты для подбора генератора</h3>
              <p class="quiz-hint">Инженер уточнит детали и подготовит предложение по вашим параметрам.</p>

              <div class="quiz-contact-layout">
                <section class="quiz-summary" aria-labelledby="quiz-summary-title">
                  <h4 id="quiz-summary-title">Ваши ответы</h4>
                  <dl>
                    <div v-for="answer in summary" :key="answer.label">
                      <dt>{{ answer.label }}</dt>
                      <dd>{{ Array.isArray(answer.value) ? answer.value.join(', ') : answer.value }}</dd>
                    </div>
                  </dl>
                </section>

                <div class="quiz-contact-details">
                  <fieldset class="quiz-contact-fields" :disabled="isSubmitting" aria-label="Контактные данные">
                    <div class="quiz-inputs">
                      <label class="quiz-field">
                        <span>Имя</span>
                        <input
                          ref="nameInput"
                          v-model="contact.name"
                          name="name"
                          type="text"
                          required
                          minlength="2"
                          maxlength="80"
                          autocomplete="name"
                          placeholder="Как к вам обращаться"
                          @input="$event.target.setCustomValidity('')"
                        >
                      </label>
                      <label class="quiz-field">
                        <span>Телефон</span>
                        <input
                          :value="contact.phone"
                          name="phone"
                          type="tel"
                          required
                          maxlength="18"
                          autocomplete="tel"
                          inputmode="tel"
                          pattern="\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}"
                          placeholder="+7 (999)-123-45-67"
                          @input="onPhoneInput"
                          @keydown="handlePhoneKeydown"
                        >
                      </label>
                    </div>
                    <label class="quiz-consent">
                      <input v-model="contact.consent" type="checkbox" name="consent" required>
                      <span>
                        Даю ООО «Энергосистемы»
                        <NuxtLink to="/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</NuxtLink>
                        для ответа на заявку.
                      </span>
                    </label>
                    <p class="quiz-privacy">
                      Порядок обработки описан в
                      <NuxtLink to="/privacy" target="_blank" rel="noopener">политике обработки персональных данных</NuxtLink>.
                    </p>
                  </fieldset>
                  <div v-if="errorMessage" class="quiz-error" role="alert">
                    <p>{{ errorMessage }}</p>
                    <a href="tel:+74951780118">+7 (495) 178-01-18</a>
                  </div>
                </div>
              </div>
            </div>

            <footer class="quiz-actions">
              <p class="quiz-counter" aria-live="polite" aria-atomic="true">Шаг: <strong>{{ currentStep + 1 }}</strong>/{{ totalSteps }}</p>
              <div class="quiz-buttons">
                <button v-if="currentStep > 0" class="quiz-back" type="button" :disabled="isSubmitting" @click="changeStep(-1)">
                  <VIcon :icon="icons.arrowleft" size="18" aria-hidden="true" />
                  <span>Назад</span>
                </button>
                <button v-if="!isContactStep" class="quiz-primary" type="button" :disabled="!canContinue" @click="changeStep(1)">
                  Далее
                  <VIcon :icon="icons.arrowright" size="20" aria-hidden="true" />
                </button>
                <button v-else class="quiz-primary" type="submit" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Отправляем…' : 'Получить подбор' }}
                  <VIcon v-if="!isSubmitting" :icon="icons.arrowright" size="20" aria-hidden="true" />
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { aliases as icons } from 'vuetify/iconsets/mdi-svg'
import { useGeneratorQuiz } from '~/composables/useGeneratorQuiz'
import { handlePhoneInput, handlePhoneKeydown } from '~/utils/phoneFormatter'

const {
  currentStep, answers, contact, totalSteps, activeQuestion, isContactStep,
  isSubmitting, progress, canContinue, summary, submitState, errorMessage,
  selectOption, moveStep, submit, reset,
} = useGeneratorQuiz($fetch)

const quizFrame = ref(null)
const quizForm = ref(null)
const stepHeading = ref(null)
const nameInput = ref(null)

const isSelected = (id) => activeQuestion.value.multiple
  ? answers[activeQuestion.value.id].includes(id)
  : answers[activeQuestion.value.id] === id

async function focusStep() {
  await nextTick()
  stepHeading.value?.focus({ preventScroll: true })
  const frame = quizFrame.value
  const bounds = frame?.getBoundingClientRect()
  if (bounds && (bounds.top < 80 || bounds.bottom > window.innerHeight - 24)) {
    frame.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
}

function changeStep(direction) {
  if (moveStep(direction)) focusStep()
}

function onPhoneInput(event) {
  handlePhoneInput(event, (value) => { contact.phone = value })
}

async function handleSubmit() {
  if (isSubmitting.value) return
  if (!isContactStep.value) {
    changeStep(1)
    return
  }
  nameInput.value?.setCustomValidity(contact.name.trim().length < 2 ? 'Введите имя: не менее двух символов.' : '')
  if (!quizForm.value?.reportValidity()) return
  if (await submit()) await focusStep()
}

function startAgain() {
  reset()
  focusStep()
}
</script>

<style scoped>
.generator-quiz {
  --quiz-accent: #f7aa33;
  --quiz-ink: #23252a;
  --quiz-muted: #74767d;
  --quiz-line: #e5e5e2;
  padding: 48px 0 56px;
  color: var(--quiz-ink);
  background: #fff;
  scroll-margin-top: 64px;
}

.quiz-container { width: min(100% - 48px, 1000px); margin: 0 auto; }
.quiz-intro { margin-bottom: 24px; }
.quiz-eyebrow {
  margin: 0 0 10px;
  color: #896522;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.4;
  text-transform: uppercase;
}
.quiz-intro h2 {
  margin: 0;
  color: var(--quiz-ink);
  font-size: clamp(26px, 2.5vw, 32px);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.18;
  text-wrap: balance;
}
.quiz-intro > p:last-child { margin: 10px 0 0; color: var(--quiz-muted); font-size: 15px; line-height: 1.5; }
.quiz-frame {
  padding: 7px;
  border: 1px solid #efefeb;
  border-radius: 24px;
  background: #f5f5f2;
  scroll-margin-top: 80px;
}
.quiz-card {
  overflow: hidden;
  border: 1px solid #e9e9e5;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(28, 31, 24, 0.025);
}
.quiz-progress { height: 3px; background: #ebebe8; }
.quiz-progress > span {
  display: block;
  height: 100%;
  border-radius: 0 3px 3px 0;
  background: var(--quiz-accent);
  transition: width 180ms ease;
}
.quiz-form { padding: 30px 34px 26px; }
.quiz-question,
.quiz-contact-fields { min-width: 0; padding: 0; margin: 0; border: 0; }
.quiz-form h3,
.quiz-success h3 {
  margin: 0;
  color: var(--quiz-ink);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.25;
  text-wrap: balance;
}
.quiz-hint { margin: 8px 0 0; color: var(--quiz-muted); font-size: 14px; line-height: 1.5; }
.quiz-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 22px;
}
.quiz-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 66px;
  padding: 16px 18px;
  border: 1px solid var(--quiz-line);
  border-radius: 12px;
  background: #fff;
  color: var(--quiz-ink);
  font-size: 16px;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease;
}
.quiz-option:hover { border-color: #b8b9b4; background: #fdfdfb; }
.quiz-option.selected { border-color: #edac43; background: #fff9ef; }
.quiz-option input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.option-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  border: 1.5px solid #cfd0cc;
  border-radius: 6px;
  background: #fff;
}
.radio-mark { border-radius: 50%; }
.selected .option-mark { border-color: var(--quiz-accent); background: var(--quiz-accent); }
.quiz-option:has(input:focus-visible),
.quiz-primary:focus-visible,
.quiz-back:focus-visible,
.quiz-field input:focus-visible,
.quiz-consent input:focus-visible,
.generator-quiz a:focus-visible { outline: 2px solid #8b611c; outline-offset: 3px; }
.quiz-form h3:focus,
.quiz-success h3:focus { outline: none; }
.quiz-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 26px;
}
.quiz-counter { margin: 0; color: var(--quiz-muted); font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.quiz-counter strong { color: var(--quiz-ink); font-weight: 600; }
.quiz-buttons { display: flex; align-items: center; gap: 10px; }
.quiz-primary,
.quiz-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 48px;
  padding: 12px 24px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--quiz-ink);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.25;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}
.quiz-primary { min-width: 132px; background: var(--quiz-accent); }
.quiz-primary:hover:not(:disabled) { background: #f2a024; }
.quiz-primary:disabled { background: #f1f1ee; color: #858780; cursor: not-allowed; }
.quiz-back { gap: 7px; padding-inline: 16px; border-color: var(--quiz-line); background: #fff; color: #65686d; font-size: 14px; font-weight: 400; }
.quiz-back:hover:not(:disabled) { background: #f7f7f4; border-color: #cfd0ca; }
.quiz-back:disabled { opacity: 0.5; cursor: not-allowed; }
.quiz-contact-layout { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 30px; align-items: start; margin-top: 24px; }
.quiz-contact-details { min-width: 0; }
.quiz-summary { padding: 20px; border-radius: 12px; background: #f6f6f3; }
.quiz-summary h4 { margin: 0 0 16px; font-size: 14px; font-weight: 600; }
.quiz-summary dl { display: grid; gap: 14px; margin: 0; }
.quiz-summary dt { margin-bottom: 4px; color: var(--quiz-muted); font-size: 12px; line-height: 1.4; }
.quiz-summary dd { margin: 0; font-size: 14px; line-height: 1.45; }
.quiz-inputs { display: grid; grid-template-columns: 1fr; gap: 14px; }
.quiz-field { display: flex; flex-direction: column; gap: 7px; font-size: 13px; }
.quiz-field input {
  min-width: 0;
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #d9dad5;
  border-radius: 10px;
  background: #fff;
  color: var(--quiz-ink);
  font-size: 16px;
}
.quiz-field input::placeholder { color: #85877f; opacity: 1; }
.quiz-consent { display: flex; align-items: flex-start; gap: 10px; margin-top: 18px; color: #686b65; font-size: 12px; line-height: 1.5; cursor: pointer; }
.quiz-consent input { flex: 0 0 18px; width: 18px; height: 18px; margin-top: 1px; accent-color: var(--quiz-accent); cursor: pointer; }
.quiz-privacy { margin: 8px 0 0 28px; color: #747770; font-size: 11px; line-height: 1.5; }
.generator-quiz a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.quiz-error { margin-top: 16px; padding: 14px; border: 1px solid #e9b2a4; border-radius: 10px; background: #fff3ee; color: #8a2d18; font-size: 13px; line-height: 1.5; }
.quiz-error p { margin: 0 0 8px; }
.quiz-success { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; padding: 36px; }
.quiz-success > .v-icon { color: #9b6c22; }
.quiz-success p { max-width: 560px; margin: 0; color: var(--quiz-muted); font-size: 15px; line-height: 1.6; }

@media (max-width: 767px) {
  .generator-quiz { padding: 36px 0 42px; }
  .quiz-container { width: calc(100% - 32px); }
  .quiz-intro { margin-bottom: 20px; }
  .quiz-intro h2 { max-width: 560px; font-size: 26px; }
  .quiz-intro > p:last-child { max-width: 440px; font-size: 14px; }
  .quiz-frame { padding: 5px; border-radius: 20px; }
  .quiz-card { border-radius: 14px; }
  .quiz-form { padding: 22px 18px 20px; }
  .quiz-form h3, .quiz-success h3 { font-size: 22px; line-height: 1.25; }
  .quiz-hint { font-size: 13px; }
  .quiz-options { grid-template-columns: 1fr; gap: 8px; margin-top: 18px; }
  .quiz-option { min-height: 60px; gap: 12px; padding: 13px 14px; border-radius: 10px; font-size: 15px; }
  .quiz-actions { gap: 12px; margin-top: 22px; }
  .quiz-buttons { gap: 8px; }
  .quiz-primary { min-width: 114px; gap: 10px; padding-inline: 20px; }
  .quiz-back { padding-inline: 13px; }
  .quiz-contact-layout { grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
  .quiz-summary { padding: 16px; }
  .quiz-summary dl { gap: 12px; }
  .quiz-summary h4 { margin-bottom: 12px; }
  .quiz-summary dd { font-size: 13px; }
  .quiz-success { gap: 16px; padding: 26px 20px; }
  .quiz-contact-step + .quiz-actions { flex-wrap: wrap; }
  .quiz-contact-step + .quiz-actions .quiz-buttons { flex: 1 1 auto; justify-content: flex-end; }
}

@media (max-width: 420px) {
  .quiz-back { width: 44px; min-height: 44px; padding: 0; }
  .quiz-back span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .quiz-primary { padding-inline: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  .quiz-progress > span, .quiz-option, .quiz-primary, .quiz-back { transition: none; }
}
</style>
