const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateCompany = require('../validators/validateCompany');
const upload = require('../config/multer');

const defender = require('../config/token_validation').validation;

router.post('/upload/avatar', upload.uploadAvatar.single('avatar'), usersController.uploadAvatar);
router.post('/upload/cover', upload.uploadCover.single('cover'), usersController.uploadCover);

//Fields: old_pass and new_pass
router.put('/change_pass', usersController.change_pass);

//Fields: old_email and new_email
router.put('/change_email', defender, usersController.change_email);

//Field: new_desc
router.put('/change_description', usersController.change_description);

///Fields: phone,age,country and gender
router.put('/change_PACG', usersController.change_PACG);

module.exports = router;
