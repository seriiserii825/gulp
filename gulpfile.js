'use strict';

let gulp = require('gulp'),
	//css
	// stylus = require('gulp-stylus'),
	sass = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	browserSync = require('browser-sync').create(),
	replace = require('gulp-replace');

// gulp.task("css", function () {
// 	return gulp.src('../wc-estore/assets/sass/my.scss')
// 		.pipe(plumber())
// 		.pipe(sourcemaps.init())
// 		.pipe(wait(500))
// 		.pipe(sass({
// 			outputStyle: 'expanded'
// 		}).on('error', notify.onError(function (error) {
// 			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
// 		})))
// 		.pipe(autoprefixer({
// 			cascade: false
// 		}))
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(gulp.dest('../wc-estore/assets/css/'))
// 		.pipe(browserSync.reload({
// 			stream: true
// 		}));
// 	// .pipe(notify("Change css"));
// });

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: "http://wc-estore.host1670806.hostland.pro/",
        reloadDelay: 2000
	});
	gulp.watch("../wc-estore/**/*.php").on('change', browserSync.reload);
	gulp.watch("../wc-estore/**/*.css").on('change', browserSync.reload);
	gulp.watch("../wc-estore/**/*.js").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('browser-sync') );
