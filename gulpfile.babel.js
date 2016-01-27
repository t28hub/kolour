'use strict';

import gulp from 'gulp';
import del from 'del';
import plugins from 'gulp-load-plugins';
import {Instrumenter} from 'isparta';
import isparta from 'isparta';

const $ = plugins();

gulp.task('clean', () => {
  del('build/*', {dot: true})
});

gulp.task('build', ['clean'], () => {
  gulp.src('src/**/*js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('test', ['clean'], (done) => {
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

