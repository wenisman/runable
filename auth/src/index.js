'use strict';

const app = require('express')();
const config = require('config');
const cookieParser = require('cookieparser');
const mongoose = require('mongoose');
const passport = require('passport');

// create the mongoose db connection
mongoose.connect(config.get('mongo.url'), config.get('mongo.connection_options'));

// set the middle wares for auth
app.use(cookieParser);

// initialise passport
require('./passport/local')(passport);
require('./passport/facebook')(passport);
require('./passport/twitter')(passport);
require('./passport/google')(passport);
app.use(passport.initialize());

// load in the routes
app.use('/auth/local', require('./routes/local_auth'));
app.use('/auth/facebook', require('./routes/facebook_auth'));
app.use('/auth/twitter', require('./routes/twitter_auth'));
app.use('/auth/google', require('./routes/google_auth'));

/*
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
const port = process.env.PORT || 9091;
app.listen(port, () => {
  console.log(`runable auth api - started on port ${port}!`);
});
