var gulp = require('gulp');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var optipng = require('gulp-optipng');

gulp.task('build', function(callback){
  runSequence(['jekyll-build'], callback);
});

gulp.task('jekyll-build', function(callback){
  spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', callback);
});

gulp.task('jekyll-build-dev', function(callback){
  return spawn('jekyll', ['build', '--config=_config.yml,_config.dev.yml', '-q'],
    {stdio: 'inherit'}).on('close', callback);
});

gulp.task('browserSync', function(){
  browserSync({
    online: false,
    open: false,
    notify: false,
    server: {
      baseDir: '_site',
    }
  });
});

gulp.task('watch', ['jekyll-build-dev', 'browserSync'], function(){
  gulp.watch(['**/*', '!_site/**/*'], function(){
    runSequence(['jekyll-build-dev'], function(){
      browserSync.reload();
    });
  });
});
