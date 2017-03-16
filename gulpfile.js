'use strict'

var gulp = require('gulp');

let env = process.env.NODE_ENV || 'development';


require('require-dir')('./gulp')
console.log('Invoking gulp -', env)


gulp.task('default', ['clean'], function (defaultTasks) {
  gulp.start(env)
})
