<template>
  <div class="about">
    <h1>This is an about page</h1>
    <component-a>
      <component-b>1</component-b>
      <component-b>2</component-b>
      <component-b>3</component-b>
    </component-a>
  </div>
</template>

<script>
import componentA from './componentA';
import componentB from './componentB';

export default {
  name: '',
  components: { componentA, componentB },
};
</script>
