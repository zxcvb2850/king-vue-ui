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
          <span class="k-dialog__close" v-if="showClose" @click="handleClose">x</span>
        </div>
        <div class="k-dialog__body" v-if="$slots.default">
          <slot></slot>
        </div>
        <div class="k-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
<<<<<<< HEAD
import PopupManager from './popup';
let idSeed = 1;

=======
const dialogMask = {
  id: 1,
  len: 0,
  zIndex: 1000,
  dom: null,
};
>>>>>>> 506bb0e... fix：优化dialog
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
  beforeMount() {
    console.log('---------', this);
    /* eslint-disable */
    this._dialogId = `dialog-${idSeed++}`;
    /* eslint-disable-end */
    PopupManager.register(this._dialogId, this);
  },
  beforeDestroy() {
    console.log(this._dialogId);
    PopupManager.deregister(this._dialogId);
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
<<<<<<< HEAD
=======

        console.log('关闭', dialogMask.len);
        // eslint-disable-next-line no-plusplus
        dialogMask.len--;
        if (!dialogMask.len && dialogMask.dom) {
          document.body.removeChild(dialogMask.dom);
          dialogMask.dom = null;
        }
>>>>>>> 506bb0e... fix：优化dialog
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
      }
      this.$el.style.zIndex = ++dialogMask.zIndex;
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

<style lang="less">
.k-dialog__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1001;
  .k-dialog {
    margin: 200px auto auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 520px;
    height: 200px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    background-color: #FFF;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, .2);
  }
  .k-dialog__header {
    display: flex;
    .k-dialog__titile {
      flex: 1;
    }
    .k-dialog__close {
      cursor: pointer;
      &:hover {
        color: #5c6b77;
      }
    }
  }
  .k-dialog__body {
    flex: 1;
    padding: 10px;
  }
  .k-dialog__footer {
    text-align: right;
  }
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
