/**
 * Created by rbhochhibhoya on 10/23/2014.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssMinify = require('gulp-minify-css');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var htmlmin = require('gulp-htmlmin');
var html2js = require("gulp-ng-html2js");



var options = {
    appName: 'calender',
    buildFolder: './build',
    libcss: 'lib.css',
    libjs: 'lib.js',
    appjs: 'calender.js',
    partials: 'partials.js'
};

function scriptCore() {
    return browserify()
        .add('./public/core/core.js')
        .bundle(function (err) {
            console.log("erro:", err);
        })
        .pipe(source(options.libjs))
        .pipe(gulp.dest(options.buildFolder));
}

function scriptCommon() {
    gulp.src(['./public/common/calender.js'], {base: './public'})
        .pipe(concat('calender.js'))
        .pipe(gulp.dest(options.buildFolder));
}

function featurePartials() {
    var htmlMinOpts = {
        collapseWhitespace: true
    };
    return gulp
        .src('public/features/**/*-partial.html')
        .pipe(htmlmin(htmlMinOpts))
        .pipe(html2js({
            moduleName: options.appName + 'Partials',
            stripPrefix: 'src/public/features/'
        }))
        .pipe(concat('partials.js'))
        .pipe(uglify())
        .pipe(gulp.dest(options.buildFolder));
}


function index() {
    //export index.html
    gulp.src(['./public/common/index.html'])
        .pipe(gulp.dest(options.buildFolder));
}


function styleCore() {
    //export lib css
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat(options.libcss))
        .pipe(cssMinify())
        .pipe(gulp.dest(options.buildFolder));

}

function styleFeatures(){

}


gulp.task('index', index);
gulp.task('style-core', styleCore);
gulp.task('style-features', styleFeatures);
gulp.task('script-core', scriptCore);
gulp.task('script-common', scriptCommon);
gulp.task('feature-partials', featurePartials);


gulp.task('build', ['index', 'style-core', 'style-features', 'script-core', 'script-common', 'feature-partials']);