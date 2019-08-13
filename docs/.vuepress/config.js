const sidebar = require("./sidebar");

module.exports = {
  title: "King UI",
  description: "this is Vue Component UI",
  base: "/king-ui/",
  repo: "https://github.com/zxcvb2850/king-vue-ui",
  head: [
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
  ],
  plugins: [
    ["demo-block", {
      jsfiddle: false, // 是否显示 jsfiddle 链接
      codepen: false, // 是否显示 codepen 链接
      horizontal: true // 是否展示为横向样式
    }]
  ],
  themeConfig: {
    lastUpdated: "最后更新时间",
    // displayAllHeaders: true,
    nav: [
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "组件",
        link: "/components/install",
      },
      {
        text: "Github",
        link: "https://github.com/zxcvb2850/king-vue-ui",
      }
    ],
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
    // sidebar: sidebar,
    sidebar: {
      '/guide/': [
        {
          title: "指南",
          collapsable: false,
          children: ["", "start"],
        }
      ],
      '/components/': [
        {
          title: "更新日志",
          path: "/components/changelog"
        },
        {
          title: "开发指南",
          // path: "/components/install/",
          collapsable: false, // 菜单永远是展开的
          children: [
            {
              title: "安装",
              path: "/components/install",
            }
          ]
        },
        {
          title: "组件",
          collapsable: false, // 菜单永远是展开的
          children: [
            {
              title: "Form",
              collapsable: false, // 菜单永远是展开的
              children: [
                {
                  title: "Input 输入框",
                  path: "/components/input"
                }
              ]
            },
          ],
        }
      ],
    }
  },
};
