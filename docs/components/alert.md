---
pageClass: alert-components-class
---

## Alert

### 基本用法

::: demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```vue
<template>
  <k-alert title="成功提示的文案" type="success"></k-alert>
  <k-alert title="消息提示的文案" type="info"></k-alert>
  <k-alert title="警告提示的文案" type="warning"></k-alert>
  <k-alert title="错误提示的文案" type="error"></k-alert>
</template>
```
:::

### 自定义关闭按钮

::: demo
```vue
<template>
  <k-alert title="不可关闭的 alert" type="success" :closable="false"></k-alert>
  <k-alert title="自定义 close-text" type="info" close-text="我知道了"></k-alert>
  <k-alert title="设置了回调的 alert" type="warning" @close="handleClose"></k-alert>
</template>
<script>
export default {
  methods: {
    handleClose() {
      window.alert("close alert");
    },
  },
}
</script>
```
:::

### 带有 icon

::: demo 通过设置show-icon属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图
```vue
<template>
  <k-alert
    title="成功提示的文案"
    type="success"
    show-icon>
  </k-alert>
  <k-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </k-alert>
  <k-alert
    title="警告提示的文案"
    type="warning"
    show-icon>
  </k-alert>
  <k-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </k-alert>
</template>
```
:::

### 文字居中

::: demo 使用 center 属性让文字水平居中。
```vue
<template>
  <k-alert
    title="成功提示的文案"
    type="success"
    center
    show-icon>
  </k-alert>
  <k-alert
    title="消息提示的文案"
    type="info"
    center
    show-icon>
  </k-alert>
  <k-alert
    title="警告提示的文案"
    type="warning"
    center
    show-icon>
  </k-alert>
  <k-alert
    title="错误提示的文案"
    type="error"
    center
    show-icon>
  </k-alert>
</template>
```
:::

### 带有描述性文字介绍

::: demo 使用 center 属性让文字水平居中。
```vue
<template>
  <k-alert
    title="带辅助性文字介绍"
    type="success"
    description="我是描述文字 我是描述文字">
  </k-alert>
</template>
```
:::

### 带有 icon 和描述性文字介绍

::: demo 使用 center 属性让文字水平居中。
```vue
<template>
  <k-alert
    title="带辅助性文字介绍"
    type="success"
    description="我是描述文字 我是描述文字"
    show-icon>
  </k-alert>
</template>
```
:::
