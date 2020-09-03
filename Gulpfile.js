var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

gulp.task(
  'clean',
  gulp.series(() => del('lib')),
);

gulp.task(
  'lint',
  gulp.series(function() {
    var eslint = require('gulp-eslint');

    return gulp
      .src(['src/**/*.js', 'test/**/*.js', 'Gulpfile.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }),
);

gulp.task('copy', function() {
  return gulp.src('src/har.html')
    .pipe(gulp.dest('lib'));
});

gulp.task(
  'build',
  gulp.series(['clean', 'lint', 'copy'], function() {
    return gulp
      .src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
  }),
);
