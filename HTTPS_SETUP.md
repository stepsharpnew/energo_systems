# Инструкция по настройке HTTPS

## Вариант 1: Let's Encrypt (для продакшена)

### Шаг 1: Установите certbot на вашем сервере

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot

# CentOS/RHEL
sudo yum install certbot
```

### Шаг 2: Получите SSL сертификат

```bash
# Замените your-domain.com на ваш домен
sudo certbot certonly --standalone -d your-domain.com

# Или если у вас несколько доменов:
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
```

Сертификаты будут сохранены в:
- `/etc/letsencrypt/live/your-domain.com/fullchain.pem`
- `/etc/letsencrypt/live/your-domain.com/privkey.pem`

### Шаг 3: Обновите nginx.conf

В файле `nginx.conf` замените `your-domain.com` на ваш реальный домен в строках:
- `ssl_certificate`
- `ssl_certificate_key`
- `server_name`

### Шаг 4: Перезапустите контейнеры

```bash
docker-compose down
docker-compose up -d
```

### Шаг 5: Автоматическое обновление сертификатов

Let's Encrypt сертификаты действительны 90 дней. Настройте автоматическое обновление:

```bash
# Добавьте в crontab
sudo crontab -e

# Добавьте строку (обновление каждый месяц)
0 0 1 * * certbot renew --quiet && docker-compose restart nginx
```

## Вариант 2: Самоподписанный сертификат (для разработки)

### Шаг 1: Создайте директорию для сертификатов

```bash
mkdir -p certs
```

### Шаг 2: Создайте самоподписанный сертификат

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/privkey.pem \
  -out certs/fullchain.pem \
  -subj "/C=RU/ST=State/L=City/O=Organization/CN=localhost"
```

### Шаг 3: Обновите docker-compose.yml

Добавьте монтирование локальных сертификатов:

```yaml
nginx:
  image: nginx:stable-alpine
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - "./nginx.conf:/etc/nginx/nginx.conf"
    - "./certs:/etc/letsencrypt/live/localhost"  # Добавьте эту строку
    - "/etc/letsencrypt:/etc/letsencrypt"
  depends_on:
    - frontend
  networks:
    - dev
```

### Шаг 4: Обновите nginx.conf для локального использования

В `nginx.conf` измените пути:
- `ssl_certificate /etc/letsencrypt/live/localhost/fullchain.pem;`
- `ssl_certificate_key /etc/letsencrypt/live/localhost/privkey.pem;`
- `server_name localhost;`

### Шаг 5: Перезапустите контейнеры

```bash
docker-compose down
docker-compose up -d
```

**Примечание:** Браузер покажет предупреждение о небезопасном соединении для самоподписанного сертификата. Это нормально для разработки.

## Проверка

После настройки проверьте:
1. HTTP редирект: `http://your-domain.com` должен перенаправлять на `https://your-domain.com`
2. HTTPS работает: `https://your-domain.com` должен открываться без ошибок
3. SSL тест: используйте [SSL Labs](https://www.ssllabs.com/ssltest/) для проверки конфигурации

## Важные замечания

- Убедитесь, что порты 80 и 443 открыты в файрволе
- Для Let's Encrypt домен должен указывать на IP вашего сервера
- Не забудьте обновить `server_name` в nginx.conf на ваш реальный домен

