<template>
  <div class="k-tree">
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
      :render-content="renderContent"
    />
  </div>
</template>

<script>
import TreeNode from "./tree-node";
import { deepCopy } from "../../../utlis/assist";

export default {
  name: "KTree",
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    renderContent: Function,
  },
  data() {
    return {
      cloneData: [],
    };
  },
  watch: {
    data() {
      this.rebuildData();
    },
  },
  created() {
    this.rebuildData();
  },
  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent(eventName, data) {
      this.$emit(eventName, data, this.cloneData);
    },
  },
};
</script>
