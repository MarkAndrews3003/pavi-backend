const route = require('express').Router();

const CVRE = require('../controllers/CV_Education'),
    CVRS = require('../controllers/CV_Skills'),
    CVRW = require('../controllers/CV_Work'),
    CVRL = require('../controllers/CV_Link');

const defender = require('../config/token_validation').validation;
const valid = require('../validators/CV');
const uploadPDF = require('../config/multer');




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
route.post('/work', [valid.work_chack_list, defender], CVRW.work);
route.get('/work_get', defender, CVRW.work_get);
route.put('/work_update', defender, CVRW.work_update);
route.delete('/work_delete', defender, CVRW.work_delete);

//Fields: name, url
route.post('/link', defender, CVRL.link);
route.get('/link_get', defender, CVRL.link_get);
route.put('/link_update', defender, CVRL.link_update);
route.delete('/link_delete', defender, CVRL.link_delete);

//
route.post('/pdf', [defender, uploadPDF.uploadPDF.single('pdf_file')], function (req, res) {
    res.json({
        result: 'File successfully uploaded'
    })
})

module.exports = route;
