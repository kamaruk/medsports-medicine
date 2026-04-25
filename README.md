```markdown
# My Med Trainer

Платформа для обучения врачей и студентов через интерактивные медицинские кейсы.

## 🛠 Технологии

*   **Frontend:** Vue.js 3, Vuetify 3, Vuex, Axios.
*   **Backend:** Node.js, Express.js.
*   **Database:** PostgreSQL.
*   **Deploy:** Docker.

---

## 📂 Структура проекта

```
my-med-trainer/
├── db/ # Инициализация Базы Данных
│ └── init.db # SQL скрипт (создание таблиц)
├── public/ # Статические файлы фронтенда
│ ├── animations/
│ └── videos/
├── server/ # Бэкенд (Node.js + Express)
│ ├── middleware/ # Проверки авторизации
│ ├── routes/ # API маршруты
│ ├── uploads/ # Загруженные файлы (аватарки)
│ ├── .env # Переменные окружения (создать вручную)
│ ├── db.js # Подключение к PostgreSQL
│ ├── Dockerfile # Инструкция для Docker
│ └── index.js # Точка входа
├── src/ # Фронтенд (Vue.js 3)
│ ├── api/ # Настройка Axios
│ ├── assets/ # Картинки, иконки
│ ├── components/ # Vue компоненты
│ ├── pages/ # Страницы (Views)
│ ├── router/ # Маршрутизация
│ ├── store/ # Хранилище данных (Vuex)
│ ├── plugins/ # Vuetify
│ ├── App.vue
│ └── main.js
├── .gitignore
├── docker-compose.yml # Оркестрация контейнеров
├── Dockerfile # Сборка фронтенда (опционально)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Запуск проекта

### Способ 1: Локальный запуск (Разработка)

**Требования:** Node.js, PostgreSQL.

#### 1. База Данных
*   Создайте БД `med_trainer`.
*   Выполните скрипт из файла `db/init.db` (SQL код ниже).

#### 2. Бэкенд (Папка `server/`)
Файл `.env` в папке `server/`:
```env
DB_USER=postgres
DB_PASSWORD=ВАШ_ПАРОЛЬ
DB_HOST=localhost
DB_PORT=5432
DB_NAME=med_trainer
JWT_SECRET=secret_key_123
PORT=3000
```

#### 3. Запуск Бэкенда (папка server)
```bash
cd server
npm install
node index.js
```
Сервер запустится на `http://localhost:3000`.

#### 4. Запуск Фронтенда (корневая папка)
```bash
npm install
npm run dev
```
Клиент запустится на `http://localhost:5173`.

---

Способ 2: Docker (Автоматический запуск)
Этот способ поднимает Базу Данных и Сервер автоматически. Фронтенд запускается отдельно.

1. Подготовка файлов
Убедитесь, что у вас созданы файлы:

db/init.db (с SQL кодом создания таблиц).
server/Dockerfile.
docker-compose.yml.
2. Запуск
В корне проекта выполните:

docker-compose up --build

Docker сам создаст контейнеры, применит скрипт init.db и запустит сервер.
Фронтенд запустите отдельно командой npm run dev.

🗄 Инициализация Базы Данных (db/init.db)
Этот файл выполняется автоматически при первом запуске Docker. Если запускаете локально — выполните этот код вручную в pgAdmin.


-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    avatar TEXT
);

-- Таблица кейсов
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    image TEXT,
    difficulty INTEGER,
    steps JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Прогресс пользователей
CREATE TABLE user_cases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    case_id INTEGER REFERENCES cases(id),
    status VARCHAR(50),
    accuracy INTEGER,
    answers JSONB,
    completed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, case_id)
);

-- Шаблоны достижений
CREATE TABLE achievements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Связь пользователей и достижений
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    achievement_id VARCHAR(50) REFERENCES achievements(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Заполнение достижений
INSERT INTO achievements (id, title, description) VALUES 
('first_case', 'Первый кейс', 'Поздравляем с первым пройденным кейсом!'),
('five_cases', '5 кейсов', 'Пройдено 5 кейсов'),
('ten_cases', '10 кейсов', 'Пройдено 10 кейсов'),
('high_accuracy', 'Точность 100%', 'Кейс пройден с идеальной точностью');

👤 Тестовые аккаунты и Роли
Регистрация на сайте открыта для всех. Роли назначаются в базе данных.

Студент:
Зарегистрируйтесь через сайт.
Роль student присваивается автоматически.
Администратор:
Зарегистрируйте обычный аккаунт.
Зайдите в БД (pgAdmin или терминал) и выполните:

UPDATE users SET role = 'admin' WHERE email = 'ваш_email@example.com';

Перелогиньтесь. Появится кнопка "Админ-панель".
Данные для подключения к БД (Docker):

Host: localhost
Port: 5433 (или 5432 если локально)
User: postgres
Pass: postgres
DB: med_trainer
📡 Основные API Эндпоинты

POST	/api/auth/register	Регистрация	Публичный
POST	/api/auth/login	Авторизация	Публичный
GET	/api/cases	Список кейсов	Публичный
GET	/api/user/profile	Профиль + прогресс	Авторизованный
POST	/api/user/progress	Сохранить результат кейса	Авторизованный
PUT	/api/user/profile	Обновить профиль/аватар	Авторизованный
POST	/api/admin/cases	Добавить кейс	Admin
GET	/api/admin/achievements	Список ачивок	Admin
