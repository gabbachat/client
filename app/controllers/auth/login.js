'use strict';

module.exports = function(client, app) {

  let data  = false,
      err   = client.get.flash('error'),
      user  = client.get.user;

  if (err.length === 0) err = false;

  // IF WE DON'T HAVE A SESSION COOKIE
  if (typeof user === 'undefined') {
    client.send.render('auth/login', {
      config: app.get('config'),
      error: err,
      title: 'Login',
    });

  // IF W HAVE COOKIE, PUSH TO MAIN PAGE
  } else {
    client.send.redirect('/');
  }

}
