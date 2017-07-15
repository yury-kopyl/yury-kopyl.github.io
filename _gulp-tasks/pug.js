const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const fs = require('fs');

module.exports.pug = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest, {extension: '.html'}))
			.pipe($.data( function() {
				return JSON.parse(
					fs.readFileSync(options.data)
				);
			} ))
			.pipe($.pug({pretty: '    '}))
			.pipe(gulp.dest(options.dest));
	};
};

module.exports['pug-recompile'] = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.data( function() {
				return JSON.parse(
					fs.readFileSync(options.data)
				);
			} ))
			.pipe($.pug({pretty: '    '}))
			.pipe(gulp.dest(options.dest));
	};
};