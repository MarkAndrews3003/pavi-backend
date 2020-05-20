const express = require('express');
const app = express();

const port = process.env.PORT || 3001; //3001->3000
const server = require('http').createServer(app);
const cors = require('cors');


// Cors
app.use(cors(require('./config/cors')));

// Body parser
const bodyParser = require('body-parser');

// Cookie Parser
const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

// Static resources
app.use('/uploads/', express.static('uploads/'));
app.use('/pdf', express.static('pdf/'));



//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
if (process.env.NODE_ENV === 'production') {
    console.log('connecting to mongo')
    const mongoDB = 'mongodb://markandrews:davmark11@ds133922.mlab.com:33922/heroku_lk4qc5jc';

    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err) {
        // console.log("Mongo error"+ err)
        if (err) throw err;
    });
} else {

    const mongoDB = 'mongodb://localhost:27017/pavi';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}


// Start server on pre-defined port
server.listen(port, () => {
    console.log('server is listening on port ' + port)
});

// Dotenv used to read process.env
require('dotenv').config();


// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Passport.js config
const passport = require('passport');
require('./config/google-passport-strategy')(passport);
require('./config/facebook-passport-strategy')(passport);
require('./config/twitter-passport-strategy')(passport);
app.use(passport.initialize({}));

const session = require('express-session')
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true
}));


// Routes
app.use('/auth', require('./routes/auth'));
app.use('/companies', require('./routes/companies'));
app.use('/users', require('./routes/users'));
app.use('/jobs', require('./routes/jobs'));

//New Route
app.use('/cv', require('./routes/CVR'));
app.use('/admin', require('./routes/admin'));

const path = require('path');


let dist = path.join(__dirname, '/dist/');

if (process.env.NODE_ENV === 'production') {
    console.log('dist works')
    dist = path.join(__dirname, '/dist/')
}
app.use(express.static(dist));

// Separating Angular routes
app.get('*', (req, res, next) => {
    if (!req.url.includes('phpmyadmin') && !req.url.includes('uploads')) {
        res.sendFile(dist + 'index.html');
    }
});