let mongoose = require('mongoose');
const moment = require('moment');

let UsersSchema = new mongoose.Schema({

    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    phone: {type: String},
    password: {type: String},
    status: {
        type: String,
        default: false
    },

    created: {
        type: Date,
        default: moment().format()
    }

});

module.exports = mongoose.model('Users', UsersSchema);
