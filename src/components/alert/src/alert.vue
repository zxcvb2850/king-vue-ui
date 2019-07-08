<template>
  <transition name="k-alert-fade">
    <div
      v-if="visible"
      :class="[isCenter, 'k-alert--' + type]"
      class="k-alert"
    >
      <i
        v-if="showIcon"
        class="k-alert__icon"
        :class="['k-icon-' + iconName, isBoldTitle]"
      />
      <div class="k-alert__content">
        <span
          v-if="$slots.title || !title"
          :class="[isBoldTitle]"
          class="k-alert__title"
        >
          <slot />
        </span>
        <span
          v-if="title && !$slots.title"
          class="k-alert__title"
          :class="[isBoldTitle]"
        >{{ title }}</span>
        <p
          v-if="description || $slots.description"
          class="k-alert__description"
        >
          {{ description }}
          
        </p>
      </div>
      <i
        v-if="!closable"
        class="k-alert__closebtn k-icon-close"
        @click="handleClose"
      />
    </div>
  </transition>
</template>

<script>
  import {TYPE_CLASSES_MAP} from '../../../utlis/common';

  export default {
    name: 'KAlert',
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
