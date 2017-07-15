'use strict';
const gulp = require('gulp');
const options = require('./gulpfile-config.json');
const watch = require('gulp-watch');
const path = require('path').dirname(__filename);
const browserSync = require('browser-sync').create();



//	Пересборка pug(jade) шаблонов при изменении основных файлов
requireTask('pug', './_gulp-tasks/pug', {
	data: options.src.pugData,
	src: options.src.pug,
	dest: options.dist.base
});

//	Сборка pug(jade) шаблонов
requireTask('pug-recompile', './_gulp-tasks/pug', {
	data: options.src.pugData,
	src: options.src.pug,
	dest: options.dist.base
});

//	При разработке делает sourcemaps при продакшене минифицирует js файлы
requireTask('uglify', './_gulp-tasks/uglify', {
	src: options.src.js,
	dest: options.dist.js
});

//	Копирует файлы из папки js/lib
requireTask('rebase-js', './_gulp-tasks/uglify', {
	src: options.src.jsLib,
	dest: options.dist.jsLib
});

//	Компиляция scss
requireTask('sass', './_gulp-tasks/ruby-sass', {
	src: options.src.scssMain,
	dest: options.dist.css
});

//	ttf rebase
requireTask('ttf2', './_gulp-tasks/ttf2', {
	src: options.src.fontsTtf,
	dest: options.dist.fonts
});

//	ttf => eot
requireTask('ttf2eot', './_gulp-tasks/ttf2eot', {
	src: options.src.fontsTtf,
	dest: options.dist.fonts
});

//	ttf => woff
requireTask('ttf2woff', './_gulp-tasks/ttf2woff', {
	src: options.src.fontsTtf,
	dest: options.dist.fonts
});

//	ttf => woff2
requireTask('ttf2woff2', './_gulp-tasks/ttf2woff2', {
	src: options.src.fontsTtf,
	dest: options.dist.fonts
});

//	Минификация svg файлов
requireTask('svgmin', './_gulp-tasks/svgmin', {
	src: options.src.imgSVG,
	dest: options.dist.img/*,
	removeAttrs: ['fill', 'stroke']*/
});

//	Копирование папки src/resource в dist/resource
requireTask('resource', './_gulp-tasks/imagemin', {
	src: options.src.resource,
	dest: options.dist.resource
});

//	Компиляция шрифтовых иконок
requireTask('iconfont', './_gulp-tasks/iconfont', {
	fontName: options.src.fontName,
	targetPath: path + options.src.targetPathIconScss,
	fontPath: options.src.fontPathScss + options.src.fontName + '/',
	src: options.src.iconsSVG,
	dest: options.dist.fonts + options.src.fontName
});

//	Компиляция png спрайта
requireTask('sprite', './_gulp-tasks/spritesmith', {
	src: options.src.sprite,
	dest_img: options.src.imgRoot,
	dest_scss: options.src.scssIcons,
	padding: 0,
	algorithm: 'binary-tree',
	imgPath: options.src.spritePath,
	imgName: 'sprite.png',
	cssName: '_sprite.scss'
});

//	Сжатие изображений
requireTask('img-min', './_gulp-tasks/imagemin', {
	src: [options.src.imgRoot + '*.png', options.src.imgRoot + '*.jpg'],
	dest: options.dist.img
});




//	Task Watches
gulp.task('pug-watch', ['pug'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('pug-recompile-watch', ['pug-recompile'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('uglify-watch', ['uglify'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('rebase-js-watch', ['rebase-js'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('sass-watch', ['sass'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('ttf2-watch', ['ttf2'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('ttf2eot-watch', ['ttf2eot'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('ttf2woff-watch', ['ttf2woff'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('ttf2woff2-watch', ['ttf2woff2'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('svgmin-watch', ['svgmin'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('resource-watch', ['resource'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('iconfont-watch', ['iconfont'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('sprite-watch', ['sprite'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('img-min-watch', ['img-min'], function (done) {
	browserSync.reload();
	done();
});



//	ROOT Tasks
gulp.task('default', function () {
	process.env.NODE_ENV = 'development';
	gulp.start('run-dev');
});

gulp.task('run-dev', ['pug-recompile', 'uglify', 'rebase-js', 'sass', 'ttf2', 'ttf2eot', 'ttf2woff'/*, 'ttf2woff2'*/, 'svgmin', 'resource', 'iconfont', 'sprite', 'img-min'], () => {
	browserSync.init({
		server: {
			baseDir: options.dist.base
		}
	});

	watch(options.src.pug, () => { gulp.start('pug-watch') });
	watch(options.src.pugLayout, () => { gulp.start('pug-recompile-watch') });
	watch(options.src.js, () => { gulp.start('uglify-watch') });
	watch(options.src.jsLib, () => { gulp.start('rebase-js-watch') });
	watch(options.src.scssAll, () => { gulp.start('sass-watch') });
	watch(options.src.fontsTtf, () => { gulp.start(['ttf2eot-watch', 'ttf2eot-watch', 'ttf2woff-watch'/*, 'ttf2woff2-watch'*/]) });
	watch(options.src.imgSVG, () => { gulp.start('svgmin-watch') });
	watch(options.src.resource, () => { gulp.start('resource-watch') });
	watch(options.src.iconsSVG, () => { gulp.start('iconfont-watch') });
	watch(options.src.sprite, () => { gulp.start('sprite-watch') } );
	watch([options.src.imgRoot + '*.png', options.src.imgRoot + '*.jpg'], () => { gulp.start('img-min-watch') });
});

function requireTask(taskName, path, options) {
	options = options || {};
	gulp.task(taskName, (callback) => {
		let task = require(path)[taskName].call(this, options);

		return task(callback);
	})
}