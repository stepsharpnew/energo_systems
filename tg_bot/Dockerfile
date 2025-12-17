FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем исходный код
COPY src ./src

# Открываем порт для HTTP API
EXPOSE 3001

# Запускаем бота
CMD ["npm", "start"]

