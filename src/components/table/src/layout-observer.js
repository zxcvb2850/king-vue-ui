export default {
  create() {
    this.tableLayout.addObserver(this);
  },
  destroyed() {
    this.tableLayout.removeObserver(this);
  },
  computed: {
    tableLayout() {
      let { layout } = this;
      if (!layout && this.table) {
        // eslint-disable-next-line prefer-destructuring
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error("Can not find table layout.");
      }
      return layout;
    },
  },
};
