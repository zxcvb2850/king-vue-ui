## Checkbox 复选框

### 基础用法

::: demo
```vue
<template>
    <k-checkbox label="sing">唱</k-checkbox>
    <k-checkbox label="dump">跳</k-checkbox>
    <k-checkbox label="rap">rap</k-checkbox>
    <k-checkbox label="ball">篮球</k-checkbox>
</template>
```
:::

### 禁用状态

::: demo
```vue
<template>
    <k-checkbox label="sing">唱</k-checkbox>
    <k-checkbox label="dump">跳</k-checkbox>
    <k-checkbox label="rap" disabled>rap</k-checkbox>
    <k-checkbox label="ball" disabled>篮球</k-checkbox>
</template>
```
:::

### 组

::: demo
```vue
<template>
  <k-checkbox-group v-model="like">
    <k-checkbox label="sing">唱</k-checkbox>
    <k-checkbox label="dump">跳</k-checkbox>
    <k-checkbox label="rap">rap</k-checkbox>
    <k-checkbox label="ball">篮球</k-checkbox>
  </k-checkbox-group>
</template>
<script>
export default {
  data() {
    return {
      like: ["dump"],
    }
  },
}
</script>
```
:::
