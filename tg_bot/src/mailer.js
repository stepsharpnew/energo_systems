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
  if (type === "equipment") return "Заявка на оборудование";
  return "Новая заявка с сайта";
}

function formatAnswerValue(value) {
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "не выбрано";
  return value || "не указано";
}

function buildHtmlRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #d8dde6;font-weight:700;background:#f3f6fb;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #d8dde6;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
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
    family: Number(process.env.SMTP_FAMILY || 4),
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS || 10000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 10000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 15000),
  };
}

function buildLeadEmail(data) {
  const {
    type,
    name,
    contact,
    email,
    service,
    product,
    organization,
    location,
    comment,
    answers,
    consentRecordId,
    consentVersion,
    consentAcceptedAt,
    ipAddress,
    userAgent,
    sourcePage,
  } = data;
  const leadTypeLabel = getLeadTypeLabel(type);
  const safeProduct = String(product || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 160);
  const subject =
    type === "equipment" && safeProduct
      ? `${leadTypeLabel} — ${safeProduct}`
      : leadTypeLabel;
  const rows = [
    ["Тип", leadTypeLabel],
  ];

  if (type === "equipment") {
    rows.push(["Оборудование", product]);
  }
  rows.push(["Имя", name]);
  if (type === "equipment" && organization) {
    rows.push(["Организация", organization]);
  }
  if (type === "service" || contact) rows.push(["Телефон", contact]);
  if (email) rows.push(["Email для обратной связи", email]);

  if (type === "equipment") {
    if (location) rows.push(["Регион / город объекта", location]);
    if (comment) rows.push(["Описание задачи", comment]);
  } else {
    rows.push(["Услуга", service]);
  }

  const answerRows =
    type === "equipment" && Array.isArray(answers)
      ? answers.map(({ label, value }) => [label, formatAnswerValue(value)])
      : [];
  const auditRows = [
    ["Согласие", "Получено отдельной отметкой в форме"],
    ["Идентификатор согласия", consentRecordId],
    ["Версия согласия", consentVersion],
    ["Время согласия (UTC)", consentAcceptedAt],
    ["IP-адрес", ipAddress],
    ["User-Agent", userAgent || "не передан"],
    ["Страница отправки", sourcePage],
  ];

  const textSections = [
    rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
  ];
  if (answerRows.length) {
    textSections.push(
      `Технические параметры\n${answerRows
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n")}`
    );
  }
  textSections.push(
    `Сведения об отправке\n${auditRows
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n")}`
  );
  const text = textSections.join("\n\n");

  const technicalSection = answerRows.length
    ? `
      <h3 style="margin:24px 0 10px;font-size:17px;">Технические параметры</h3>
      <table style="border-collapse:collapse;border:1px solid #d8dde6;">${buildHtmlRows(answerRows)}</table>`
    : "";

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#172033;">
      <h2 style="margin:0 0 16px;">${escapeHtml(leadTypeLabel)}</h2>
      <table style="border-collapse:collapse;border:1px solid #d8dde6;">
        ${buildHtmlRows(rows)}
      </table>
      ${technicalSection}
      <h3 style="margin:24px 0 10px;font-size:17px;">Сведения об отправке</h3>
      <table style="border-collapse:collapse;border:1px solid #d8dde6;">
        ${buildHtmlRows(auditRows)}
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
    family: config.family,
    connectionTimeout: config.connectionTimeout,
    greetingTimeout: config.greetingTimeout,
    socketTimeout: config.socketTimeout,
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

module.exports = { buildLeadEmail, sendLeadEmail };
