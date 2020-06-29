var gulp = require('gulp'),
    del = require('del'),
    glob = require('glob'),
    fs = require('fs'),
    path = require('path'),
    inject = require('gulp-inject'),
    annotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sequeue = require('run-sequence'),
    less = require('gulp-less'),
    serve = require('gulp-serve'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject-string'),
    config = require('./package.json');
var tsProject = ts.createProject('tsconfig.json');

function copyDesktopCore() {
    return gulp.src([config.updatepath + '/yes-desktop-core/**/*',
            '!' + config.updatepath + '/yes-desktop-core/core/vendor/{__bundle,__bundle/**}'
        ])
        .pipe(gulp.dest("www"));
}

function shortModuleName(name) {
    return (name || "").replace('yes-', '').replace('desktop-', '').replace('mobile-', '');
}

function copybase() {

    return gulp.src([
            config.updatepath + "/yes-desktop-base/**/*",
            "!" + config.updatepath + "/yes-desktop-base/**/*.ts",
            "!" + config.updatepath + "/yes-desktop-base/index.html",
            "!" + config.updatepath + "/yes-desktop-base/index.js"
        ])
        .pipe(gulp.dest("www/plugins"));

}


function copybaseless() {

    return gulp.src([
            config.updatepath + '/yes-desktop-base/home/assets/less/base.less',
            config.updatepath + '/yes-desktop-base/home/assets/less/main.less',
            config.updatepath + '/yes-desktop-base/home/assets/less/jwerp.less',
            config.updatepath + '/yes-desktop-base/home/assets/less/jwerp.responsive.less',
            config.updatepath + '/yes-desktop-base/home/assets/less/login.less',
            config.updatepath + '/yes-desktop-base/home/assets/less/bootstrap/bootstrap-timepicker.css'
        ])
        .pipe(less({}))
        .pipe(gulp.dest('www/plugins/home/assets/css'));
}


function copybasets() {
    var bastsProject = ts.createProject({
        rootDir: config.updatepath + "/yes-desktop-base"
    });

    var tsResult = gulp.src(config.updatepath + "/yes-desktop-base/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(ts(bastsProject));
    var tag = tsResult.js.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest('www/plugins'))
    return tag;
}

function copybaseindex() {
    var hasComponents = fs.existsSync('www/components/components.js');
    var config = require('./package.json');
    var coreConfig = require(config.updatepath + '/yes-desktop-core/package.json');
    var str = hasComponents ? '<script src="components/components.js"></script></body>' : "</body>";
    return gulp.src([
            config.updatepath + "/yes-desktop-base/index.html",
            config.updatepath + "/yes-desktop-base/index.js"
        ])
        .pipe(replace('</body>', str))
        .pipe(replace('{core-version}', coreConfig.version))
        .pipe(replace('{version}', config.version))
        .pipe(gulp.dest('./www'));


}


gulp.task('copybase', function() {
    copybase();
    copybaseless();
    copybasets();
    copybaseindex();
});



function getFileNames(src, ext) {
    var items = glob.sync(src);
    var fileNames = [];
    items.forEach(function(p) {
        var name = path.basename(p, ext);
        fileNames.push(name);
    });
    return fileNames;
}

function buildComponentSettings() {
    var items = Object.keys(config.dependencies) || [];
    items.push('bas');
    items.push('bpm');
    items.push('sanan');
    var settings = {};
    var plugins = items.filter(function(item) {
        return item.indexOf('core') < 0;
    }).forEach(function(item) {
        var pluginName = shortModuleName(item);
        settings['queryFormComponents'] = settings['queryFormComponents'] || {};
        settings['schemaFormComponents'] = settings['schemaFormComponents'] || {};
        settings['queryFormComponents'][pluginName] = getFileNames(
            __dirname + '/www/plugins/' + pluginName + '/templates/query-form/*.html', '.html');
        settings['schemaFormComponents'][pluginName] = getFileNames(
            __dirname + '/www/plugins/' + pluginName + '/templates/schema-form/*.html', '.html');
    });
    return settings;
}

gulp.task('compileComponents', function() {
    var settings = buildComponentSettings();

    var components = '(function () { application.plugin = ' + JSON.stringify(settings) + '}()); \n';
    console.log("compile");
    return gulp.src([
            'www/plugins/**/*.js',
            '!www/plugins/*/*.js',
            '!www/plugins/*/pages/**/*.js',
            '!www/plugins/**/interface.js',
        ])
        .pipe(concat('components.js'))
        .pipe(inject.prepend(components))
        .pipe(gulp.dest('./www/components'));
});

gulp.task('BuildTemplatesForDirectives', function() {
    console.log("BuildTemplatesForDirectives");
    return gulp.src(["www/plugins/*/templates/schema-form/*.html", "www/plugins/*/templates/query-form/*.html", "www/plugins/*/templates/ui-grid/*.html", "www/plugins/*/components/*.html"])
        .pipe(templateCache("jwerptemplates.js", {
            "module": "app",
            "base": function(file) {
                var pathStr = file.path.replace(/\\/g, "\/");
                var index = pathStr.indexOf("plugins/");

                return pathStr.substring(index);
            }
        }))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/celldatePicker.html", 'ui-grid/celldatePicker'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellesydatetime.html", 'ui-grid/cellesydatetime'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellstring.html", 'ui-grid/cellstring'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellEditor.html", 'ui-grid/cellEditor'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/celllov.html", 'ui-grid/celllov'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/gridcelllov.html", 'ui-grid/gridcelllov'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellDefault.html", 'ui-grid/cellDefault'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellnumber.html", 'ui-grid/cellnumber'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/cellremark.html", 'ui-grid/cellremark'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/gridcellioc.html", 'ui-grid/gridcellioc'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/gridcelldefault.html", 'ui-grid/gridcelldefault'))
        .pipe(replace("plugins\/bas\/templates\/ui-grid\/gridcellnumber.html", 'ui-grid/gridcellnumber'))
        .pipe(gulp.dest('./www/core/scripts'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./www/core/scripts'));
});

gulp.task('copyproless', function() {
    return gulp.src([
            'src/home/assets/less/base.less',
            'src/home/assets/less/main.less',
            'src/home/assets/less/jwerp.less',
            'src/home/assets/less/jwerp.responsive.less',
            'src/home/assets/less/login.less',
            'src/home/assets/less/bootstrap/bootstrap-timepicker.css'
        ])
        .pipe(less({}))
        .pipe(gulp.dest('www/plugins/home/assets/css'));
});

gulp.task('copyprots', function() {
    console.log("copyprots....");
    var bastsProject = ts.createProject({
        rootDir: "src"
    });

    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(ts(bastsProject));
    var tag = tsResult.js.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest('www/plugins'))
    return tag;

    // var tsResult = tsProject.src()
    //     .pipe(sourcemaps.init())
    //     .pipe(ts(tsProject));
    // return tsResult.js.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
    //     .pipe(gulp.dest('www/plugins'));
});

gulp.task('copypro', function() {
    console.log("copypro....");
    return gulp.src([
        'src/**/*',
        '!src/**/*.less',
        '!src/**/*.ts',
        '!src/index.html',
        '!src/index.js'
    ]).pipe(gulp.dest('./www/plugins'));
});


gulp.task('copyAppResources', function() {
    return gulp.src([
        'src/**/*',
        '!src/**/*.less',
        '!src/**/*.ts',
        '!src/index.html',
        '!src/index.js'
    ]).pipe(gulp.dest('./www/plugins'));
});


gulp.task('copycusResources', function() {
    return gulp.src([
        'src/**/*'
    ]).pipe(gulp.dest('./www/plugins'));
});


gulp.task('handleIndexHtml', function() {
    var hasComponents = fs.existsSync('www/components/components.js');
    console.log("index....");
    var hasindex = fs.existsSync('src/index.html');
    var config = require('./package.json');
    var coreConfig = require(config.updatepath + '/yes-desktop-core/package.json');
    var str = hasComponents ? '<script src="components/components.js"></script></body>' : "</body>";
    console.log(hasindex ? 'src/index.html' : config.updatepath + "/yes-desktop-base/index.html");
    return gulp.src([
            hasindex ? 'src/index.html' : config.updatepath + "/yes-desktop-base/index.html"
        ])
        .pipe(replace('</body>', str))
        .pipe(replace('{core-version}', coreConfig.version))
        .pipe(replace('{version}', config.version))
        .pipe(gulp.dest('./www'));
});

gulp.task('handleIndexJs', function() {
    var config = require('./package.json');
    var hasindex = fs.existsSync('src/index.js');
    return gulp.src([
        hasindex ? 'src/index.js' : config.updatepath + "/yes-desktop-base/index.js"
    ]).pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    return gulp.watch('src/**/*.less', ['complie-less']);
});

gulp.task('watchsource', function() {
    return gulp.watch('src/**/*', ['copycusResources']);
});

gulp.task('update', function() {
    return sequeue(
        'copycore', //copy core底层框架(core/*,plugins/$default/*,themes/*)
        'copybase', //copy base中的业务信息(plugins/base/*)
        "compileComponents", //生成components下的components.js文件
        "BuildTemplatesForDirectives", //压缩所有模版文件为到jwerptemplates.js文件
        "handleIndexHtml", //copy并替换index.html版本并添加components.js引用,
        "handleIndexJs" //copy index.js文件

    );
});


gulp.task('generate', function() {
    console.log("eeeee");
    return sequeue(
        // 'copycore', //copy core底层框架(core/*,plugins/$default/*,themes/*)
        // 'copybase', //copy base中的业务信息(plugins/base/*)
        'copyproless', //转src目录下less样式文件为css到plugins/home/assets/css/*,
        "copyprots", //转src下的所有ts文件到www相应目录文件
        "copypro", //copy src目录下除less，ts外的所有文件除
        "compileComponents", //生成components下的components.js文件
        "BuildTemplatesForDirectives", //压缩所有模版文件为到jwerptemplates.js文件
        "handleIndexHtml", //copy并替换index.html版本并添加components.js引用,
        "handleIndexJs" //copy index.js文件

    );
});

gulp.task('release', function() {

});

gulp.task('publish', function() {

});







gulp.task('copycore', copyDesktopCore);
gulp.task('serve', serve('www'));
gulp.task('default', ['generate']);