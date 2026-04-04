const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

// Unauthenticated public viewing route
router.get('/:shareId', projectController.getPublicProject);

module.exports = router;
