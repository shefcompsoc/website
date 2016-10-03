const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const livereload = require('gulp-livereload')
const concat = require('gulp-concat')
const cleancss = require('gulp-clean-css')
const sass = require('gulp-sass')
const purifycss = require('gulp-purifycss')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
  markup: ['./**/*.{html,php}', '!./node_modules/**'],
  sass: ['./**/*.{sass,scss}', '!./node_modules/**'],
  sassEntry: ['./public_html/css/style.scss'],
  scripts: ['./public_html/scripts/**/*.js'],
  cssOut: './public_html/css'
}

// Build Tasks
gulp.task('sass:dist', () => {
  return gulp.src(paths.sassEntry)
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(purifycss(paths.markup.concat(paths.scripts)))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(cleancss({
      keepBreaks: true
    }))
    .pipe(gulp.dest(paths.cssOut))
    .pipe(livereload())
})

// Build Tasks
gulp.task('sass', () => {
  return gulp.src(paths.sassEntry)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssOut))
    .pipe(livereload())
})

gulp.task('markup', () => {
  return gulp.src(paths.markup)
    .pipe(livereload())
})

// Watch tasks
gulp.task('observe', () => {
  livereload.listen()

  gulp.watch(paths.markup, ['markup'])
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('build:dist', ['sass:dist'])
gulp.task('build', ['sass'])
gulp.task('watch', ['build', 'observe'])
gulp.task('default', ['watch'])
