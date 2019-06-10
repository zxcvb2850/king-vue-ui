<template>
  <div :class="[
    sizeClass ? 'k-button--' + sizeClass : '',
  ]">
    <label v-if="label" :class="{ 'k-form-item-label-required': isRequired }">{{label}}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="k-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emttie';

export default {
  name: 'kFormItem',
  mixins: [Emitter],
  inject: ['kForm'],
  provide() {
    return {
      kFormItem: this,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
    size: String,
  },
  data() {
    return {
      isRequired: false,
      validateState: '',
      validateMessage: '',
    };
  },
  created() {},
  mounted() {
    if (this.prop) {
      this.dispatch('kForm', 'on-form-item-add', this);

      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  watch: {},
  computed: {
    fieldValue() {
      return this.kForm.model[this.prop];
    },
    kFormItemSize() {
      return this.size || this.kForm.size;
    },
    sizeClass() {
      return this.kFormItemSize;
    },
  },
  methods: {
    getRules() {
      let formRules = this.kForm.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    setRules() {
      const rules = this.getRules();
      if (rules.length) {
        // eslint-disable-next-line array-callback-return
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }
      this.$on('on-form-change', this.onFieldChange);
      this.$on('on-form-blur', this.onFieldBlur);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    // eslint-disable-next-line consistent-return
    validate(trigger, callback = () => {}) {
      const rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校准中
      this.validateState = 'validating';

      const descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (error) => {
        this.validateState = !error ? 'success' : 'error';
        this.validateMessage = error ? error[0].message : '';

        callback(this.validateMessage);
      });
    },
    // 重置数据
    resetField() {
      this.validateState = '';
      this.validateMessage = '';

      this.kForm.model[this.prop] = this.initialValue;
    },
    onFieldChange(val) {
      // console.log(val);
      this.validate('change');
    },
    onFieldBlur(val) {
      // console.log(val);
      this.validate('blur');
    },
  },
  beforeDestroy() {
    this.dispatch('kForm', 'on-form-item-remove', this);
  },
};
</script>

<style scoped>
  .k-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .k-form-item-message {
    color: red;
  }
</style>
