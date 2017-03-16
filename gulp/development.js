
//////////////////////////////////////////////////////////////////////////////////////////////
// Required files
//////////////////////////////////////////////////////////////////////////////////////////////


var gulp = require('gulp');
var shell = require('gulp-shell');
var rimraf = require('rimraf');
var gulpRimraf = require('gulp-rimraf');
var run = require('run-sequence');
var watch = require('gulp-watch');
var server = require('gulp-live-server');

var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var plumber = require('gulp-plumber');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var gulpif = require('gulp-if');
var amdOptimize = require('amd-optimize');
var ignore = require('gulp-ignore');


var globalConfig = require('./config');

//////////////////////////////////////////////////////////////////////////////////////////////
// Vars setup
//////////////////////////////////////////////////////////////////////////////////////////////


var autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
var express;

//////////////////////////////////////////////////////////////////////////////////////////////
// BE task
//////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('server', function(){
  express = server.new('./server/build');
  express.start.bind(express);
});

gulp.task('build', function(cb){
  run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', function(cb){
  rimraf('./server/build', cb);
});

gulp.task('babel', shell.task([
    'babel ./server/src --out-dir ./server/build'
  ])
);

gulp.task('restart', function(){
  express.start.bind(express)();
});


gulp.task('watch-be', function(){
  gulp.watch('./server/src/**/*.js', function(){
    gulp.start('build');
  });
})


//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-scripts', function(cb){
  console.log('clean scripts');
  rimraf('./public/assets/app', cb);
});

gulp.task('traslate-scripts', function(){
  console.log('traslate scripts');
  gulp.src('./public/src/**/*.js')
    .pipe(gulpif(globalConfig.production(),uglify()))
    .pipe(gulp.dest('./public/assets/app'));
});


gulp.task('less', function(){
  gulp.src('./public/less/**/*.less')
    .pipe(plumber())
    .pipe(less({
      plugins: [autoprefix]
    }))

    .pipe(concat('allmin.css'))

    //Minify all less
    .pipe(
      gulpif(globalConfig.production(),
        uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
        })
      )
    )

    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch-fe', function(){
  gulp.watch('./public/src/**/*.js', ['clean-scripts','traslate-scripts']);
  gulp.watch('./public/less/**/*.less', function(){
    gulp.start('less');
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Commands
//////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('development', function(cb){
  run('server', 'build', 'watch-be', 'watch-fe', 'clean-scripts', 'traslate-scripts', 'less', cb);
});

