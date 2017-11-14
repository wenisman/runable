const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const config = require('config');
const jwt = require('../lib/jwt');

const setup = (passport) => {
  passport.use('google', new GoogleStrategy({
      clientID: config.get('auth.google.clientId'),
      clientSecret: config.get('auth.google.clientSecret'),
      callbackUrl: config.get('auth.google.callbackUrl'),
      passReqToCallback: true
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(() => {
        User.findOne({ 'account.google.id': profile.id }, (err, userDetails) => {
          if (err) {
            return done(err);
          }

          if (!userDetails) {
            userDetails = new User();
          }

          userDetails.account.google.id = profile.id;
          userDetails.account.google.token = token;
          userDetails.account.google.name = profile.displayName;
          userDetails.account.google.email = profile.emails[0].value;

          userDetails.contact.email = profile.emails[0].value;
          userDetails.account.local.token = jwt.createToken({ loginType: 'google', id: userDetails.account.google.id })
          
          userDetails.save(function(err) {
            if (err) {
              return done(err);
            }

            return done(null, userDetails);
          });
        });
      });
    }
  ));
}

module.exports = setup;