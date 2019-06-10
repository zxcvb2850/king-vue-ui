<template>
  <label class="k-radio">
    <span :class="{
      'is-checked': model === label
    }">
      <span class="k-radio__inner"></span>
      <input
        type="radio"
        ref="radio"
        class="k-radio__input"
        :value="label"
        v-model="model"
        :disabled="isDisabled"
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
import { findComponentUpward } from '../../utlis/assist';

export default {
  name: 'kRadio',
  mixins: [Emitter],
  inject: {
    kForm: {
      default: '',
    },
    kFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: [String, Number],
    },
    disabled: Boolean,
  },
  data() {
    return {
      currentValue: this.value,
      parent: findComponentUpward(this, 'kRadioGroup'), // 查找父级对应的组件
      group: false, // 是否有group组件
    };
  },
  mounted() {
    // this.updateValue();
    // console.log(this.value, this.label);
  },
  computed: {
    model: {
      get() {
        return this.parent ? this.parent.value : this.value;
      },
      set(val) {
        if (this.parent) {
          this.dispatch('kRadioGroup', 'input', val);
        } else {
          this.$emit('input', val);
        }
        // eslint-disable-next-line no-unused-expressions
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      },
    },
    isDisabled() {
      return this.parent
        ? this.parent.disabled || this.disabled || (this.kForm || {}).disabled
        : this.disabled;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model);
        // this.dispatch('kFormItem', 'on-form-change', this.model);
      });
    },
    handleFocus() {},
    handleBlur() {},
  },
};
</script>

<style scoped>

</style>
