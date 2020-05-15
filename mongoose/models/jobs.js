let mongoose = require('mongoose');
const moment = require('moment');

let JobsSchema = new mongoose.Schema({
    jobTitle: {type: String},
    country: {type: String},
    dateOpened: {type: String},
    experience: {type: String},
    employment: {type: String},
    city: {type: String},
    dateClose: {type: String},
    jobCreateDate : {
        type: Date,
        default: moment().format()
    },
    email: {type: String},
    salary:  {type: Number},
    companyAddress: {type: String}
});

module.exports = mongoose.model('Jobs', JobsSchema);
