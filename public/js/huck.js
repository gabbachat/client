'use strict';

console.info('huck loaded');

System.config({
  packages: {
    app: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('app/huck').then(null, console.error.bind(console));
