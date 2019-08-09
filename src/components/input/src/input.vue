<template>
  <div
    class="k-input"
    :class="[{
      'is-disabled': inputDisabled,
      'k-input-group': $slots.prepend || $slots.append,
      'k-input-group--append': $slots.append,
      'k-input-group--prepend': $slots.prepend,
      'k-input--suffix': $slots.suffix || suffixIcon || clearIcon || showPassword,
      'k-input--prefix': $slots.prefix || prefixIcon
    }]"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="k-input-group__prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        class="k-input__inner"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :value="currentValue"
        :disabled="inputDisabled"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <!-- 输入框前的 icon -->
      <span
        v-if="$slots.prefix || prefixIcon"
        :style="prependLeft"
        class="k-input__prefix"
      >
        <slot name="prefix"></slot>
        <i
          v-if="prefixIcon"
          :class="'k-icon-' + prefixIcon"
          class="k-input__icon"
        ></i>
      </span>
      <!-- 输入框后的 icon -->
      <span v-if="getSuffixVisible" :style="appendLeft" class="k-input__suffix">
        <span class="k-input__suffix-inner">
          <template v-if="!showClear|| !showPwdVisible">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon" :class="suffixIcon" class="k-input__icon"></i>
          </template>
          <i
            v-if="showClear"
            class="k-input__icon k-input__clear k-icon-close"
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="k-input__icon k-input__clear k-icon-eye"
            @click="handlePasswordVisible"
          ></i>
        </span>
      </span>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="k-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      cols="30"
      rows="10"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
import Emitter from "../../../mixins/emttie";

export default {
  name: "KInput",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    suffixIcon: {
      type: String,
      default: "",
    },
    prefixIcon: {
      type: String,
      default: "",
    },
    placeholder: String,
    // 是否禁止输入
    disabled: Boolean,
    // 是否展示密码显示按钮
    showPassword: Boolean,
    // 删除 icon
    clearIcon: Boolean,
    // 输入框只读
    readonly: Boolean,
  },
  data() {
    return {
      currentValue: "",
      focused: false,
      passwordVisible: false,
      prependLeft: {},
      appendLeft: {},
    };
  },
  computed: {
    nativeInputValue() {
      return this.value === null || this.value === undefined ? "" : String(this.value);
    },
    inputDisabled() {
      return this.disabled || (this.KForm || {}).disabled;
    },
    showClear() {
      return this.clearIcon
        && !this.inputDisabled
        && !this.readonly
        && this.nativeInputValue;
    },
    showPwdVisible() {
      return this.showPassword
        && !this.inputDisabled
        && !this.readonly
        && (!!this.nativeInputValue || this.focused);
    },
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  mounted() {
    this.currentValue = this.value;

    if (this.isPrepend()) {
      this.$nextTick(() => {
        const prepend = document.querySelector(".k-input .k-input-group__prepend");
        this.prependLeft = { transform: `translateX(${prepend.offsetWidth}px)` };
      });
    }
    if (this.isAppend()) {
      this.$nextTick(() => {
        const append = document.querySelector(".k-input .k-input-group__append");
        this.appendLeft = { transform: `translateX(-${append.offsetWidth}px)` };
      });
    }
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    select() {

    },
    isPrepend() {
      return this.$slots.prepend;
    },
    isAppend() {
      return this.$slots.append;
    },
    handleInput(event) {
      const { value } = event.target;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("KFormItem", "on-form-change", value);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      this.dispatch("KFormItem", "on-form-blur", this.currentValue);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    clear() {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      return this.$slots.suffix
        || this.suffixIcon
        || this.showClear
        || this.showPassword;
    },
  },
};
</script>
