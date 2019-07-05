const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

const PORT = 8111;

const webpackDemoConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: path.resolve(__dirname, "../examples/main.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist/examples"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: false,
    compress: true,
    host: "localhost",
    port: 8111,
    publicPath: "/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../examples/index.html'),
      inject: true,
    })
  ]
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      webpackDemoConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      webpackDemoConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDemoConfig.devServer.host}:${port}`],
        },
        onErrors: createNotifierCallback()
      }))

      resolve(webpackDemoConfig)
    }
  })
})

function createNotifierCallback() {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
