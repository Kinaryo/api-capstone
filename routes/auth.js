// const express = require('express');
// const router = express.Router();  // Use express.Router() to create a router
// const User = require('../models/user');
// const wrapAsync = require('../utils/wrapAsync');
// const passport = require('passport');
// const controllersAuth = require('../controllers/auth');
// const bcrypt = require('bcrypt');

// // Register
// // router.get('/register', controllersAuth.registerForm);
// router.post('/register', wrapAsync(controllersAuth.register));

// // Login
// // router.get('/login', controllersAuth.loginForm);
// router.post('/login', controllersAuth.login);

// // Logout
// router.post('/logout', controllersAuth.logout);

// module.exports = router;



const {Router} = require('express')
const authController = require('../controllers/auth')
const router = Router();

router.get('/signup',authController.signup_get,)
router.post('/signup',authController.signup_post,)
router.get('/login',authController.login_get,)
router.post('/login',authController.login_post,)



module.exports = router