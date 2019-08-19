module.exports = {
  "/guide/": [
    {
      title: "指南",
      collapsable: false,
      children: ["", "start"],
    }
  ],
  "/components/": [
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
          path: "/components/",
        }
      ]
    },
    {
      title: "组件",
      collapsable: false, // 菜单永远是展开的
      children: [
        {
          title: "Basic",
          collapsable: false, // 菜单永远是展开的
          children: [
            {
              title: "Button 按钮",
              path: "/components/button"
            },
            {
              title: "Icon 图标",
              path: "/components/icon"
            },
          ]
        },
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
};
