<template>
    <ul class="k-tree-ul">
      <li class="k-tree-li">
        <span @click="handleExpand">
          <span v-if="data.children && data.children.length && !data.expand">+</span>
          <span v-if="data.children && data.children.length && data.expand">-</span>
        </span>
        <k-checkbox
          v-if="tree.showCheckbox"
          :value="data.checked"
          @input="handleCheck"
        ></k-checkbox>
        <node-content :data="data"></node-content>
        <!--eslint-disable-->
        <k-tree-node
          v-for="(item, index) in data.children"
          v-if="data.expand"
          :key="index"
          :data="item"
          :show-checkbox="tree.showCheckbox"
          :render-content="renderContent"
        ></k-tree-node>
        <!--eslint-enable-->
      </li>
    </ul>
</template>

<script>
import KCheckbox from '../../checkbox/src/checkbox';
import NodeContent from './nodeContent';
import { findComponentUpward } from '../../../utlis/assist';

export default {
  name: 'kTreeNode',
  components: { KCheckbox, NodeContent },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    renderContent: Function,
  },
  data() {
    return {
      tree: findComponentUpward(this, 'kTree'),
    };
  },
  watch: {
    'data.children': {
      handler(data) {
        if (data) {
          const checkedAll = !data.some(item => !item.checked);
          this.$set(this.data, 'checked', checkedAll);
        }
      },
      deep: true,
    },
  },
  methods: {
    handleExpand() {
      this.$set(this.data, 'expand', !this.data.expand);

      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data);
      }
    },
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);

      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data);
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked);

      if (data.children && data.children.length) {
        data.children.forEach((item) => {
          this.updateTreeDown(item, checked);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
