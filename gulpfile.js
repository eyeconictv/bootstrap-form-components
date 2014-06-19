(function () {
  'use strict';

  var gulp = require('gulp');
  var spawn = require('child_process').spawn;
  var gutil = require('gulp-util');
  var connect = require('gulp-connect');
  var html2string = require('gulp-html2string');
  var path = require('path');
  var rename = require("gulp-rename");
  var concat = require("gulp-concat");
  var httpServer;

  gulp.task('e2e:server', function() {
    httpServer = connect.server({
      root: './',
      port: 8099,
      livereload: false
    });
    return httpServer;
  });

  gulp.task('e2e:test', ['build', 'e2e:server'], function () {
      var tests = ['test/e2e/test1.js'];

      var casperChild = spawn('casperjs', ['test'].concat(tests));

      casperChild.stdout.on('data', function (data) {
          gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
      });

      casperChild.on('close', function (code) {
          var success = code === 0; // Will be 1 in the event of failure
          connect.serverClose();
          // Do something with success here
      });
  });

  gulp.task('html2js', function () {
    return gulp.src('html/*.html')
      .pipe(html2string({ createObj: true, base: path.join(__dirname, 'html'), objName: 'TEMPLATES' }))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest('templates/'));
  });

  gulp.task('concat', function () {
    gulp.src(['./templates/**/*.js', './src/lib/*.js', './src/*.js'])
    .pipe(concat('bootstrap-font-picker.js'))
    .pipe(gulp.dest('./dist/'));
  });

  gulp.task('build', ['html2js', 'concat']);

  gulp.task('test', ['e2e:test']);

  gulp.task('default', ['build']);

})();
