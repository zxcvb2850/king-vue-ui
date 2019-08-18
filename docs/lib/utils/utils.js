const path = require('path')

// 当前文件夹
const resolvePath = p => path.resolve(__dirname, "../", p).replace(/\\/g, '/');

module.exports = {
  resolvePath
};
