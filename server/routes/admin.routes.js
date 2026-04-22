const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware: Проверка что пользователь - админ
const adminCheck = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ запрещен. Только для админов.' });
    }
    next();
};

// --- КЕЙСЫ ---

// 1. Добавить кейс
router.post('/cases', authMiddleware, adminCheck, async (req, res) => {
    try {
        const { title, category, description, image, difficulty, steps } = req.body;
        const result = await pool.query(
            'INSERT INTO cases (title, category, description, image, difficulty, steps) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, category, description, image, difficulty, JSON.stringify(steps)]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Редактировать кейс
router.put('/cases/:id', authMiddleware, adminCheck, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, image, difficulty, steps } = req.body;
        
        const result = await pool.query(
            `UPDATE cases 
             SET title = $1, category = $2, description = $3, image = $4, difficulty = $5, steps = $6 
             WHERE id = $7 RETURNING *`,
            [title, category, description, image, difficulty, JSON.stringify(steps), id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Кейс не найден' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Удалить кейс
router.delete('/cases/:id', authMiddleware, adminCheck, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM cases WHERE id = $1', [id]);
        res.json({ message: 'Кейс удален' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ДОСТИЖЕНИЯ (Ачивки) ---

// Получить все ачивки
router.get('/achievements', authMiddleware, adminCheck, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM achievements ORDER BY title');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавить ачивку
router.post('/achievements', authMiddleware, adminCheck, async (req, res) => {
    try {
        const { id, title, description } = req.body;
        if (!id || !title) return res.status(400).json({ message: 'ID и Название обязательны' });
        
        const result = await pool.query(
            'INSERT INTO achievements (id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [id, title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Удалить ачивку
router.delete('/achievements/:id', authMiddleware, adminCheck, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM achievements WHERE id = $1', [id]);
        res.json({ message: 'Ачивка удалена' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;