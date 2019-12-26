## MessageBox 消息弹窗


### 消息提示

::: demo
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      this.$alert("我是标题", "我是内容");
    },
  },
}
</script>
```
:::

### 确认消息

::: demo 我们可传入 `options` 作为第三个参数，他是一个对象。`type` 字段为类型，可以为 `info`,`success`,`warning`,`error`，无效的设置将会被忽略。
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      this.$alert("提示", "确认删除吗?", {
        type: "warning",
      })
          .then((action) => {
            console.log("action", action)
            this.Message.success("删除成功");
          })
          .catch((action) => {
            console.log("action", action);
            this.Message("取消删除")
          })
    }
  },
}
</script>
```
:::

### 自定义

::: demo
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      const h = this.$createElement;
      this.$alert({
        title: "提示",
        content: h('p', null, [
             h('span', null, '内容可以是 '),
             h('i', { style: 'color: teal' }, 'VNode')
           ]),
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonText = "确认";
              }, 1500)
            }, 2000)
          } else {
            done();
          }
        }
      })
          .then((action) => {
            console.log("action", action)
            this.Message.success("删除成功");
          })
          .catch((action) => {
            console.log("action", action);
            this.Message("取消删除")
          })
    }
  },
}
</script>
```
:::

### 使用 HTML 片段

::: demo
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      const h = this.$createElement;
      this.$alert("<h3>标题也是 <i>HTML</i> 片段</h3>", "<strong>这是 <i>HTML</i> 片段</strong>", {
        userHtmlString: true,
      });
    }
  },
}
</script>
```
:::

### 自定义 ICON

::: demo
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      const h = this.$createElement;
      this.$alert("我是标题", "我是内容", {
        iconClass: "k-icon-check-circle",
        lockScroll: true,
      });
    }
  },
}
</script>
```
:::

### prompt 带输入框

::: demo
```vue
<template>
<k-button @click="handleOpen">点击打开</k-button>
</template>
<script>
export default {
  methods: {
    handleOpen() {
      const h = this.$createElement;
      this.$prompt("提示", "请输入删除备注", {
        lockScroll: true,
        inputPlaceholder: "请输入备注",
        inputRegexp: /[^\s]/,
        inputErrorMessage: "备注不能为空",
      })
      .then(({ value })=> {
        this.Message({
          type: "success",
          content: `你输入的备注是：${value}`,
          duration: 0,
          showClose: true,
        });
      })
      .catch((action) => {
        this.Message({
          type: "warning",
          content: "取消输入",
        });
      });
    }
  },
}
</script>
```
:::
