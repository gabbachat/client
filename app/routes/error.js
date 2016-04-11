'use strict';

module.exports = function(router, app) {

  const config = app.get('config');

  // IF WE'RE USING FRONT-END ROUTING, LET INDEX TO HANDLE ALL UNMATCHED ROUTES
  if (config.spa) {
    router.get('*', config.controller.default);
  // IF NO SPA, ASSUMING ROUTE FAILED TO MATCH & THROW 404
  } else {
    router.get('*', config.controller.error[404]);
  }

};
