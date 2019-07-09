<template>
  <i :class="'k-icon-' + name" />
</template>

<script>
export default {
  name: "KIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

</style>
