<template>
  <div class="wrap">
    <k-alert show-close title="title" description="test description" />
    <k-button type="primary" @click="showMessage">
      默认按钮
    </k-button>
    <k-checkbox>单选框</k-checkbox>

    <k-table :data="tableData" :columns="columns" center />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      columns: [
        { key: "id", title: "编号" },
        { key: "name", title: "姓名" },
      ],
      tableData: [
        { id: 1, name: "king" },
        { id: 2, name: "wang" },
        { id: 3, name: "zhang" },
      ],
    };
  },
  methods: {
    showMessage() {
      this.$message.success("xxxxxxxxxxxxxx");
    },
  },
};
</script>

<style scoped lang="less">
</style>
