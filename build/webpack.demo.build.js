const path = require("path");
const webpack = require("webpack");
const merage = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseDemo = require("./webpack.demo.base");
const styleLoader = require("./style-loader");

process.env.NODE_EVN = "production";

const webpackDemoBuild = merage(webpackBaseDemo, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: styleLoader({
      sourceMap: true,
      extract: true,
      usePostCSS: true,
    })
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].css"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "../examples/dist/index.html"),
      template: path.resolve(__dirname, "../examples/index.html"),
      inject: true,
      title: "KingUI Vue Components",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
  ]
})

module.exports = webpackDemoBuild;
