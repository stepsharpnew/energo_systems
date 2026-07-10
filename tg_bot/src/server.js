require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sendLeadEmail } = require("./mailer");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

async function handleLeadSubmit(req, res) {
  try {
    const { type, name, contact, email, message, service, extra, source } =
      req.body || {};

    if (!name || !contact) {
      return res
        .status(400)
        .json({ ok: false, error: "name и contact обязательны" });
    }

    await sendLeadEmail({
      type,
      name,
      contact,
      email,
      service,
      message,
      extra,
      source,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error("Ошибка при отправке заявки по email:", e);
    return res.status(500).json({ ok: false, error: "email_send_failed" });
  }
}

app.post("/api/lead", handleLeadSubmit);
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`HTTP-сервис заявок запущен на порту ${PORT}`);
});
