'use strict';

module.exports = function(client, app) {
  let user = client.get.user;

  // IF WE HAVE A SESSION COOKIE
  if (typeof user !== 'undefined') {

    const Model = app.get('models').user;

    let query = { username: user.username };
    let data = { session: client.get.session.id };

    // SAVE SESSION ID TO USER DB
    Model.update(query, data).exec(function(err, data) {
      if (!err) console.log('Update error', err);
    });

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
