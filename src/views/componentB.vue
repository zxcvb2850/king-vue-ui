<template>
    <div>
      B
      <slot></slot>
    </div>
</template>

<script>
import { findBrothersComponents, findComponentUpward } from '../utlis/assist';

export default {
  name: 'componentB',
  mounted() {
    const parentName = findComponentUpward(this, 'componentA');
    // console.log('parent', parentName);
    parentName.hello();

    // const parentsName = findComponentsUpward(this, 'componentA');
    // console.log('parents', parentsName);

    const brothers = findBrothersComponents(this, 'componentB');
    console.log('brothers', brothers);
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
