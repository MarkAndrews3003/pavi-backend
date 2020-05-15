const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const validateJob = require('../validators/validateJob');



router.post('/create', validateJob.rules, jobController.createJob)
router.post('/filter',  jobController.filterJob)


module.exports = router;
