'use strict';

const path = require('path'),
      rootPath = path.normalize(__dirname + '/..') + '/';

let config = {

  name: 'Gabba',

  // ### CACHE
  // Whether to enable caching.
  cache : false,

  // ### CORS
  // Whether to enable [CORS](https://github.com/evert0n/koa-cors).
  cors : false,

  // ### DATABASE
  db : {
    adapter: 'mongo',
    host: 'mongodb://coaster:yaketyyak@dogen.mongohq.com:10088/gabba?replicaSet=set-5451108d461811298c007405'
  },

  // 'mongodb://coaster:yaketyyak@dogen.mongohq.com:10088/gabba?replicaSet=set-5451108d461811298c007405'

  // ### DEBUG
  // Gabba may show more detailed messages in the console with this set to true.
  debug : true,

  // ### DEFAULT VIEW
  view: {
    default: 'index',
    error: {
      400: 'error/400',
      401: 'error/401',
      403: 'error/403',
      404: 'error/404',
      405: 'error/405',
      500: 'error/500',
    },
    spa: 'spa'
  },

  controller: {
    default: 'index',
    error: {
      400: 'error/400',
      401: 'error/401',
      403: 'error/403',
      404: 'error/404',
      405: 'error/405',
      500: 'error/500',
    }
  },

  // ### ENGINES
  // Gabba supports a small handful or html templating languages and css pre-processors out of the box (with more coming soon).
  engines : {
    // ##### HTML
    // Using consolidate to load views, view packages must still be installed with npm
    html : {
      template : 'jade', // options: handlebars | jade | nunjucks
      extension : '.jade' // options: .hbs | .jade | .js
    },
    // ##### CSS
    // Only stylus is working currently. Sass & Less are in the works, but don't seem to working right with iojs yet.
    css : {
      template : 'stylus', // options: (stylus|sass|less) - set false to just use vanilla css
      extension : '.styl' // options: (.styl|.sass|.less)
    },
    cssLibrary : false, // options: (axis|bourbon|nib) - set to false for none
  },

  // ### GZIP
  // Whether to enable [gzip](https://www.npmjs.com/package/koa-gzip) compression or not.
  gzip : true,

  // ### LOGGING
  logging : {
    console : true,
    file: false
  },

  // PORT NUMBER TO RUN ON
  port : 1981,

  prettify: true,

  redis: {
    host: '127.0.0.1',
    port: 6379
  },

  // ### SECURITY
  // THIS IS USED FOR PASSWORD ENCRYPTION
  security : {
    digest: 'sha512',
    length: 512,
    iterations: 10000,
    salt: 'supercalifragilisticexpialidocious',
    secret: 'theresalwaysmoneyinthebananastand'
  },

  // ### SOCKETS
  // Gabba is configured with [http://socket.io](socket.io) out of the box, but is not enabled by default.
  // Set this to true and you'll have a socket.io server up and and running.
  sockets : true,

  // ### SINGLE PAGE APP
  // IF YOU'RE USING ANGULAR, REACT OR ANOTHER SPA THAT WILL BE HANDLING THE ROUTING SET THIS TO true
  // NOTE: YOU CAN STILL USE USE NODE ROUTES ON TOP OF THIS, BUT ANY ROUTES YOU SET WILL TAKE PRECENCE
  // OVER ANY ROUTES THAT HAVE BEEN CONFIGURED ON THE FRONT END
  spa : false

};

config.dir = {
  app: [
    rootPath + '_config/**/*',
    rootPath + 'app/**/*',
    rootPath + 'lib/**/*'
  ],
  config : rootPath + '_config/',
  public: rootPath + 'public/',
  server: {
    controllers : rootPath + 'app/controllers/',
    lib : rootPath + 'lib/',
    models : rootPath + 'app/models/',
    router : rootPath + 'lib/router.js',
    routes : rootPath + 'app/routes/',
    script: 'server.js',
    sockets: rootPath + 'app/sockets',
    views: rootPath + 'app/views/'
  },
  root : rootPath
};

// GULP SETTINGS
config.gulp = {
  browserSync: {
    baseDir: 'public',
    files: [
      '!' + rootPath + 'public/lib/**/*',
      rootPath + 'public/**/*.*',
      rootPath + 'app/**/*.*',
      rootPath + 'server/**/*.*'
    ],
    ignore: [],
    open: false,
    port: 3000,
    reloadDelay: 1000
  },
  src: {
    assets: {
      js: [rootPath + 'public/js/**/*.js', '!' + rootPath + 'public/js/gabba.min.js'],
      ts: [rootPath + 'app/typescript/**/*.ts'],
      jade: [
        './app/views/**/*.jade',
        '!./app/views/layout/*',
        '!./app/views/templates/*'
      ],
      stylus: {
        app: [rootPath + 'public/css/**/*.styl', '!' + rootPath + 'public/css/styles.styl'],
        main: rootPath + 'public/css/styles.styl'
      }
    },
    app: rootPath + 'app/**/*',
    lib: rootPath + 'bower_components/**/*'
  },
  dest: {
    app: rootPath + 'public/app',
    assets: {
      css: rootPath + 'public/css/',
      dir: rootPath + 'public/',
      jade: rootPath + 'public/views/',
      js: rootPath + 'public/js/',
      stylus: {
        app: rootPath + 'public/css/',
        main: rootPath + 'public/css/'
      }
    },
    dir: rootPath + 'public/',
    lib: rootPath + 'public/lib/'
  },
  npm: rootPath + 'node_modules/'
};

// PULL IN ENVIRONMENT SETTING & APPENT TO MAIN CONFIG
if (typeof process.env.NODE_ENV !== 'undefined') {
  config = require(rootPath + '/_config/environment/' + process.env.NODE_ENV)(config);
} else {
  config = require(rootPath + '/_config/environment/development')(config);
}

module.exports = config;
