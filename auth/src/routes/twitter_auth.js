const routes = (app, passport) => {
  app.get('/', passport.authenticate('twitter'));
  
  // handle the callback after facebook has authenticated the user
  app.get('/callback', passport.authenticate('twitter'));
};

module.exports = routes;