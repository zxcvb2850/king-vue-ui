<template>
    <div>
      11111111
    </div>
</template>

<script>
import ChangeLog from "../../../CHANGELOG.md";

export default {
  name: "ChangeLog",
  mounted() {
    console.log(ChangeLog);
    import("../../../CHANGELOG.md").then(res => {
      console.log(res);
    })
  }
};
</script>

<style scoped>

</style>
