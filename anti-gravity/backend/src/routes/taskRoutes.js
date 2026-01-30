const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'List Tasks' }));
router.post('/', (req, res) => res.json({ message: 'Create Task' }));
router.put('/:id', (req, res) => res.json({ message: 'Update Task' }));

module.exports = router;
