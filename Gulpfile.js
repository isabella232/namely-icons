var package = require('./package.json');
var version = package.version;

var gulp = require('gulp');
var gutil = require('gulp-util');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var iconfontConfig = require('./lib/namely-icons.config');


function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  var prettyJSON = JSON.stringify(string);
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(prettyJSON) }))
    this.push(null)
  }
  return src
}


gulp.task('default', function(){
  gulp.src(['./icons/*.svg'])
    .pipe(iconfontCss({
      fontName: iconfontConfig,
      path: './lib/namely-icons.template.scss',
      targetPath: `../namely-icons-${version.replace(/\./g,'_')}.scss`,
      fontPath: './dist/fonts/'
    }))
    .pipe(iconfont({
      fontName: iconfontConfig.filename,
      normalize: true,
      fixedWidth: true,
      centerHorizontally: true,
      fontHeight: 1001
    }))
    .on('glyphs', function(glyphs, options) {
      var formattedGlyphs = glyphs.map( (glyph) => {
        return {
          "name": glyph.name,
        }
      });
      string_src(`namely-icons-${version.replace(/\./g,'_')}.json`, formattedGlyphs).pipe(gulp.dest("./dist/"));
    })
    .pipe(gulp.dest('./dist/fonts/'));
});
