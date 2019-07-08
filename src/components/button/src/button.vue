<template>
  <button
    :is="tagName"
    class="k-button"
    v-bind="tagProps"
    :disabled="buttonDisabled"
    :class="[
      type ? 'k-button--' + type : '',
      buttonSize ? 'k-button--' + buttonSize : '',
      {
        'is-disable': buttonDisabled,
        'is-round': round,
        'is-circle': circle,
      }
    ]"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <i
      v-if="icon"
      :class="icon"
    />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>

<script>
  export default {
    name: 'KButton',
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
      to: {
        type: String,
        default: '',
      },
      href: {
        type: String,
        default: '',
      },
      target: {
        type: String,
        default: '_self',
      },
      size: String,
      disabled: Boolean,
      round: Boolean,
      circle: Boolean,
      autofocus: Boolean,
    },
    inject: {
      KForm: {
        default: '',
      },
      KFormItem: {
        default: '',
      },
    },
    data() {
      return {};
    },
    computed: {
      _KFormItemSize() {
        return (this.KFormItem || {}).KFormItemSize;
      },
      buttonSize() {
        /* eslint-disable */
        return this.size || this._KFormItemSize;
      },
      buttonDisabled() {
        return this.disabled || (this.KForm || {}).disabled;
      },
      tagName() {
        return this.to ? 'a' : 'button';
      },
      tagProps() {
        let props = {};
        if (this.to) {
          props = {
            target: this.target,
            href: this.to || this.href,
          }
        }
        return props;
      },
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      },
    },
  };
</script>
