const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const controllersMotor = require('../controllers/motor');
const isValidObjectId = require('../middlewares/isValidObjectId');
const { isAuth } = require('../middlewares/isAuth');
const upload = require('../config/multer');
const { isAuthorMotor } = require('../middlewares/isAuthor');
const { validateMotor } = require('../middlewares/validator');

const router = express.Router();

router.get('/search',isAuth, wrapAsync(controllersMotor.search));
router.get('/',isAuth,wrapAsync(controllersMotor.index));
router.get('/detail/:id',isAuth, isValidObjectId('/motors'), wrapAsync(controllersMotor.detail));

router.get('/create',isAuth, controllersMotor.form);
router.post('/create/upload',isAuth, upload.array('image', 5), wrapAsync(controllersMotor.store));

router.get('/:id/edit', isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.edit));
router.put('/:id/edit/update',isAuth, upload.array('image', 5), isValidObjectId('/motors'), validateMotor, wrapAsync(controllersMotor.update));
router.delete('/:id/deleted',isAuth, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.destroy));

module.exports = router;
