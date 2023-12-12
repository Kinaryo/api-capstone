const express = require('express')
const router = express.Router()

const controllersAuth = require('../controllers/auth')

router.post('/login', controllersAuth.login)
router.post('/register', controllersAuth.register)
router.get('/logout', controllersAuth.logout)
    


module.exports = router;
