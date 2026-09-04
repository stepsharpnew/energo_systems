FROM node:20-alpine AS build
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Строго используем lockfile; сетевые ошибки видны до общего таймаута сборки.
# Аудит зависимостей выполняется отдельно, а не блокирует выпуск сайта.
RUN npm ci --legacy-peer-deps --no-audit --no-fund \
    --fetch-timeout=30000 --fetch-retries=2 \
    --fetch-retry-mintimeout=2000 --fetch-retry-maxtimeout=10000 \
    --loglevel=verbose --foreground-scripts

# Копируем остальные файлы
COPY . .

# Генерируем статический сайт
RUN npm run generate

FROM nginx:stable-alpine
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD [ "nginx", "-g", "daemon off;" ]
