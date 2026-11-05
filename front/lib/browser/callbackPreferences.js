export const callbackTimeSlots = ['09:00–12:00', '12:00–15:00', '15:00–18:00']

export const emptyCallbackPreferences = () => ({ slot: '', customTime: '', allowNonWorkingDays: false })

export function getCallbackPreferences(phone, preferences = emptyCallbackPreferences()) {
  if (String(phone || '').replace(/\D/g, '').length <= 1) return undefined
  return {
    time: (preferences.slot === 'custom' ? preferences.customTime : preferences.slot).trim(),
    allowNonWorkingDays: preferences.allowNonWorkingDays === true,
  }
}

// The landing pages collect native form fields; Vue forms use the same serializer.
export function readCallbackPreferences(form, phoneName = 'phone') {
  return getCallbackPreferences(form.elements[phoneName]?.value, {
    slot: form.elements.callbackTimeSlot?.value || '',
    customTime: form.elements.callbackTimeCustom?.value || '',
    allowNonWorkingDays: form.elements.allowNonWorkingDays?.checked === true,
  })
}

export function initCallbackPreferences(root = document) {
  root.querySelectorAll('[data-callback-preferences]').forEach(block => {
    const select = block.querySelector('[name="callbackTimeSlot"]')
    const custom = block.querySelector('[data-callback-custom]')
    const sync = () => { custom.hidden = select.value !== 'custom' }
    select.addEventListener('change', () => {
      sync()
      if (!custom.hidden) custom.querySelector('input').focus()
    })
    select.form?.addEventListener('reset', () => { custom.hidden = true })
    sync()
  })
}
