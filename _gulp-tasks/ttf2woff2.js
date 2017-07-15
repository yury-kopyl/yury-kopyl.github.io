const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.ttf2woff2 = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe($.ttf2woff2())
			.pipe(gulp.dest(options.dest));
	};
};