const express = require('express');
const router = express.Router();

router.post('/check-in', (req, res) => res.json({ message: 'Check In' }));
router.post('/check-out', (req, res) => res.json({ message: 'Check Out' }));
router.get('/history', (req, res) => res.json({ message: 'Attendance History' }));

module.exports = router;
