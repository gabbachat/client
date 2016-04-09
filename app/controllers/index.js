'use strict';

/*
title: 'Huck';
template: 'app/huck.jade';
component: 'app/huck.component.ts';
*/

module.exports = function(client, app) {
  client.send.render('index', {
    config: app.get('config'),
    title: 'Huck',
    template: 'app/huck.jade',
    component: 'app/huck.component.ts'
  });
};
