import passport from 'passport';
import googleAuth from 'passport-google-oauth20';
const GoogleStrategy = googleAuth.Strategy;
import mongoose from 'mongoose';
import User from '../models/userModel';

// const usePassport = () => {
passport.serializeUser((user: any, done) => {
    done(null, user?.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: '/api/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile?.id });
        if (existingUser) {
            return done(undefined, existingUser);
        }
        const email = profile?.emails ? profile.emails[0].value : undefined;
        const user = await new User({ googleId: profile?.id, email: email }).save();
        done(undefined, user);
    }));
// }

// export default usePassport;