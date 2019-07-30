<template>
  <label
    class="k-radio"
    :class="[
      { 'is-disabled' : isDisabled },
      { 'is-checked' : model === label }
    ]"
  >
    <span
      class="k-radio__input"
      :class="{
        'is-disabled' : isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="k-radio__inner"></span>
      <input
        ref="radio"
        v-model="model"
        type="radio"
        class="k-radio__original"
        :value="label"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </span>
    <span class="k-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import Emitter from "../../../mixins/emttie";
import { findComponentUpward } from "../../../utlis/assist";

export default {
  name: "KRadio",
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
    value: {
      type: String,
      default: "",
    },
    label: {
      type: [String, Number],
    },
    disabled: Boolean,
  },
  data() {
    return {
      currentValue: this.value,
      parent: findComponentUpward(this, "kRadioGroup"), // 查找父级对应的组件
      group: false, // 是否有group组件
    };
  },
  computed: {
    model: {
      get() {
        return this.parent ? this.parent.value : this.value;
      },
      set(val) {
        if (this.parent) {
          this.dispatch("kRadioGroup", "input", val);
        } else {
          this.$emit("input", val);
        }
        // eslint-disable-next-line no-unused-expressions
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      },
    },
    isDisabled() {
      return this.parent
        ? this.parent.disabled || this.disabled || (this.KForm || {}).disabled
        : this.disabled;
    },
  },
  mounted() {
    // this.updateValue();
    // console.log(this.value, this.label);
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        // this.dispatch('KFormItem', 'on-form-change', this.model);
      });
    },
    handleFocus() {},
    handleBlur() {},
  },
};
</script>

<style scoped>

</style>
