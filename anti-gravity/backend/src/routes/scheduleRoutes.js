const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/overrides', scheduleController.getOverrides);
router.post('/overrides', scheduleController.updateOverride);

module.exports = router;
