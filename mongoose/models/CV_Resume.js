let mongoose = require('mongoose');

let CVSchema = new mongoose.Schema({
    work: {
        type: Array
    },
    education: {
        type: Array
    },
    skill: {
        type: Array
    },
    links: {
        type: Array
    },
    user_id: {
        type: String
    }
})

module.exports = mongoose.model('CV', CVSchema, 'CV');