(function(){

    const passport = require('passport');

    // Facebook strategy
    const FacebookStrategy = require("passport-facebook").Strategy;

    // My modules
    const User = require("../models/user");

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/facebook/callback'
    },
    function(token, refreshToken, profile, done){
        process.nextTick(() => {
            User.findOne({ 'facebook.id' : profile.id }, (err, user) => {
                if (err) {
                    done(err);
                } else if (user) {
                    done(null, user);
                } else {
                    const newUser = new User();
                    
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName;

                    newUser.save((err) => {
                        if (err) {
                            done(err);
                        } else {
                            done(null. newUser);
                        }
                    });
                }
            });
        });
    }));

    module.exports = passport;

})();