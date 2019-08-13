module.exports = [
  {
    title: "更新日志",
    link: "/components/changelog"
  },
  {
    title: "开发指南",
    // path: "/components/install/",
    collapsable: false, // 菜单永远是展开的
    children: [
      {
        title: "安装",
        link: "/components/install",
      }
    ]
  },
  {
    title: "这是什么?",
    link: "/",
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
            link: "/components/input"
          }
        ]
      },
    ]
  },
];
