'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import {Instrumenter} from 'isparta';
import isparta from 'isparta';

const $ = plugins();

gulp.task('test:pre', () => {
  gulp.src('src/**/*.js')
      .pipe($.istanbul())
      .pipe($.istanbul.hookRequire());
});

gulp.task('test', (done) => {
  gulp.src('src/**/*.js')
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('test/**/*.test.js')
        .pipe($.mocha())
        .pipe($.istanbul.writeReports({
          dir: './build/coverage',
          reporters: ['lcov', 'json'],
          reportOpts: {
            lcov: {dir: './build/coverage/lcov', file: 'lcov.info'},
            json: {dir: './build/coverage/json', file: 'coverage.json'}
          }
        }))
        .on('end', done);
    });
});

gulp.task('build', () => {
  gulp.src('src/**/*js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('bundle.js'))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
