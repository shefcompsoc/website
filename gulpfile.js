const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const livereload = require('gulp-livereload')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

// Build Tasks
gulp.task('sass', () => {
  return gulp.src(['./public_html/css/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public_html/css'))
    .pipe(livereload())
})

gulp.task('markup', () => {
  return gulp.src('./**/*.{html,php}')
    .pipe(livereload())
})

// Watcher

gulp.task('observe', () => {
  livereload.listen()

  gulp.watch('./**/*.{html,php}', ['markup'])
  gulp.watch('./**/*.{scss,css}', ['sass'])
})

gulp.task('build', ['sass'])
gulp.task('watch', ['build', 'observe'])
gulp.task('default', ['watch'])
