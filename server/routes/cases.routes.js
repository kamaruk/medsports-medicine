const express = require('express');
const router = express.Router();
const pool = require('../db');

// Получить все кейсы
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cases ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получить один кейс
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cases WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Кейс не найден" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;