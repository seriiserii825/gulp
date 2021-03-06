"use strict";

const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const wait = require('gulp-wait'), notify = require("gulp-notify");
const browserSync = require("browser-sync");

// let siteUrl = 'http://wc-estore.host1670806.hostland.pro/';
// let siteDir = '../wc-estore/';

// let siteUrl = 'http://gadda.cf/';
// let siteDir = '../bs-gadda/';

// let siteUrl = 'http://gadda.cf/';
// let siteDir = '../vue/';

// let siteDir = '../gsap/';
// let siteDir = '../javascript-petricenco/';

// let siteUrl = 'http://javascript-petricenco.host1670806.hostland.pro/';
// let siteDir = '../javascript-petricenco/';

// let siteUrl = 'http://zuccato.cf/';

// const siteDir = '../bs-bunavestire/';
// const siteUrl = 'http://wp-bunavestire.host1670806.hostland.pro/';

//let siteDir = '../js-movies/';

// let siteUrl = 'http://dev.ilcaffecheaspettavi.it/';
// let siteDir = '../bs-alytaly/';

// let siteUrl = 'http://bassoservizi.cf/';
// let siteDir = '../bs-bassoservizi/';

//let siteUrl = 'https://semplicemente.eu/';
//let siteDir = '../wp-semplicemente/';

//let siteUrl = 'http://consorziostorm.cf/';
//let siteDir = '../bs-consorzio/';

let siteUrl = 'https://bludelego.it/';
let siteDir = '../bs-delego/';

// let siteUrl = 'https://myrewind.it/';
// let siteDir = '../bs-rewind/';

// let siteUrl = 'http://bertan.ml/';
// let siteDir = '../bs-bertan/';

// let siteUrl = 'http://proseccoborgoluce.cf//';
// let siteDir = '../bs-proseccobordoluce/';

gulp.task("scss", function () {
	return gulp.src(siteDir+'assets/scss/my.scss')
		// .pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(wait(500))
		.pipe(sass({
			outputStyle: 'expanded',
			allowEmpty: true
		}).on('error', notify.onError(function (error) {
			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(siteDir+'assets/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("watch", function () {
	gulp.watch(siteDir+'assets/scss/**/*.scss', gulp.series('scss'));
	gulp.watch(siteDir+'assets/js/modules/**/*.js', gulp.series('webpack'));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: {
			target: siteUrl,
			ws: true
		},
		reloadDelay: 1000
	});

	// browserSync.init({
	// 	server: {
	// 		baseDir: siteDir
	// 	},
	// 	notify: true
	// });
	gulp.watch(siteDir+"**/*.html").on('change', browserSync.reload);
	gulp.watch(siteDir+"**/*.php").on('change', browserSync.reload);
	gulp.watch(siteDir+"**/*.css").on('change', browserSync.reload);
	gulp.watch(siteDir+"**/*.js").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('browser-sync'));
// gulp.task('default', gulp.parallel('scss', 'watch', 'browser-sync'));
// gulp.task('default', gulp.parallel('watch', 'browser-sync'));
