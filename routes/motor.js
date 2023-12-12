const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const controllersMotor = require('../controllers/motor');
const isValidObjectId = require('../middlewares/isValidObjectId');
const { isAuth } = require('../middlewares/isAuth');
const upload = require('../config/multer');
const { isAuthorMotor } = require('../middlewares/isAuthor');
const { validateMotor } = require('../middlewares/validator');

const router = express.Router();

router.get('/search', wrapAsync(controllersMotor.search));
router.get('/',isAuth,wrapAsync(controllersMotor.index));
router.get('/detail/:id', isValidObjectId('/motors'), wrapAsync(controllersMotor.detail));

router.get('/create', controllersMotor.form);
router.post('/create/upload', upload.array('image', 5), wrapAsync(controllersMotor.store));

router.get('/:id/edit', isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.edit));
router.put('/:id/edit/update', upload.array('image', 5), isValidObjectId('/motors'), validateMotor, wrapAsync(controllersMotor.update));
router.delete('/:id/deleted', isAuthorMotor, isValidObjectId('/motors'), wrapAsync(controllersMotor.destroy));

module.exports = router;
