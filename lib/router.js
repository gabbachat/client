'use strict';

module.exports = function(app) {

  const fs = require('fs'),
        routes = fs.readdirSync('./app/routes/');

  function loader(method, route, ctrl)  {
    app[method](route, function () {
      app.get('controller').get(ctrl);
    });
  }

  var router = {
    'get': function(route, controller) {
      console.log('get method requested');
      loader('get', route, controller);
    },
    'post': function(route, controller) {
      console.log('post method requested');
      loader('post', route, controller);
    },
    'put': function(route, controller) {
      console.log('put method requested');
      loader('put', route, controller);
    },
    'head': function(route, controller) {
      console.log('head method requested');
      loader('head', route, controller);
    },
    'delete': function(route, controller) {
      console.log('delete method requested');
      loader('delete', route, controller);
    },
    'options': function(route, controller) {
      console.log('options method requested');
      loader('options', route, controller);
    },
    'trace': function(route, controller) {
      console.log('trace method requested');
      loader('trace', route, controller);
    },
    'copy': function(route, controller) {
      console.log('copy method requested');
      loader('copy', route, controller);
    },
    'lock': function(route, controller) {
      console.log('lock method requested');
      loader('lock', route, controller);
    },
    'mkcol': function(route, controller) {
      console.log('mkcol method requested');
      loader('mkcol', route, controller);
    },
    'move': function(route, controller) {
      console.log('move method requested');
      loader('move', route, controller);
    },
    'purge': function(route, controller) {
      console.log('purge method requested');
      loader('purge', route, controller);
    },
    'propfind': function(route, controller) {
      console.log('propfind method requested');
      loader('propfind', route, controller);
    },
    'proppatch': function(route, controller) {
      console.log('proppatch method requested');
      loader('proppatch', route, controller);
    },
    'unlock': function(route, controller) {
      console.log('unlock method requested');
      loader('unlock', route, controller);
    },
    'report': function(route, controller) {
      console.log('report method requested');
      loader('report', route, controller);
    },
    'mkactivity': function(route, controller) {
      console.log('mkactivity method requested');
      loader('mkactivity', route, controller);
    },
    'checkout': function(route, controller) {
      console.log('checkout method requested');
      loader('checkout', route, controller);
    },
    'merge': function(route, controller) {
      console.log('merge method requested');
      loader('merge', route, controller);
    },
    'm-search': function(route, controller) {
      console.log('m-search method requested');
      loader('m-search', route, controller);
    },
    'notify': function(route, controller) {
      console.log('notify method requested');
      loader('notify', route, controller);
    },
    'subscribe': function(route, controller) {
      console.log('subscribe method requested');
      loader('subscribe', route, controller);
    },
    'unsubscribe': function(route, controller) {
      console.log('unsubscribe method requested');
      loader('unsubscribe', route, controller);
    },
    'patch': function(route, controller) {
      console.log('patch method requested');
      loader('patch', route, controller);
    },
    'search': function(route, controller) {
      console.log('search method requested');
      loader('search', route, controller);
    },
    'connect': function(route, controller) {
      console.log('connect method requested');
      loader('connect', route, controller);
    },
  }

  // REQUIRE ALL ROUTES IN /ROUTES DIR
  return {
    init: function() {
      console.log('router init');
      for(var i=0;i<routes.length;i++) {
        console.log('load route: ' + routes[i]);
        require(app.get('routes') + routes[i])(router, app);
      }
    }
  }

};
