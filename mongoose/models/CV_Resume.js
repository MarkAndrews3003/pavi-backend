let mongoose = require('mongoose');
const moment = require('moment');

let CVSchema = new mongoose.Schema({
    work_exp: [{
        company: String,
        start_date: String,
        end_date: String,
        position: String
    }],
    education: Array,
    //[
    // institution: String,
    // start_date: String,
    // end_date: String,
    // degree: String,
    // speciality: String
    // ],
    skills: [{
        name: String,
        percent: Number
    }],
    links: Object,
    user_id: {
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('CV', CVSchema, 'CV');