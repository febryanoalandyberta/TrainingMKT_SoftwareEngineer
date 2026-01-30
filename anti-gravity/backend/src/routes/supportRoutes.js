const express = require('express');
const router = express.Router();

router.get('/contacts', (req, res) => res.json({ message: 'Get Support Contacts' }));

module.exports = router;
