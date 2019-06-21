import Vue from 'vue';
import Template from './message';

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
    add(noticeProps) {
      message.add(noticeProps);
    },
    remove(name) {
      message.remove(name);
    },
  };
}

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
  // eslint-disable-next-line no-param-reassign
  options = { duration: 3, type: 'info', ...options };
  const instance = getMessageInstance();

  instance.add(options);
};

['info', 'success', 'warning', 'error'].forEach((type) => {
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
