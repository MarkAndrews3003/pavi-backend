let mongoose = require('mongoose');
const moment = require('moment');

let UsersSchema = new mongoose.Schema({

    companyId: {
        type: mongoose.Types.ObjectId,
    },
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
    birthday: {
        type: String
    },
    avatar: {
        type: String
    },
    cover: {
        type: String
    },
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
});

module.exports = mongoose.model('Users', UsersSchema);
