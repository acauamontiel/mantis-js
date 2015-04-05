var gulp     = require('gulp'),
	gutil    = require('gulp-util'),
	jshint   = require('gulp-jshint'),
	stylish  = require('jshint-stylish'),
	include  = require('gulp-include'),
	prettify = require('gulp-js-prettify'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	connect  = require('gulp-connect'),
	colors   = require('colors'),
	path     = {
		src   : 'src/mantis.js',
		build : 'mantis.js',
		min   : 'mantis.min.js'
	};

function logger (event) {
	var file = event.path.split(__dirname)[1],
		message,
		color;

	switch (event.type) {
		case 'added':
			color = 'green';
			break;
		case 'changed':
			color = 'yellow';
			break;
		case 'deleted':
			color = 'red';
			break;
	}

	message = 'The file ' + file.bold.blue + ' was ' + event.type.bold[color];

	gutil.log('[Mantis.js] '.green + message);
}

gulp.task('concat', function() {
	return gulp.src(path.src)
		.pipe(include())
		.pipe(prettify({
			indent_with_tabs  : true,
			preserve_newlines : false,
			end_with_newline  : true
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('uglify', function() {
	return gulp.src(path.build)
		.pipe(uglify())
		.pipe(rename(path.min))
		.pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
	return gulp.src(path.build)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('connect', function () {
	connect.server({
		root: __dirname,
		livereload: true
	});
});

gulp.task('watch', function () {
	gulp.watch(['src/*.js', 'playground/*.html'], ['concat']).on('change', function (event) {
		logger(event);
	});

	gulp.watch([path.build], ['uglify', 'lint']).on('change', function (event) {
		gulp.src(__dirname)
			.pipe(connect.reload());
	});
});

gulp.task('build'   , ['concat' , 'uglify']);
gulp.task('default' , ['watch'  , 'connect']);
