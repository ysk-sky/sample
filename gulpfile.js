// dependencies
const gulp = require('gulp');
const selenium = require('selenium-standalone');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');

// task (Selenium init & run)
gulp.task('selenium', (done) => {
  selenium.install({
    logger(message) { }
  }, (err) => {
    if (err) return done(err);

    selenium.start((err, child) => {
      if (err) return done(err);
      selenium.child = child;
      return done();
    });
  });
});

// task (test src pipe to mocha)
gulp.task('integration', ['selenium'], () => {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha()).pipe(plumber());
});

// task (execute test and post process)
gulp.task('test', ['integration'], () => {
  selenium.child.kill();
});
