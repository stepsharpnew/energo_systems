const nodemailer = require("nodemailer");

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function getLeadTypeLabel(type) {
  if (type === "service") return "Заявка на услугу";
  return "Новая заявка с сайта";
}

function getEmailConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  return {
    enabled: Boolean(user && pass),
    host: process.env.SMTP_HOST || "smtp.mail.ru",
    port: Number(process.env.SMTP_PORT || 465),
    secure: normalizeBoolean(process.env.SMTP_SECURE, true),
    user,
    pass,
    from:
      process.env.EMAIL_FROM ||
      (user ? `"Энергосистемы" <${user}>` : undefined),
    to: process.env.EMAIL_TO || "sales@e-systems.su",
    cc: process.env.EMAIL_CC || "inbox@e-systems.su",
  };
}

function buildLeadEmail(data) {
  const {
    type,
    name,
    contact,
    email,
    service,
    consentRecordId,
    consentVersion,
    consentAcceptedAt,
    ipAddress,
    userAgent,
    sourcePage,
  } = data;
  const leadTypeLabel = getLeadTypeLabel(type);
  const subject = leadTypeLabel;
  const rows = [
    ["Тип", leadTypeLabel],
    ["Имя", name],
    ["Телефон", contact],
  ];

  if (email) rows.push(["Email для обратной связи", email]);
  rows.push(
    ["Услуга", service],
    ["Согласие", "Получено отдельной отметкой в форме"],
    ["Идентификатор согласия", consentRecordId],
    ["Версия согласия", consentVersion],
    ["Время согласия (UTC)", consentAcceptedAt],
    ["IP-адрес", ipAddress],
    ["User-Agent", userAgent || "не передан"],
    ["Страница отправки", sourcePage]
  );

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #d8dde6;font-weight:700;background:#f3f6fb;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #d8dde6;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#172033;">
      <h2 style="margin:0 0 16px;">${escapeHtml(leadTypeLabel)}</h2>
      <table style="border-collapse:collapse;border:1px solid #d8dde6;">
        ${htmlRows}
      </table>
    </div>
  `;

  return { subject, text, html };
}

function createTransporter(config) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

async function sendLeadEmail(data) {
  const config = getEmailConfig();

  if (!config.enabled) {
    throw new Error(
      "SMTP_USER/SMTP_PASS не заданы — email-уведомление о заявке не отправлено."
    );
  }

  const transporter = createTransporter(config);
  const { subject, text, html } = buildLeadEmail(data);

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    cc: config.cc,
    subject,
    text,
    html,
  });
}

module.exports = { sendLeadEmail };
