'use strict';

module.exports = function ( app ) {

  const mongo = require('sails-mongo');

  console.log('attempting to establish connection to: ' + app.config.db.host);

  return {

    adapters : {
      'default': mongo,
      'mongo': mongo,
    },

    // Define an adapter to use
    connections: {
      compose: {
        adapter: app.config.db.adapter,
        url: app.config.db.host, // defaults to `localhost` if omitted
      }
    },
  };

};
