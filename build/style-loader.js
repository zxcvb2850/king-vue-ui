/**
 * style-loader
 * auth Mr.wang
 * email xiaobai2850@gmail.com
 * 2019-07-06
 * */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function cssLoaders(options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: { sourceMap: options.sourceMap },
  };

  const postCssLoader = {
    loader: 'postcss-loader',
    options: { sourceMap: options.sourceMap }
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = []

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader)

    if (options.usePostCSS) {
      loaders.push(postCssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
}
module.exports = function (options) {
  const output = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  }

  return output;
}
