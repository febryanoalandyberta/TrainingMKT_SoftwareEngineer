const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/submit', attendanceController.submitLog);
router.get('/logs', attendanceController.getAttendanceLogs);
router.get('/history', attendanceController.getHistory);
router.post('/permission', attendanceController.submitPermission);

module.exports = router;
