require("dotenv").config();
const { verifyEmailConfiguration } = require("./mailer");

verifyEmailConfiguration().then((config) => {
  console.info("Соединение с SMTP и авторизация проверены. Письма не отправлялись.", config);
}).catch((error) => {
  console.error("Проверка SMTP не пройдена:", {
    code: error.code,
    command: error.command,
    responseCode: error.responseCode,
    message: error.message,
  });
  process.exitCode = 1;
});
