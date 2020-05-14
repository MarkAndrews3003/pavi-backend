var route = require('express').Router();

var CVR = require('../controllers/CV_Resume');
var defender = require('../config/token_validation').validation;





route.post('/CV_Education', defender, CVR.CV_education);
route.get('/CV_Education_get', defender, CVR.CV_education_get);

route.post('/CV_Work', defender, CVR.CV_work);

route.post('/CV_Skills', defender, CVR.CV_skills);


module.exports = route;