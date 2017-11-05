const fbStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const config = require('config');
const jwt = require('../lib/jwt');

const setup = (passport) => {
  passport.use('facebook', new fbStrategy({
      clientID: config.get('auth.facebook.clientId'),
      clientSecret: config.get('auth.facebook.clientSecret'),
      callbackUrl: config.get('auth.facebook.callbackUrl'),
      passReqToCallback: true
    },
    (token, refreshToken, profile, done) => {
      process.nextTick(function() {
        User.findOne({ 'account.facebook.id': profile.id }, (err, userDetails) => {
          if (err) {
            return done(err);
          }

          // no users found, create new user data
          if (!userDetails) {
            userDetails = new User();
          }

          userDetails.first_name = profile.name.givenName;
          userDetails.surname = profile.name.familyName;
          userDetails.account.facebook.id = profile.id;
          userDetails.account.facebook.token = token;
          // use just the first email address
          userDetails.account.facebook.email = profile.emails[0].value;
          userDetails.contact.email = profile.emails[0].value;

          userDetails.account.local.token = jwt.createToken({ loginType: 'facebook', id: userDetails.account.facebook.id });

          userDetails.save((err) => {
            if (err) {
              return done(err);
            }

            return done(null, userDetails);
          });
        });
      });
    }
  ));
};

module.exports = setup;