const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');
const generationRoutes = require('./generation.routes');
const publicRoutes = require('./public.routes');

// Mount auth routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/generate', generationRoutes);
router.use('/public', publicRoutes);

// Placeholder for other routes
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

module.exports = router;
