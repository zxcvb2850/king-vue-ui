const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

function resolve(dir) {
  return path.join(__dirname,"..", dir);
}

const createEslintRule = () => ({
  test: /\.(js|vue|jsx)/,
  loader: "eslint-loader",
  enforce: "pre",
  // include: [resolve("src", resolve("test"), resolve("examples"))],
  exclude: /node_modules/,
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: true,
  }
})

const webpackDemoBase = {
  entry: {
    app: path.resolve(__dirname, "../examples/main.js")
  },
  output: {
    path: path.resolve(__dirname, "../examples/dist/"),
    filename: "static/js/[name].[hash:8].js",
    publicPath: "/",
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      KingUI: "../src/",
      vue: "vue/dist/vue.esm.js",
    }
  },
  module: {
    rules: [
      createEslintRule(),
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = webpackDemoBase;
