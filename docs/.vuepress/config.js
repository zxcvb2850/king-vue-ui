module.exports = {
  title: "King UI",
  description: "this is Vue Component UI",
  dest: "./dist",
  base: "/king-ui/",
  repo: "https://github.com/zxcvb2850/king-vue-ui",
  plugins: [
    ['demo-code', {
      showText: 'show code',
      hideText: 'hide',
      styleStr: 'text-decoration: underline;',
      minHeight: 200,
      onlineBtns: {
        codepen: true,
        jsfiddle: false,
        codesandbox: false,
      },
    }]
  ],
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      {
        text: "指南",
        link: "/guide/install/install",
      }, {
        text: "Github",
        link: "https://github.com/zxcvb2850/king-vue-ui",
      }
    ],
    sidebar: [
      {
        title: "更新日志",
        path: "/pages/changelog/"
      },
      {
        title: "这是什么?",
        path: "/",
      },
      {
        title: "组件",
        children: [
          {
            title: "Input 输入框",
            path: "/components/input/"
          }
        ]
      }
    ]
  },
};
