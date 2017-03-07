
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
  js: [],
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


//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('scripts', function(){
  gulp.src(['./public/src/**/*.js', '!app/js/**/*.min.js'])
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(reload({stream:true}));
});

gulp.task('less', function(){
  gulp.src('./public/less/**/*.less')
    //plumber helps to mantain working gulp even if occur any error on LESS declarations,
    //Seems only works for SASS because LESS have already implemeted this feature
    //.pipe(plumber())

    .pipe(less({
      plugins: [autoprefix]
    }))

    .pipe(concat('allmin.css'))

    //Minify all less
    /*.pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      })
    )*/

    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream:true}));
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Build Process task
//////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('watch', () =>{
  gulp.watch('./public/src/**/*.js', () => {
    gulp.start('scripts');
  });

  gulp.watch('./public/less/**/*.less', () => {
    gulp.start('less');
  });

  gulp.watch('./src/**/*.js', () => {
    gulp.start('build');
  });
});



gulp.task('default', cb => {
  run('server', 'build', 'watch', 'scripts', 'less', cb);
});