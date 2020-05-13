const Users = require('../mongoose/models/users');
const jwt = require('jsonwebtoken');

exports.uploadAvatar = async (req, res) => {
    if (!req.file.filename) {
        return res.status(404).send('Not an image')
    }
    // console.log(req.file)
    let userUpdate = await Users.updateOne({_id: req.body.user_id}, {avatar: req.file.filename})
        .catch(err => {
            return res.status(500).send(err)
        });
    await changeJwt(req, res);
};

exports.uploadCover = async (req, res) => {
    if (!req.file.filename) {
        return res.status(404).send('Not images')
    }
    let userUpdate = await Users.updateOne({_id: req.body.user_id}, {cover: req.file.filename})
        .catch(err => {
            return res.status(500).send(err)
        });
    await changeJwt(req, res);

};

let changeJwt = async (req, res) => {
    let user = await Users.findOne({_id: req.body.user_id});
    let full_name = user[`first_name`] + ' ' + user[`last_name`];
    let {password, ...details} = user.toJSON();
    res.json({
        token: jwt.sign(details, 'secretkey', {
            expiresIn: '8h'
        }),
        user_id: user.id,
        full_name: full_name
    })
}
