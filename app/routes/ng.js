'use strict';

module.exports = function(router, app) {

  // ALLOW ANGULAR TO LOAD JADE VIEWS
  router.get('/ng/*', 'ng');

};
