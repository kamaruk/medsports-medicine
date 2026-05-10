require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); 
const pool = require('./db');

const app = express();

// Настройка логирования (Morgan)
app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Проверка подключения к БД при старте
pool.connect()
    .then(() => console.log('PostgreSQL connected successfully'))
    .catch(err => console.error('Database connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cases', require('./routes/cases.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});