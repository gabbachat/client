config      = require('../../_config/app')
gulp        = require('gulp')
jade        = require('gulp-jade')
runSequence = require('run-sequence')

# COMPILE JADE TEMPLATES
gulp.task 'compile:jade', ->
  gulp.src(config.gulp.src.assets.jade)
      .pipe(jade(
        locals: {
          config: config
        }
        pretty: true
      ))
      .pipe gulp.dest(config.gulp.dest.assets.jade)
