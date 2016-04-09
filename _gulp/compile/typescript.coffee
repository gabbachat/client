config      = require('../../_config/app')
configTS    = require('../../tsconfig.json')
gulp        = require('gulp')
runSequence = require('run-sequence')
sourcemaps  = require('gulp-sourcemaps')
typescript  = require('gulp-typescript')

# COMPILE TYPESCRIPT
gulp.task 'compile:ts', ->
  gulp.src(configTS.files)
      .pipe(sourcemaps.init())
      .pipe(typescript(configTS.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe gulp.dest(config.gulp.dest.app)
