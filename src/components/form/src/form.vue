<template>
  <form class="k-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "KForm",
  provide() {
    return {
      KForm: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    labelWidth: {
      type: [String, Number],
      default: "",
    },
    size: String,
    disabled: Boolean,
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on("on-form-item-add", (field) => {
      if (field) this.fields.push(field);
    });
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
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
          field.validate("", (errors) => {
            if (errors) {
              valid = false;
            }
            // eslint-disable-next-line no-plusplus
            if (++count === this.fields.length) {
              // all finish
              resolve(valid);
              if (typeof callback === "function") {
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
