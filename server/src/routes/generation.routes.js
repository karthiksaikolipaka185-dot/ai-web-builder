const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generation.controller');
const authenticate = require('../middleware/auth.middleware');

// Apply authentication middleware to all generation routes
router.use(authenticate);

router.post('/:projectId', generationController.generateCode);

module.exports = router;
