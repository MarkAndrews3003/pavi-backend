let mongoose = require('mongoose');
const moment = require('moment');

let CVSchema = new mongoose.Schema({
    work_exp: Object,
    education: {
        institution: String,
        sart_date: String,
        end_date: String,
        degree: String,
        speciality: String
    },
    skills: Object,
    links: Object,
    user_id: String
})

module.exports = mongoose.model('CV', CVSchema);