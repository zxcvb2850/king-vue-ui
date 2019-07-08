/**
 * 组件之间发送事件
 * */

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
<<<<<<< HEAD
    const name = child.$options.name;
=======
    const { name } = child.$options;
>>>>>>> 04a1ae1... ﻿feat: 组件的封装

    if (name === componentName) {
      // eslint-disable-next-line prefer-spread
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
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
