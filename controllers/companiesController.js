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
