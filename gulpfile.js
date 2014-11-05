/**
 * Created by rbhochhibhoya on 10/23/2014.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssMinify = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var htmlmin = require('gulp-htmlmin');
var html2js = require("gulp-ng-html2js");
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var rimraf = require('gulp-rimraf');


var options = {
    appName: 'calender',
    buildFolder: './build',
    libcss: 'lib.css',
    commoncss: 'common.css',
    featurecss: 'feature.css',
    libjs: 'lib.js',
    appjs: 'app.js',
    commonjs: 'common.js',
    featurejs: 'features.js'
};

function clean() {
    return gulp.src(options.buildFolder)
        .pipe(rimraf({
            force: true
        }));
}

function html() {
    gulp.src(['./public/index.html', './public/features/**/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(options.buildFolder));
}


function styleCore() {
    //export lib styles
    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat(options.libcss))
        .pipe(cssMinify())
        .pipe(gulp.dest(options.buildFolder));

}

function styleCommon() {
    gulp.src(['./public/common/styles/**/*.css'])
        .pipe(concat(options.commoncss))
        .pipe(cssMinify())
        .pipe(gulp.dest(options.buildFolder));

}
function styleFeatures() {
    gulp.src(['./features/**/*.css'])
        .pipe(concat(options.featurecss))
        .pipe(cssMinify())
        .pipe(gulp.dest(options.buildFolder));

}


function scriptCore() {

    gulp.src('./public/core/core.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        }))
        .pipe(concat(options.libjs))
        .pipe(gulp.dest(options.buildFolder));

}

function scriptCommon() {
    gulp.src(['./public/common/**/*.js'], {base: './public'})
        .pipe(concat(options.commonjs))
        .pipe(gulp.dest(options.buildFolder));
}

function scriptFeatures() {
    gulp.src(['./public/features/**/*.js'], {base: './public'})
        .pipe(concat(options.featurejs))
        .pipe(gulp.dest(options.buildFolder));
}

function partials() {

}
function scriptMain() {
    gulp.src('./public/calender.js', {base: './public'})
        .pipe(concat(options.appjs))
        .pipe(gulp.dest(options.buildFolder));
}

function serve() {
    connect.server({
        root: 'build/'
    });
}


gulp.task('clean', clean);
gulp.task('html', html);
gulp.task('style-core', styleCore);
gulp.task('style-common', styleCommon);
gulp.task('style-features', styleFeatures);
gulp.task('script-core', scriptCore);
gulp.task('script-common', scriptCommon);
gulp.task('script-features', scriptFeatures);
gulp.task('partial-features', partials);
gulp.task('script-main', scriptMain);


gulp.task('serve', serve);

gulp.task('build', ['html', 'style-core', 'style-common', 'style-features', 'script-core', 'script-common', 'script-features', 'script-main']);