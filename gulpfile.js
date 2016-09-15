const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const livereload = require('gulp-livereload')
const concat = require('gulp-concat')
const cleancss = require('gulp-clean-css')
const sass = require('gulp-sass')
const purifycss = require('gulp-purifycss')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
  markup: ['./**/*.{html,php}'],
  sass: ['./**/*.{sass,scss}'],
  sassEntry: ['./public_html/css/style.scss'],
  cssOut: './public_html/css'
}

// Build Tasks
gulp.task('sass', () => {
  return gulp.src(paths.sassEntry)
    .pipe(sourcemaps.init()) // not in production
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    // .pipe(purifycss(paths.markup)) // only in production
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    // .pipe(cleancss({ // only in production
    //   keepBreaks: true
    // }))
    .pipe(sourcemaps.write()) // not in production
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

gulp.task('build', ['sass'])
gulp.task('watch', ['build', 'observe'])
gulp.task('default', ['watch'])
