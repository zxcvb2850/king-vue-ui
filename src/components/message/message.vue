<template>
  <transition-group
    tag="div"
    name="k-message-fade"
    class="k-message"
    ref="kMessage"
    @before-leave="beforeLeave"
  >
    <div
      v-for="message in messages"
      :key="message.name" class="k-message__item"
    >
      <div class="k-message__item__wrap" :class="'k-message__item--' + message.type">
        <i class="k-message__item__icon" :class="'k-icon-' + iconName(message.type)"></i>
        <span class="k-message__item__content" v-html="message.content"></span>
        <i v-if="message.showClose"
           class="k-message__item__close k-icon-close"
           @click="handleClose(message.name)"
        ></i>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { TYPE_CLASSES_MAP } from '../../utlis/common';

let seed = 0;
// eslint-disable-next-line no-unused-vars
let timer = null;

function getUid() {
  // eslint-disable-next-line no-plusplus
  return `k-message__${seed++}`;
}

export default {
  name: 'kMessage',
  data() {
    return {
      messages: [],
    };
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
      timer = null;
      this.remove(name);
    },
    beforeLeave(e) {
      console.log(e.offsetHeight);
      e.style.marginTop = `-${e.offsetHeight}px`;
    },
    add(notice, zIndex = 1000) {
      const dom = this.$el;
      const name = getUid();
      // eslint-disable-next-line no-underscore-dangle
      const _notice = {
        ...notice,
        name,
      };
      dom.style.zIndex = zIndex;
      this.messages.push(_notice);

      /**
       * 移除消息
       * 单位 s(秒)
       * */
      const { duration } = notice;
      if (duration > 0) {
        timer = setTimeout(() => {
          this.remove(name);
        }, duration * 1000);
      }
    },
    remove(name) {
      const index = this.messages.findIndex(item => item.name === name);
      if (index > -1) {
        const options = this.messages[index];
        if (options && options.onClose && typeof options.onClose === 'function') {
          options.onClose();
        }
        this.messages.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>

</style>
