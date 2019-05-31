<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'kForm',
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      console.log(field);
      if (field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      console.log(field);
      if (field) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  mounted() {
  },
  methods: {
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate('', (err) => {
            if (err) {
              valid = false;
            }
            // eslint-disable-next-line no-plusplus
            if (++count === this.fields.length) {
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
