## Message 消息提示

### 基础用法

::: demo
```vue
<template>
  <k-button @click="open">消息提示框</k-button>
  <k-button @click="openVn">VNode</k-button>
</template>
<script>
export default {
  methods: {
    open() {
      this.Message("这是一条消息");
    },
    openVn() {
      const h = this.$createElement;
      this.Message({
        content:  h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
  }
}
</script>
```
:::

### 不同状态

::: demo `type`参数是弹窗的状态，默认为`info`；还可以直接`Message.success("消息")`
```vue
<template>
  <k-button type="success" @click="open('success')">成功</k-button>
  <k-button type="warning" @click="open('warning')">警告</k-button>
  <k-button type="info" @click="open('info')">消息</k-button>
  <k-button type="error" @click="open('error')">错误</k-button>
</template>
<script>
export default {
  methods: {
    open(type) {
      this.Message({
        type: type,
        content: "这是一条消息",
      })
    },
  }
}
</script>
```
:::

### 可关闭

::: demo 默认的`Message`是不可以被人工关闭的，如果需要可手动关闭的`Message`，可以使用`showClose`字段。`Message`拥有可控的`duration`，设置`0`为不会被自动关闭，默认为 3000 毫秒。
```vue
<template>
  <k-button type="success" @click="open('success')">成功</k-button>
  <k-button type="warning" @click="open('warning')">警告</k-button>
  <k-button type="info" @click="open('info')">消息</k-button>
  <k-button type="error" @click="open('error')">错误</k-button>
</template>
<script>
export default {
  methods: {
    open(type) {
      this.Message({
        type: type,
        showClose: true,
        content: "这是一条消息",
      })
    },
  }
}
</script>
```
:::

### 内容使用HTML

::: demo
```vue
<template>
  <k-button @click="openHTML">使用 HTML 片段</k-button>
</template>

<script>
  export default {
    methods: {
      openHTML() {
        this.Message({
          userHtmlString: true,
          content: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
      }
    }
  }
</script>
```
:::
