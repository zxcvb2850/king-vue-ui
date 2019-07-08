import { TYPE_CLASSES_MAP } from '../../../utlis/common';

export default {
  name: 'KMessageItem',
  props: {
    type: {
      type: String,
      default: 'info',
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
      this.$emit('close', name);
    },
  },
  render() {
    return (
      <div class={['k-message__item__wrap', `k-message__item--${this.type}`]}>
        <i class={['k-message__item__icon', `k-icon-${this.iconName(this.type)}`]}/>
        {
          this.userHtmlString
            ? (<span class="k-message__item__content" domPropsInnerHTML={this.content}/>)
            : (<span class="k-message__item__content">{this.content}</span>)
        }
        {
          this.showClose
            ? (<i
              class="k-message__item__close k-icon-close"
              onClick={() => this.handleClose(this.name)}
            />)
            : null
        }
      </div>
    );
  },
};
