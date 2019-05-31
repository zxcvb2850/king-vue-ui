<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from '../../mixins/emttie';

export default {
  name: 'kInpute',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  mounted() {
    this.currentValue = this.value;
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('kFormItem', 'on-form-change', value);
    },
    handleBlur() {
      this.dispatch('kFormItem', 'on-form-blur', this.currentValue);
    },
  },
};
</script>

<style scoped>

</style>
