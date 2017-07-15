const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const runTimestamp = Math.round(Date.now()/1000);

module.exports.iconfont = (options) => {
	return () => {
		return gulp.src(options.src)
			.pipe($.iconfontCss({
				fontName: options.fontName,
				path: '_gulp-tasks/_iconfont.scss',
				targetPath: options.targetPath,
				fontPath: options.fontPath
			}))
			.pipe($.iconfont({
				fontName: options.fontName, // required
				prependUnicode: true, // recommended option
				formats: ['woff2', 'svg', 'ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
				timestamp: runTimestamp, // recommended to get consistent builds when watching files
				normalize: true,
				fontHeight: 1024
			}))/*
			.on('glyphs', function(glyphs, options) {
				// CSS templating, e.g.
				console.log(glyphs, options);
			})*/
			.pipe(gulp.dest(options.dest));
	}
};