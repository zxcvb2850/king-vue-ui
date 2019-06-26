<template>
  <label
    class="k-checkbox"
    :class="[{'is-checked': currentValue}, {'is-disabled': disable}]"
  >
    <span class="k-checkbox__input"
          :class="[{'is-checked': currentValue}, {'is-disabled': disable}]">
      <span
        class="k-checkbox__inner">
        <input
          class="k-checkbox__original"
          v-if="group"
          type="checkbox"
          :disable="disable"
          :value="label"
          v-model="model"
          @change="handleChange"
        />
        <input
          class="k-checkbox__original"
          v-else
          type="checkbox"
          :disabled="disable"
          :checked="currentValue"
          @change="handleChange"
        />
      </span>
    </span>
    <span class="k-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Emitter from '../../mixins/emttie';
import { findComponentUpward } from '../../utlis/assist';

export default {
  name: 'kCheckbox',
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
    label: [String, Number, Boolean],
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
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        // eslint-disable-next-line no-throw-literal
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
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('change', value);
        this.dispatch('kFormItem', 'on-form-change', value);
      }
      return true;
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>
