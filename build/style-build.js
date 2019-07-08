const path = require("path");
const {series, src, dest} = require("gulp");
const cleanCss = require("gulp-clean-css");
const less = require("gulp-less");
const cssmin = require("gulp-cssmin");
const LessAutoprefix = require('less-plugin-autoprefix');

const autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions', 'ie > 9'],
});

// 编译 less
function compile() {
  return src("../src/theme/index.less")
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cssmin())
    .pipe(cleanCss())
    .pipe(dest('../dist/style'));
}

// 拷贝 fonts
function copyFont() {
  return src("../src/theme/src/fonts/*.*")
    .pipe(dest("../dist/style/fonts"));
}

exports.build = series(compile, copyFont);
