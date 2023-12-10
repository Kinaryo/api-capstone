const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const controllersMotor = require('../controllers/motor'); // Perbaikan pada penulisan 'controllersMotor'
const ErrorHandler = require('../utils/ErrorHandler');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthToken } = require('../middlewares/isAuth');
const isAuthor = require('../middlewares/isAuthor');
const upload = require('../config/multer');
const Motor = require('../models/motor');
const { isAuthorMotor }  = require('../middlewares/isAuthor');
const { validateMotor } = require('../middlewares/validator');

const router = express.Router();

router.get('/search', isAuthToken, wrapAsync(controllersMotor.search)); // Perbaikan pada penulisan 'controllersMotor'
router.get('/', isAuthToken, wrapAsync(controllersMotor.index)); // Perbaikan pada penulisan 'controllersMotor'
router.get('/detail/:id', isAuthToken, isValidObjectId('/motors'), wrapAsync(controllersMotor.detail)); // Perbaikan pada penulisan 'controllersMotor'

router.get('/create/', isAuth, controllersMotor.form); // Perbaikan pada penulisan 'controllersMotor'
router.post('/create/upload', isAuth, upload.array('image', 5), wrapAsync(controllersMotor.store)); // Perbaikan pada penulisan 'controllersMotor'

router.get('/:id/edit', isAuth, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.edit)); // Perbaikan pada penulisan 'controllersMotor'
router.put('/:id/edit/update', isAuth, upload.array('image', 5), isValidObjectId('/motors'), validateMotor, wrapAsync(controllersMotor.update)); // Perbaikan pada penulisan 'controllersMotor'
router.delete('/:id/deleted', isAuth, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.destroy)); // Perbaikan pada penulisan 'controllersMotor'

module.exports = router;
