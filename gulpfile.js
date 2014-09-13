var gulp = require('gulp');
var spawn = require('child_process').spawn;

gulp.task('build', function(cb){
  spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', cb);
});

gulp.task('serve', function(cb){
  return spawn('jekyll', ['serve'], {stdio: 'inherit'});
});

gulp.task('watch', function(cb){
  spawn('jekyll', ['serve', '-w', '--config', '_config.yml,_config.dev.yml'],
  {stdio: 'inherit'});
});
