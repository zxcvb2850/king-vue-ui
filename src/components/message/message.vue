<template>
  <div class="k-message">
    <message-item
      v-for="message in messages"
      :key="message.name"
      :content="message.content"
      :type="message.type"
      :name="message.name"
      @close="handleClose"
    />
  </div>
</template>

<script>
import MessageItem from './messageItem';

let seed = 0;
// eslint-disable-next-line no-unused-vars
let timer = null;

function getUid() {
  // eslint-disable-next-line no-plusplus
  return `k-message__${seed++}`;
}

export default {
  name: 'kMessage',
  components: { MessageItem },
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
    add(notice) {
      const name = getUid();
      // eslint-disable-next-line no-underscore-dangle
      const _notice = {
        ...notice,
        name,
      };
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
        this.messages.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>

</style>
