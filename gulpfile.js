const gulp = require('gulp'),
    webpack = require('webpack-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    watch = require('gulp-watch'),
    path = 'app';

gulp.task('webpack', function () {
    return gulp.src(path + '/js/dev/app.jsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(path + '/js/dist'));
});

gulp.task('styles', function () {
    return sass(path + '/sass/style.scss', {
        style: 'expanded',
        sourcemap: true,
        loadPath: [path + '/sass']
    })
    .pipe(autoprefixer({
        browsers: ['> 5%', 'Firefox > 10', 'ie >= 8', 'Chrome > 15', 'Safari > 3']
    }))
    .pipe(gulp.dest(path + '/css'));
});

gulp.task('watch', ['webpack', 'styles'], function () {
    gulp.watch([path + '/js/dev/**/*.*'], ['webpack']);
    gulp.watch(path + '/sass/*.scss', ['styles']);
});

gulp.task('default', ['watch']);