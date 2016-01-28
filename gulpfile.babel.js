'use strict';

import gulp            from 'gulp';
import loadPlugins     from 'gulp-load-plugins';
import del             from 'del';
import notifier        from 'node-notifier';
import browserSync     from 'browser-sync';
import {Instrumenter}  from 'isparta';
import {name, version} from './package';

const $ = loadPlugins();
const _ = browserSync.create();
const PATHS = Object.freeze({
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.test.js',
  bundleFile: 'bundle.js',
  buildDir: 'build/',
  coverageDir: 'build/coverage/',
  lcovDir: 'build/coverage/lcov/'
});

gulp.task('version', (callback) => {
  notifier.notify({
    title: name,
    message: `${name}@${version}`
  }, callback);
});

gulp.task('clean', () => {
  del.sync(PATHS.buildDir, {dot: true});
});

gulp.task('build', ['clean'], () => {
  gulp.src(PATHS.srcFiles)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat(PATHS.buildFile))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.buildDir));
});

gulp.task('test', ['clean'], callback => {
  gulp.src(PATHS.srcFiles)
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
      .on('finish', () => {
        gulp.src(PATHS.testFiles)
          .pipe($.mocha())
          .pipe($.istanbul.writeReports({
            dir: PATHS.coverageDir,
            reporters: ['lcov'],
            reportOpts: {
              lcov: {dir: PATHS.lcovDir, file: 'lcov.info'}
            }
          }))
          .on('end', callback);
    });
});

gulp.task('browser-sync', () => {
  _.init({
    server: {
      baseDir: 'build/coverage/lcov/lcov-report/'
    }
  });
});

gulp.task('browser-reload', () => {
  _.reload();
});

gulp.task('watch', ['browser-sync'], callback => {
  gulp.watch([PATHS.srcFiles, PATHS.testFiles], ['test', 'browser-reload']);
});
