const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => res.json({ message: 'My Profile' }));
router.put('/me', (req, res) => res.json({ message: 'Update Profile' }));

module.exports = router;
