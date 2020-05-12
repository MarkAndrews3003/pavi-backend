const jwt = require('jsonwebtoken');
const Users = require('../mongoose/models/users');

const bcrypt = require('bcryptjs');

exports.change_pass = async (req, res) => {
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findById(decoded._id, function (err, user_result) {
                if (bcrypt.compareSync(req.body.old_pass, result.password)) {
                    Users.findByIdAndUpdate(decoded._id, {
                        password: bcrypt.hashSync(req.body.new_pass, 10)
                    }, function (err, user_result) {
                        if (err) throw err;
                        if (user_result != null) res.json({
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
            }, function (err, user_result) {
                if (err) throw err;
                if (user_result == null) res.json({
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
    console.log(req.cookies);
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findByIdAndUpdate(decoded._id, {
                profile_desc: req.body.new_desc
            }, function (err, user_result) {
                if (err) throw err;
                if (user_result != null) res.json({
                    result: 'Profile description successfully changed',
                });
            })
        }
    })
}



exports.change_PACG = async (req, res) => {
    console.log(req.body);
    jwt.verify(req.cookies.token, 'secretkey', function (err, decoded) {
        if (err) throw err;
        if (decoded) {
            Users.findByIdAndUpdate(decoded._id, req.body, function (err, user_result) {
                if (user_result != null) res.json({
                    result: "Contact information successfully changed"
                });
                else res.json({
                    result: 'Try again'
                })
            })
        }
    })
}