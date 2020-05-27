const Companies = require('../mongoose/models/companies');
const Users = require('../mongoose/models/users')
const Jobs = require('../mongoose/models/jobs')
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
    let data = req.body;
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
                user: process.env.GMAIL_LOGIN,
                pass: process.env.GMAIL_PASSWORD
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

exports.candidateUser = async (req, res) => {
    let user = await Users.findOne({_id: req.body.userId})
        .catch(err => {
            return res.status(500).send(err)
        })
    if(!user){
        return res.status(404).send('User no found')
    }
    let jobUpdate = await Jobs.updateOne({_id: req.body.jobId}, {$push :{candidate: req.body.userId}})
        .catch(err => {
            return res.status(500).send(err)
        })
    res.send()
}

exports.candidateMail = async (req, res) => {
    let user = await Users.findOne({_id: req.body.userId})
        .catch(err => {
            return res.status(500).send(err)
        })
    if(!user){
        return res.status(404).send('User no found')
    }
    async function main() {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_LOGIN,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: process.env.Gmail_Forgot,
            to: `${req.body.email}`,
            subject: "Link",
            text: "Link",
            html: `<p>job interview link ${req.body.link}</p>`
        });
    }
    main().catch(console.error);
    res.send()
}
