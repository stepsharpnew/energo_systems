function normalizeCallbackPreferences(value, contact) {
  if (value === undefined) return undefined;
  if (!contact || !value || Array.isArray(value) || typeof value !== 'object'
    || Object.keys(value).some(key => !['time', 'allowNonWorkingDays'].includes(key))
    || typeof value.time !== 'string' || value.time.length > 120 || /[\r\n]/.test(value.time)
    || typeof value.allowNonWorkingDays !== 'boolean') return null;
  return { time: value.time.trim(), allowNonWorkingDays: value.allowNonWorkingDays };
}

module.exports = { normalizeCallbackPreferences };
