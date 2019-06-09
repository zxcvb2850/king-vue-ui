<template>
  <label class="k-radio">
    <span>
      <span class="k-radio__inner"></span>
      <input
        type="radio"
        class="k-radio__input"
        :checked="currentValue"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </span>
    <slot>{{label}}</slot>
  </label>
</template>

<script>
import Emitter from '../../mixins/emttie';

export default {
  name: 'kRadio',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: [String, Number],
    },
    trueValue: {
      type: [String, Boolean, Number],
      default: '',
    },
    falseValue: {
      type: [String, Boolean, Number],
      default: '',
    },
    disabled: Boolean,
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue();
      }
    },
  },
  methods: {
    updateValue() {
      this.currentValue = this.value === this.trueValue;
    },
    handleChange(event) {
      if (!this.disabled) {
        const { checked } = event.target;
        this.currentValue = checked;
        const value = checked ? this.trueValue : this.falseValue;
        this.$emit('change', value);
        this.dispatch('kFormItem', 'on-form-change', value);
      }
    },
    handleFocus() {},
    handleBlur() {},
  },
};
</script>

<style scoped>

</style>
