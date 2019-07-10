const merge = require("webpack-merge");
const webpackDemoBase = require("./webpack.demo.base");
const styleLoader = require("./style-loader");

const webpackTestConfig = merge(webpackDemoBase, {
  mode: "development",
  module: {
    rules: styleLoader({
      sourceMap: false,
      usePostCSS: true,
    })
  },
});

module.exports = webpackTestConfig;
