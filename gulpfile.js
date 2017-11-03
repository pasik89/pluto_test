// requires
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var fileinclude = require('gulp-file-include');
var merge = require('merge-stream');
// options/ params

var autoprefixerParams = {
    browsers: ['> 1%', 'last 2 versions'],
    cascade: false
};

// error handler
function handleError(err) {
    console.log("ERROR: " + err);
}

// gulp task for parsing CSS files
gulp.task('styles', function() {
    return gulp.src([
            'src/assets/scss/app.scss',
        ])
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerParams))
        .pipe(cmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css'))
        .on('error', handleError)
        .pipe(connect.reload());
});


// gulp task for parsing javascript files
gulp.task('scripts', function() {

    gulp.src([
            'src/assets/js/vendor/**/*.*'
        ])
        .pipe(gulp.dest('dist/assets/js/vendor'));

    gulp.src([
            'src/assets/js/*.*'
        ])
        .pipe(plumber())
        .pipe(plumber(handleError))
        .on('error', handleError)
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(connect.reload());

});

// gulp task for fonts

gulp.task('fonts', function() {

    return gulp.src([
            'src/assets/fonts/**/*.*'
        ])
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(connect.reload());
});

//gulp task for icons
gulp.task('icons', function() {

    return gulp.src([
            'src/assets/icons/*.*'
        ])
        .pipe(gulp.dest('dist/assets/icons'))
        .pipe(connect.reload());
});
// gulp task for for images

gulp.task('img', function() {

    return gulp.src([
            'src/assets/img/*.*',
            'src/assets/img/**/*.*'
        ])
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(connect.reload());
});

// gulp task for htmls

gulp.task('html', function() {
    return gulp.src([
            'src/pages/*.*',
            '!src/partials/*.*'
        ])
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});


// gulp task for vendor one time copy

gulp.task('vendors', function() {

    var foundationJS = gulp.src([
            './node_modules/foundation-sites/dist/foundation.min.js'
        ])
        .pipe(gulp.dest('src/assets/js/vendor/foundation'));

  var foundaionSCSS = gulp.src([
            'node_modules/foundation-sites/scss/*.*',
            'node_modules/foundation-sites/scss/**/*.*'
        ])
        .pipe(gulp.dest('src/assets/scss/vendor/foundation'));

    var foundationVendor = gulp.src([

            'node_modules/foundation-sites/_vendor/**/*.*'
        ])
        .pipe(gulp.dest('src/assets/scss/vendor/_vendor'));


    var jquery = gulp.src([
            './node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(gulp.dest('src/assets/js/vendor/jquery'));

        return merge(foundationJS, foundaionSCSS, foundationVendor, jquery);
});

gulp.task('watch', function() {
    gulp.watch(['src/assets/js/*.*'], ['scripts']);
    gulp.watch(['src/assets/scss/*.*', 'src/assets/scss/**/*.*', 'src/assets/scss/components/*.*', '!src/assets/scss/vendors/*.*'], ['styles']);
    gulp.watch(['src/assets/images/*.*'], ['img']);
    gulp.watch(['src/pages/*.*', 'src/partials/**/*.*'], ['html']);
});

gulp.task('connect', function() {

    connect.server({
        root: ['dist'],
        port: 3000,
        livereload: true
    })
});


gulp.task('build', function() {

    gulp.run(['scripts', 'styles', 'img', 'html', 'fonts', 'icons', 'connect']);
});

gulp.task('default', function() {

    gulp.run([
        'vendors',
        'build',
        'watch'
    ]);
});
