'use strict';

/*
title: 'Gabba';
template: 'app/gabba.jade';
component: 'app/gabba.component.ts';
*/

module.exports = function(client, app) {
  let config = app.get('config');
  let fs = require('fs');
  let user = client.get.user;
  let url = client.get.url.split('/');

  // REMOVE EXTRA JUNK
  if (url[0] === '') url.shift();
  if (url[0] === 'ng') url.shift();

  let view = config.dir.server.views + url.join('/') + config.engines.html.extension;

  fs.access(view, fs.F_OK, (err) => {

    // CHECK THE THE VIEW FILE EXISTS
    if (!err) {
      client.send.render(view, {
        doctype: 'html',
        config: app.get('config'),
        tite: 'Gabba',
        user: user
      });
    // IF VIEW CAN'T BE FOUND, THROW 404
    } else {
      client.send.render(config.view.error[404], {
        config: config
      });
    }
  });

};
