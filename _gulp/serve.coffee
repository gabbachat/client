config      = require('../_config/app')
gulp        = require('gulp')
nodemon     = require('gulp-nodemon')
runSequence = require('run-sequence')

gulp.task 'serve', (cb) ->
  called = false
  nodemon(
    script: config.dir.server.script
    # ext: 'js, jade, index'
    watch: config.dir.app
    ignore: [
      'README.md'
      'node_modules/**'
      '.DS_Store'
    ]).on('start', ->
      if !called
        runSequence [
          'watch'
          'browserSync'
        ]
        called = true
    )
