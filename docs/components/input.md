## input

### 基础用法

::: demo
```html
<template>
  <k-input v-model="input" placeholder="请输入内容"></k-input>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    }
  }
}
</script>
```
:::

### 禁用状态
::: demo
```html
<template>
  <k-input v-model="input" placeholder="请输入内容" disabled></k-input>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    }
  }
}
</script>
```
:::

### 可清空
::: demo
```html
<template>
  <k-input v-model="input" placeholder="请输入内容" clearIcon></k-input>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    }
  }
}
</script>
```
:::
