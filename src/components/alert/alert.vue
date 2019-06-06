<template>
    <div class="alert">
      <div v-for="item in notices" :key="item.name">
        <div class="alert-content">{{item.content}}</div>
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
  name: 'kAlert',
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

<style scoped>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>
