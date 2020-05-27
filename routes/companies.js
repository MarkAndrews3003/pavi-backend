const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const validateCompany = require('../validators/validateCompany');
const validateCompanyUsers = require('../validators/validateCompanyUsers');

router.post('/register', validateCompany.rules, companiesController.create);
router.get('/check-name',  companiesController.checkName);
router.post('/add/user', validateCompanyUsers.rules, companiesController.createUser);
router.post('/add/candidate/:id', companiesController.candidateUser);
router.post('/add/send/mail/candidate', companiesController.candidateMail);


module.exports = router;
