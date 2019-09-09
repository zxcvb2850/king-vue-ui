<p align="center">
    <img src="/docs/.vuepress/public/img/logo/logo-slogan.png" width="30%">
</p>

<div align="center">
    <h1>King-UI</h1>
    <span>Vue Component UI</span>
</div>

## Install
npm:
```bash
npm install --save-dev king-vue-ui
```

yarn:
```bash
yarn add -D king-vue-ui
```

script:
```html
<script type="text/javascript" src="https://unpkg.com/king-vue-ui/dist/index.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/king-vue-ui/dist/style/index.css">
```

### 按需引用

借助插件 babel-plugin-import可以实现按需加载组件，减少文件体积。首先安装，并在文件 .babelrc 中配置：

```bash
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "kint-vue-ui",
    "libraryDirectory": "src/components"
  }]]
}
```

然后这样按需引入组件，就可以减小体积了：

```bash
import { Button, Message } from 'king-vue-ui';
Vue.component('Button', Button);
Vue.prototype.Message = Message;
```

**注意：即便是按需加载仍需引入css文件，`import "king-vue-ui/dist/style/index.css"`**

## Usage
```html
<template>
    <k-button>默认按钮</k-button>
</template>
<script>
import { KButton } from "king-vue-ui";

export default {
    components: { KButton },  
}
</script>
```

## Docs
[Docs](https://zxcvb2850.github.io/king-ui/)

## ChangeLog
[LOG](CHANGELOG.md)

## LICENSE
[MIT](LICENSE)
