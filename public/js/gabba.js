'use strict';

console.info('gabba loaded');

System.config({
  packages: {
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('app/gabba').then(null, console.error.bind(console));
