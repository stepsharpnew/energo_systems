#!/bin/bash

# Скрипт для генерации самоподписанного SSL сертификата для разработки

echo "Создание директории для сертификатов..."
mkdir -p certs

echo "Генерация самоподписанного SSL сертификата..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/privkey.pem \
  -out certs/fullchain.pem \
  -subj "/C=RU/ST=State/L=City/O=Organization/CN=localhost"

echo "Сертификат создан в директории certs/"
echo "Для использования в docker-compose добавьте в volumes:"
echo "  - \"./certs:/etc/letsencrypt/live/localhost\""

