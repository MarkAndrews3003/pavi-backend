const {body} = require('express-validator');
const Users = require('../mongoose/models/users');

const rules = [
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('companyId').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('phone').not().isEmpty().withMessage('Phone name is required'),
    body('age').not().isEmpty().withMessage('Age name is required'),
    body('country').not().isEmpty().withMessage('Country name is required'),
    body('roles').not().isEmpty().withMessage('Roles name is required'),
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body('gender', 'Gender is required').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;
        let user = await Users.findOne({email: email});
        if (user != null) throw new Error('E-mail exists');
    }),

];

module.exports = {
    rules
};
