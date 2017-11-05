const routes = (app, passport) => {
  app.get('/', passport.authenticate('google', { scope : ['profile', 'email'] }));
  
  // handle the callback after facebook has authenticated the user
  app.get('/callback', passport.authenticate('google'));
};

module.exports = routes;