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
      /* eslint-disable */
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
  @widthDefault: 80px;
  @heightDefault: 30px;
  @widthSmall: 70px;
  @widthMini: 60px;

  .k-button {
    width: @widthDefault;
    height: @heightDefault;
    line-height: 1;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    &.k-button--small{
      width: @widthSmall;
    }
    &.k-button--mini{
      width: @widthMini;
    }
    &.is-disable {
      cursor: no-drop;
    }
  }
</style>
