<template>
  <transition name="k-message-fade">
    <div class="k-message__item" :class="'k-message__item--' + type" v-if="content">
      <i class="k-message__item__icon" :class="'k-icon-' + iconName"></i>
      <span class="k-message__item__content">{{ content }}</span>
      <i class="k-message__item__close k-icon-close" @click="handleClose"></i>
    </div>
  </transition>
</template>

<script>
import { TYPE_CLASSES_MAP } from '../../utlis/common';

export default {
  name: 'messageItem',
  props: {
    content: String,
    type: String,
    name: String,
  },
  computed: {
    iconName() {
      return TYPE_CLASSES_MAP[this.type] || TYPE_CLASSES_MAP.info;
    },
  },
  methods: {
    handleClose() {
      this.$emit('close', this.name);
    },
  },
};
</script>

<style scoped>

</style>
