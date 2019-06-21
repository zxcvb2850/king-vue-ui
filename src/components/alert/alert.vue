<template>
  <transition name="k-alert-fade">
    <div v-if="visible" class="k-alert" :class="[isCenter, 'k-alert--' + type]">
      <i v-if="showIcon"
         class="k-message__item__icon"
         :class="['k-icon-' + iconName(message.type), isBoldTitle]"
      ></i>
      <div class="k-alert__content">
        <span class="k-alert__title" :class="[isBoldTitle]" v-if="$slots.title || !title">
          <slot></slot>
        </span>
        <span class="k-alert__title"
              :class="[isBoldTitle]"
              v-if="title && !$slots.title"
        >{{title}}</span>
        <p class="k-alert__description" v-if="description || $slots.description">{{description}}</p>
      </div>
      <i v-if="!closable" class="k-alert__closebtn k-icon-close" @click="handleClose"></i>
    </div>
  </transition>
</template>

<script>
import { TYPE_CLASSES_MAP } from '../../utlis/common';

export default {
  name: 'kAlert',
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    center: Boolean,
    showIcon: Boolean,
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    isBoldTitle() {
      return (this.description || this.$slots.description) ? 'is-bold' : '';
    },
    iconName() {
      return TYPE_CLASSES_MAP[this.type] || TYPE_CLASSES_MAP.info;
    },
    isCenter() {
      return this.center ? 'is-center' : '';
    },
  },
  methods: {
    handleClose() {
      this.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
