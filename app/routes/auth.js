'use strict';

module.exports = function(router, app) {

  // AUTHENTICATE WITH USER/PASSWORD
  app.post('/auth/login/gabba',
    app.get('passport').authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
    );

  // SHOW LOGIN FORM
  router.get('/login/', 'auth/login');

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

};
