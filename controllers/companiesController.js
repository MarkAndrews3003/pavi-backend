const Companies = require('../mongoose/models/companies');
const Users = require('../mongoose/models/users')
const authController = require('./authController');
const showIfErrors = require('../helpers/showIfErrors');
const nodemailer = require("nodemailer");


exports.create = async (req, res) => {
    if (!showIfErrors(req, res)) {
        let data = req.body;
        let companyInfo = {...data.companyInfo, ...data.contactDetails};
        let userInfo = {...data.accountInfo, ...{email: data.contactDetails.email}};

        let company = new Companies(companyInfo);
        await company.save();
        await authController.register({userInfo}, res);
    }


};

/**
 * Checks to see if the provided name exists in database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.checkName = async (req, res) => {
    let data = req.query;
    let foundCompany = await Companies.findOne({name: data.name});
    if (foundCompany) res.status(500).json({company_name_exists: 'Company with such name exists'});
    else res.json('OK');
};


exports.createUser = async (req, res) => {
    console.log(req.body);
    let data = req.body;
    console.log(process.env.Gmail_Login);
    let code = Math.random().toString(36).substring(4);
    const validationResult = require('express-validator').validationResult;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let singleError = errors.array()[0];
        console.log(singleError);
        return res.send(singleError)
    }
    let user = new Users(data);
    await user.save( async err => {
        if(err){
            return res.status(500).send(err)
        }
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
            html: `<p>your password ${code}</p>`
        });
        res.send()
    });
};
