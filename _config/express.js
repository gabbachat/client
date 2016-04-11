'use strict';

module.exports =  function(app) {

  const bodyParser    = require('body-parser'),
        cookieParser  = require('cookie-parser'),
        config        = require('../_config/app.js'),
        consolidate   = require('consolidate'),
        db            = require(config.dir.server.lib + 'db.js')(app),
        express       = require('express'),
        flash         = require('connect-flash'),
        multer        = require('multer'),
        LocalStrategy = require('passport-local').Strategy,
        passport      = require('passport'),
        router        = require(config.dir.server.router)(app),
        session       = require('express-session'),
        redis         = require('redis'),
        redisClient   = redis.createClient(config.redis.port, config.redis.host),
        RedisStore    = require('connect-redis')(session),
        upload        = multer(),
        util          = require(config.dir.server.lib + 'util.js'),
        uuid          = require('uuid');

  // SET PUBLIC DIR
  app.use('/', express.static(config.dir.public));

  app.engine(config.engines.html.extension, consolidate[config.engines.html.template]);

  app.locals.pretty = config.prettify;

  // SAVE SOME SETTING TO APP CONFIG FOR EASY ACCESS LATER
  app.set('config', config);
  app.set('gabba', require('../lib/gabba')(app));
  app.set('controllers', config.dir.server.controllers);
  app.set('routes', config.dir.server.routes);
  app.set('views', config.dir.server.views);
  app.set('view engine', config.engines.html.template);
  app.set('case sensitive routing', false);
  app.set('security', config.security);
  app.set('utility', util);
  app.set('upload', upload);
  app.use(bodyParser.json()); // ENABLE application/json
  app.use(bodyParser.urlencoded({ extended: false })); // ENABLE application/x-www-form-urlencoded
  // app.use(cookieParser({
  //   secret: config.security.secret,
  //   httpOnly: false
  // })); // ENABLD COOKIES
  app.use(flash());

  // PASSPORT
  app.use(session({
    cookie: {
      httpOnly: false,
      secure: false
    },
    genid: function(req) {
      return uuid.v4() // use UUIDs for session IDs
    },
    name: 'gabba.sid',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    secret: config.security.secret,
    store: new RedisStore({
        host: config.redis.host,       //where redis store is
        port: config.redis.port,              //default redis port
        prefix: 'gabba'          //prefix for sessions name is store
        // pass: 'What size cells are these? Eight by eight? Ours are nine by nine... no big deal.'  //password to redis db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.set('passport', passport);

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

      // THIS NEEDS TO HAPPEN AFTER DB IS CONNECTED
      let strategies = {
        local: require(config.dir.config + 'passport/local')(app)
      };

      passport.use(strategies.local);

      router.init(); // INITIALIZE ROUTER
      util.server.start(app); // FIRE UP THE SERVER
    } else {
      util.server.error(err);
    }
  })


};
