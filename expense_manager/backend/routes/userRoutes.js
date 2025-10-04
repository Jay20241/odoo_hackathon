// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.route('/').post(protect, isAdmin, createUser).get(protect, isAdmin, getUsers);

module.exports = router;