config      = require('../../_config/app')
gulp        = require('gulp')
pug        = require('gulp-pug')
runSequence = require('run-sequence')

# COMPILE PUG TEMPLATES
gulp.task 'compile:pug', ->
  gulp.src(config.gulp.src.assets.pug)
      .pipe(pug(
        locals: {
          config: config
        }
        pretty: true
      ))
      .pipe gulp.dest(config.gulp.dest.assets.pug)
