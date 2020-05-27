const Users = require('../mongoose/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.change_pass = async (req, res, next) => {
    Users.findById(res.locals.id, function (err, user_result) {
        if (bcrypt.compareSync(req.body.old_pass, user_result.password)) {
            Users.findByIdAndUpdate(res.locals.id, {
                password: bcrypt.hashSync(req.body.new_pass, 10)
            }, async (err, user_result) => {
                if (err) throw err;
                if (user_result != null) {
                    await changeJwt(req, res)
                }
            })
        } else {
            res.status(500).json({
                msg: 'Incorrect old password'
            });
        }
    })
};


exports.change_email = async (req, res) => {
    Users.findOneAndUpdate({
        email: req.body.old_email
    }, {
        email: req.body.new_email
    }, async (err, user_result) => {
        if (err) throw err;
        if (user_result == null) {
            res.status(500).json({
                msg: 'Incorrect old email address'
            });
        } else {
            await changeJwt(req, res)
        }
    })
}


exports.change_description = async (req, res) => {
    console.log(res.locals.id);
    Users.findByIdAndUpdate(res.locals.id, {
        profile_desc: req.body.about_text
    }, function (err, user_result) {
        if (err) throw err;
        if (user_result != null) res.json({
            result: 'Profile description successfully changed',
        });
    })

};

exports.get_description = async (req, res) => {

    Users.findById(res.locals.id, {
            '_id': 0,
            'profile_desc': 1
        },
        function (err, user_result) {
            res.json(user_result)
        })

}

exports.change_PACG = async (req, res) => {
    Users.findByIdAndUpdate(res.locals.id, req.body, async (err, user) => {
        if (user != null) {
            await changeJwt(req, res)
        } else res.status(500).json({
            result: 'Try again'
        })
    })
};


exports.get_PACG = async (req, res) => {
    console.log(res.locals.id);
    Users.findById(res.locals.id, {
        '_id': 0,
        'phone': 1,
        'country': 1,
        'age': 1,
        'gender': 1
    }, function (err, user_result) {
        res.json({
            result: user_result
        })
    })
}


exports.uploadAvatar = async (req, res) => {
    if (!req.file.filename) {
        return res.status(404).send('Not an image')
    }
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
    console.log(req.body)
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
