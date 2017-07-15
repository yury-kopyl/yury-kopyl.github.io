const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.ttf2woff = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe($.ttf2woff())
			.pipe(gulp.dest(options.dest));
	};
};