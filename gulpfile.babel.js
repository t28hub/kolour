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

gulp.task('version', (callback) => {
  notifier.notify({
    title: name,
    message: `${name}@${version}`
  }, callback);
});

gulp.task('clean', (callback) => {
  del('build/*', {dot: true}).then(callback);
});

gulp.task('build', ['clean'], () => {
  gulp.src('src/**/*js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('test', ['clean'], callback => {
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
            dir: 'build/coverage',
            reporters: ['lcov'],
            reportOpts: {
              lcov: {dir: 'build/coverage/lcov', file: 'lcov.info'}
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
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test', 'browser-reload']);
});
