'use strict';

var chalk = require('chalk');

module.exports = function (config) {

  // global settings
  config.domain = 'ddcontentful.herokuapp.com';
  config.env = 'production';
  config.address = 'http://' + config.domain + '/'; // base url

  // directories
  config.public = {
    css : config.address + 'css/',
    img : config.address + 'img/',
    lib : config.address + 'lib/',
    js : config.address + 'js/'
  };

  return config;

};
