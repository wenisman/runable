'use strict';

const app = require('express')();
const SwaggerExpress = require('swagger-express-mw');
const logfmt = require('logfmt');

// prewarm the connection
const mongoose = require('mongoose');
mongoose.connect(config.get('mongo.url'), config.get('mongo.connection_options'));

// required for testing 
module.exports = app;

let config = {
  appRoot: __dirname
};

/**
 * set up standard logging for all requests
 */
app.use(logfmt.requestLogger({elapsed: 'request.time'}, (req, res) => {
  return {
    'request.method': req.method,
    'request.path': req.path
  };
}));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();
  
      // if they aren't return status of 401
      res.status(401);
  }

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

    /**
     * default 404 - invoke the error handler for 404 and send appropriate message
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
      console.log(`runable event api - started on port ${port}!`);
    });
});
