const jwt = require('jsonwebtoken');

const Users = require('../mongoose/models/users');
const bcrypt = require('bcryptjs');

const showIfErrors = require('../helpers/showIfErrors');


exports.login = async (req, res) => {

    // Checking validation result from express-validator
    if (!showIfErrors(req, res)) {
        // Getting request data and setting user fields to return
        let data = req.body;
        let email = data.email.trim();

        // Selecting an employee that has an email matching request one
        let user = await Users.findOne({'email': email});

        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

            else {
                // Cloning users object without password and saving user full name
                let {password, ...details} = user.toJSON();
                let full_name = user[`first_name`] + ' ' + user[`last_name`];


                res.status(200).json({
                    token: jwt.sign(details, 'secretkey', {expiresIn: '8h'}), user_id: user.id, full_name: full_name
                })
            }


        }
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({msg: 'OK'})
};

exports.register = (req, res) => {
    let data = req.hasOwnProperty('userInfo') ? req.userInfo : req.body;

    console.log(data)

    // Saving the original password of user and hashing it to save in db
    let originalPass = data.password;
    data.password = bcrypt.hashSync(originalPass, 10);

    console.log(data)
    let user = new Users(data);
    user.save();
    res.json('OK')
};
