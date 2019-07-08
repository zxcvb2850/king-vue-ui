import Vue from 'vue';
<<<<<<< HEAD
import Template from './message';
=======
import Template from './src/message';
>>>>>>> 04a1ae1... ﻿feat: 组件的封装
import PopupManager from '../../utlis/popup';

const statusType = ['info', 'success', 'warning', 'error'];

Template.Instance = (options) => {
  // eslint-disable-next-line no-param-reassign
  options = options || {};
  const Instance = new Vue({
    data: options,
    render(h) {
      return h(Template, { options });
    },
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  const message = component.$children[0];

  return {
    add(noticeProps, zIndex) {
      message.add(noticeProps, zIndex);
    },
    remove(name) {
      message.remove(name);
    },
  };
<<<<<<< HEAD
}
=======
};
>>>>>>> 04a1ae1... ﻿feat: 组件的封装

let messageInstance;
function getMessageInstance() {
  messageInstance = messageInstance || Template.Instance();
  return messageInstance;
}

const Message = (options) => {
  // eslint-disable-next-line no-param-reassign
  options = options || {};
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = {
      content: options,
      duration: 3,
    };
  }
  // eslint-disable-next-line
  options = { duration: 3, type: 'info', ...options };
  const zIndex = PopupManager.nextZIndex();
  const instance = getMessageInstance();

  instance.add(options, zIndex);
};

statusType.forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === 'string') {
      // eslint-disable-next-line no-param-reassign
      options = {
        content: options,
      };
    }
    // eslint-disable-next-line no-param-reassign
    options.type = type;

    // eslint-disable-next-line no-undef
    return Message(options);
  };
});

export default Message;
