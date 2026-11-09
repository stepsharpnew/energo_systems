const nodemailer = require("nodemailer");
const { ATTRIBUTION_KEYS } = require("./attribution");

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

const EMAIL_DIRECTIONS = {
  dgu: { prefix: "SMTP_DGU", tag: "ДГУ", label: "ДГУ для бизнеса" },
  ups: { prefix: "SMTP_UPS", tag: "ИБП", label: "ИБП для дома и посёлков" },
};

function getLeadDirection(data) {
  const path = String(data.sourcePage || "").replace(/\/+$/, "");
  if (path === "/services/dgu") return "dgu";
  if (path === "/services/ups") return "ups";

  // Older forms or browsers without Referer still identify their landing
  // through the existing service/product fields; no client SMTP settings.
  const service = String(data.service || "");
  if (/^(?:ДГУ(?:\s|$)|Опрос по ДГУ(?:\s|$))/iu.test(service)) return "dgu";
  if (/^(?:ИБП(?:\s|$)|Опрос по ИБП(?:\s|$))/iu.test(service)) return "ups";
  if (data.product === "Подбор генератора — резервное питание") return "dgu";
  return undefined;
}

function getEmailConfig(direction) {
  if (direction !== undefined && !Object.hasOwn(EMAIL_DIRECTIONS, direction)) {
    const error = new Error("Неизвестное направление SMTP");
    error.code = "SMTP_UNKNOWN_PROFILE";
    throw error;
  }
  const profile = EMAIL_DIRECTIONS[direction];
  const profileUser = profile && process.env[`${profile.prefix}_USER`];
  const profilePass = profile && process.env[`${profile.prefix}_PASS`];
  // Both empty preserves an existing single-mailbox deployment. Once either
  // is configured, never mix these credentials with the default account.
  const useProfile = Boolean(profileUser || profilePass);
  const user = useProfile ? profileUser : process.env.SMTP_USER;
  const pass = useProfile
    ? profilePass
    : process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  return {
    enabled: Boolean(user && pass),
    host: process.env.SMTP_HOST || "smtp.mail.ru",
    port: Number(process.env.SMTP_PORT || 465),
    secure: normalizeBoolean(process.env.SMTP_SECURE, true),
    user,
    pass,
    credentialKeys: useProfile ? `${profile.prefix}_USER/${profile.prefix}_PASS` : "SMTP_USER/SMTP_PASS",
    from: useProfile
      ? `"Энергосистемы — ${profile.label}" <${user}>`
      : process.env.EMAIL_FROM || (user ? `"Энергосистемы" <${user}>` : undefined),
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
    callbackPreferences,
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
    attribution = {},
  } = data;
  const leadTypeLabel = getLeadTypeLabel(type);
  const safeProduct = String(product || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 160);
  const direction = getLeadDirection(data);
  const baseSubject =
    type === "equipment" && safeProduct
      ? `${leadTypeLabel} — ${safeProduct}`
      : leadTypeLabel;
  const subject = direction ? `[${EMAIL_DIRECTIONS[direction].tag}] ${baseSubject}` : baseSubject;
  const rows = [
    ["Тип", leadTypeLabel],
  ];
  if (direction) rows.push(["Направление заявки", EMAIL_DIRECTIONS[direction].label]);

  if (type === "equipment") {
    rows.push(["Оборудование", product]);
  }
  rows.push(["Имя", name]);
  if (type === "equipment" && organization) {
    rows.push(["Организация", organization]);
  }
  if (type === "service" || contact) rows.push(["Телефон", contact]);
  if (contact && callbackPreferences) {
    rows.push(["Удобное время звонка (МСК)", callbackPreferences.time || "В рабочее время, 09:00–18:00"]);
    rows.push(["Звонки в выходные и праздники", callbackPreferences.allowNonWorkingDays ? "Разрешены клиентом" : "Не звонить — только рабочие дни"]);
  }
  if (email) rows.push(["Email для обратной связи", email]);

  if (type === "equipment") {
    if (location) rows.push(["Регион / город объекта", location]);
    if (comment) rows.push(["Описание задачи", comment]);
  } else {
    rows.push(["Услуга", service]);
    if (comment) rows.push(["Описание задачи", comment]);
  }

  // параметры объекта приходят и от опроса по услуге, и от опросников оборудования
  const answerRows = Array.isArray(answers)
    ? answers.map(({ label, value }) => [label, formatAnswerValue(value)])
    : [];
  const attributionRows = ATTRIBUTION_KEYS
    .filter((key) => attribution[key])
    .map((key) => [key, attribution[key]]);
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
  textSections.push(attributionRows.length
    ? `UTM-метки и рекламные идентификаторы\n${attributionRows.map(([key, value]) => `${key}: ${value}`).join("\n")}`
    : "UTM-метки: не переданы"
  );
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
      <h3 style="margin:24px 0 10px;font-size:17px;">UTM-метки и рекламные идентификаторы</h3>
      ${attributionRows.length
        ? `<table style="border-collapse:collapse;border:1px solid #d8dde6;">${buildHtmlRows(attributionRows)}</table>`
        : '<p>UTM-метки: не переданы</p>'}
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
  const config = getEmailConfig(getLeadDirection(data));

  if (!config.enabled) {
    throw new Error(
      `${config.credentialKeys} не заданы — email-уведомление о заявке не отправлено.`
    );
  }

  const transporter = createTransporter(config);
  const { subject, text, html } = buildLeadEmail(data);

  const result = await transporter.sendMail({
    from: config.from,
    to: config.to,
    cc: config.cc,
    subject,
    text,
    html,
  });

  // SMTP can accept only the CC recipient and still resolve sendMail().
  // Do not acknowledge the lead unless every primary mailbox was accepted.
  const accepted = (result.accepted || []).map((address) => address.toLowerCase());
  const primaryRecipients = config.to.split(",").map((address) => {
    const match = address.match(/<([^>]+)>/);
    return (match ? match[1] : address).trim().toLowerCase();
  }).filter(Boolean);
  const rejectedPrimary = primaryRecipients.filter((address) => !accepted.includes(address));
  if (!primaryRecipients.length || rejectedPrimary.length) {
    const error = new Error("SMTP не принял заявку для основного получателя");
    error.code = "EMAIL_RECIPIENT_REJECTED";
    error.rejected = rejectedPrimary;
    throw error;
  }

  return {
    messageId: result.messageId,
    accepted: result.accepted,
    rejected: result.rejected || [],
  };
}

async function verifyEmailConfiguration(direction) {
  const config = getEmailConfig(direction);
  if (!config.enabled) {
    const error = new Error(`${config.credentialKeys} не заданы`);
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }
  const transporter = createTransporter(config);
  try {
    await transporter.verify();
    return { host: config.host, port: config.port, user: config.user, to: config.to, cc: config.cc };
  } finally {
    transporter.close();
  }
}

module.exports = { buildLeadEmail, sendLeadEmail, verifyEmailConfiguration };
