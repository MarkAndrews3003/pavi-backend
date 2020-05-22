const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const validateCompany = require('../validators/validateCompany');
const validateCompanyUsers = require('../validators/validateCompanyUsers');

router.post('/register', validateCompany.rules, companiesController.create);
router.get('/check-name',  companiesController.checkName);
router.post('/add/user', validateCompanyUsers.rules, companiesController.createUser);


module.exports = router;
