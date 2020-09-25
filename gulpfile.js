'use strict';

const webpack = require('webpack-stream');
let gulp = require('gulp'),
	//css
	// stylus = require('gulp-stylus'),
	sass = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'), notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	browserSync = require('browser-sync').create(),
	replace = require('gulp-replace');

// let siteUrl = 'http://anticheporte.cf/';
// let siteDir = '../bs-antiche-porte/';

// let siteUrl = 'http://wc-estore.host1670806.hostland.pro/';
// let siteDir = '../wc-estore/';

// let siteUrl = 'http://gadda.cf/';
// let siteDir = '../bs-gadda/';

// let siteUrl = 'http://gadda.cf/';
// let siteDir = '../vue/';

// let siteDir = '../gsap/';
// let siteDir = '../javascript-petricenco/';

let siteUrl = 'http://javascript-petricenco.host1670806.hostland.pro/';
let siteDir = '../javascript-petricenco/';

// let siteUrl = 'http://zuccato.cf/';
// let siteDir = '../bs-zuccato/';

//let siteDir = '../js-movies/';

// let siteUrl = 'http://dev.ilcaffecheaspettavi.it/';
// let siteDir = '../bs-alytaly/';

// let siteUrl = 'http://bassoservizi.cf/';
// let siteDir = '../bs-bassoservizi/';

//let siteUrl = 'http://consorziostorm.cf/';
//let siteDir = '../bs-consorzio/';

// let siteUrl = 'https://myrewind.it/';
// let siteDir = '../bs-rewind/';

// let siteUrl = 'http://bertan.ml/';
// let siteDir = '../bs-bertan/';

//let siteUrl = 'http://proseccoborgoluce.cf//';
//let siteDir = '../bs-proseccobordoluce/';


gulp.task("scss", function () {
	return gulp.src(siteDir + 'assets/scss/my.scss')
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
		.pipe(gulp.dest(siteDir + 'assets/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("build-js", () => {
	return gulp.src(siteDir + "assets/js/main.js")
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'script.js'
			},
			watch: true,
			devtool: "source-map",
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									debug: true,
									corejs: 3,
									useBuiltIns: "usage"
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(siteDir + "/assets/js"))
		.on("end", browserSync.reload);
});


gulp.task("watch", function () {
	gulp.watch(siteDir + 'assets/scss/**/*.scss', gulp.series('scss'));
	gulp.watch(siteDir + 'assets/js/**/*.js', gulp.series('build-js'));
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
	gulp.watch(siteDir + "**/*.html").on('change', browserSync.reload);
	gulp.watch(siteDir + "**/*.php").on('change', browserSync.reload);
	gulp.watch(siteDir + "**/*.css").on('change', browserSync.reload);
	gulp.watch(siteDir + "**/*.js").on('change', browserSync.reload);
});

// gulp.task('default', gulp.series('browser-sync'));
// gulp.task('default', gulp.parallel('scss', 'watch', 'browser-sync'));
// gulp.task('default', gulp.parallel('watch', 'browser-sync'));
gulp.task('default', gulp.parallel('build-js', 'watch', 'browser-sync'));
