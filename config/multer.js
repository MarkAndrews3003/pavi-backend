const multer = require('multer')
const fs = require('fs');
const path = require('path');

checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



let uploadAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
            fs.mkdirSync('uploads/avatars');
        }
        if(!fs.existsSync('uploads/avatars')){
            fs.mkdirSync('uploads/avatars');
        }
        cb(null, 'uploads/avatars')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});


exports.uploadAvatar = multer({
    storage: uploadAvatar,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});


let storageCover = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
            fs.mkdirSync('uploads/covers');
        }
        if(!fs.existsSync('uploads/covers')){
            fs.mkdirSync('uploads/covers');
        }
        cb(null, 'uploads/covers')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});


exports.uploadCover = multer({
    storage: storageCover,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});


