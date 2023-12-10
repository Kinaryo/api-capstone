const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const controllersMotor = require('../controllers/motor');
const isValidObjectId = require('../middlewares/isValidObjectId');
const { isAuthToken } = require('../middlewares/isAuth');
const upload = require('../config/multer');
const { isAuthorMotor } = require('../middlewares/isAuthor');
const { validateMotor } = require('../middlewares/validator');

const router = express.Router();

router.get('/search', isAuthToken, wrapAsync(controllersMotor.search));
router.get('/', isAuthToken, wrapAsync(controllersMotor.index));
router.get('/detail/:id', isAuthToken, isValidObjectId('/motors'), wrapAsync(controllersMotor.detail));

router.get('/create', isAuthToken, controllersMotor.form);
router.post('/create/upload', isAuthToken, upload.array('image', 5), wrapAsync(controllersMotor.store));

router.get('/:id/edit', isAuthToken, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.edit));
router.put('/:id/edit/update', isAuthToken, upload.array('image', 5), isValidObjectId('/motors'), validateMotor, wrapAsync(controllersMotor.update));
router.delete('/:id/deleted', isAuthToken, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.destroy));

module.exports = router;
