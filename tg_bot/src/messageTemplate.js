// Функция для экранирования HTML символов
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Функция для извлечения чистого номера телефона (только цифры и +)
function extractPhoneNumber(contact) {
  if (!contact) return "";
  return contact.replace(/[^\d+]/g, "");
}

// Функция для форматирования многострочного текста с отступами
function formatMultilineText(text) {
  if (!text) return "";
  const lines = escapeHtml(text).split("\n");
  return lines
    .map((line) => (line.trim() ? `   ${line}` : ""))
    .filter((line) => line !== "")
    .join("\n");
}

/**
 * Генерирует HTML сообщение для Telegram бота
 * @param {Object} data - Данные заявки
 * @param {string} data.type - Тип заявки: "review" | "consult" | "service" | "other"
 * @param {string} data.name - Имя клиента
 * @param {string} data.contact - Контакт (телефон)
 * @param {string} [data.service] - Название услуги
 * @param {string} [data.message] - Сообщение от клиента
 * @param {string} [data.extra] - Дополнительная информация
 * @param {string} [data.source] - Источник заявки
 * @returns {string} HTML форматированное сообщение
 */
function generateMessage(data) {
  const { type, name, contact, service, message, extra, source } = data;

  // Определяем тип заявки
  const leadTypeLabel =
    type === "review"
      ? "📝 Отзыв"
      : type === "consult"
      ? "📩 Запрос консультации"
      : type === "service"
      ? "⚙️ Заявка на услугу"
      : "📨 Новая заявка с сайта";

  // Извлекаем чистый номер в международном формате
  const cleanPhoneNumber = extractPhoneNumber(contact);

  // Telegram автоматически распознает и делает кликабельными номера в формате +7XXXXXXXXXX
  // Показываем чистый номер БЕЗ HTML тегов для гарантированного распознавания
  // Telegram автоматически сделает номер кликабельным и копируемым
  const clickablePhone = cleanPhoneNumber || escapeHtml(contact);

  // Собираем сообщение
  const lines = [
    `🎯 <b>${escapeHtml(leadTypeLabel)}</b>`,
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Контакт:</b>`,
    `${clickablePhone}`,
  ];

  if (service) {
    lines.push(`⚙️ <b>Услуга:</b> ${escapeHtml(service)}`);
  }

  if (message) {
    lines.push("");
    lines.push(`💬 <b>Сообщение:</b>`);
    const formattedMessage = formatMultilineText(message);
    if (formattedMessage) {
      lines.push(formattedMessage);
    }
  }

  if (extra) {
    lines.push("");
    lines.push(`📋 <b>Доп. информация:</b>`);
    const formattedExtra = formatMultilineText(extra);
    if (formattedExtra) {
      lines.push(formattedExtra);
    }
  }

  if (source) {
    lines.push("");
    lines.push(`📍 <b>Источник:</b> ${escapeHtml(source)}`);
  }

  return lines.join("\n");
}

module.exports = { generateMessage };
