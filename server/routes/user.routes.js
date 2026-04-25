const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');

// --- НАСТРОЙКА ЗАГРУЗКИ АВАТАРОВ ---
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    cb(null, 'user-' + req.user.id + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- МАРШРУТЫ ---

// 1. Получить профиль (ИСПРАВЛЕНО: возвращает полные данные)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // 1. Данные юзера
        const userRes = await pool.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [req.user.id]);
        if(userRes.rows.length === 0) return res.status(404).json({message: "User not found"});
        
        // 2. Прогресс с названиями кейсов (JOIN)
        const progressRes = await pool.query(`
            SELECT uc.id, uc.case_id, uc.status, uc.accuracy, uc.completed_at, c.title 
            FROM user_cases uc
            JOIN cases c ON uc.case_id = c.id
            WHERE uc.user_id = $1
            ORDER BY uc.completed_at DESC
        `, [req.user.id]);
        
        // 3. Ачивки (JOIN)
        const achieveRes = await pool.query(`
            SELECT a.id, a.title, a.description, ua.earned_at 
            FROM user_achievements ua
            JOIN achievements a ON ua.achievement_id = a.id
            WHERE ua.user_id = $1
        `, [req.user.id]);

        const user = userRes.rows[0];
        user.completedCases = progressRes.rows; // Добавляем прогресс
        user.achievements = achieveRes.rows;    // Добавляем ачивки
        
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Сохранить прогресс кейса
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

        // Проверка ачивок
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

// 3. Обновить данные профиля (с аватаркой)
router.put('/profile', authMiddleware, upload.single('avatar'), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user.id;

        let queryParts = ['name = $1', 'email = $2'];
        let params = [name, email];
        let paramIndex = 3;

        if (req.file) {
            const avatarUrl = '/uploads/avatars/' + req.file.filename;
            queryParts.push(`avatar = $${paramIndex}`);
            params.push(avatarUrl);
            paramIndex++;
        }

        if (password && password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            queryParts.push(`password = $${paramIndex}`);
            params.push(hashedPassword);
            paramIndex++;
        }

        params.push(userId);

        const query = `
            UPDATE users 
            SET ${queryParts.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING id, name, email, role, avatar
        `;

        const result = await pool.query(query, params);
        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Хелпер для выдачи ачивок
async function checkAndAward(client, userId, achievementId, newAchievementsList) {
    const exists = await client.query('SELECT 1 FROM user_achievements WHERE user_id = $1 AND achievement_id = $2', [userId, achievementId]);
    if (exists.rows.length === 0) {
        await client.query('INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)', [userId, achievementId]);
        const ach = await client.query('SELECT * FROM achievements WHERE id = $1', [achievementId]);
        newAchievementsList.push(ach.rows[0]);
    }
}

module.exports = router;