## HTTP-сервис заявок

Сервис принимает заявки с сайта и отправляет их на почту через SMTP Mail.ru.

Основной endpoint:

```text
POST /api/lead
```

Обязательные поля JSON:

```json
{
  "name": "Имя клиента",
  "contact": "+7 999 000-00-00"
}
```

Дополнительные поля: `email`, `type`, `service`, `message`, `extra`, `source`.

### Настройка окружения

При запуске через корневой `docker-compose.yml` переменные должны быть в
корневом `.env` рядом с `docker-compose.yml`:

```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=application@e-systems.su
SMTP_PASS=пароль_для_внешнего_приложения_mail_ru
EMAIL_FROM=Энергосистемы <application@e-systems.su>
EMAIL_TO=sales@e-systems.su
EMAIL_CC=inbox@e-systems.su
```

Для Mail.ru обычно нужен пароль для внешнего приложения, а не основной пароль
от почтового ящика.

### Запуск

```bash
npm install
npm start
```

В Docker сервис слушает порт `3001` внутри compose-сети.
