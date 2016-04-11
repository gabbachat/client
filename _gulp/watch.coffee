config      = require('../_config/app')
gulp        = require('gulp')
runSequence = require('run-sequence')

# WATCH ASSETS FOR CHANGES
gulp.task 'watch', ->

  gulp.watch config.gulp.src.assets.stylus.app, ->
    runSequence 'compile:stylus'

  gulp.watch config.gulp.src.assets.stylus.main, ->
    runSequence 'compile:stylus', 'reload'

  gulp.watch config.gulp.src.assets.js, ->
    runSequence 'compile:js', 'reload'

  gulp.watch config.gulp.src.assets.jade, ->
    runSequence 'compile:jade', 'reload'

  gulp.watch config.gulp.src.assets.ts, ->
    runSequence 'compile:ts', 'reload'
