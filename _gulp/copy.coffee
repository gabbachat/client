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
    ])
    .pipe gulp.dest(config.gulp.dest.lib)
