const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.ttf2 = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe(gulp.dest(options.dest));
	};
};