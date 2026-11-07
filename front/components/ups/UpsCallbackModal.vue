<template>
<dialog class="modal" data-modal ref="dialog" @close="onClose" @click="backdrop" aria-labelledby="modal-title">
  <form class="modal__form" :class="{ 'is-sent': sent }" novalidate data-modal-form @submit.prevent="submit">
    <button class="modal__close" type="button" aria-label="Закрыть" data-modal-close @click="close">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
    <h2 class="modal__title" id="modal-title" data-modal-title>{{ sent ? 'Заявка принята' : title }}</h2>
    <p class="modal__text" data-modal-text>{{ sent ? 'Учтём ваши пожелания по времени звонка.' : text }}</p>
    <label class="field"><span>Имя</span><input type="text" name="name" autocomplete="name" required v-model="form.name"></label>
    <label class="field"><span>Телефон</span><input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" required data-phone :value="form.phone" @input="form.phone = maskLandingPhone($event.target.value)"></label>
    <CallbackPreferences v-model="callbackPreferences" />
    <label class="check"><input type="checkbox" name="consent" required v-model="form.consent">
      <span>Согласен на <a href="/personal-data-consent" target="_blank" rel="noopener">обработку персональных данных</a></span></label>
    <label class="check"><input type="checkbox" name="policy" required v-model="form.policy">
      <span>Ознакомлен с <a href="/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span></label>
    <p class="modal__error" data-modal-error role="alert" :hidden="!error">{{ error }}</p>
    <button class="btn-pill btn-pill--full" type="button" data-modal-submit :disabled="pending" @click="submit"><span>Отправить</span></button>
  </form>
</dialog>
</template>

<script setup>
import { emptyCallbackPreferences, getCallbackPreferences } from '~/lib/browser/callbackPreferences.js'
import { maskLandingPhone, validLandingPhone, submitLandingLead, landingSubmitError } from '~/utils/landingLead.js'
const dialog = ref(null)
const form = reactive({ name: '', phone: '', consent: false, policy: false })
const callbackPreferences = ref(emptyCallbackPreferences())
const title = ref('Заказать звонок')
const text = ref('Оставьте номер и выберите удобное время звонка')
const pending = ref(false)
const sent = ref(false)
const error = ref('')
let lastFocus
function open(options = {}) {
  if (pending.value || !dialog.value || dialog.value.open) return
  lastFocus = document.activeElement
  title.value = options.title || 'Заказать звонок'
  text.value = options.text || 'Оставьте номер и выберите удобное время звонка'
  sent.value = false
  error.value = ''
  dialog.value.showModal()
  document.body.classList.add('is-locked')
}
function close() { dialog.value?.close() }
function onClose() { document.body.classList.remove('is-locked'); lastFocus?.focus?.() }
function backdrop(event) { if (event.target === dialog.value) close() }
async function submit() {
  if (pending.value || sent.value) return
  error.value = ''
  if (form.name.trim().length < 2 || form.name.trim().length > 80) { error.value = 'Укажите имя от 2 до 80 символов'; return }
  if (!validLandingPhone(form.phone)) { error.value = 'Введите телефон полностью'; return }
  if (!form.consent || !form.policy) { error.value = 'Отметьте обе галочки — без них заявку не отправить'; return }
  pending.value = true
  try {
    await submitLandingLead({ type: 'service', name: form.name.trim(), contact: form.phone, callbackPreferences: getCallbackPreferences(form.phone, callbackPreferences.value), service: `ИБП — ${title.value}`, consent: true })
    sent.value = true
  } catch (problem) { error.value = landingSubmitError(problem) }
  finally { pending.value = false }
}
onBeforeUnmount(() => { close(); document.body.classList.remove('is-locked') })
defineExpose({ open })
</script>
