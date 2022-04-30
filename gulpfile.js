const {src, dest} = require('gulp');
const pump = require('pump');

var zip = require('gulp-zip');

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

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
exports.default = zip;
