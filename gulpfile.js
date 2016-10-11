var gulp = require('gulp');
var taskmodules = require('taskmodules');
var async = require('async');
var fs = require('fs-extra');
var watcher = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('default', function(done) {
	async.parallel([
    taskmodules.js.browserify.create('src/index.js', 'index.js', 'dist/', false, false),
    function(callback) {
      fs.copy('src/index.html', 'dist/index.html', function (err) {
        if (err) return console.error(err)
        callback();
      });
    }], function() {
	     done();
    });
});

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
      port: 8080,
      reloadDelay: 100
  });

  watcher('src/**/*', function() {
    async.parallel([
      taskmodules.js.browserify.create('src/index.js', 'index.js', 'dist/', false, false),
      function(callback) {
        fs.copy('src/index.html', 'dist/index.html', function (err) {
          if (err) return console.error(err)
          callback();
        });
      }], function() {
        browserSync.reload();
      });
  });


});
