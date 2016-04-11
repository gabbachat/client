'use strict';

module.exports = function(router, app) {

  router.get('/', app.get('config').controller.default);

};
