const sidebar = require("./sidebar");
const demoCode = require("../lib");

module.exports = {
  title: "King UI",
  description: "this is Vue Component UI",
  base: "/king-ui/",
  repo: "https://github.com/zxcvb2850/king-vue-ui",
  head: [
    ["link", { rel: "icon", href: "/img/logo/logo.png" }],
    ["script", { src: "https://hm.baidu.com/hm.js?79374b5fececc30275ff1b9865cdac65" }],
  ],
  plugins: [
    [demoCode]
  ],
  themeConfig: {
    logo: "/img/logo/logo-horizontal.png",
    lastUpdated: "上次更新时间",
    // displayAllHeaders: true,
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "zxcvb2850/king-vue-ui",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "v1.0.0",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
    sidebarDepth: 0, // 菜单是否展示组件的h1-6
    // nav
    nav: [
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "组件",
        link: "/components/",
      },
      {
        text: "Github",
        link: "https://github.com/zxcvb2850/king-vue-ui",
      }
    ],
    sidebar: sidebar,
  },
};
