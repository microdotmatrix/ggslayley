const {src, dest} = require('gulp');
const pump = require('pump');

var zip = require('gulp-zip');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function js(done) {
  pump([
      src('assets/dist/js/app.js', {sourcemaps: true}),
      uglify(),
      rename('app.min.js'),
      dest('assets/dist/js/', {sourcemaps: '.'}),
  ], handleError(done));
}

function zipper(done) {
    var targetDir = 'zip/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
      src([
        '**',
        '!zip', '!zip/**',
        '!assets/video', '!assets/video/**',
        '!assets/scss', '!assets/scss/**',
        '!assets/fonts', '!assets/fonts/**',
        '!assets/css', '!assets/css/**',
        '!assets/js', '!assets/js/**',
        '!assets/svg', '!assets/svg/**',
        '!assets/images', '!assets/images/**',
        '!assets/img', '!assets/img/**',
        '!node_modules', '!node_modules/**'
        ]),
      zip(filename),
      dest(targetDir)
    ], handleError(done));
}

exports.zip = zipper;
exports.jsmin = js;
exports.default = zip;
