## Dialog 弹窗提示

### 基本用法

::: demo
```vue
<template>
  <k-button @click="visible = true">展示</k-button>
  <k-dialog :visible.sync="visible" title="标题">
    <div>
      弹内容
    </div>
  </k-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  }
}
</script>
```
:::

### 自定义页脚

::: demo
```vue
<template>
  <k-button @click="handleClick">展示</k-button>
  <k-dialog :visible.sync="visible" title="标题">
    <div>
      弹内容
    </div>
    <div slot="footer">
      <k-button @click="handleClick">关闭</k-button>
    </div>
  </k-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible;
    }
  },
}
</script>
```
:::

### 嵌套Dialog

::: demo
```vue
<template>
  <k-button @click="handleClick">展示</k-button>
  <k-dialog :visible.sync="visible" title="标题">
    <k-dialog :visible.sync="innerVisible" append-to-body>
      <div>我是嵌套dialog</div>
    </k-dialog>
    <div slot="footer">
      <k-button @click="handleClick">关闭</k-button>
      <k-button type="primary" @click="innerVisible = true">打开内层Dialog</k-button>
    </div>
  </k-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      innerVisible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible;
    },
  },
}
</script>
```
:::



### 点击其他地方不关闭Dialog

::: demo
```vue
<template>
  <k-button @click="handleClick">展示</k-button>
  <k-dialog :visible.sync="visible" title="标题" :clickOnClickModal="false">
    <div>
      弹内容
    </div>
    <div slot="footer">
      <k-button @click="handleClick">关闭</k-button>
    </div>
  </k-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible;
    }
  },
}
</script>
```
:::
