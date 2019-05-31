const packageConf = require('./package');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      // eslint-disable-next-line no-param-reassign
      definitions[0] = Object.assign(definitions[0], {
        'process.env': {
          VERSION: `'${packageConf.version}'`,
          NODE_ENV: `'${process.env.NODE_ENV}'`,
        },
      })
      return definitions;
    });
  },
}
