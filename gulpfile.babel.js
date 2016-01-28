'use strict';

import gulp            from 'gulp';
import loadPlugins     from 'gulp-load-plugins';
import del             from 'del';
import runSequence     from 'run-sequence';
import notifier        from 'node-notifier';
import browserSync     from 'browser-sync';
import {Instrumenter}  from 'isparta';
import {name, version} from './package';

const $ = loadPlugins();
const _ = browserSync.create();
const PATHS = Object.freeze({
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.test.js',
  coverageFiles: 'build/coverage/**/*.html',
  bundleFile: 'bundle.js',
  buildDir: 'build/',
  coverageDir: 'build/coverage/'
});

let errorHandler = error => {
  notifier.notify({
    title: name,
    message: error.message
  });
};

gulp.task('version', (callback) => {
  notifier.notify({
    title: name,
    message: `${name}@${version}`
  }, callback);
});

gulp.task('clean', () => {
  del(PATHS.buildDir, {dot: true});
});

gulp.task('compile', ['clean'], () => {
  gulp.src(PATHS.srcFiles)
    .pipe($.plumber({errorHandler}))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat(PATHS.bundleFile))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.buildDir));
});

gulp.task('test', (callback) => {
  gulp.src(PATHS.srcFiles)
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
      .on('finish', () => {
        gulp.src(PATHS.testFiles)
          .pipe($.plumber({errorHandler: function(error) {
            errorHandler(error);
            this.emit('end'); 
          }}))
          .pipe($.mocha({
            reporter: 'min'
          }))
          .pipe($.istanbul.writeReports({
            dir: PATHS.coverageDir,
            reporters: ['lcov'],
            reportOpts: {
              lcov: {dir: PATHS.coverageDir, file: 'lcov.info'}
            }
          }))
          .on('end', callback);
    });
});

gulp.task('browser-sync:init', () => {
  _.init({
    server: {
      baseDir: `${PATHS.coverageDir}lcov-report/`
    }
  });
});

gulp.task('browser-sync:reload', () => {
  _.reload();
});

gulp.task('watch', ['browser-sync:init'], (callback) => {
  gulp.watch([PATHS.srcFiles, PATHS.testFiles], ['test']);
  gulp.watch(PATHS.coverageFiles, ['browser-sync:reload']);
});

gulp.task('build', (callback) => {
  runSequence('clean', 'test', 'compile', callback); 
});

gulp.task('default', (callback) => {
  runSequence('clean', 'test', 'watch', callback); 
});
