FROM node:20-alpine as build
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
# Используем npm install вместо npm ci для большей гибкости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы
COPY . .

# Генерируем статический сайт
RUN npm run generate

FROM nginx:stable-alpine
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD [ "nginx", "-g", "daemon off;" ]