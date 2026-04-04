const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authenticate = require('../middleware/auth.middleware');

// Apply authentication middleware to all project routes
router.use(authenticate);

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/restore-version', projectController.restoreVersion);
router.post('/:id/share', projectController.enableSharing);

module.exports = router;
