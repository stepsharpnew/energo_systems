import { getLeadAttribution } from './attribution.js'

export function maskLandingPhone(value) {
  let digits = String(value || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  let phone = '+7'
  if (digits.length) phone += ' (' + digits.slice(0, 3)
  if (digits.length >= 3) phone += ')'
  if (digits.length > 3) phone += ' ' + digits.slice(3, 6)
  if (digits.length > 6) phone += '-' + digits.slice(6, 8)
  if (digits.length > 8) phone += '-' + digits.slice(8, 10)
  return phone
}

export const validLandingPhone = value => /^[78]\d{10}$/.test(String(value || '').replace(/\D/g, ''))
export const validLandingEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())

export async function submitLandingLead(payload) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      attribution: getLeadAttribution(),
      contact: maskLandingPhone(payload.contact).replace(') ', ')-'),
      consentVersion: '2026-07-13',
    }),
  })
  if (!response.ok) {
    const error = new Error('Не удалось подтвердить отправку заявки')
    error.status = response.status
    throw error
  }
  const result = await response.json()
  if (result?.ok !== true) throw new Error('Заявка не подтверждена сервером')
  return result
}

export function landingSubmitError(error) {
  return error?.status === 429
    ? 'Слишком много попыток. Попробуйте через 15 минут или позвоните нам. Введённые данные сохранены.'
    : 'Не удалось подтвердить отправку заявки. Попробуйте ещё раз или позвоните нам. Введённые данные сохранены.'
}
