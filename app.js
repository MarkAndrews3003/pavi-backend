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

//Set up default mongoose connectionif (process.env.NODE_ENV === 'production') {
// //     console.log('connecting to mongo')
// //     // const mongoDB = 'mongodb://heroku_8dzdbvpq:5tupjblv4i4jgqkjh7sbcbnr03@ds121176.mlab.com:21176/heroku_8dzdbvpq';
// //     const mongoDB = 'mongodb+srv://markandrews:davmark11@cluster0-avjzy.mongodb.net/pavi';
// //     console.log(mongoDB)
// //     mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
// //         console.log(err)
// //         if (err) throw err;
// //     });
// // } else {
// //
// //     const mongoDB = 'mongodb://127.0.0.1/pavi';
// //     mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// // }
//

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

const path = require('path');


let dist = path.join(__dirname, '/dist/');

if (process.env.NODE_ENV === 'production') {
    dist = path.join(__dirname, '/dist/')
}
app.use(express.static(dist));

// Separating Angular routes
app.get('*', (req, res, next) => {
    if (!req.url.includes('phpmyadmin')) {
        res.sendFile(dist + 'index.html');
    }
});


