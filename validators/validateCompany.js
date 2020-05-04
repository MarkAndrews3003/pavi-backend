// Express Validator
const {body, check} = require('express-validator');

const Companies = require('../mongoose/models/companies');
const Users = require('../mongoose/models/users');

const rules = [
    body('companyInfo.name').not().isEmpty().withMessage('Company name is required'),
    body('companyInfo.industry').not().isEmpty().withMessage('Industry name is required'),
    body('companyInfo.country').not().isEmpty().withMessage('Country is required'),
    body('accountInfo.first_name').not().isEmpty().withMessage('First name is required'),
    body('accountInfo.last_name').not().isEmpty().withMessage('Last name is required'),
    body('accountInfo.password', 'Password is required').not().isEmpty(),
    body('accountInfo.gender', 'Gender is required').not().isEmpty(),
    body('contactDetails.phone', 'Phone number is required').not().isEmpty(),
    body('contactDetails.address', 'Address is required').not().isEmpty(),
    body('contactDetails.email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body().custom(async (req) => {

        let companyName = req.companyInfo.name;

        // Retrieving a company to check for non-existence
        let company = await Companies.findOne({name: companyName});

        if (company != null) throw new Error('Company with such name already exists');

        let email = req.contactDetails.email;

        // Retrieving a user with request email
        let user = await Users.findOne({email: email});

        if (user != null) throw new Error('E-mail exists');

        // return true;
    }),


];

module.exports = {
    rules
};
