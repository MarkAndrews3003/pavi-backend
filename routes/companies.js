const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const validateCompany = require('../validators/validateCompany');

router.post('/register', validateCompany.rules, companiesController.create);
router.get('/check-name',  companiesController.checkName);


module.exports = router;
