config      = require('../_config/app')
gulp        = require('gulp')
jshint      = require('gulp-jshint')
stylish     = require('jshint-stylish')

# COMPILE TYPESCRIPT
gulp.task 'vet:js', ->
  jsPath = config.gulp.src.assets.js
  jsPath.push('./server/**/*.js')
  jsPath.push('./config/**/*.js')
  jsPath.push('./server.js')
  return gulp.src(jsPath)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
