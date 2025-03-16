// server/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const configurePassport = (passport) => {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL // Use environment variable
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });
        
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            profile: {
              name: profile.displayName,
              avatar: profile.photos[0].value
            }
          });
          await user.save();
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }));
  
    // Add serialization/deserialization
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  };
  
  module.exports = configurePassport;

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:5000/api/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
    
//     if (!user) {
//       user = new User({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         profile: {
//           name: profile.displayName
//         }
//       });
//       await user.save();
//     }
    
//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// }));