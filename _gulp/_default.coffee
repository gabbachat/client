config      = require('../_config/app')
gulp        = require('gulp')
runSequence = require('run-sequence')

# REQUIRE COMPILATION TASKS
require('require-dir')('./compile');

# DEFAULT TASK TO COMPILE & THEN LAUNCH SERVER
gulp.task 'default', ->
  runSequence [
    'compile'
    'serve'
  ],

# COMPILE ALL THE THINGZ
gulp.task 'compile', ->
  runSequence [
    'compile:stylus'
    'compile:js'
    'compile:jade'
    'compile:ts'
  ]
