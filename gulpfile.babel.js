import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

const PATHS = {
  js: ['./src/**/*.js'],
  destination: './app'
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

let express;

gulp.task('server', () => {
  express = server.new(PATHS.destination);
});

gulp.task('build', cb => {
  run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf(PATHS.destination, cb);
});

gulp.task('babel', shell.task([
    'babel src --out-dir app'
  ]));

gulp.task('restart', () => {
  express.start.bind(express);
});

gulp.task('watch', () =>{
  return watch(PATHS.js, () => {
    gulp.start('build');
  });
});