var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


gulp.task('default', ['sass','serve']);

gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    }) ;

    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./css/*.css').on('change', reload);
    gulp.watch('.*.js').on('change', reload);
    gulp.watch('./*.html').on('change', reload);
});


gulp.task('sass', function() {
        gulp.src('./scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'));
    });
