const Users = require('../mongoose/models/users');

exports.uploadAvatar = async (req, res) => {
    if(!req.file.filename){
        return res.status(404).send('Not images')
    }
    let userUpdate = await Users.updateOne({_id: req.body.user_id}, {avatar:req.file.filename})
        .catch(err => {
            console.log(err);
            return res.status(500).send(err)
        })
    res.status(200).send('Avatar is changed')
};

exports.uploadCover = async (req, res) => {
    if(!req.file.filename){
        return res.status(404).send('Not images')
    }
    let userUpdate = await Users.updateOne({_id: req.body.userId}, {cover: req.file.filename})
        .catch(err => {
            return res.status(500).send(err)
        })
    res.status(200).send('Cover is changes')
};
