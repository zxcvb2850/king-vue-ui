<template>
  <div class="alert">
    <div v-for="item in notices" :key="item.name">
      <div class="alert-content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
let seed = 0;

function getUid() {
  // eslint-disable-next-line no-plusplus
  return `alert_${seed++}`;
}
export default {
  name: "KAlert",
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      const name = getUid();

      // eslint-disable-next-line no-underscore-dangle
      const _notice = Object.assign({
        name,
      }, notice);

      this.notices.push(_notice);

      // 定时移除， 单位：秒
      const { duration } = notice;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const { notices } = this;

      const index = notices.findIndex(item => item.name === name);
      if (index > -1) {
        this.notices.splice(index, 1);
      }
    },
  },
};
</script>
