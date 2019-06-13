<template>
    <div>
      <p @click="handleClick">A Component</p>
      <slot></slot>
    </div>
</template>

<script>
import Emitter from '../mixins/emttie';

export default {
  name: 'componentA',
  mixins: [Emitter],
  methods: {
    handleClick() {
      this.broadcast('componentB', 'on-message', 'Hello');
    },
    hello() {
      console.log('componentA Hello');
    },
  },
};
</script>

<style scoped>

</style>
