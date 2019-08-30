<template>
  <div
    class="k-form-item"
    :class="[
      sizeClass ? 'k-button--' + sizeClass : '',
      isDisabled? 'is-disabled' : '',
    ]"
  >
    <label
      v-if="label"
      class="k-form__label"
      :class="{ 'k-form-item-label-required': isRequired }"
      :style="{width: labelWidth}"
    >
      {{ label }}
    </label>
    <div>
      <div
        class="k-form__content"
        :style="{marginLeft: labelWidth}"
      >
        <slot></slot>
        <div
          v-if="validateState === 'error'"
          class="k-form-item-message"
        >
          {{ validateMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import Emitter from "../../../mixins/emttie";

export default {
  name: "KFormItem",
  mixins: [Emitter],
  inject: ["KForm"],
  provide() {
    return {
      KFormItem: this,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
    rules: {
      type: [Object, Array],
    },
    size: String,
  },
  data() {
    return {
      isRequired: false,
      validateState: "",
      validateMessage: "",
    };
  },
  computed: {
    fieldValue() {
      return this.KForm.model[this.prop];
    },
    KFormItemSize() {
      return this.size || this.KForm.size;
    },
    sizeClass() {
      return this.KFormItemSize;
    },
    isDisabled() {
      return this.disabled || this.KForm.disabled;
    },
    labelWidth() {
      return typeof this.KForm.labelWidth === "string" ? this.KForm.labelWidth : `${this.KForm.labelWidth}px`;
    },
  },
  watch: {
    rules() {
      this.setRules();
    },
  },
  created() {
  },
  mounted() {
    if (this.prop) {
      this.dispatch("KForm", "on-form-item-add", this);

      // this.initialValue = this.fieldValue;

      Object.defineProperty(this, "initialValue", {
        value: this.fieldValue,
      });

      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("KForm", "on-form-item-remove", this);
  },
  methods: {
    getRules() {
      let formRules = this.KForm.rules;
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
      this.$on("on-form-change", this.onFieldChange);
      this.$on("on-form-blur", this.onFieldBlur);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    // eslint-disable-next-line consistent-return
    validate(trigger, callback = () => {
    }) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        if (!this.required) {
          callback();
          return true;
        }
        rules = [{ required: true }];
      }

      // 设置状态为校准中
      this.validateState = "validating";

      const descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (error) => {
        this.validateState = !error ? "success" : "error";
        this.validateMessage = error ? error[0].message : "";

        callback(this.validateMessage);
      });
    },
    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";

      this.KForm.model[this.prop] = this.initialValue;
    },
    onFieldChange() {
      this.validate("change");
    },
    onFieldBlur() {
      this.validate("blur");
    },
  },
};
</script>
