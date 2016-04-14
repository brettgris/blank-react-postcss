// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var del = require('del'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    postcss = require('gulp-postcss'),
    historyApiFallback = require('connect-history-api-fallback'),
    browserSync = require('browser-sync').create();

gulp.task('jade', function() {
    return gulp.src('Development/jade/**/*.jade')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("Production/"));
});

gulp.task('postcss', function() {
    var processors = [
        require('precss'),
        require('postcss-cssnext'),
        require('css-mqpacker')
    ];

    return gulp.src('Development/css/compile/*.css')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest('Production/css'));
});

gulp.task('react', function() {
    return browserify('Development/react/App.jsx')
        .transform(babelify, {
            presets: ["es2015", "react"]
        })
        .bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.min.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('Production/js'));
});

gulp.task('json', function(cb) {
    return gulp.src('Development/data/**/*.json')
        .pipe(gulp.dest('Production/data'));
});

gulp.task('includes', function() {
    return gulp.src('Development/includes/**/*')
        .pipe(gulp.dest('Production/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('Development/jade/**/*.jade', ['jade']);
    gulp.watch('Development/react/**/*.jsx', ['react']);
    gulp.watch('Development/css/**/*.css', ['postcss']);
    gulp.watch('Development/data/**/*.json', ['json']);
    gulp.watch('Development/includes/**/*', ['includes']);
    gulp.watch(['Production/**/*']).on('change', browserSync.reload);

});

// BROWSER SYNC
gulp.task('sync', function() {
    return browserSync.init({
        server: {
            baseDir: "Production/",
            middleware: [historyApiFallback()]
        }
    });
});

gulp.task('clean', function(cb){
	del.sync(['./Production/**/*']);
	cb(null);
})

// Default Task
gulp.task('default', ['clean', 'build'], function(){
	browserSync.reload();
});

gulp.task('build', ['sync', 'jade', 'postcss', 'react', 'json', 'includes',  'watch']);
