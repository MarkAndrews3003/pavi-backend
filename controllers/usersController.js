const Users = require('../mongoose/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.change_pass = async (req, res, next) => {
    Users.findById(res.locals.id, function (err, user_result) {
        if (bcrypt.compareSync(req.body.old_pass, user_result.password)) {
            Users.findByIdAndUpdate(res.locals.id, {
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
}


exports.change_email = async (req, res) => {
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


exports.change_description = async (req, res) => {
    Users.findByIdAndUpdate(res.locals.id, {
        profile_desc: req.body.new_desc
    }, function (err, user_result) {
        if (err) throw err;
        if (user_result != null) res.json({
            result: 'Profile description successfully changed',
        });
    })

}



exports.change_PACG = async (req, res) => {
    Users.findByIdAndUpdate(res.locals.id, req.body, function (err, user_result) {
        if (user_result != null) res.json({
            result: "Contact information successfully changed"
        });
        else res.json({
            result: 'Try again'
        })
    })
}



exports.uploadAvatar = async (req, res) => {
    if (!req.file.filename) {
        return res.status(404).send('Not an image')
    }
    // console.log(req.file)
    let userUpdate = await Users.updateOne({
            _id: req.body.user_id
        }, {
            avatar: req.file.filename
        })
        .catch(err => {
            return res.status(500).send(err)
        });
    await changeJwt(req, res);
};

exports.uploadCover = async (req, res) => {
    if (!req.file.filename) {
        return res.status(404).send('Not images')
    }
    let userUpdate = await Users.updateOne({
            _id: req.body.user_id
        }, {
            cover: req.file.filename
        })
        .catch(err => {
            return res.status(500).send(err)
        });
    await changeJwt(req, res);

};

let changeJwt = async (req, res) => {
    let user = await Users.findOne({
        _id: req.body.user_id
    });
    let full_name = user[`first_name`] + ' ' + user[`last_name`];
    let {
        password,
        ...details
    } = user.toJSON();
    res.json({
        token: jwt.sign(details, 'secretkey', {
            expiresIn: '8h'
        }),
        user_id: user.id,
        full_name: full_name
    })
}