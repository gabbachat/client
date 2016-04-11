'use strict';

module.exports = function ( app ) {

  return {

    connect: function(cb) {
      const config = app.get('config');
      const mongo = require('sails-mongo');
      const Waterline = require('waterline');
      let db = new Waterline();

      db.loadCollection(require(config.dir.server.models + 'user.js')(app).init()); // LOAD USER MODEL
      db.loadCollection(require(config.dir.server.models + 'message.js')(app).init()); // LOAD USER MODEL

      // CONNECT TO DB
      db.initialize({
        adapters : {
          default: mongo,
          mongo: mongo
        },

        // Define an adapter to use
        connections: {
          compose: {
            adapter: config.db.adapter,
            url: config.db.host // defaults to `localhost` if omitted
          }
        }
      }, function(err, models) {

        if ( err ) {
          cb(err);
        } else {
          app.set('models', models.collections);
          app.set('connections', models.connections);
          cb();
        }
      });
    }

  };

};
