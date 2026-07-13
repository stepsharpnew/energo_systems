require("dotenv").config();

const { randomUUID } = require("crypto");
const express = require("express");
const cors = require("cors");
const { sendLeadEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 3001;
const CONSENT_VERSION = "2026-07-13";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

const rateLimitCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) rateLimitStore.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS);
rateLimitCleanup.unref();

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || "https://e-systems.su")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("X-Content-Type-Options", "nosniff");

  const origin = req.get("origin");
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ ok: false, error: "origin_not_allowed" });
  }

  return next();
});

app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.has(origin));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  })
);
app.use(express.json({ limit: "16kb", strict: true }));

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getSourcePage(referer) {
  if (!referer) return "/";

  try {
    const url = new URL(referer);
    return allowedOrigins.has(url.origin) ? url.pathname.slice(0, 300) : "/";
  } catch {
    return "/";
  }
}

function leadRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    res.set("Retry-After", String(Math.ceil((current.resetAt - now) / 1000)));
    return res.status(429).json({ ok: false, error: "too_many_requests" });
  }

  current.count += 1;
  return next();
}

async function handleLeadSubmit(req, res) {
  try {
    if (!req.body || Array.isArray(req.body) || typeof req.body !== "object") {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    const allowedFields = new Set([
      "type",
      "name",
      "contact",
      "email",
      "service",
      "consent",
      "consentVersion",
    ]);
    const hasUnexpectedFields = Object.keys(req.body).some(
      (field) => !allowedFields.has(field)
    );

    if (hasUnexpectedFields) {
      return res.status(400).json({ ok: false, error: "unexpected_fields" });
    }

    const type = normalizeText(req.body.type);
    const name = normalizeText(req.body.name);
    const contact = normalizeText(req.body.contact);
    const email = normalizeText(req.body.email);
    const service = normalizeText(req.body.service);

    if (type !== "service") {
      return res.status(400).json({ ok: false, error: "invalid_type" });
    }

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ ok: false, error: "invalid_name" });
    }

    if (!/^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(contact)) {
      return res.status(400).json({ ok: false, error: "invalid_contact" });
    }

    if (email.length > 254 || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "invalid_email" });
    }

    if (service.length < 2 || service.length > 200) {
      return res.status(400).json({ ok: false, error: "invalid_service" });
    }

    if (
      req.body.consent !== true ||
      req.body.consentVersion !== CONSENT_VERSION
    ) {
      return res.status(400).json({ ok: false, error: "consent_required" });
    }

    const consentRecordId = randomUUID();
    const consentAcceptedAt = new Date().toISOString();

    await sendLeadEmail({
      type,
      name,
      contact,
      email,
      service,
      consentRecordId,
      consentVersion: CONSENT_VERSION,
      consentAcceptedAt,
      ipAddress: req.ip,
      userAgent: normalizeText(req.get("user-agent")).slice(0, 500),
      sourcePage: getSourcePage(req.get("referer")),
    });

    console.info("Согласие на обработку персональных данных зафиксировано", {
      consentRecordId,
      consentVersion: CONSENT_VERSION,
      consentAcceptedAt,
    });

    return res.json({ ok: true, requestId: consentRecordId });
  } catch (error) {
    console.error("Ошибка при отправке заявки по email:", error);
    return res.status(500).json({ ok: false, error: "email_send_failed" });
  }
}

app.post("/api/lead", leadRateLimit, handleLeadSubmit);
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ ok: false, error: "invalid_json" });
  }

  if (error?.type === "entity.too.large") {
    return res.status(413).json({ ok: false, error: "payload_too_large" });
  }

  console.error("Необработанная ошибка API:", error);
  return res.status(500).json({ ok: false, error: "internal_error" });
});

app.listen(PORT, () => {
  console.log(`HTTP-сервис заявок запущен на порту ${PORT}`);
});
