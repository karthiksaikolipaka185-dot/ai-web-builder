const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
