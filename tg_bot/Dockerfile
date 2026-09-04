FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Воспроизводимая установка без сетевого аудита во время деплоя.
# Ограничиваем ожидание npm и выводим сетевые ошибки в лог сборки.
RUN npm ci --omit=dev --no-audit --no-fund \
    --fetch-timeout=30000 --fetch-retries=2 \
    --fetch-retry-mintimeout=2000 --fetch-retry-maxtimeout=10000 \
    --loglevel=verbose --foreground-scripts

# Копируем исходный код
COPY src ./src

# Открываем порт для HTTP API
EXPOSE 3001

# Запускаем HTTP-сервис заявок
CMD ["npm", "start"]
