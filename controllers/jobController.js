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
        jobTitle: req.body.jobTitle,
        country: req.body.country,
        dateOpened: req.body.dateOpened,
        experience: req.body.experience,
        employment: req.body.employment,
        city: req.body.city,
        dateClose: req.body.dateClose,
        email: req.body.email,
        salary: req.body.salary,
        companyAddress: req.body.companyAddress,
    });
    job.save((err, job) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(job)
    })
}

exports.filterJob = async (req, res) => {
    let filter = []
    if (req.body.jobTitle) {
        filter.push({jobTitle: req.body.jobTitle})
    }
    if (req.body.experience) {
        filter.push({experience: req.body.experience})
    }
    if (req.body.employment) {
        filter.push({employment: req.body.employment})
    }
    console.log(filter);
    let filterJob = await Jobs.find({$and: filter})
        .catch(err => {
            return res.status.send(err)
        })
    res.send(filterJob)

}