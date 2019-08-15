const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(process.cwd(), "./dist"),
    publicPath: "/dist/",
    filename: "index.common.js",
    chunkFilename: "[id].js",
    libraryExport: "default",
    library: "KingUI",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      component: path.resolve(__dirname, "../src/components"),
      "KingUI": path.resolve(__dirname, "../src")
    },
    modules: ["node_modules"]
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    }
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules|utils\/popper\.js|utils\/date.\js/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};
