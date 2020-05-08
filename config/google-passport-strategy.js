const Users = require('../mongoose/models/users');
const to = require('../helpers/getPromiseResult');
const GoogleStrategy = require('passport-google-oauth20');


// Strategy config
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL}auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            delete profile._json['id'];

            let user;
            // user = await Users.findOne({email: profile._json.email},{'first_name': 1}).then(async (u) => {
            //     if (!u) {
            //         return await Users.create({
            //             first_name: profile._json.given_name,
            //             last_name: profile._json.family_name,
            //             access_token: accessToken
            //         })
            //     }
            //     return u;
            // })
            user = await Users.findOne({email: profile._json.email});
            if (!user) {
                let data = profile._json;
                data.first_name = data.given_name;
                data.last_name = data.family_name;
                let u = new Users(data)
                await u.save();
            }
            let newUser = await Users.findOne({email: profile._json.email}, {roles: 0});
            console.log(newUser)


            //     let user = await to(Users.findOrCreate({
            //             where: {
            //                 email: profile._json.email
            //             },
            //             defaults: {
            //                 first_name: profile._json.given_name,
            //                 last_name: profile._json.family_name,
            //                 access_token: accessToken
            //             },
            //             attributes: {exclude: ['role_id','status_id', 'access_token', 'id']},
            //
            //         }).spread((item) => {
            //             return item.get({
            //                 plain: true
            //             });
            //         })
            //         )
            //     ;

            done(null, newUser);
        }
    ))

}
