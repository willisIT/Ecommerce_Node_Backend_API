const JWTStrategy = require('passport-jwt').Strategy;

//load up user model..
const User = require('../models/user');
const config = require('../config/database');
const { ExtractJwt } = require('passport-jwt');

module.exports = function(passport) {
    //JWT Strategy
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JWTStrategy(opts, async (token, done) =>{
        try{
            const user = await User.findOne({where: {email: token.email}});
            if(!user) return done(null, false, {message: 'user not found.'})
            return done(null, user, {message: "Logged in successfully."})
        } catch(err) {
            done(err);
        }
    }));

    //Google Strategy
}