config      = require('../../_config/app')
gulp        = require('gulp')
sourcemaps  = require('gulp-sourcemaps')
stylus      = require('gulp-stylus')

# COMPILE MAIN STYLUS FILE
gulp.task 'compile:stylus', ->
  gulp.src(config.gulp.src.assets.stylus.main)
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write('.'))
      .pipe gulp.dest(config.gulp.dest.assets.stylus.main)
