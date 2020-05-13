let mongoose = require('mongoose');
const moment = require('moment');

let UsersSchema = new mongoose.Schema({

    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    roles: [{
        type: String
    }],
    phone: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: false
    },
    created: {
        type: Date,
        default: moment().format()
    },

    ////New fields

    profile_desc: {
        type: String
    },

    age: {
        type: String
    },
    country: {
        type: String
    },
    gender: {
        type: String
    },

    CV_id: {
        type: mongoose.Types.ObjectId,
        ref: 'CV'
    }

});

module.exports = mongoose.model('Users', UsersSchema);