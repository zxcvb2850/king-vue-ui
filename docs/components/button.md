## Button 按钮

### 基本用法

::: demo `type`属性来定义`button`样式
```vue
<template>
  <k-button>默认按钮</k-button>
  <k-button type="primary">主要按钮</k-button>
  <k-button type="success">成功按钮</k-button>
  <k-button type="info">信息按钮</k-button>
  <k-button type="warning">警告按钮</k-button>
  <k-button type="error">危险按钮</k-button>
</template>
```
:::

### 带图标按钮

::: demo
```vue
<template>
  <k-button icon="k-icon-eye">默认按钮</k-button>
  <k-button type="primary" icon="k-icon-eye">主要按钮</k-button>
  <k-button type="success">成功按钮<i class="k-icon-eye"></i></k-button>
  <k-button type="info">信息按钮<i class="k-icon-eye"></i></k-button>
  <k-button type="warning" icon="k-icon-eye">警告按钮</k-button>
  <k-button type="error" icon="k-icon-eye">危险按钮</k-button>
</template>
```
:::

### 按钮不可点击

::: demo
```vue
<template>
  <k-button disabled>默认按钮</k-button>
  <k-button type="primary" disabled>主要按钮</k-button>
  <k-button type="success" disabled>成功按钮</k-button>
  <k-button type="info" disabled>信息按钮</k-button>
  <k-button type="warning" disabled>警告按钮</k-button>
  <k-button type="error" disabled>危险按钮</k-button>
</template>
```
:::

### 圆角按钮

::: demo
```vue
<template>
  <k-button round>默认按钮</k-button>
  <k-button type="primary" round>主要按钮</k-button>
  <k-button type="success" round>成功按钮</k-button>
  <k-button type="info" round>信息按钮</k-button>
  <k-button type="warning" round>警告按钮</k-button>
  <k-button type="error" round>危险按钮</k-button>
</template>
```
:::

### 圆形按钮

::: demo
```vue
<template>
  <k-button icon="k-icon-enter" circle></k-button>
  <k-button type="primary" icon="k-icon-eye" circle></k-button>
  <k-button type="error" icon="k-icon-meh-fill" circle></k-button>
</template>
```
:::
