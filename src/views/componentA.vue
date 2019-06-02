<template>
    <div>
      A
      <slot></slot>
    </div>
</template>

<script>
import { findComponentDownward, findComponentsDownward } from '../utlis/assist';

export default {
  name: 'componentA',
  mounted() {
    const childrenName = findComponentDownward(this, 'componentB');
    console.log('children', childrenName);
    childrenName.hello();
    const childrensName = findComponentsDownward(this, 'componentB');
    console.log('childrens', childrensName);
  },
  methods: {
    hello() {
      console.log('componentA Hello');
    },
  },
};
</script>

<style scoped>

</style>
