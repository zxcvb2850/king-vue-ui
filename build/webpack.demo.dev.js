const path = require("path");
const webpack = require("webpack");
const merage = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
const webpackBaseDemo = require("./webpack.demo.base");
const styleLoader = require("./style-loader");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT && Number(process.env.PORT) || 8111;

const webpackDemoDev = merage(webpackBaseDemo, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: styleLoader({
      sourceMap: false,
      usePostCSS: true,
    })
  },
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: true,
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST,
    port: PORT,
    publicPath: "/",
    overlay: true, // 错误打印
    quiet: true, // 使用 FriendlyErrorsPlugin
    proxy: {},
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../examples/index.html"),
      inject: true,
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      webpackDemoDev.devServer.port = port

      // Add FriendlyErrorsPlugin
      webpackDemoDev.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDemoDev.devServer.host}:${port}`],
        },
        onErrors: undefined
      }))

      resolve(webpackDemoDev)
    }
  })
})
