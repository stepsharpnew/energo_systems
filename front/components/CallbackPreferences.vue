<template>
  <fieldset v-if="phone === undefined || phone.replace(/\D/g, '').length > 1" ref="fields"
    class="callback-preferences" :class="{ 'callback-preferences--dark': dark }" aria-label="Пожелания к звонку">
    <label class="callback-preferences__field">
      <span class="callback-preferences__heading">Удобное время звонка <span class="callback-preferences__hint">МСК · необязательно</span></span>
      <select v-model="preferences.slot" name="callbackTimeSlot" class="callback-preferences__control">
        <option value="">В рабочее время · 9:00–18:00</option>
        <option v-for="slot in callbackTimeSlots" :key="slot" :value="slot">{{ slot }}</option>
        <option value="custom">Своё время</option>
      </select>
    </label>
    <label v-if="preferences.slot === 'custom'" class="callback-preferences__field">
      <span class="callback-preferences__hint">Когда вам удобно?</span>
      <input v-model="preferences.customTime" name="callbackTimeCustom" class="callback-preferences__control"
        type="text" maxlength="120" placeholder="Например, с 10:00 до 18:00">
    </label>
    <label class="callback-preferences__check">
      <input v-model="preferences.allowNonWorkingDays" name="allowNonWorkingDays" type="checkbox">
      <span>Можно звонить в выходные и праздники</span>
    </label>
  </fieldset>
</template>

<script setup>
import { callbackTimeSlots, emptyCallbackPreferences } from '~/lib/browser/callbackPreferences.js'

const props = defineProps({ modelValue: Object, phone: { type: String, default: undefined }, dark: Boolean })
const emit = defineEmits(['update:modelValue'])
const localPreferences = ref(emptyCallbackPreferences())
const preferences = computed(() => props.modelValue || localPreferences.value)
const fields = ref(null)
let form
const reset = () => {
  localPreferences.value = emptyCallbackPreferences()
  emit('update:modelValue', localPreferences.value)
}
onMounted(() => {
  form = fields.value?.closest('form')
  form?.addEventListener('reset', reset)
})
onBeforeUnmount(() => form?.removeEventListener('reset', reset))
</script>
