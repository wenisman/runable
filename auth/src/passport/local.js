const LocalStrategy = require('passport-local').Strategy;
const jwt = require('../lib/jwt');
const User = require('../models/user');

const setup = (passport) => {
  passport.use('local-signup', new LocalStrategy({
      usernameField: id,
      passwordField: password,
      passReqToCallback: true  
    }, 
    (req, id, password, done) => {
      process.nextTick(() => {
        User.findOne({ 'account.local.id': id }, (err, userDetails) => {
          if (err) {
            return done(err);
          }

          if (userDetails) {
            return done(null, false, { message: 'user already exists'})
          }

          let newUser = new User();
          newUser.account.local.id = id;
          newUser.account.local.password = newUser.generateHash(password);

          newUser.save((err) => {
            if (err) {
              return done(err);
            }

            return done(false, newUser);
          });
        })
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'id',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, id, password, done) => {
      process.nextTick(() => {
        User.findOne( {'account.local.id': id }, (err, userDetails) => {
          if (err) {
            return done(err);
          }

          if (!userDetails || !userDetails.validPassword(password)) {
            return done(null, false, { message: 'unable to verify username or password'});
          }

          // TODO: generate a jwt token and store in the user account local
          userDetails.account.local.token = jwt.createToken({ loginType: 'local', id: userDetails.account.local.id })
          userDetails.save((err) => {
            if (err) {
              throw err;
            }

            return done(null, userDetails);
          });
        });
      });
    }
  ));
};


module.exports = setup;