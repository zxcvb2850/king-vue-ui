## Radio 单选框

### 基础用法

::: demo
```vue
<template>
    <k-radio v-model="value" label="1">男</k-radio>
    <k-radio v-model="value" label="2">女</k-radio>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
    }
  }
}
</script>
```
:::

### 禁用状态

::: demo
```vue
<template>
    <k-radio v-model="value" label="1">男</k-radio>
    <k-radio v-model="value" label="2" disabled>人妖</k-radio>
    <k-radio v-model="value" label="3">女</k-radio>
</template>
<script>
export default {
  data() {
    return {
      value: "3",
    }
  }
}
</script>
```
:::


### 组

::: demo
```vue
<template>
  <k-radio-group v-model="value">
    <k-radio :label="1">男</k-radio>
    <k-radio :label="2">人妖</k-radio>
    <k-radio :label="3">女</k-radio>
  </k-radio-group>
</template>
<script>
export default {
  data() {
    return {
      value: 1,
    }
  }
}
</script>
```
:::
