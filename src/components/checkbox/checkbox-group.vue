<template>
    <div>
      <slot></slot>
    </div>
</template>

<script>
import Emitter from '../../mixins/emttie';
import { findComponentsDownward } from '../../utlis/assist';

export default {
  name: 'kCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  mounted() {
    this.updateModel();
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
  methods: {
    updateModel(update) {
      console.log('checkbox group', update);
      this.childrens = findComponentsDownward(this, 'kCheckbox');
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.model = value;

          if (update) {
            child.currentValue = value.indexOf(child.label) > 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('change', data);
      this.dispatch('kFormItem', 'on-form-change', data);
    },
  },
};
</script>

<style scoped>

</style>
