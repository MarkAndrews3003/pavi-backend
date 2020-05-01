const db = require('../models');
// const Users = require('../mongoose/models/users');
const Companies = db.companies;

const authController = require('./authController');
exports.create = async (req, res) => {
    let data = req.body;
    let companyInfo = {...data.companyInfo, ...data.contactDetails};
    let userInfo = data.accountInfo;
    console.log('here')

    await Companies.create(companyInfo);
    // let company = new Companies(companyInfo);
    // await company.save();

    await authController.register({userInfo}, res);

};
