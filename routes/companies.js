const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');

router.post('/register', companiesController.create);


module.exports = router;
