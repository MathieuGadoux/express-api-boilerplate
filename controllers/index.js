const express = require('express');
const router = express.Router();

const userRoutes = require('./users');

// Routes
router.use('/users', userRoutes);

module.exports = router;