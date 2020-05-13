var route = require('express').Router();
var defender = require('../config/token_validation').validation;

//Fields: old_pass and new_pass
route.post('/change_pass', defender, require('../controllers/contact_informationController').change_pass);

//Fields: old_email and new_email
route.post('/change_email', defender, require('../controllers/contact_informationController').change_email);

//Field: new_desc
route.post('/change_description', defender, require('../controllers/contact_informationController').change_description);

///Fields: phone,age,coutry and gender
route.post('/change_PACG', defender, require('../controllers/contact_informationController').change_PACG);

//CV

route.post('/CV_Education', defender, require('../controllers/contact_informationController').CV_education);
route.post('/CV_Education_get', defender, require('../controllers/contact_informationController').CV_education_get);

route.post('/CV_Work', defender, require('../controllers/contact_informationController').CV_work);

route.post('/CV_Skills', defender, require('../controllers/contact_informationController').CV_skills);


module.exports = route;