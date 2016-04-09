'use strict';

module.exports = function(router, app) {

  const config = app.get('config');

  router.get('/', config.controller.default);

  router.get('/auth/login/:method', 'auth/login');

  // IF WE'RE USING FRONT-END ROUTING, SET INDEX
  if (config.spa) {
    router.get('*', config.controller.default);
  } else {
    router.get('*', config.controller.error[404]);
  }

};
