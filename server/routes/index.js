const express = require('express');
const router = express.Router();

// Placeholder for routes
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

module.exports = router;
