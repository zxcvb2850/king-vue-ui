<template>
  <i :class="'k-icon-' + name"></i>
</template>

<script>
export default {
  name: 'kIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
