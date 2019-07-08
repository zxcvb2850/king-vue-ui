<template>
    <div class="wrap">
      <k-alert show-close>xxxxxxxxxxxx</k-alert>
      <k-button type="primary" @click="showMessage">默认按钮</k-button>
      <k-checkbox>单选框</k-checkbox>
    </div>
</template>

<script>
  export default {
	  name: "App",
    methods: {
	    showMessage() {
	      this.$message.success("xxxxxxxxxxxxxx");
      },
    }
  }
</script>

<style scoped lang="less">
</style>
