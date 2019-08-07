<template>
  <div class="wrap">
    <k-alert show-close title="title" description="test description" />
    <k-button type="primary" @click="showMessage">
      默认按钮
    </k-button>
    <k-button type="success" @click="showDialog">
      Dialog
    </k-button>
    <k-checkbox>单选框</k-checkbox>

    <k-input
      v-model="text"
      prefix-icon="smile-fill"
      suffix-icon="smile-fill"
      clear-icon
      type="text"
    >
      <template slot="prepend">http://</template>
      <template slot="append">.com</template>
    </k-input>

    <k-icon name="smile-fill" />

    <k-table :data="tableData" :columns="columns" center height="100px" />

    <k-dialog :visible.sync="visible" title="diaolog">
      <div>dialog 内容</div>
    </k-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      visible: false,
      columns: [
        { key: "id", title: "编号" },
        { key: "name", title: "姓名" },
      ],
      tableData: [
        { id: 1, name: "king" },
        { id: 2, name: "wang" },
        { id: 3, name: "zhang" },
      ],
      text: "",
    };
  },
  methods: {
    showMessage() {
      this.$message.success("xxxxxxxxxxxxxx");
    },
    showDialog() {
      this.visible = true;
    },
  },
};
</script>

<style scoped lang="less">
</style>
