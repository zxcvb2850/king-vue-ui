<template>
  <transition name="k-alert-fade">
    <div v-if="visible" class="k-alert" :class="[isCenter, 'k-alert--' + type]">
<<<<<<< HEAD
      <Icon class="k-alert__icon" :class="[isBoldTitle]" v-if="showIcon" :name="iconName"/>
=======
      <i v-if="showIcon"
         class="k-alert__icon"
         :class="['k-icon-' + iconName, isBoldTitle]"
      ></i>
>>>>>>> 12e45f1... fix: alert 样式错误
      <div class="k-alert__content">
        <span class="k-alert__title" :class="[isBoldTitle]" v-if="$slots.title || !title">
          <slot></slot>
        </span>
        <span class="k-alert__title" :class="[isBoldTitle]" v-if="title && !$slots.title">{{title}}</span>
        <p class="k-alert__description" v-if="description || $slots.description">{{description}}</p>
      </div>
      <i v-if="!closable" class="k-alert__closebtn k-icon-close" @click="handleClose"></i>
    </div>
  </transition>
</template>

<script>
import Icon from '../icon/icon';
import { TYPE_CLASSES_MAP } from '../../utlis/common';

export default {
  name: 'kAlert',
  components: { Icon },
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
