const {body} = require('express-validator');
const Jobs = require('../mongoose/models/jobs');

const rules = [
    body('jobName').not().isEmpty().withMessage('Job name is required'),
    body('position').not().isEmpty().withMessage('Position is required'),
    body('companyName').not().isEmpty().withMessage('Company name is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('hourlyRate').not().isEmpty().withMessage('Hourly rate  is required'),
    body('companyAddress').not().isEmpty().withMessage('Company address is required'),
    body('date').not().isEmpty().withMessage('Date is required'),
    body('experience').not().isEmpty().withMessage('Experience is required'),
    body('jobTitle').not().isEmpty().withMessage('Job title is required'),
    body('jobType').not().isEmpty().withMessage('Job type is required'),
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
