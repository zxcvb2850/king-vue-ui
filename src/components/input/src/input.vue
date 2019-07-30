<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from "../../../mixins/emttie";

export default {
  name: "KInpute",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      currentValue: "",
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  mounted() {
    this.currentValue = this.value;
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("KFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("KFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style scoped>

</style>
