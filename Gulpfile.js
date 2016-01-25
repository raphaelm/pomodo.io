var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify');

var hbsfy = require("hbsfy").configure({
	extensions: ["html"]
});

gulp.task('scripts', function() {
	var bundler = watchify(browserify('./js/app.js', watchify.args));
	bundler.transform(hbsfy);
	bundler.on('update', rebundle);
	function rebundle() {
		return bundler.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dist/js/'));
	}
	return rebundle();
});

gulp.task('styles', function() {
	gulp.src(['./css/main.css'])
		.pipe(autoprefix({
			browsers: ['last 3 versions']
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css/'))
});

gulp.task('uglify', function() {
	gulp.src('./dist/js/bundle.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'))
});

gulp.task('default', ['scripts', 'styles', 'uglify'], function() {
	gulp.watch('./css/main.css', function() {
		gulp.run('styles');
	});
});
