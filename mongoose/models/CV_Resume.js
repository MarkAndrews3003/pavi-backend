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
    link: {
        type: Array
    },
    pdf_file: {
        type: String
    },
    user_id: {
        type: String
    }
})

module.exports = mongoose.model('CV', CVSchema, 'CV');