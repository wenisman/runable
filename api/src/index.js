const app = require('express')();
const logfmt = require('logfmt');

const auth = require('./routes/auth');
const events = require('./routes/events');

/**
 * set up standard logging for all requests
 */
app.use(logfmt.requestLogger({elapsed: 'request.time'}, (req, res) => {
  return {
    'request.method': req.method,
    'request.path': req.path
  };
}));

app.use('/auth', auth);
app.use('/events', events);


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
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'dev' ? err : {}
    });
});

app.listen(9000, () => {
  console.log('runable api - started on port 9000!');
});
