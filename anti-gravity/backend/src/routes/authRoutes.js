const express = require('express');
const router = express.Router();
// Placeholder controller
const authController = {
    loginGoogle: (req, res) => res.json({ message: 'Google Login' }),
    refreshToken: (req, res) => res.json({ message: 'Refresh Token' })
};

router.post('/google', authController.loginGoogle);
router.post('/refresh', authController.refreshToken);

module.exports = router;
