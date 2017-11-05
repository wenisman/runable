const routes = (app, passport) => {
  app.get('/', passport.authenticate('facebook', { scope : 'email' }));
  
  // handle the callback after facebook has authenticated the user
  app.get('/callback', passport.authenticate('facebook'));
};

module.exports = routes;