const routes = (app, passport) => {
  // passport will automatically respond with a 401 on error
  // NOTE : might need a custom handler to send back a proper error message
  app.post('/signup', passport.authenticate('local-signup', { session: false }));
  app.post('/login', passport.authenticate('local-login', { session: false }));
  
};  

module.exports = routes;