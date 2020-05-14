const Jobs = require('../mongoose/models/jobs');
const validationResult = require('express-validator').validationResult;


exports.createJob = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let singleError = errors.array()[0];
        if (singleError.hasOwnProperty('msg') && singleError.msg.includes('ECONNREFUSED 127.0.0.1:3306')) {
            singleError = 'Please check db connection';
            return res.status(422).json(singleError);
        } else {
            return res.status(422).json(singleError)
        }
    }
   let job = new Jobs({
       jobName: req.body.jobName,
       companyName: req.body.companyName,
       position: req.body.position,
       country: req.body.country,
       hourlyRate: req.body.hourlyRate,
       companyAddress: req.body.companyAddress,
       date: req.body.date,
       experience:req.body.experience,
       jobTitle: req.body.jobTitle,
       email: req.body.email,
       jobType:  req.body.jobType,
   });
    job.save((err, job) => {
        if(err){
            return res.status(500).send(err)
        }
        res.status(200).send(job)
    })
}