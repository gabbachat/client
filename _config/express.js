'use strict';

module.exports =  function(app) {

  const config = require('../_config/app.js'),
        consolidate = require('consolidate'),
        db = require(config.dir.server.lib + 'db.js')(app),
        express  = require('express'),
        router = require(config.dir.server.router)(app),
        util = require(config.dir.server.lib + 'util.js');

  // SET PUBLIC DIR
  app.use('/', express.static(config.dir.public));

  app.engine(config.engines.html.extension, consolidate[config.engines.html.template]);

  // SAVE SOME SETTING TO APP CONFIG FOR EASY ACCESS LATER
  app.set('config', config);
  app.set('huck', require('../lib/huck')(app));
  app.set('controllers', config.dir.server.controllers);
  app.set('routes', config.dir.server.routes);
  app.set('views', config.dir.server.views);
  app.set('view engine', config.engines.html.template);
  app.set('case sensitive routing', false);
  app.set('security', config.security);
  app.set('utility', util);

  // CONFIG BASED SETTINGS
  if (config.cors) app.use(require('cors')()); // ENABLE CORS
  if (config.gzip) app.use(require('compression')()); // ENABLE GZIP

  /* ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
  ! ! DANGER : DO NOT MODIFY BELOW THIS LINE !
  ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! */


  // - - - - - - - - - - - - - - - - - - - - - -
  // CAPTURES REQ & RES FOR CONTROLLER USE LATER
  // - - - - - - - - - - - - - - - - - - - - - -
  app.use('*', function (req, res, next) {
    app.set('req', req);
    app.set('res', res);
    next();
  });

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // METHOD TO LOAD A CONTROLLER FROM A ROUTE
  // const controller = app.get('controller')();
  // controller.get('product');
  // - - - - - - - - - - - - - - - - - - - - - - - -
  app.set('controller', {
      get: function(which) {
        require(config.dir.server.controllers + which)({
          get: app.get('req'),
          send: app.get('res')
        }, app);
      }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // METHOD TO LOAD A MODEL FROM A CONTROLLER
  // const Model = app.get('model')('user');
  // Model.get('entry type', id).then(function(data)
  // - - - - - - - - - - - - - - - - - - - - - - - -
  app.set('model', function(which) {
    return require(config.dir.server.models + which)(app);
  });


  // CONNECT TO DATABASE
  db.connect(function(err) {
    if (!err) {
      router.init(); // INITIALIZE ROUTER
      util.server.start(app); // FIRE UP THE SERVER
    } else {
      util.server.error(err);
    }
  })


};
