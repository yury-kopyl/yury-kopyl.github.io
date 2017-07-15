const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.sass = (options) => {
	return () => {
		return $.rubySass(options.src, {sourcemap: true})
			.on('error', $.rubySass.logError)
			.pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.init()))
			.pipe($.if(process.env.NODE_ENV === 'production', $.groupCssMediaQueries()))
			.pipe($.if(process.env.NODE_ENV === 'production', $.cleanCss({compatibility: 'ie9'})))
			.pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.write()))
			.pipe(gulp.dest(options.dest));
	};
};