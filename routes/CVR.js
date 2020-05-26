const route = require('express').Router();

const CVRE = require('../controllers/CV_Education'),
    CVRS = require('../controllers/CV_Skills'),
    CVRW = require('../controllers/CV_Work'),
    CVRL = require('../controllers/CV_Link'),
    CVRC = require('../controllers/CV_Certification');
const defender = require('../config/token_validation').validation;
const valid = require('../validators/CV');
const uploadPDF = require('../config/multer');




//Fields: institution,  start_date, end_date, degree, speciality, certification (true/false) index(for update and delete only)
route.post('/education', [valid.education_check_list, defender], CVRE.education);
route.get('/education_get', defender, CVRE.education_get);
route.put('/education_update', [valid.education_check_list, defender], CVRE.education_update);
route.delete('/education_delete', defender, CVRE.education_delete);

route.post('/certification', [valid.certification_check_list, defender], CVRC.certification);
route.get('/certification_get', defender, CVRC.certification_get);
route.put('/certification_update', [valid.certification_up_check_list, defender], CVRC.certification_update);
route.delete('/certification_delete', defender, CVRC.certification_delete);

//Fields: name, percent, index (for update and delete only)
route.post('/skill', [valid.skill_check_list, defender], CVRS.skill);
route.get('/skill_get', defender, CVRS.skill_get);
route.put('/skill_update', [valid.skill_up_check_list, defender], CVRS.skill_update);
route.delete('/skill_delete', defender, CVRS.skill_delete);

//Fields: organization,  start_date, end_date, role, type, index (for update and delete only)
route.post('/work', [valid.work_check_list, defender], CVRW.work);
route.get('/work_get', defender, CVRW.work_get);
route.put('/work_update', [valid.work_up_check_list, defender], CVRW.work_update);
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