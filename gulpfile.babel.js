
//////////////////////////////////////////////////////////////////////////////////////////////
// Required files
//////////////////////////////////////////////////////////////////////////////////////////////


import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var plumber = require('gulp-plumber');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var browserSync = require('browser-sync');
var reload = browserSync.reload



let express;
const PATHS = {
  js: ['./src/**/*.js'],
  destination: './app'
};

//////////////////////////////////////////////////////////////////////////////////////////////
// BE task
//////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('server', () => {
  express = server.new(PATHS.destination);
  express.start.bind(express);
});

gulp.task('build', cb => {
  run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf(PATHS.destination, cb);
});

gulp.task('babel', shell.task([
    'babel src --out-dir app'
  ])
);

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () =>{
  return watch(PATHS.js, () => {
    gulp.start('build');
  });
});


//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Build Process task
//////////////////////////////////////////////////////////////////////////////////////////////



gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});