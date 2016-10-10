const gulp = require('gulp')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const livereload = require('gulp-livereload')
const flatten = require('gulp-flatten')
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const cleancss = require('gulp-clean-css')
const sass = require('gulp-sass')
const purifycss = require('gulp-purifycss')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
  dist: './dist',
  src: './src',

  markup: ['./views/**/*.pug'],
  styles: ['./src/styles/**/*.{sass,scss}'],
  fonts: ['./src/fonts/**/*.{woff,woff2,ttf,otf,eot}'],
  stylesEntry: ['./src/styles/style.scss'],
  scripts: ['./src/scripts/**/*.js'],
  images: ['./src/images/**/*.{png,jpg,svg,ico}'],

  stylesOut: './dist',
  scriptsOut: './dist/scripts',
  fontsOut: './dist/fonts',
  imagesOut: './dist/images'
}

// Clean Tasks
gulp.task('clean:all', ['clean:styles', 'clean:scripts', 'clean:images', 'clean:fonts'], () => {
  return
})

gulp.task('clean:styles', () => {
  return del(`${paths.stylesOut}/style.css`)
})

gulp.task('clean:scripts', () => {
  return del(paths.scriptsOut)
})

gulp.task('clean:images', () => {
  return del(paths.imagesOut)
})

gulp.task('clean:fonts', () => {
  return del(paths.fontsOut)
})

// Build Tasks
gulp.task('styles:dist', ['clean:styles'], () => {
  return gulp.src(paths.stylesEntry)
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(purifycss([...paths.markup, ...paths.scripts]))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(cleancss({
      keepBreaks: true
    }))
    .pipe(gulp.dest(paths.stylesOut))
})

gulp.task('styles', ['clean:styles'], () => {
  return gulp.src(paths.stylesEntry)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.stylesOut))
    .pipe(livereload())
})

gulp.task('markup', () => {
  return gulp.src(paths.markup)
    .pipe(livereload())
})

gulp.task('images:dist', ['clean:images'], () => {
  return gulp.src(paths.images)
  .pipe(imagemin())
  .pipe(gulp.dest(paths.imagesOut))
  .pipe(livereload())
})

gulp.task('images', ['clean:images'], () => {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.imagesOut))
    .pipe(livereload())
})

gulp.task('scripts', ['clean:scripts'], () => {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest(paths.scriptsOut))
    .pipe(livereload())
})

gulp.task('fonts:dist', ['clean:fonts'], () => {
  return gulp.src(paths.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.fontsOut))
    .pipe(livereload())
})

gulp.task('fonts', ['clean:fonts'], () => {
  return gulp.src(paths.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.fontsOut))
    .pipe(livereload())
})

// Watch tasks
gulp.task('observe', () => {
  livereload.listen()

  gulp.watch(paths.markup, ['markup'])
  gulp.watch(paths.fonts, ['fonts'])
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.images, ['images'])
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('clean', ['clean:all'])
gulp.task('build:dist', ['sass:dist', 'images', 'fonts', 'scripts'])
gulp.task('build', ['styles', 'images', 'fonts', 'scripts'])
gulp.task('watch', ['build', 'observe'])
gulp.task('default', ['watch'])
