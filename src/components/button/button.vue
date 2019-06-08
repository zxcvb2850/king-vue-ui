<template>
    <button
      @click="handleClick"
      class="k-button"
      :disabled="buttonDisabled"
      :type="nativeType"
      :autofocus="autofocus"
      :class="[
        type  ? 'k-button--' + type : '',
        buttonSize ? 'k-button--' + buttonSize : '',
        {
          'is-disable': buttonDisabled,
          'is-round': round,
          'is-circle': circle,
        }
      ]"
    >
      <i class="icon" v-if="icon"></i>
      <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
  name: 'kButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    size: String,
    disabled: Boolean,
    round: Boolean,
    circle: Boolean,
    autofocus: Boolean,
  },
  inject: {
    kForm: {
      default: '',
    },
    kFormItem: {
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    _kFormItemSize() {
      return (this.kFormItem || {}).kFormItemSize;
    },
    buttonSize() {
      return this.size || this._kFormItemSize;
    },
    buttonDisabled() {
      return this.disabled || (this.kForm || {}).disabled;
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped lang="less">
  .k-button {
    &.is-disable {
      cursor: no-drop;
    }
  }
</style>
