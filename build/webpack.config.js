const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const TerserWebpackPlugin = require("terser-webpack-plugin");

process.env.NODE_ENV = "production";

const webpackConfig = {
  mode: "production",

  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "index.min.js",
    chunkFilename: "[id].js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "KingUI",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      component: path.resolve(__dirname, "../src/components"),
      "KingUI": path.resolve(__dirname, "../src")
    }
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    }
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
  ]
};

module.exports = webpackConfig;
