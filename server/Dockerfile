FROM node:18-alpine
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальные файлы бэкенда
COPY . .

EXPOSE 3000

# Запускаем сервер
CMD ["node", "index.js"]