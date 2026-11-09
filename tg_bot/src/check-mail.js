require("dotenv").config();
const { verifyEmailConfiguration } = require("./mailer");

async function checkMail() {
  const directions = process.argv.slice(2);
  for (const direction of directions.length ? directions : [undefined]) {
    const profile = direction || "default";
    try {
      const config = await verifyEmailConfiguration(direction);
      console.info("Соединение с SMTP и авторизация проверены. Письма не отправлялись.", { profile, ...config });
    } catch (error) {
      console.error("Проверка SMTP не пройдена:", {
        profile,
        code: error.code,
        command: error.command,
        responseCode: error.responseCode,
        message: error.message,
      });
      process.exitCode = 1;
    }
  }
}

checkMail();
