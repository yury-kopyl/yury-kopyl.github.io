const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports.svgmin = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.changed(options.dest))
			.pipe($.svgmin({
				plugins: [{
					removeDimensions: true
				},{
					removeAttrs: {
						attrs: options.removeAttrs ? options.removeAttrs : ''
					}
				}]
			}))
			.pipe(gulp.dest(options.dest));
	};
};