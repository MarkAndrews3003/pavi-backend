const express = require('express');
const app = express();

const port = 3000;
const server = require('http').createServer(app);
const cors = require('cors');


// Cors
app.use(cors(require('./config/cors')));

// Body parser
const bodyParser = require('body-parser');

//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/pavi';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

// Start server on pre-defined port
server.listen(port, () => {
    console.log('server is listening on port ' + port)
});

// Dotenv used to read process.env
require('dotenv').config();


// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Passport.js config
// const passport = require('passport');
// require('./config/google-passport-strategy')(passport);
// require('./config/facebook-passport-strategy')(passport);
// app.use(passport.initialize({}));


// Routes
app.use('/auth', require('./routes/auth'));
app.use('/companies', require('./routes/companies'));




