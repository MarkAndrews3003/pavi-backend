const {body} = require('express-validator');
const Jobs = require('../mongoose/models/jobs');

const rules = [
    body('jobTitle').not().isEmpty().withMessage('Job title is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('dateOpened').not().isEmpty().withMessage('Date opened name is required'),
    body('experience').not().isEmpty().withMessage('Experience is required'),
    body('employment').not().isEmpty().withMessage('Employment rate  is required'),
    body('city').not().isEmpty().withMessage('City address is required'),
    body('dateClose').not().isEmpty().withMessage('Date close is required'),
    body('salary').not().isEmpty().withMessage('Salary title is required'),
    body('companyAddress').not().isEmpty().withMessage('Company address type is required'),
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    /*body().custom(async (req) => {
        console.log('trhtrh');

        let email = req.email;
        let user = await Jobs.findOne({email: email});
        if (user === null) throw new Error('E-mail exists');
    }),*/


];

module.exports = {
    rules
};
