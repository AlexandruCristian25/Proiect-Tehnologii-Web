const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const User = require('../models').User;
const keys = require('./config');

passport.serializeUser((user,done) => {
  done(null, user.userId)
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { userId: id } }).then((user) => {
      done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { userId: profile.id } }).then((currentUser) => {
          if(currentUser){
            currentUser.update({accessToken: accessToken, refreshToken:refreshToken}).then((usr)=>{
              done(null, usr);
            });
          } else {
            new User({
              userId: profile.id,
              username: profile.displayName,
              accessToken: accessToken,
              refreshToken: refreshToken
            }).save().then((newUser) => {
              done(null, newUser);
            });
          }
        });
     })
)
