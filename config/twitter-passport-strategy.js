const Users = require('../mongoose/models/users');
const TwitterStrategy = require('passport-twitter');

// Strategy config
module.exports = (passport) => {
    console.log(`${process.env.API_URL}auth/twitter/callback`)
    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: `${process.env.API_URL}auth/twitter/callback`
        },
        async (token, tokenSecret, profile, done) => {
            let user = await Users.findOne({email: profile.email});
            if (!user) {
                let data = {};
                let nameArr = profile._json.name.split(' ');
                data.first_name = nameArr[0];
                data.last_name = nameArr[1];
                console.log(data)
                let u = new Users(data)
                await u.save();

            }
            let newUser = await Users.findOne({email: profile._json.email}, {roles: 0});
            console.log(newUser)
            done(null, newUser);
        }
    ));
}
