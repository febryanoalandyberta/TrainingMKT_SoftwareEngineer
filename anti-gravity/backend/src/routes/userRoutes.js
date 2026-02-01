const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/settings', userController.getSettings);
router.post('/settings', userController.updateSettings);
router.get('/me', (req, res) => res.json({ message: 'My Profile' }));

module.exports = router;
