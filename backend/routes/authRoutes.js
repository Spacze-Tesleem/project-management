// backend/routes/authRoutes.js
const express = require('express');
const { 
  login, 
  register,
  retrieve, 
  refreshToken, 
  logout, 
  getMe 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/retrieve', retrieve);
router.post('/refresh-token', refreshToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;