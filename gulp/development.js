
//////////////////////////////////////////////////////////////////////////////////////////////
// Required files
//////////////////////////////////////////////////////////////////////////////////////////////


import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import less from 'gulp-less';
import concat from 'gulp-concat';
import uglifycss from 'gulp-uglifycss';
import plumber from 'gulp-plumber';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import gulpif from 'gulp-if';

import globalConfig from './config';

//////////////////////////////////////////////////////////////////////////////////////////////
// Vars setup
//////////////////////////////////////////////////////////////////////////////////////////////


let autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
let express;

//////////////////////////////////////////////////////////////////////////////////////////////
// BE task
//////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('server', () => {
  express = server.new('./server/build');
  express.start.bind(express);
});

gulp.task('build', cb => {
  run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf('./server/build', cb);
});

//gulp.task('babel', cb => {
//  gulp.src(['./server/src/**/*.js'])
//    .pipe(babel(  { presets: ['es2015-node5'] } ))
//    .pipe(gulp.dest('./server/build'));
//});

gulp.task('babel', shell.task([
    'babel ./server/src --out-dir ./server/build'
  ])
);

gulp.task('restart', () => {
  express.start.bind(express)();
});


gulp.task('watch-be', () => {
  gulp.watch('./server/src/**/*.js', () => {
    gulp.start('build');
  });
})


//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('scripts', cb => {
  rimraf('./public/js', cb);

  gulp.src(['./public/src/**/*.js', '!app/js/**/*.min.js'])
    .pipe(concat('concat.min.js'))
    .pipe(babel(  { presets: ['es2015'] } ))
    .pipe(gulpif(globalConfig.production(),uglify()))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('less', () => {
  gulp.src('./public/less/**/*.less')

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

    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch-fe', () =>{
  gulp.watch('./public/src/**/*.js', () => {
    gulp.start('scripts');
  });

  gulp.watch('./public/less/**/*.less', () => {
    gulp.start('less');
  });
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Commands
//////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('development', cb => {
  run('server', 'build', 'watch-be', 'watch-fe', 'scripts', 'less', cb);
});

