<template>
    <div>
      B
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'componentB',
  created() {
    this.$on('on-message', this.hello);
  },
  methods: {
    hello() {
      console.log('componentB hello');
    },
  },
};
</script>

<style scoped>

</style>
