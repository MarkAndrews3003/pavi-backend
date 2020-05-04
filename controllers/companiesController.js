const Companies = require('../mongoose/models/companies');

const authController = require('./authController');
const showIfErrors = require('../helpers/showIfErrors');

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
