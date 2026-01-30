const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const taskRoutes = require('./taskRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const supportRoutes = require('./supportRoutes');

router.get('/health', (req, res) => res.json({ status: 'OK' }));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/tasks', taskRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/support', supportRoutes);

module.exports = router;
