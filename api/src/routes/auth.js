const router = require('express').Router();

/**
 * Addition of time stamping requests, put this on so that every request 
 * can be timed for performance down the track
 */
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.use('/auth', (req, res) => {
});


module.exports = router;