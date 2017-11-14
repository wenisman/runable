const router = require('express').Router();
const events = require('../lib/events');

router.delete('/remove/all', (req, res) => {
  events
    .deleteAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

router.get('/list/:location', (req, res) => {
  events
    .list(req.params.location)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

router.get('/search/:location/:startDate/:endDate', (req, res) => {
  events
    .search(req.params.location, req.params.startDate, req.params.endDate)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

// TODO : put in the passport authentication middle wares
router.post('/upload', (req, res) => {
  events
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});


module.exports = router;