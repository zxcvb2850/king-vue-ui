/* eslint-disable */

export default {
  name: 'kNodeContent',
  props: {
    data: {
      required: true,
    },
  },
  render(h) {
    const parent = this.$parent;
    const tree = parent.tree;
    const data = this.data;

    return (
      parent.renderContent
        ? parent.renderContent.call(parent._renderProxy, h, {_self: tree.$vnode.context, data})
        : tree.$scopedSlots.default
        ? tree.$scopedSlots.default({ data })
        : <span class="k-tree-node__label">{data.title}</span>
    );
  },
};
