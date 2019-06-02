<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disable="disable"
        :value="value"
        v-model="model"
        @change="handleChange"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disable"
        :checked="currentValue"
        @change="handleChange"
      />
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from '../../mixins/emttie';
import { findComponentUpward } from '../../utlis/assist';

export default {
  name: 'checkbox',
  mixins: [Emitter],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null,
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, 'kCheckboxGroup');
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }

    // console.log('value', this.value, this.currentValue);
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw 'Value should be trueValue or falseValue.';
      }
    },
  },
  methods: {
    handleChange(event) {
      if (this.disable) return false;
      const { checked } = event.target;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);
      this.$emit('change', value);
      this.dispatch('kFormItem', 'on-form-change', value);
      return true;
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>

<style scoped>

</style>
