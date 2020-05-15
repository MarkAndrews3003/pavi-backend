var route = require('express').Router();

var CVRE = require('../controllers/CV_Education'),
    CVRS = require('../controllers/CV_Skills'),
    CVRW = require('../controllers/CV_Work');
var defender = require('../config/token_validation').validation;




//Fields: institution,  start_date, end_date, degree, speciality, certification (true/false) index(for update and delete only)
route.post('/education', defender, CVRE.education);
route.get('/education_get', defender, CVRE.education_get);
route.put('/education_update', defender, CVRE.education_update);
route.delete('/education_delete', defender, CVRE.education_delete);

//Fields: name, percent, index (for update and delete only)
route.post('/skill', defender, CVRS.skill);
route.get('/skill_get', defender, CVRS.skill_get);
route.put('/skill_update', defender, CVRS.skill_update);
route.delete('/skill_delete', defender, CVRS.skill_delete);

//Fields: organization,  start_date, end_date, role, type, index (for update and delete only)
route.post('/work', defender, CVRW.work);
route.get('/work_get', defender, CVRW.work_get);
route.put('/work_update', defender, CVRW.work_update);
route.delete('/work_delete', defender, CVRW.work_delete);

module.exports = route;
