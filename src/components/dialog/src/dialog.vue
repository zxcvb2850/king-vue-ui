<template>
  <transition
    name="dialog-translate"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div v-show="visible" class="k-dialog" @click.self="handleWrapperClick">
      <div ref="dialog" class="k-dialog__wrapper">
        <div class="k-dialog__header">
          <slot name="title">
            <span class="k-dialog__title">{{ title }}</span>
          </slot>
          <i v-if="showClose" class="k-dialog__close k-icon-close" @click="handleClose"></i>
        </div>
        <div v-if="$slots.default" class="k-dialog__body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="k-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PopupManager from "../../../utlis/popup";

let idSeed = 1;

export default {
  name: "KDialog",
  props: {
    // dialog是否展示
    visible: {
      type: Boolean,
      default: false,
    },
    // dialog标题
    title: {
      type: String,
      default: "",
    },
    // 是否展示关闭按钮
    showClose: {
      type: Boolean,
      default: true,
    },
    // 是否点击modal关闭弹窗
    clickOnClickModal: {
      type: Boolean,
      default: true,
    },
    // dialog弹窗是否插入body元素上
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 遮罩层是否插入到body元素上
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    // 是否需要遮罩
    modal: {
      type: Boolean,
      default: true,
    },
    // 关闭之前的回调函数
    beforeClose: Function,
  },
  data() {
    return {
      opened: false,
    };
  },
  beforeMount() {
    /* eslint-disable */
    this._dialogId = `dialog-${idSeed++}`;
    /* eslint-disable-end */
    PopupManager.register(this._dialogId, this);
  },
  mounted() {
    if (this.visible) {
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return false;

        this.$nextTick(() => {
          this.open()
        })

        this.closed = false;
        this.$emit('open');
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        if (!this.closed) this.$emit('close');
        this.close();
      }
    },
  },
  methods: {
    open(options) {
      const props = {...this.$props || this, options};
      this.doOpen(props);
    },
    doOpen(props) {
      if (this.opened) return false;
      this._opening = true;
      const { modal, zIndex, modalFade } = props;
      const dom = this.$el;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }
      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._dialogId);
          this._closing = false;
        }
        PopupManager.openModal(this._dialogId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, null, true);
        dom.style.zIndex = PopupManager.nextZIndex();
        this.opened = true;

        this.onOpen && this.onOpen();

        this.doAfterOpen();
      }
    },
    doAfterOpen() {
      this._opening = false;
    },
    close() {
      this.doClose();
    },
    doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      this.opened = false;
      this.doAfterClose();
    },
    doAfterClose() {
      console.log('close');
      PopupManager.closeModal(this._dialogId);
      this._closing = false;
    },
    handleWrapperClick() {
      if (!this.clickOnClickModal) return false;
      this.handleClose();
      return true;
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
  },
  computed: {
    style() {},
  },
  beforeDestroy() {
    PopupManager.deregister(this._dialogId);
    PopupManager.closeModal(this._dialogId);
  },
  destroyed() {
    if(this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
