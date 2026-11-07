<template>
<dialog ref="dialog" class="modal" @cancel.prevent="close" @click="backdrop" @close="closed" data-modal aria-labelledby="modal-title">
  <form class="modal__form" :class="{ 'is-sent': sent }" novalidate data-modal-form @submit.prevent="submit">
    <button class="modal__close" type="button" aria-label="Закрыть" data-modal-close @click="close">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
    <h2 class="modal__title" id="modal-title" data-modal-title>{{ sent ? 'Заявка принята' : (request?.title || 'Заказать звонок') }}</h2>
    <p class="modal__text" data-modal-text>{{ sent ? 'Учтём ваши пожелания по времени звонка.' : (request?.text || 'Оставьте номер и выберите удобное время звонка') }}</p>
    <label class="field"><span>Имя</span><input type="text" name="name" autocomplete="name" required v-model="fields.name"></label>
    <label class="field"><span>Телефон</span><input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" required data-phone :value="fields.phone" @input="fields.phone = maskLandingPhone($event.target.value)"></label>
    <CallbackPreferences v-model="fields.callbackPreferences" />
    <label class="check"><input type="checkbox" name="consent" required v-model="fields.consent">
      <span>Согласен на <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">обработку персональных данных</a></span></label>
    <label class="check"><input type="checkbox" name="policy" required v-model="fields.policy">
      <span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span></label>
    <p class="modal__error" data-modal-error role="alert" :hidden="!error">{{ error }}</p>
    <button class="btn-pill btn-pill--full" type="button" data-modal-submit :disabled="pending" @click="submit"><span>Отправить</span></button>
  </form>
</dialog>
</template>

<script setup>
import { createDguDialogLock } from '~/utils/dguDialogLock.js'
import { maskLandingPhone, validLandingPhone, submitLandingLead, landingSubmitError } from '~/utils/landingLead.js'
import { emptyCallbackPreferences, getCallbackPreferences } from '~/lib/browser/callbackPreferences.js'
const props = defineProps({ request: { type: Object, default: null } })
const { lock, unlock } = createDguDialogLock()
const emit = defineEmits(['close'])
const dialog = ref(null), pending = ref(false), sent = ref(false), error = ref('')
const fields = reactive({ name: '', phone: '', consent: false, policy: false, callbackPreferences: emptyCallbackPreferences() })
let lastFocus
const close = () => { dialog.value?.close() }
const closed = () => { unlock(); lastFocus?.focus?.(); emit('close') }
const backdrop = event => { if (event.target === dialog.value) close() }
async function openRequest(request) {
  if (!request) { dialog.value?.close(); return }
  if (pending.value) return
  lastFocus = request.opener || document.activeElement
  sent.value = false
  error.value = ''
  await nextTick()
  if (!props.request || !dialog.value) return
  if (!dialog.value.open) dialog.value.showModal()
  lock()
}
onMounted(() => { if (props.request) openRequest(props.request) })
watch(() => props.request, openRequest, { flush: 'post' })
onBeforeUnmount(() => { dialog.value?.close(); unlock() })
async function submit() {
  if (pending.value || sent.value) return
  const name = fields.name.trim()
  error.value = name.length < 2 || name.length > 80 ? 'Укажите имя от 2 до 80 символов' : !validLandingPhone(fields.phone) ? 'Введите телефон полностью' : !fields.consent || !fields.policy ? 'Отметьте обе галочки — без них заявку не отправить' : ''
  if (error.value) return
  pending.value = true
  try {
    await submitLandingLead({ type: 'service', name, contact: fields.phone, callbackPreferences: getCallbackPreferences(fields.phone, fields.callbackPreferences), service: 'ДГУ — ' + (props.request?.title || 'Заказать звонок'), consent: true })
    sent.value = true
  } catch (failure) { error.value = landingSubmitError(failure) }
  finally { pending.value = false }
}
</script>
