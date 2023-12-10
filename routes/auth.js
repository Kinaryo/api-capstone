const express = require('express');
const router = express.Router();  // Use express.Router() to create a router
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const controllersAuth = require('../controllers/auth');
const bcrypt = require('bcrypt');

// Register
// router.get('/register', controllersAuth.registerForm);
router.post('/register', wrapAsync(controllersAuth.register));

// Login
// router.get('/login', controllersAuth.loginForm);
router.post('/login', controllersAuth.login);

// Logout
router.post('/logout', controllersAuth.logout);

module.exports = router;
