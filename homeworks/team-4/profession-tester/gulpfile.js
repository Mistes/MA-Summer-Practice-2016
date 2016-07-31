var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('cssnano');

gulp.task('sass', function () {
    return gulp.src('./profession_tester/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./profession_tester/static'));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 version', 'IE 11']}),
        cssnano()
    ];
    return gulp.src('./profession_tester/static/main.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./profession_tester/static'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./profession_tester/sass/**/*.sass', ['sass']);
    gulp.watch('./profession_tester/static/**/*.css', ['css'])
});