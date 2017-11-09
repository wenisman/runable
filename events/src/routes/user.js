const router = require('express').Router();
const user = require('../lib/user');

/*
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't return status of 401
  res.status(401);
}

router.post('/user/login', (req, res) => {
  // TODO : use pass port to authenticate
});
*/

router.post('/save', (req, res) => {
  user
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

router.get('/details/:id', (req, res) => {
  user
    .details(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

router.post('/registerevent', (req, res) => {
  user
    .registerevent(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

module.exports = router;