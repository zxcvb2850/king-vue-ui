import Vue from 'vue';
// eslint-disable-next-line import/no-cycle
import Notify from './notify.vue';

Notify.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Notify, { props });
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  const alert = Instance.$children[0];

  return {
    add(noticeProps) {
      alert.add(noticeProps);
    },
    remove(name) {
      alert.remove(name);
    },
  };
};

export default Notify;
