<template>
  <label
    class="k-checkbox"
    :class="[{'is-checked': currentValue}, {'is-disabled': isDisabled}]"
  >
    <span
      class="k-checkbox__input"
      :class="[{'is-checked': currentValue}, {'is-disabled': isDisabled}]"
    >
      <span class="k-checkbox__inner">
        <input
          v-if="group"
          v-model="model"
          class="k-checkbox__original"
          type="checkbox"
          :disabled="isDisabled"
          :value="label"
          @change="handleChange"
        />
        <input
          v-else
          class="k-checkbox__original"
          type="checkbox"
          :disabled="isDisabled"
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
import Emitter from "../../../mixins/emttie";
import { findComponentUpward } from "../../../utlis/assist";

export default {
  name: "KCheckbox",
  mixins: [Emitter],
  inject: {
    KForm: {
      default: "",
    },
    KFormItem: {
      default: "",
    },
  },
  props: {
    disabled: {
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
  computed: {
    isDisabled() {
      return this.disabled || (this.KForm || this.KFormItem || {}).disabled;
    },
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        // eslint-disable-next-line no-throw-literal
        throw "Value should be trueValue or falseValue.";
      }
    },
  },
  mounted() {
    this.parent = findComponentUpward(this, "KCheckboxGroup");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    handleChange(event) {
      if (this.isDisabled) return false;

      const { checked } = event.target;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("change", value);
        this.dispatch("KFormItem", "on-form-change", value);
      }
      return true;
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>
