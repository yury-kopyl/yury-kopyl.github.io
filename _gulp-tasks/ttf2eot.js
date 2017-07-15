const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.ttf2eot = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe($.ttf2eot())
			.pipe(gulp.dest(options.dest));
	};
};