const jwt = require('jsonwebtoken');


const sequelize = require('sequelize');
const db = require('../models');
const Users = require('../mongoose/models/users');
// const Users = db.users;
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const showIfErrors = require('../helpers/showIfErrors');


exports.login = async (req, res) => {
    // Checking validation result from express-validator
    if (!showIfErrors(req, res)) {
        // Getting request data and setting user fields to return
        let data = req.body;
        let email = data.email.trim();


        let attributes = [`first_name`, `last_name`, 'email', 'profile_img', 'password', 'id', 'status_id'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');


        // // Selecting an employee that has an email matching request one
        // let user = await Users.findOne({
        //     attributes: attributes,
        //     include: [],
        //     where: {email: email} //userTypeWhere
        // }, res);

        let user = await Users.findOne({
            'email': email
        });
        console.log(email)
        console.log(user)
        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({
                msg: 'You don\'t have such privileges or the account is inactive'
            });

            else {
                // Cloning users object without password and saving user full name
                let {
                    password,
                    ...details
                } = user.toJSON();
                let full_name = user[`first_name`] + ' ' + user[`last_name`];


                // res.cookie('token', jwt.sign(details, 'secretkey', {
                //     expiresIn: '8h'
                // }));

                res.status(200).json({
                    token: jwt.sign(details, 'secretkey', {
                        expiresIn: '8h'
                    }),
                    user_id: user.id,
                    full_name: full_name
                })
            }


        }
    }

};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({
        msg: 'OK'
    })
};

exports.register = async (req, res) => {

    let data;
    let isCompanyReg = req.hasOwnProperty('userInfo');
    if (isCompanyReg) {
        data = req.userInfo;
        data.roles = ['company_user'];
    } else {
        data = req.body;
        data.roles = ['candidate'];
    }


    // Saving the original password of user and hashing it to save in db
    let originalPass = data.password;
    data.password = bcrypt.hashSync(originalPass, 10);

    // await Users.create(data);

    let user = new Users(data);
    await user.save();


    // Saving the original password again to request for authenticating the user at once
    data.password = originalPass;
    req.body = data;

    this.login(req, res);
};


let makeid = (length) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.forGotPasswordSendEmail = async (req, res) => {
    let user = await Users.findOne({
        email: req.params.id
    })
        .catch(err => {
            return res.status(500).send('Server Error')
        })
    if (!user) {
        return res.status(404).send('There is no such user')
    }
    let code = makeid(5)
    let main = async () => {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.Gmail_Login,
                pass: process.env.Gmail_Password
            }
        });

        let info = await transporter.sendMail({
            from: process.env.Gmail_Forgot,
            to: `${req.body.email}`,
            subject: "Forgot",
            text: "Forgot password",
            html: `<p>http://localhost:4242/forgot/password/email. Yor code: ${code}</p>`
        });
    }

    main()
        .catch(err => {
            return res.status(500).send('mail no send')
        });
    let userUpdate = await Users.updateOne({
        email: req.params.id
    }, {
        code: code
    })
        .catch(err => {
            return res.status(500).send('Server Error')
        })
    res.send()
}


exports.forGotSms = async (req, res) => {
    let user = await Users.findOne({
        email: req.body.email
    })
        .catch(err => {
            return res.status(500).send('Server Error')
        })
    if (!user) {
        return res.status(404).send('There is no such user')
    }
    let phone = req.body.phone;
    let code = makeid(5)

    twilio.messages.create({
        body: `Your code is ${code}`,
        from: '+12057840405',
        to: phone
    })
        .then(async phone => {
            let userUpdate = await Users.updateOne({
                email: req.params.id
            }, {
                code: code
            })
                .catch(err => {
                    return res.status(500).send('Server Error')
                })
            res.send('Code send')
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err);
        })
}

exports.forGotPassword = async (req, res) => {
    let user = await Users.findOne({
        email: req.body.email
    })
        .catch(err => {
            return res.status(500).send('Server Error')
        })
    if (!user) {
        return res.status(404).send('There is no such user')
    }
    if (req.body.code === user.code) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let userUpdate = await Users.updateOne({
            emil: req.body.email
        }, {
            password: hashedPassword
        })
        res.send('Password changes')
    } else {
        res.status(404).send('Incorrect code')
    }
}

exports.uploadAvatar = async (req, res) => {
    if(!req.file.filename){
        return res.status(404).send('Not images')
    }
   let userUpdate = await Users.updateOne({_id: req.body.userId}, {avatar:req.file.filename})
       .catch(err => {
           console.log(err);
           return res.status(500).send(err)
       })
    res.status(200).send('Avatar is changes')
}

exports.uploadCover = async (req, res) => {
    if(!req.file.filename){
        return res.status(404).send('Not images')
    }
    let userUpdate = await Users.updateOne({_id: req.body.userId}, {cover: req.file.filename})
        .catch(err => {
            return res.status(500).send(err)
        })
    res.status(200).send('Cover is changes')
}