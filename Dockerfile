# Этап 1: Сборка фронтенда
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап 2: Раздача через Nginx
FROM nginx:alpine
# Копируем собранные файлы Vue в папку Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]