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

let siteUrl = 'http://wc-estore.host1670806.hostland.pro/';
let siteDir = '../wc-estore/';

gulp.task("scss", function () {
	return gulp.src(siteDir + 'assets/scss/my.scss')
		// .pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(wait(500))
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError(function (error) {
			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(siteDir + 'assets/css/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(notify("Change css"));
});

gulp.task("watch", function () {
	gulp.watch(siteDir + 'assets/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: {
			target: siteUrl,
			ws: true
		},
		reloadDelay: 2000
	});
	gulp.watch(siteDir + "**/*.php").on('change', browserSync.reload);
	gulp.watch(siteDir + "**/*.css").on('change', browserSync.reload);
	gulp.watch(siteDir + "**/*.js").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
