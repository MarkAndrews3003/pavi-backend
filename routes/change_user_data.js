var route = require('express').Router();



route.post('/change_pass', require('../controllers/change_user_data').change_pass);
route.post('/change_email', require('../controllers/change_user_data').change_email);
route.post('/change_description', require('../controllers/change_user_data').change_description);

route.post('/change_cover', require('../controllers/change_user_data').change_cover);
route.post('/upload_avatar', require('../controllers/change_user_data').upload_avatar);


module.exports = route;