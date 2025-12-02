FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD [ "nginx", "-g", "daemon off;" ]