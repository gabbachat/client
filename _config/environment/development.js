'use strict';

const chalk = require('chalk'),
      os = require('os');

module.exports = function (config) {

  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }

  if ( typeof addresses[0] === 'undefined' ) addresses[0] = 'localhost';

  // global settings
  config.domain = addresses[0];
  config.env = 'development';
  config.address = 'http://' + config.domain + ':'  + config.port + '/'; // base url

  // directories
  config.public = {
    css : config.address + 'css/',
    img : config.address + 'img/',
    io : config.address + 'socket.io/socket.io.js',
    lib : config.address + 'lib/',
    js : config.address + 'js/'
  };

  return config;

};
