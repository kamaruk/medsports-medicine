const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');

// Получить профиль
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // 1. Данные юзера
        const userRes = await pool.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [req.user.id]);
        if(userRes.rows.length === 0) return res.status(404).json({message: "User not found"});
        
        // 2. Прогресс с названием кейсов 
        const progressRes = await pool.query(`
            SELECT uc.id, uc.case_id, uc.status, uc.accuracy, uc.completed_at, c.title 
            FROM user_cases uc
            JOIN cases c ON uc.case_id = c.id
            WHERE uc.user_id = $1
            ORDER BY uc.completed_at DESC
        `, [req.user.id]);
        
        // 3. Ачивки
        const achieveRes = await pool.query(`
            SELECT a.id, a.title, a.description, ua.earned_at 
            FROM user_achievements ua
            JOIN achievements a ON ua.achievement_id = a.id
            WHERE ua.user_id = $1
        `, [req.user.id]);

        const user = userRes.rows[0];
        user.completedCases = progressRes.rows;
        user.achievements = achieveRes.rows;
        
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Сохранить прогресс 
router.post('/progress', authMiddleware, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { caseId, status, accuracy, answers } = req.body;
        const userId = req.user.id;

        const progressQuery = `
            INSERT INTO user_cases (user_id, case_id, status, accuracy, answers)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, case_id) 
            DO UPDATE SET status = $3, accuracy = $4, answers = $5, completed_at = NOW()
            RETURNING *;
        `;
        await client.query(progressQuery, [userId, caseId, status, accuracy, JSON.stringify(answers)]);

        const countRes = await client.query("SELECT COUNT(*) FROM user_cases WHERE user_id = $1 AND status = 'success'", [userId]);
        const successCount = parseInt(countRes.rows[0].count);

        let newAchievements = [];
        if (successCount >= 1) await checkAndAward(client, userId, 'first_case', newAchievements);
        if (successCount >= 5) await checkAndAward(client, userId, 'five_cases', newAchievements);
        if (successCount >= 10) await checkAndAward(client, userId, 'ten_cases', newAchievements);
        if (accuracy === 100 && status === 'success') await checkAndAward(client, userId, 'high_accuracy', newAchievements);

        await client.query('COMMIT');
        res.json({ message: 'Прогресс сохранен', newAchievements });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

// Обновить данные профиля (Имя, Аватар, Пароль)
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, email, avatar, password } = req.body;
        const userId = req.user.id;

        let query = 'UPDATE users SET name = $1, email = $2, avatar = $3';
        const params = [name, email, avatar];

        // Если передан новый пароль, хешируем и обновляем
        if (password && password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password = $4 WHERE id = $5 RETURNING id, name, email, role, avatar';
            params.push(hashedPassword);
            params.push(userId);
        } else {
            query += ' WHERE id = $4 RETURNING id, name, email, role, avatar';
            params.push(userId);
        }

        const result = await pool.query(query, params);
        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function checkAndAward(client, userId, achievementId, newAchievementsList) {
    const exists = await client.query('SELECT 1 FROM user_achievements WHERE user_id = $1 AND achievement_id = $2', [userId, achievementId]);
    if (exists.rows.length === 0) {
        await client.query('INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)', [userId, achievementId]);
        const ach = await client.query('SELECT * FROM achievements WHERE id = $1', [achievementId]);
        newAchievementsList.push(ach.rows[0]);
    }
}

module.exports = router;