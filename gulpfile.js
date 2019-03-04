var gulp = require("gulp")
var browserSync = require("browser-sync").create()
var ghpages = require("gh-pages")

//IMAGES & CSS
var cleanCSS = require('gulp-clean-css')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var imagemin = require('gulp-imagemin')
var concat = require('gulp-concat')

gulp.task("html", function() {
    return gulp.src("src/*")
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
})

gulp.task("css", function() {
    return gulp.src([
        'src/css/reset.css',
        'src/css/typography.css',
        'src/css/app.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require("autoprefixer"),
            require("postcss-preset-env")({
                stage: 1,
                browsers: ["IE 11","last 2 versions"]
            })
        ]))
        .pipe(concat("app.css"))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream())
})

gulp.task("js", function() {
    return gulp.src("src/js/*")
        .pipe(gulp.dest("dist/js/"))
        .pipe(browserSync.stream())
})

gulp.task("fonts", function() {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts/"))
        .pipe(browserSync.stream())
})

gulp.task("images", function() {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img/"))
})

gulp.task("watch", function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })

    gulp.watch("src/*.html", gulp.series('html')).on("change", browserSync.reload)
    gulp.watch("src/css/*", gulp.series('css'))
    gulp.watch("src/js/*", gulp.series('js'))
    gulp.watch("src/img/*", gulp.series('images'))
}) 

gulp.task("deploy", function(done) {
    ghpages.publish("dist")
    done()
})

gulp.task("default", gulp.series("html","fonts","css","js","images","watch"))