'use strict';

const app = require('express')();
const SwaggerExpress = require('swagger-express-mw');
const logfmt = require('logfmt');

// required for testing 
module.exports = app;

let config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

    /**
     * set up standard logging for all requests
     */
    app.use(logfmt.requestLogger({elapsed: 'request.time'}, (req, res) => {
      return {
        'request.method': req.method,
        'request.path': req.path
      };
    }));

    /**
     * default 404 - invoke the error handler for 404 and send appropriate message
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /**
     * default error handler, hide the stack trace for all environments but dev
     */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send('error');
/*
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'dev' ? err : {}
        });
*/
    });

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
      console.log(`runable api - started on port ${port}!`);
    });
});
