let mongoose = require('mongoose');
const moment = require('moment');

let JobsSchema = new mongoose.Schema({
    jobName: {type: String},
    companyName: {type: String},
    position: {type: String},
    country: {type: String},
    hourlyRate: {type: String},
    companyAddress: {type: String},
    date: {type: String},
    jobCreateDate : {
        type: Date,
        default: moment().format()
    },
    experience: {type: String},
    jobTitle: {type: String},
    email: {type: String},
    jobType:  {type: String},
});

module.exports = mongoose.model('Jobs', JobsSchema);
