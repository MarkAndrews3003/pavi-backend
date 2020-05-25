const { body } = require('express-validator');


var work_chack_list = [
    body('*.company_name').not().isEmpty().withMessage('Company name is required'),
    body('*.speciality').not().isEmpty().withMessage('Speciality name is required'),
    body('*.start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('*.end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]


module.exports = {
    work_chack_list
}