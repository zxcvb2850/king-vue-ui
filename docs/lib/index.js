// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const { resolvePath } = require('./utils/utils')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    demoBlockComponent: resolvePath('DemoBlock.vue')
  }
  opts = Object.assign(defaultOpts, opts)
  return {
    name: 'vue-demo',

    enhanceAppFiles() {
      return {
        name: 'dynamic-code',
        content: `
          export default ({ Vue }) => {
            Vue.component('DemoBlock', () => import('${opts.demoBlockComponent}'))          
          }
         `
      }
    },

    extendMarkdown(md) {
      containers(md, ctx)
    }
  }
}
