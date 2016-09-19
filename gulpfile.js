// 获取所需的模块
var gulp = require('gulp'),
    copy = require('copy'),
    del = require('del'),
    babel = require('gulp-babel'),
    scss = require('gulp-scss'),
    mincss = require('gulp-clean-css'),
    rename = require('gulp-rename');


// 清除第三方类库等
gulp.task('cleanlib', function(cb) {
    del.sync([
        'public/lib/*'
    ]);
    cb();
});

// 拷贝第三方类库等
gulp.task('copylib', function(cb) {
    // jquery
    copy('node_modules/jquery/dist/**', 'public/lib/jquery/', function(){});

    // // angular2
    // copy('node_modules/angular2/*.js', 'public/lib/angular2/', function(){});

    // bootstrap
    copy('node_modules/bootstrap/dist/**', 'public/lib/bootstrap/', function(){});

    cb();
});

// 编译css
gulp.task('buildcss', function (cb) {
    gulp.src('assets/css/*.scss')
        // 编译
        .pipe(scss())
        .pipe(gulp.dest('public/stylesheets'))
        // 压缩
        .pipe(mincss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/stylesheets'));

    cb();
});

// 生产环境任务组合(默认)
gulp.task('default', ['cleanlib'], function() {
    gulp.start('copylib', 'buildcss');
});

// 开发环境监视任务
gulp.task('watch', function() {
	var watcher = gulp.watch(
        ['assets/*.scss'],
        ['buildcss']);
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});
