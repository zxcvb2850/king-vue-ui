import { TYPE_CLASSES_MAP } from "../../../utlis/common";

export default {
  name: "KMessageItem",
  props: {
    type: {
      type: String,
      default: "info",
    },
    showClose: Boolean,
    userHtmlString: Boolean,
    name: String,
    content: [String, Object],
  },
  computed: {
    iconName() {
      // eslint-disable-next-line
      return function (type) {
        return TYPE_CLASSES_MAP[type] || TYPE_CLASSES_MAP.info;
      };
    },
  },
  methods: {
    handleClose(name) {
      this.$emit("close", name);
    },
  },
  render(h) {
    return h(
      "div", {
        class: ["k-message__item__wrap", `k-message__item--${this.type}`],
      }, [
        h("i", {
          class: ["k-message__item__icon", `k-icon-${this.iconName(this.type)}`],
        }),
        this.userHtmlString ? h("span", {
          class: "k-message__item__content",
          domProps: { innerHTML: this.content },
        })
          : h("span", {
            class: "k-message__item__content",
          }, this.content),
        this.showClose && h("i", {
          class: "k-message__item__close k-icon-close",
          on: { click: () => this.handleClose(this.name) },
        }),
      ],
    );
  },
};
