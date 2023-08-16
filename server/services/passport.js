const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { model } = require('mongoose');
const { googleClientID, googleClientSecret } = require('../config/keys.js');

const User = model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userCollection = await User.findById(id);
        done(null, userCollection);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                done(null, existingUser);
            } else {
                const newUser = await new User({ googleId: profile.id }).save();
                done(null, newUser);
            }
        }
    )
);
