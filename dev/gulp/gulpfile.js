var gulp = require('gulp'),
  //
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  imagemin = require("gulp-imagemin"),
  plumber = require('gulp-plumber'),
  pngquant = require('imagemin-pngquant'),
  rename = require("gulp-rename"),
  sass = require('gulp-sass'),
  svgmin = require('gulp-svgmin'),
  uglify = require('gulp-uglify');

gulp.task('styles', function() {
  return gulp.src('../../src/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ie 9'],
      cascade: false
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(plumber())
    .pipe(gulp.dest('../../src'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src([
      '../../src/js/scripts.js'
    ])
    .pipe(uglify({
      mangle: false
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(plumber())
    .pipe(gulp.dest('../../src/js'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('../../src/**/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(plumber())
    .pipe(gulp.dest('../../src'))
    .pipe(browserSync.stream());
});

gulp.task('images-svg', function() {
  return gulp.src('../../src/**/img/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeDoctype: true
      }, {
        removeComments: true
      }, {
        convertColors: {
          names2hex: false,
          rgb2hex: false
        }
      }]
    }))
    .pipe(plumber())
    .pipe(gulp.dest('../../src'))
    .pipe(browserSync.stream());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
      open: false,
      server: {
        baseDir: '../../src'
      }
    });
});

// Watch files, run tasks
gulp.task('watch', function() {
  gulp.watch('../../src/**/*.scss', ['styles']);
  gulp.watch(['../../src/js/plugins.js', '../../src/js/scripts.js'], ['scripts']);
  gulp.watch('../../src/**/img/*', ['images', 'images-svg']);
  gulp.watch('../../src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'images', 'images-svg', 'browser-sync', 'watch']);
