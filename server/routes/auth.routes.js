const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Регистрация (только студент)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, hashedPassword, 'student']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        
        if (err.code === '23505') {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }
        res.status(500).json({ error: err.message });
    }
});

// Вход
router.post('/login', async (req, res) => {
    try {
        console.log('Полученные данные:', req.body); // Посмотрим, что пришло от фронта
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        console.log('Найден юзер:', user ? 'Да' : 'Нет'); // Нашелся ли юзер в БД

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;