module.exports = {
  entry: "../src/index.js",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "dist",
  },
  devServer: {
    contentBase: "/",
    compress: true,
    port: 9000,
  }
}
