const multer = require('multer')
const fs = require('fs');
const path = require('path');

const Users = require('../mongoose/models/users');
const CV = require('../mongoose/models/CV_Resume');
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
        if (!fs.existsSync('uploads/avatars')) {
            fs.mkdirSync('uploads/avatars');
        }
        cb(null, 'uploads/avatars')
    },
    filename: async (req, file, cb) => {


        await removePreviousImgFile(req.body, 'avatar');

        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});


removePreviousImgFile = async (data, imgType) => {
    let user = await Users.findOne({
        _id: data.user_id
    });
    if (user[imgType]) {


        let path = 'uploads/' + imgType + 's/' + user[imgType];
        if (fs.existsSync(path)) {

            fs.unlink(path, (err) => {
                if (err) throw err;
            });
        }
    }
}

exports.uploadAvatar = multer({
    storage: uploadAvatar,
    limits: {
        fileSize: 1000000
    },
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
        if (!fs.existsSync('uploads/covers')) {
            fs.mkdirSync('uploads/covers');
        }
        cb(null, 'uploads/covers')
    },
    filename: async (req, file, cb) => {
        await removePreviousImgFile(req.body, 'cover');

        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});


exports.uploadCover = multer({
    storage: storageCover,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});


////Upload PDF file

let storagePDF = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('pdf')) {
            fs.mkdirSync('pdf');
        }
        if (!fs.existsSync('pdf')) {
            fs.mkdirSync('pdf');
        }
        cb(null, 'pdf')
    },
    filename: async (req, file, cb) => {

        let pdf_name = path.basename(file.originalname, '.pdf') + '_' + Date.now() + '.pdf'
        //id: 5ebbcc0684866c7bc03d96a6
        let pdf = await CV.findOne({
            user_id: req.body.user_id
        });

        if (pdf.pdf_file || pdf.pdf_file != '') {
            console.log(pdf.pdf_file);
            let path = 'pdf/' + pdf.pdf_file;
            if (fs.existsSync(path)) {

                fs.unlink(path, (err) => {
                    if (err) throw err;
                });
            }
        }
        pdf.pdf_file = pdf_name;
        pdf.save();
        cb(null, pdf_name);
    }
});


exports.uploadPDF = multer({
    storage: storagePDF,
    fileFilter: function (req, file, cb) {
        const filetype = /pdf/;
        const extname = (filetype.test(path.extname(file.originalname).toLowerCase()));
        const mimetype = (file.mimetype == 'application/pdf');
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: PDF file only!');
        }
    }
});