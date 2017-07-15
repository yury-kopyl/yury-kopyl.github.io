const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports['img-min'] = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe($.imagemin([
				$.imagemin.gifsicle({interlaced: true}),
				$.imagemin.jpegtran({progressive: true}),
				$.imagemin.optipng({optimizationLevel: 7}),
				$.imagemin.svgo({plugins: [{removeViewBox: true}]})
			]))
			.pipe(gulp.dest(options.dest));
	}
};

module.exports['resource'] = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe(gulp.dest(options.dest));
	}
};