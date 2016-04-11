'use strict';

module.exports = function ( app ) {

  // const Waterline = require('waterline');

  // CREATE A NEW COLLECTION
  return require('waterline').Collection.extend({

    identity: 'user',
    connection: 'compose',

    attributes: {
      username: 'string',
      password: 'string'
    }

  });


};
