const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.uglify = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.init()))
			.pipe($.if(process.env.NODE_ENV === 'production', $.uglify()))
			.pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.write()))
			.pipe(gulp.dest(options.dest));
	}
};

module.exports['rebase-js'] = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe(gulp.dest(options.dest));
	}
};