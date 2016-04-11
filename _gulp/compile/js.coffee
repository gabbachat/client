babelify    = require('babelify')
browserify  = require('browserify')
config      = require('../../_config/app')
fs          = require('fs')
gulp        = require('gulp')
runSequence = require('run-sequence')

gulp.task 'compile:js', ['vet:js'], ->
  browserify({ debug: true })
    .transform(babelify.configure({
        presets: 'es2015'
      }))
    .require("./public/js/gabba.js", { entry: true })
    .bundle()
    .pipe(fs.createWriteStream('./public/js/gabba.min.js'));
  browserify({ debug: true })
    .transform(babelify.configure({
        presets: 'es2015'
      }))
    .require("./public/js/gabba.static.js", { entry: true })
    .bundle()
    .pipe(fs.createWriteStream('./public/js/gabba.static.min.js'));

gulp.task 'compile:systemjs', ['vet:js'], ->
  browserify({ debug: true })
    .transform(babelify.configure({
        presets: 'es2015'
      }))
    .require("./public/js/gabba.js", { entry: true })
    .bundle()
    .pipe(fs.createWriteStream('./public/js/gabba.min.js'));
