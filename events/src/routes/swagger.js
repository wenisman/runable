const router = require('express').Router();
const logfmt = require('logfmt');


/* swt up swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.yml');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * set up standard logging for all requests
 */
router.use(logfmt.requestLogger({elapsed: 'request.time'}, (req) => {
  return {
    'request.method': req.method,
    'request.path': req.path
  };
}));


module.exports = router;