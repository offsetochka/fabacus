var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    clean = require('gulp-clean'),
    stream = require('event-stream'),
    size = require('gulp-size'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    purgecss = require('gulp-purgecss'),
    cleanCSS = require('gulp-clean-css');

var cssPath = {
    sourceMain: "./css/*.css",
    animate: "./css/animate.css",
    bootstrapMin: "./css/bootstrap.min.css",
    revolutionSettings: "./revolution/css/settings.css",
    revolutionLayers: "./revolution/css/layers.css",
    revolutionNavigation: "./revolution/css/navigation.css",
    bootsNav: "./css/bootsnav.css",
    style: "./css/style.css",
    responsive: "./css/responsive.css",
    dist: "./static/css",
    watch: "./css/*.css"
};

var jsPath = {
    source: "./js/jquery.js",
    modernizr: "./js/modernizr.js",
    bootstrap: "./js/bootstrap.bundle.js",
    jqueryEasing: "./js/jquery.easing.1.3.js",
    smoothScroll: "./js/smooth-scroll.js",
    jqueryAppear: "./js/jquery.appear.js",
    wowMin: "./js/wow.min.js",
    swiperMin: "./js/swiper.min.js",
    imagesloaded: "./js/imagesloaded.pkgd.min.js",
    counter: "./js/counter.js",
    fitvids: "./js/jquery.fitvids.js",
    main: "./js/main.js",
    themepunchTools: "./revolution/js/jquery.themepunch.tools.min.js",
    themepunchRevolution: "./revolution/js/jquery.themepunch.revolution.min.js",
    recliner: "./js/recliner.min.js",
    dist: "./static/js"
};

var imagesPath = {
    source: "./images/**/*",
    dist: "./static/img"
};

var fontsPath = {
    source: "./fonts/*",
    dist: "./static/fonts"
};

gulp.task('styles', function() {
    return gulp.src([
            cssPath.animate,
            cssPath.bootstrapMin,
            cssPath.revolutionSettings,
            cssPath.revolutionLayers,
            cssPath.revolutionNavigation,
            cssPath.bootsNav,
            cssPath.style,
            cssPath.responsive
        ])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        // .pipe(purgecss({
        //     content: './index.html'
        // }))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        // .pipe(purgecss({
        //   content: './index.html'
        // }))
        .pipe(gulp.dest(cssPath.dist));
});

gulp.task('scripts', function() {
    var js = gulp.src([
            jsPath.source,
            jsPath.modernizr,
            jsPath.bootstrap,
            jsPath.jqueryEasing,
            jsPath.smoothScroll,
            jsPath.jqueryAppear,
            jsPath.wowMin,
            jsPath.swiperMin,
            jsPath.imagesloaded,
            jsPath.counter,
            // jsPath.fitvids,
            jsPath.themepunchTools,
            jsPath.themepunchRevolution,
            jsPath.recliner,
            jsPath.main,
        ])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(size({
            title: 'size of custom js'
        }))
        .pipe(gulp.dest(jsPath.dist))
});

gulp.task("fonts:blink", function() {
    return gulp
        .src(fontsPath.source)
        .pipe(gulp.dest(fontsPath.dist))
});



gulp.task('images', function() {
    return gulp.src(imagesPath.source)
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(size({
            title: 'size of images'
        }))
        .pipe(gulp.dest(imagesPath.dist));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});



gulp.task(
    "watch", ["browser-sync", "styles", "scripts", "fonts:blink", "images"],
    function() {
        gulp.watch(cssPath.watch, ["styles"]);
        gulp.watch(jsPath.source, ["scripts"]);
        gulp.watch(fontsPath.source, ["fonts:blink"]);
        gulp.watch(imagesPath.source, ["images"]);
    }
);



// gulp.task("build", ["html", "css:blink", "js:blink", "img:minify"]);