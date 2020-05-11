const jwt = require('jsonwebtoken');
const fs = require('fs');
const Users = require('../mongoose/models/users');

// const Users = db.users;
const bcrypt = require('bcryptjs');

exports.change_pass = async (req, res) => {
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findById(decoded._id, function (err, result) {
                if (bcrypt.compareSync(req.body.old_pass, result.password)) {
                    Users.findByIdAndUpdate(decoded._id, {
                        password: bcrypt.hashSync(req.body.new_pass, 10)
                    }, function (err, updated) {
                        if (err) throw err;
                        if (updated) res.json({
                            result: 'Password successfully changed'
                        })
                    })
                } else res.json({
                    result: 'Incorrect old password'
                });
            })
        };
    })
}


exports.change_email = async (req, res) => {
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findOneAndUpdate({
                email: req.body.old_email
            }, {
                email: req.body.new_email
            }, function (err, result) {
                if (err) throw err;
                if (result == null) res.json({
                    result: 'Incorrect old email address'
                });
                else res.json({
                    result: 'Email address successfully changed'
                })
            })

        }
    })
}

exports.change_description = async (req, res) => {
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findByIdAndUpdate(decoded._id, {
                profile_desc: req.body.new_desc
            }, function (err, result) {
                if (err) throw err;
                if (result != null) res.json({
                    result: 'Profile description successfully changed',
                });
            })
        }
    })
}


exports.upload_avatar = async (req, res) => {
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        fs.writeFile('./user_avatar/' + req.files.avatar.name, req.files.avatar.data, function (err) {
            if (err) res.json({
                result: 'Try again'
            });
            else {
                Users.findByIdAndUpdate(decoded._id, {
                    avatar_name: req.files.avatar.name
                }, function (err, result) {
                    if (err) res.json({
                        result: 'Try again'
                    });
                    if (result) res.json({
                        result: 'Avatar successfully uploaded'
                    });
                    else res.json({
                        result: 'Try again'
                    });
                })
            }
        })
        // fs.write('./user_avatar/' + decoded._id + '.jpeg', req.files.avatar.data, function (err) {
        //     if (err) throw err;
        //     res.json({
        //         result: 'Avatar successfully uploaded'
        //     })
        // })
        //console.log(req.files.avatar.mimetype)
    })
}




exports.change_cover = async (req, res) => {

}