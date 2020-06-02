const { body } = require('express-validator');


var work_check_list = [
    body('*.company_name').trim().not().isEmpty().withMessage('Company name is required'),
    body('*.speciality').trim().not().isEmpty().withMessage('Speciality name is required'),
    body('*.start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('*.end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]

var work_up_check_list = [
    body('company_name').trim().not().isEmpty().withMessage('Company name is required'),
    body('speciality').trim().not().isEmpty().withMessage('Speciality name is required'),
    body('start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]

var skill_check_list = [
    body('*.name').trim().not().isEmpty().withMessage('Skill name is required'),
    body('*.rating').trim().not().isEmpty().withMessage('Percent is required').isNumeric().withMessage('Please enter only digits.'),
]

var skill_up_check_list = [
    body('name').trim().not().isEmpty().withMessage('Skill name is required'),
    body('rating').trim().not().isEmpty().withMessage('Percent year is required').isNumeric().withMessage('Please enter only digits.'),
]

var education_check_list = [
    body('*.institution').trim().not().isEmpty().withMessage('Institution name is required'),
    body('*.degree').trim().not().isEmpty().withMessage('Degree name is required'),
    body('*.speciality').trim().not().isEmpty().withMessage('Speciality name is required'),
    body('*.start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('*.end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]

var education_up_check_list = [
    body('institution').trim().not().isEmpty().withMessage('Institution name is required'),
    body('degree').trim().not().isEmpty().withMessage('Degree name is required'),
    body('speciality').trim().not().isEmpty().withMessage('Speciality name is required'),
    body('start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]

var certification_check_list = [
    body('*.name').trim().not().isEmpty().withMessage('Certification name is required'),
    body('*.description').trim().not().isEmpty().withMessage('Description is required'),
    body('*.issued_by').trim().not().isEmpty().withMessage('Issued by is required'),
    body('*.start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('*.end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]

var certification_up_check_list = [
    body('name').trim().not().isEmpty().withMessage('Certification name is required'),
    body('description').trim().not().isEmpty().withMessage('Description is required'),
    body('issued_by').trim().not().isEmpty().withMessage('Issued by is required'),
    body('start_year').not().isEmpty().withMessage('Start year is required').isNumeric().withMessage('Please enter only digits.'),
    body('end_year').not().isEmpty().withMessage('End year is required').isNumeric().withMessage('Please enter only digits.')
]


module.exports = {
    work_check_list,
    work_up_check_list,

    skill_check_list,
    skill_up_check_list,

    education_check_list,
    education_up_check_list,

    certification_check_list,
    certification_up_check_list
}
