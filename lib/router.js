'use strict';

module.exports = function(app) {

  function loader(method, route, ctrl)  {
    app[method](route, app.get('upload').array(), function () {
      app.get('controller').get(ctrl);
    });
  }

  var router = {
    'get': function(route, controller) {
      loader('get', route, controller);
    },
    'post': function(route, controller) {
      loader('post', route, controller);
    },
    'put': function(route, controller) {
      loader('put', route, controller);
    },
    'head': function(route, controller) {
      loader('head', route, controller);
    },
    'delete': function(route, controller) {
      loader('delete', route, controller);
    },
    'options': function(route, controller) {
      loader('options', route, controller);
    },
    'trace': function(route, controller) {
      loader('trace', route, controller);
    },
    'copy': function(route, controller) {
      loader('copy', route, controller);
    },
    'lock': function(route, controller) {
      loader('lock', route, controller);
    },
    'mkcol': function(route, controller) {
      loader('mkcol', route, controller);
    },
    'move': function(route, controller) {
      loader('move', route, controller);
    },
    'purge': function(route, controller) {
      loader('purge', route, controller);
    },
    'propfind': function(route, controller) {
      loader('propfind', route, controller);
    },
    'proppatch': function(route, controller) {
      loader('proppatch', route, controller);
    },
    'unlock': function(route, controller) {
      loader('unlock', route, controller);
    },
    'report': function(route, controller) {
      loader('report', route, controller);
    },
    'mkactivity': function(route, controller) {
      loader('mkactivity', route, controller);
    },
    'checkout': function(route, controller) {
      loader('checkout', route, controller);
    },
    'merge': function(route, controller) {
      loader('merge', route, controller);
    },
    'm-search': function(route, controller) {
      loader('m-search', route, controller);
    },
    'notify': function(route, controller) {
      loader('notify', route, controller);
    },
    'subscribe': function(route, controller) {
      loader('subscribe', route, controller);
    },
    'unsubscribe': function(route, controller) {
      loader('unsubscribe', route, controller);
    },
    'patch': function(route, controller) {
      loader('patch', route, controller);
    },
    'search': function(route, controller) {
      loader('search', route, controller);
    },
    'connect': function(route, controller) {
      loader('connect', route, controller);
    },
  }

  // REQUIRE ALL ROUTES IN /ROUTES DIR
  return {
    init: function() {
      const fs = require('fs');
      const routes = fs.readdirSync('./app/routes/');

      fs.readdir('./app/routes/', function(err, files) {
        for(var i=0;i<files.length;i++) {
          if (files[i] !== 'index.js' && files[i] !== 'error.js' ) {
            require(app.get('routes') + files[i])(router, app);
          }
        }
        // INDEX & ERROR ROUTES LAST
        require(app.get('routes') + 'index.js')(router, app);
        require(app.get('routes') + 'error.js')(router, app);
      });

    }
  }

};
