/**
 * For more information see this tutorial: http://blog.webbb.be/use-jekyll-with-gulp/
 *
 * Libs import
 * --> How to install? npm install --save-dev gulp-minify-html
 * @type {[type]}
 */
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var path = require('path');
var pkg = require('./package.json'); // Import files

// sass stuff:
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');


var autoprefixer = require('gulp-autoprefixer');
// var minifycss = require('gulp-cssnano');
var nano = require('gulp-cssnano');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var gulp_uglify = require('gulp-uglify');
var assign = require('lodash.assign');
// var htmlmin = require('gulp-htmlmin');


gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
    // .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./../css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// add custom browserify options here
var customOpts = {
  entries: ['./js/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal


function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // .on('error', notify({message: 'JS error'}))
    // .pipe(notify({ message: 'JS error' }))
    .pipe(source('js/bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(gulp_uglify()) // use for production!@?!
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('..'));
}

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./sass/**/*.scss', ['sass']);

  // Watch .js files
  gulp.watch('./js/**/*.js', ['js']);

});
