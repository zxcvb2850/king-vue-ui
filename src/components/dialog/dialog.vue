<template>
  <transition
    name="dialog-translate"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div v-show="visible" class="k-dialog__wrapper" @click.self="handleWrapperClick">
      <div class="k-dialog" ref="dialog">
        <div class="k-dialog__header">
          <slot name="title">
            <span class="k-dialog__titile">{{ title }}</span>
          </slot>
          <span v-if="showClose" @click="handleClose">x</span>
        </div>
        <div class="k-dialog__body" v-if="$slots.default">
          <slot></slot>
        </div>
      </div>
      <div class="k-dialog__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
const dialogMask = {
  id: 1,
  len: 0,
  zIndex: 1000,
  dom: null,
};
export default {
  name: 'kDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    clickOnClickModal: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.visible) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.open();
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        this.closed = true;
        this.close();

        console.log('关闭', dialogMask.len);
        // eslint-disable-next-line no-plusplus
        dialogMask.len--;
        if (!dialogMask.len && dialogMask.dom) {
          document.body.removeChild(dialogMask.dom);
          dialogMask.dom = null;
        }
      }
    },
  },
  methods: {
    open() {
      // eslint-disable-next-line no-plusplus
      dialogMask.len++;
      if (!dialogMask.dom) {
        dialogMask.dom = document.createElement('div');
        const div = dialogMask.dom;
        div.classList.add('v-modal');
        div.style.zIndex = dialogMask.zIndex;
        document.body.appendChild(dialogMask.dom);
        // eslint-disable-next-line no-plusplus
        this.$el.style.zIndex = ++dialogMask.zIndex;
      }
      // document.body.removeChild(modalDom);
    },
    close() {},
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    handleClose() {
      this.hide();
    },
    handleWrapperClick() {
      if (!this.clickOnClickModal) return false;
      this.handleClose();
      return true;
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    updatePopper() {},
  },
  beforeDestroy() {
    if (!dialogMask.len && dialogMask.dom) {
      document.body.removeChild(dialogMask.dom);
      dialogMask.dom = null;
    }
  },
};
</script>

<style>
.k-dialog__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1001;
}
  .v-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;
  }
</style>
