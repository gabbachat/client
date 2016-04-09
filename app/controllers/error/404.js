'use strict';

module.exports = function(client, app) {
  client.send.render(app.get('config').view.error[404], {
    config: app.get('config')
  });
};
