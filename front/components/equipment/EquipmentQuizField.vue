<template>
  <fieldset class="choice-field" :class="{ compact }">
    <legend>{{ field.label }}<span v-if="!field.required" class="optional"> · необязательно</span></legend>

    <div v-if="choices.length" class="choice-grid" :class="gridClass">
      <label v-for="option in choices" :key="option.value" class="choice" :class="{ selected: selection === option.value }">
        <input
          :name="field.key"
          type="radio"
          :value="option.value"
          :aria-label="option.accessibleLabel"
          :checked="selection === option.value"
          :required="field.required"
          @change="choose(option.value)"
        >
        <span class="choice-copy">
          <span class="choice-label">{{ option.label }}</span>
          <span v-if="option.description" class="choice-description">{{ option.description }}</span>
        </span>
        <span class="choice-mark" aria-hidden="true">
          <VIcon v-if="selection === option.value" :icon="icons.complete" size="13" />
        </span>
      </label>
    </div>

    <label v-if="isCount && selection === 'custom'" class="custom-count">
      <span>Количество трансформаторов</span>
      <input :value="modelValue" type="number" name="transformerCountCustom" required min="1" step="1" inputmode="numeric" placeholder="Укажите количество" @input="update($event.target.value)">
    </label>

    <textarea v-if="field.type === 'textarea'" :id="`ktp-${field.key}`" :value="modelValue" :aria-label="field.label" :name="field.key" :required="field.required" rows="3" maxlength="1500" :placeholder="field.placeholder" @input="update($event.target.value)" />
    <input
      v-else-if="!choices.length"
      :id="`ktp-${field.key}`" :value="modelValue" :aria-label="field.label" :name="field.key"
      :type="field.type === 'number' ? 'number' : 'text'" :inputmode="field.type === 'number' ? 'numeric' : undefined"
      :required="field.required" :min="field.type === 'number' ? 0 : undefined" :step="field.type === 'number' ? 1 : undefined"
      maxlength="300" :placeholder="field.placeholder" @input="update($event.target.value)"
    >
  </fieldset>
</template>

<script setup>
import { aliases as icons } from 'vuetify/iconsets/mdi-svg'
import { ktpChoiceDescriptions } from '~/assets/data/ktpQuiz'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: String, default: '' },
  compact: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const customCount = ref(false)
const isCount = computed(() => props.field.key === 'transformerCount')
const choices = computed(() => isCount.value
  ? [{ value: '1', label: '1', accessibleLabel: '1 трансформатор' }, { value: '2', label: '2', accessibleLabel: '2 трансформатора' }, { value: 'custom', label: 'Другое', accessibleLabel: 'Другое количество' }]
  : (props.field.options || []).map((value) => ({ value, label: value, ...ktpChoiceDescriptions[props.field.key]?.[value] })))
const selection = computed(() => isCount.value && (customCount.value || (props.modelValue && !['1', '2'].includes(props.modelValue))) ? 'custom' : props.modelValue)
const gridClass = computed(() => ({
  'choice-grid--numbers': props.field.key === 'transformerPower',
  'choice-grid--three': isCount.value || ['hvInput', 'lvOutput', 'hvVoltage', 'transformerSupply', 'transformerType', 'hvSwitchgear'].includes(props.field.key),
  'choice-grid--material': props.field.key === 'housingMaterial',
  'choice-grid--count': isCount.value,
}))

function update(value) { emit('update:modelValue', String(value)) }
function choose(value) {
  customCount.value = value === 'custom'
  update(value === 'custom' ? '' : value)
}
</script>

<style scoped>
.choice-field { min-width: 0; border: 0; padding: 0; margin: 0; }
legend { padding: 0; margin-bottom: 12px; color: var(--ktp-ink); font-size: 14px; font-weight: 600; line-height: 1.45; }
.optional { color: var(--ktp-muted); font-size: 12px; font-weight: 400; }
.choice-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.choice-grid--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.choice-grid--numbers { grid-template-columns: repeat(7, minmax(0, 1fr)); }
.choice { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 58px; padding: 13px 17px; border: 1px solid var(--ktp-line); border-radius: 12px; background: #fff; cursor: pointer; transition: border-color .16s, background-color .16s; }
.choice:hover { border-color: #bbb6ad; background: #fdfcf9; }
.choice.selected { border-color: #e9a32d; background: #fff9ef; }
.choice:has(input:focus-visible) { outline: 2px solid var(--ktp-ink); outline-offset: 3px; }
.choice input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; margin: 0; }
.choice-copy { display: grid; gap: 5px; min-width: 0; }
.choice-label { color: var(--ktp-ink); font-size: 15px; line-height: 1.4; overflow-wrap: anywhere; }
.choice-description { color: var(--ktp-muted); font-size: 12px; line-height: 1.45; }
.choice-mark { flex-shrink: 0; width: 19px; height: 19px; display: grid; place-items: center; border: 1px solid #d5d6d4; border-radius: 50%; color: var(--ktp-ink); }
.selected .choice-mark { background: var(--ktp-accent); border-color: var(--ktp-accent); }
.choice-grid--material .choice { min-height: 76px; }
.choice-grid--count { max-width: 420px; }
.choice-grid--count .choice { min-height: 46px; }
.choice-grid--numbers .choice { justify-content: center; min-height: 46px; padding: 10px 6px; }
.choice-grid--numbers .choice-mark { display: none; }
.choice-grid--numbers .selected { box-shadow: inset 0 0 0 1px #e9a32d; }
.choice-grid--numbers .selected .choice-label { font-weight: 700; }
.compact .choice { min-height: 46px; padding: 10px 12px; }
.compact .choice-label { font-size: 14px; }
textarea, input:not([type='radio']) { display: block; box-sizing: border-box; width: 100%; min-height: 46px; padding: 12px 14px; border: 1px solid var(--ktp-line); border-radius: 10px; background: #fff; color: var(--ktp-ink); font: inherit; font-size: 15px; line-height: 1.5; }
textarea { resize: vertical; }
textarea::placeholder, input::placeholder { color: #83858b; opacity: 1; }
textarea:focus-visible, input:not([type='radio']):focus-visible { outline: 2px solid var(--ktp-ink); outline-offset: 3px; border-color: var(--ktp-accent); }
.custom-count { display: grid; gap: 8px; margin-top: 12px; max-width: 300px; font-size: 13px; }
@media (max-width: 767px) {
  .choice { padding: 12px 14px; min-height: 54px; }
  .choice-grid--three { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .choice-grid--numbers { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  textarea, input:not([type='radio']) { font-size: 16px; }
}
@media (max-width: 480px) {
  .choice-grid:not(.choice-grid--numbers) { grid-template-columns: 1fr; gap: 8px; }
  .choice-grid.choice-grid--count { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .choice-grid--count .choice { padding: 8px; gap: 5px; }
  .choice-grid--count .choice-label { font-size: 14px; white-space: nowrap; }
  .choice-grid--count .choice-mark { width: 16px; height: 16px; }
  .choice-grid--material .choice { min-height: 68px; }
}
@media (prefers-reduced-motion: reduce) { .choice { transition: none; } }
</style>
