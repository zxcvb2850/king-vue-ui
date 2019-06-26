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
      <k-message-item
        :content="message.content"
        :type="message.type"
        :name="message.name"
        :showClose="message.showClose"
        :userHtmlString="message.userHtmlString"
        @close="handleClose"
      />
    </div>
  </transition-group>
</template>

<script>
import kMessageItem from './item';

let seed = 0;
// eslint-disable-next-line no-unused-vars
let timer = null;

function getUid() {
  // eslint-disable-next-line no-plusplus
  return `k-message__${seed++}`;
}

export default {
  name: 'kMessage',
  components: { kMessageItem },
  data() {
    return {
      messages: [],
    };
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
      console.log('----------', notice);
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
