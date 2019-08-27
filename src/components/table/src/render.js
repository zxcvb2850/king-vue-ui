export default {
  functional: true,
  props: {
    type: String,
    row: Object,
    column: Object,
    index: Number,
    render: Function,
  },
  render(h, ctx) {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.ChangeLog,
    };
    if (ctx.props.type === "selection") {
      return ctx.props.render("input", params);
    }

    return ctx.props.render(h, params);
  },
};
