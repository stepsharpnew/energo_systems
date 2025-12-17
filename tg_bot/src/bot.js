require('dotenv').config();

const { Bot } = require('grammy');
const express = require('express');
const cors = require('cors');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN не найден в .env');
  process.exit(1);
}

// Список чатов/аккаунтов, куда рассылаем собранные данные
// Если не заполнен, по умолчанию используем ALLOWED_USER_IDS (для совместимости)
const adminChatIds = (process.env.ADMIN_CHAT_IDS || process.env.ALLOWED_USER_IDS || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

const bot = new Bot(token);

async function broadcastToAdmins(text) {
  if (adminChatIds.length === 0) {
    console.warn('ADMIN_CHAT_IDS/ALLOWED_USER_IDS не заданы — некому отправлять уведомления.');
    return;
  }

  for (const chatId of adminChatIds) {
    try {
      await bot.api.sendMessage(chatId, text, { parse_mode: 'HTML' });
    } catch (e) {
      console.error(`Не удалось отправить сообщение в чат ${chatId}:`, e);
    }
  }
}

// Команда /start - просто справка для админов
bot.command('start', async (ctx) => {
  await ctx.reply('Бот-уведомитель запущен. Заявки приходят сюда с сайта.');
});

bot.catch((err) => {
  console.error('Ошибка в боте:', err.error || err);
});

bot.start({
  onStart: (info) => {
    console.log(`Бот запущен как @${info.username}`);
  },
});
// HTTP-сервис для приёма заявок с фронта
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Универсальный эндпоинт для отправки заявок
// Типы: "review" | "consult" | "service" | "other"
app.post('/api/telegram/lead', async (req, res) => {
  try {
    const { type, name, contact, message, service, extra, source } = req.body || {};

    if (!name || !contact) {
      return res.status(400).json({ ok: false, error: 'name и contact обязательны' });
    }

    const leadTypeLabel =
      type === 'review'
        ? '📝 Отзыв'
        : type === 'consult'
          ? '📩 Запрос консультации'
          : type === 'service'
            ? '⚙️ Заявка на услугу'
            : '📨 Новая заявка с сайта';

    const lines = [
      `<b>${leadTypeLabel}</b>`,
      '',
      `<b>Имя:</b> ${name}`,
      `<b>Контакт:</b> ${contact}`,
    ];

    if (service) {
      lines.push(`<b>Услуга:</b> ${service}`);
    }

    if (message) {
      lines.push(`<b>Сообщение:</b> ${message}`);
    }

    if (extra) {
      lines.push(`<b>Доп. информация:</b> ${extra}`);
    }

    if (source) {
      lines.push('');
      lines.push(`<b>Источник:</b> ${source}`);
    }

    const text = lines.join('\n');

    await broadcastToAdmins(text);

    return res.json({ ok: true });
  } catch (e) {
    console.error('Ошибка при обработке заявки /api/telegram/lead:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

app.listen(PORT, () => {
  console.log(`HTTP-сервер для заявок запущен на порту ${PORT}`);
});

