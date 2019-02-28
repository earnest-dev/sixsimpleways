var gulp = require("gulp")
var browserSync = require("browser-sync").create()

//IMAGES
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var imagemin = require('gulp-imagemin')

gulp.task("html", function() {
    return gulp.src("src/*")
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
})

gulp.task("css", function() {
    return gulp.src("src/css/*")
        .pipe(sourcemaps.init())
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

gulp.task("default", gulp.series("html","css","js","images","watch"))