## Input 输入框

### 基础用法

::: demo
```vue
<template>
  <k-input placeholder="请输入内容"></k-input>
</template>
```
:::

### 禁用状态

::: demo
```vue
<template>
  <k-input placeholder="请输入内容" value="我被禁止输入了" disabled></k-input>
</template>
```
:::

### 可清空

::: demo
```vue
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

### 图标

::: demo `prefix-icon` `input` 的前面图标 `suffix-icon` `input` 的后面图标
```vue
<template>
  <k-input
    placeholder="请输入内容"
    prefix-icon="smile-fill"
    suffix-icon="smile-fill"
  />
</template>
```
:::

### 前缀

::: demo 前缀采用的是插槽(`slot`)的方式 `prepend` 前缀 `append` 后缀
```vue
<template>
  <k-input
    placeholder="请输入网址"
  >
    <template slot="prepend">https://</template>
    <template slot="append">.com</template>
  </k-input>
</template>
```
:::
