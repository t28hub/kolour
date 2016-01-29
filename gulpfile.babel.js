'use strict';

import gulp            from 'gulp';
import loadPlugins     from 'gulp-load-plugins';
import del             from 'del';
import runSequence     from 'run-sequence';
import eventStream     from 'event-stream';
import notifier        from 'node-notifier';
import browserSync     from 'browser-sync';
import {Instrumenter}  from 'isparta';
import metadata        from './package';

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

let errorHandler = function(error) {
  notifier.notify({
    title: metadata.name,
    message: error.message
  });
  this.emit('end');
};

gulp.task('version', (callback) => {
  notifier.notify({
    title: metadata.name,
    message: `${metadata.name}@${metadata.version}`
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
    .pipe($.plumber({errorHandler}))
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
      .on('finish', () => {
        gulp.src(PATHS.testFiles)
          .pipe($.plumber({errorHandler}))
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
  gulp.watch(PATHS.srcFiles, ['test']);
  gulp.watch(PATHS.coverageFiles, ['browser-sync:reload']);

  gulp.watch(PATHS.testFiles, (event) => {

    gulp.src(event.path)  
      .pipe($.plumber({errorHandler}))
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
      .pipe((() => {
        return eventStream.map((file, callback) => {
          callback(null, file);
        });        
      })());

  });

});

gulp.task('build', (callback) => {
  runSequence('clean', 'test', 'compile', callback); 
});

gulp.task('default', (callback) => {
  runSequence('clean', 'test', 'watch', callback); 
});
