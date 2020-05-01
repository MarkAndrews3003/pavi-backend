const jwt = require('jsonwebtoken');


const sequelize = require('sequelize');
const db = require('../models');
// const Users = require('../mongoose/models/users');
const Users = db.users;
const bcrypt = require('bcryptjs');

const showIfErrors = require('../helpers/showIfErrors');


exports.login = async (req, res) => {

    console.log('here!!!')

    // Checking validation result from express-validator
    if (!showIfErrors(req, res)) {
        // Getting request data and setting user fields to return
        let data = req.body;
        let email = data.email.trim();


        let attributes = [`first_name`, `last_name`, 'email', 'profile_img', 'password', 'id', 'status_id'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');


        // Selecting an employee that has an email matching request one
        let user = await Users.findOne({
            attributes: attributes,
            include: [],
            where: {email: email} //userTypeWhere
        }, res);


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

exports.register = async (req, res) => {
    let data = req.hasOwnProperty('userInfo') ? req.userInfo : req.body;

    console.log(data)

    // Saving the original password of user and hashing it to save in db
    let originalPass = data.password;
    data.password = bcrypt.hashSync(originalPass, 10);

    await Users.create(data);

    // Saving the original password again to request for authenticating the user at once
    data.password = originalPass;
    req.body = data;

    // res.json("OK");

    this.login(req, res);

    console.log(data)
    // let user = new Users(data);
    // user.save();
    // res.json('OK')
};
