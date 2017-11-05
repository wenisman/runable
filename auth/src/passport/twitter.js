const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const config = require('config');
const jwt = require('../lib/jwt');

const setup = (app, passport) => {
  passport.use('twitter', new TwitterStrategy({
      consumerKey: config.get('auth.twitter.clientId'),
      consumerSecret: config.get('auth.twitter.clientSecret'),
      callbackURL: config.get('auth.twitter.callbackUrl'),
      passReqToCallback: true
    },
    function(token, tokenSecret, profile, cb) {
      process.nextTick(() => {
        User.findOne({ 'account.twitter.id' : profile.id }, function(err, userDetails) {

          if (err)
            return done(err);

          if (!userDetails) {
            userDetails = new User(); 
          }
          
          // set all of the user data that we need
          userDetails.account.twitter.id = profile.id;
          userDetails.account.twitter.token = token;
          userDetails.account.twitter.user_name = profile.username;
          userDetails.account.twitter.display_name = profile.displayName;

          userDetails.account.local.token = jwt.createToken({ loginType: 'twitter', id: userDetails.account.twitter.id })
          
          userDetails.save((err) => {
            if (err) {
              return done(err);
            }

            return done(userDetails);
          });
        });
      });
    }
  ));
};

module.exports = setup;