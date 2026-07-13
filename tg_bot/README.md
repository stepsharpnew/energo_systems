## HTTP-сервис заявок

Сервис принимает заявки с сайта и отправляет их на почту через SMTP Mail.ru.

Основной endpoint:

```text
POST /api/lead
```

Обязательные поля JSON:

```json
{
  "type": "service",
  "name": "Имя клиента",
  "contact": "+7 (999)-000-00-00",
  "service": "Название услуги",
  "consent": true,
  "consentVersion": "2026-07-13"
}
```

Дополнительное поле: `email`. Произвольные поля API не принимает. Для каждой
принятой заявки сервер формирует идентификатор записи и фиксирует версию и
время согласия, IP-адрес, User-Agent и страницу отправки. Лимит — пять попыток
с одного IP-адреса за 15 минут.

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
ALLOWED_ORIGINS=https://e-systems.su
```

Несколько разрешённых источников можно перечислить через запятую. В рабочей
среде не добавляйте в список посторонние домены.

Для Mail.ru обычно нужен пароль для внешнего приложения, а не основной пароль
от почтового ящика.

### Запуск

```bash
npm install
npm start
```

В Docker сервис слушает порт `3001` внутри compose-сети.
