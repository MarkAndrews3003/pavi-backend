const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateCompany = require('../validators/validateCompany');
const upload = require('../config/multer');


router.post('/upload/avatar', upload.uploadAvatar.single('avatar'), usersController.uploadAvatar);
router.post('/upload/cover', upload.uploadCover.single('cover'), usersController.uploadCover);


module.exports = router;
