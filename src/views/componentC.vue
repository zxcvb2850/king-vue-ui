<template>
    <div>
      <span @click="handleClick">C</span>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'componentC',
  mounted() {
    this.$on('on-abc', (err) => {
      console.log('++++++', err);
    });
  },
  methods: {
    handleClick() {
      const nowComponent = this.$parent.$children[0]
      nowComponent.$emit('on-abc', 'err');
    },
  },
};
</script>

<style scoped>

</style>
