const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../validators/validateRegister');
const validateLogin = require('../validators/validateLogin');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Regular auth routes and social auth logout route
router.post('/register', validateRegister.rules, authController.register);
router.post('/login', validateLogin.rules, authController.login);
// router.get('/get', validateLogin.rules, authController.get);
router.get('/forgot/password/email/:id', authController.forGotPasswordSendEmail);
router.post('/forgot/password/sms', authController.forGotSms);
router.post('/forgot/password', authController.forGotPassword);
router.get('/logout', authController.logout);

// Passport.js Google auth routes
router.get('/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    scope: ['email', 'openid', 'profile'],
    session: false
}), (req, res) => {
    let roles = req.user.roles;
    delete req.user.roles;
    let user = req.user;
    let token = jwt.sign({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        id: user._id
    }, 'secretkey', {expiresIn: '8h'}, {roles});
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
});

router.get('/twitter',
    passport.authenticate('twitter', {session: false}));

router.get('/twitter/callback',
    passport.authenticate('twitter',
        {failureRedirect: '/login', scope: ['email'], session: false}),
    (req, res) => {
        let user = req.user;
        let roles = req.user.roles;
        // Successful authentication, redirect home.
        let token = jwt.sign({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user._id
        }, 'secretkey', {expiresIn: '8h'}, {roles});
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    });


// Passport.js Facebook auth routes
router.get('/facebook', passport.authenticate('facebook', {session: false}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope: ['email', 'openid', 'profile'],
    session: false
}), (req, res) => {
    let token = jwt.sign(req.user, 'secretkey', {expiresIn: '8h'});
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
});

// Passport.js Facebook-token auth route
router.post('/facebook/token', passport.authenticate('facebook-token', {
    session: false,
    scope: ['email']
}), (req, res) => {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    } else {
        let token = jwt.sign({email: req.user.email}, 'secretkey', {expiresIn: '8h'});
        res.json({token});
    }
});

module.exports = router;

