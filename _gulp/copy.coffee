config      = require('../_config/app')
gulp        = require('gulp')
runSequence = require('run-sequence')

# COPY REQUIRED NPM PACKAGES TO LIB FOLDER
# TODO: THIS SUCKS! FIND A BETTER SOLUTION :(
gulp.task 'copy:libs', ->
  gulp
    .src([
      config.gulp.npm + '*es6-shim/**/*'
      config.gulp.npm + '*systemjs/dist/**/*'
      config.gulp.npm + '*rxjs/bundles/**/*'
      config.gulp.npm + '*angular2/bundles/**/*'
      config.gulp.npm + '*material-design-lite/**/*'
      config.gulp.npm + '*socket.io-client/**/*'
      config.gulp.npm + '*ng2-cookies/**/*'
    ])
    .pipe gulp.dest(config.gulp.dest.lib)
