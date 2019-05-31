/**
 * 组件之间发送事件
 * */

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const { name } = child.$options;

    if (name === componentName) {
      child.$emit.apply(child, [...componentName, ...eventName, ...params]);
    } else {
      broadcast.apply(child, [...componentName, ...eventName, [...params]]);
    }
  });
}

export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let { name } = parent.$options;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          // eslint-disable-next-line prefer-destructuring
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit(eventName, params);
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
