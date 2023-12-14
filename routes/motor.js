const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const controllersMotor = require('../controllers/motor');
const isValidObjectId = require('../middlewares/isValidObjectId');
const { authenticate} = require('../middlewares/isAuth');
const upload = require('../config/multer');
const { isAuthorMotor } = require('../middlewares/isAuthor');
const { validateMotor } = require('../middlewares/validator');

const router = express.Router();

router.get('/search', wrapAsync(controllersMotor.search));
router.get('/', wrapAsync(controllersMotor.index));
router.get('/detail/:id', isValidObjectId('/motors'), wrapAsync(controllersMotor.detail));

router.get('/create',authenticate, controllersMotor.form);
router.post('/create/upload',authenticate, upload.array('image', 5), wrapAsync(controllersMotor.store));

router.get('/:id/edit',authenticate, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.edit));
router.put('/:id/edit/update',authenticate, upload.array('image', 5), isValidObjectId('/motors'), validateMotor, wrapAsync(controllersMotor.update));
router.delete('/:id/deleted',authenticate, isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.destroy));

module.exports = router;
