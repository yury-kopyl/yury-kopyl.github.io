const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');

module.exports.sprite = (options) => {
	return () => {
		let spriteData = gulp.src(options.src)
			.pipe($.spritesmith({
				padding: 0,
				/* top-down 	left-right 	diagonal 	alt-diagonal 	binary-tree */
				algorithm: 'binary-tree',
				imgPath: '../img/sprite_flags_24x16.png',
				imgName: 'sprite_flags_24x16.png',
				cssName: '_sprite.scss'
			}));

		let imgStream = spriteData.img
			.pipe(buffer())
			.pipe(gulp.dest(options.dest_img));

		let cssStream = spriteData.css
			.pipe(gulp.dest(options.dest_scss));

		return merge(imgStream, cssStream);
	}
};