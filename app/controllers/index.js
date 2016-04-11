'use strict';

/*
title: 'Gabba';
template: 'app/gabba.jade';
component: 'app/gabba.component.ts';
*/

module.exports = function(client, app) {
  let user = client.get.user;

  // IF WE HAVE A SESSION COOKIE
  if (typeof user !== 'undefined') {
    client.send.render('index', {
      config: app.get('config'),
      user: user,
      title: 'Gabba',
      template: 'app/gabba.jade',
      component: 'app/gabba.component.ts'
    });

  // IF NO COOKIE, PUSH TO LOGIN PAGE
  } else {
    client.send.redirect('/login');
  }

};
