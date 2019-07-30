<template>
  <div class="k-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "KRadioGroup",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
