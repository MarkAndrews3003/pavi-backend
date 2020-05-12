var route = require('express').Router();

//Fields: old_pass and new_pass
route.post('/change_pass', require('../controllers/contact_informationController').change_pass);

//Fields: old_email and new_email
route.post('/change_email', require('../controllers/contact_informationController').change_email);

//Field: new_desc
route.post('/change_description', require('../controllers/contact_informationController').change_description);

///Fields: phone,age,coutry and gender
route.post('/change_PACG', require('../controllers/contact_informationController').change_PACG);




module.exports = route;