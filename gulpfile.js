var gulp = require('gulp');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var optipng = require('gulp-optipng');

gulp.task('build', function(callback){
    'use strict';
    runSequence('jekyll-build', 'optipng', callback);
});

gulp.task('jekyll-build', function(callback){
    'use strict';
    spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', callback);
});

gulp.task('optipng', function () {
    'use strict';
    var options = ['-o7'];
    return gulp.src('_site/img/*.png').pipe(
        optipng(options)
    ).pipe(gulp.dest('_site/img/'));
});

gulp.task('jekyll-build-dev', function(callback){
    'use strict';
    return spawn(
        'jekyll', ['build', '--config=_config.yml,_config.dev.yml', '-q'],
        {stdio: 'inherit'}
    ).on('close', callback);
});

gulp.task('browserSync', function(){
    'use strict';
    browserSync({
        online: false,
        open: false,
        notify: false,
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('watch', ['jekyll-build-dev', 'browserSync'], function(){
    'use strict';
    gulp.watch(['**/*', '!_site/**/*'], function(){
        runSequence(['jekyll-build-dev'], function(){
            browserSync.reload();
        });
    });
});
