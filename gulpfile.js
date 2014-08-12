(function () {
  'use strict';

  var gulp = require('gulp');
  var spawn = require('spawn-cmd').spawn;
  var gutil = require('gulp-util');
  var connect = require('gulp-connect');
  var html2string = require('gulp-html2string');
  var path = require('path');
  var rename = require("gulp-rename");
  var concat = require("gulp-concat");
  var bump = require('gulp-bump');
  var sass = require('gulp-sass');
  var minifyCSS = require('gulp-minify-css');
  var factory = require("widget-tester").gulpTaskFactory;
  var runSequence = require("run-sequence");
  var httpServer;

  var sassFiles = [
      "src/scss/**/*.scss"
    ],

    cssFiles = [
      "src/css/**/*.css"
    ];

  gulp.task('config', function() {
    var env = process.env.NODE_ENV || 'dev';
    gutil.log('Environment is', env);

    return gulp.src(['./src/js/config/' + env + '.js'])
      .pipe(rename('config.js'))
      .pipe(gulp.dest('./src/js/config'));
  });

  // Defined method of updating:
  // Semantic
  gulp.task('bump', function(){
    return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
  });

  gulp.task("sass", function () {
    return gulp.src(sassFiles)
      .pipe(sass())
      .pipe(gulp.dest("src/css"));
  });

  gulp.task("css", ["sass"], function () {
    return gulp.src(cssFiles)
      .pipe(concat("all.css"))
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("css-min", ["css"], function () {
    return gulp.src("dist/css/all.css")
      .pipe(minifyCSS({keepBreaks:true}))
      .pipe(rename('all.min.css'))
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("e2e:server", ["build"], factory.testServer());
  gulp.task("e2e:server-close", factory.testServerClose());
  gulp.task("test:e2e:casper:core", factory.testE2E());

  gulp.task("test:e2e:casper", function (cb) {
    runSequence("e2e:server", "test:e2e:casper:core", "e2e:server-close", cb);
  });

  gulp.task('e2e:test', function (cb) {
    runSequence("e2e:server", "e2e:test:casper", "e2e:server-close", cb);
  });

  gulp.task('html2js', function () {
    return gulp.src('src/html/*.html')
      .pipe(html2string({ createObj: true, base: path.join(__dirname, 'src/html'), objName: 'TEMPLATES' }))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest('src/templates/'));
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  gulp.task("test:e2e:ng:core", factory.testE2EAngular({
    testFiles: path.join(__dirname, "test", "e2e", "angular", "*scenarios.js")
  }));
  // Test the Angular version
  gulp.task("test:e2e:ng", ["webdriver_update"], function (cb) {
    return runSequence("e2e:server", "test:e2e:ng:core", "e2e:server-close", cb);
  });


  gulp.task('concat-fontpicker', ['config'], function () {
    return gulp.src(['./src/js/config/config.js', './src/templates/font-picker-template.js', './src/js/font-picker/font-loader.js', './src/js/font-picker/font-picker.js'])
    .pipe(concat('bootstrap-font-picker.js'))
    .pipe(gulp.dest('./dist/js'));
  });

  gulp.task('concat-angular-fontpicker', ['config'], function () {
    return gulp.src(['./src/js/angular/dtv-font-picker.js'])
    .pipe(concat('bootstrap-font-picker.js'))
    .pipe(gulp.dest('./dist/js/angular'));
  });

  gulp.task('concat-angular-font-size-picker', ['config'], function () {
    return gulp.src(['./src/js/angular/dtv-font-size-picker.js'])
    .pipe(concat('bootstrap-font-size-picker.js'))
    .pipe(gulp.dest('./dist/js/angular'));
  });

  gulp.task('concat-font-size-picker', ['config'], function () {
    return gulp.src(['./src/js/config/config.js', './src/js/font-size-picker/font-size-picker.js'])
      .pipe(concat('bootstrap-font-size-picker.js'))
      .pipe(gulp.dest('./dist/js'));
  });

  gulp.task('build', ['css-min', 'html2js', 'concat-fontpicker', 'concat-angular-fontpicker', 'concat-angular-font-size-picker', 'concat-font-size-picker']);

  gulp.task("metrics", factory.metrics());

  gulp.task("test", function (cb) {
    runSequence("test:e2e:casper", "test:e2e:ng", cb);
  });

  gulp.task('default', ['build']);

})();
