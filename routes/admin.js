const route = require('express').Router();

const admin = require('../controllers/admin');

const defender = require('../config/token_validation').validation;

route.get('/user', defender, admin.user_list_filter);

route.get('/job', defender, admin.job_list_filter);

module.exports = route;