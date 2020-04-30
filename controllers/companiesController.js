const Companies = require('../mongoose/models/companies');

const authController = require('./authController');
exports.create = async (req, res) => {
    let data = req.body;
    let companyInfo = {...data.companyInfo, ...data.contactDetails};
    let userInfo = data.accountInfo;
    let company = new Companies(companyInfo);
    await company.save();

    await authController.register({userInfo}, res);

};
