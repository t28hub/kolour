import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

const $ = plugins();

gulp.task('build', () => {
  gulp.src('src/**/*js')
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.concat('bundle.js'))
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest("dist"));
});
