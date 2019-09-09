import Vue from "vue";
import Template from "./src/message";
import PopupManager from "../../utlis/popup";

const statusType = ["info", "success", "warning", "error"];

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
};

let messageInstance;
function getMessageInstance() {
  messageInstance = messageInstance || Template.Instance();
  return messageInstance;
}

const Message = (options) => {
  // eslint-disable-next-line no-param-reassign
  options = options || {};
  if (typeof options === "string") {
    // eslint-disable-next-line no-param-reassign
    options = {
      content: options,
      duration: 3,
    };
  }
  const data = options;
  // eslint-disable-next-line
  options = { duration: 3, type: 'info' };
  // eslint-disable-next-line
  options = Object.assign(options, data);
  // console.log("---------------", options);
  const zIndex = PopupManager.nextZIndex();
  const instance = getMessageInstance();

  instance.add(options, zIndex);
};

statusType.forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === "string") {
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
