import Vue from "vue";
import messageBoxVue from "./messageBox";
import merge from "../../../utlis/merge";
import { isVNode, hasOwn } from "../../../utlis/dom";

const optionsDefault = {
  title: "",
  content: "",
  type: "",
  iconClass: "",
  customClass: "",
  showClose: true,
  beforeClose: null,
  userHtmlString: false,
  closeOnClickModal: false,
  lockScroll: false,
  confirmButtonText: "确认",
  cancelButtonText: "取消",
  showInput: false,
  inputPlaceholder: "",
  inputRegexp: null,
  inputErrorMessage: "输入错误",
};

let currentMsg = null; // 当前消息参数
let instance = null; // 当前消息实例
const MessageCollection = [];

const MessageBoxConstructor = Vue.extend(messageBoxVue);

const defaultCallback = (action) => {
  if (currentMsg) {
    const callback = currentMsg.callback;
    if (typeof callback === "function") {
      if (instance.showInput) {
        callback({ action, value: instance.inputValue });
      } else {
        callback(action);
      }
    }

    if (currentMsg.resolve) {
      if (action === "confirm") {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action });
        } else {
          currentMsg.resolve(action);
        }
      } else if (currentMsg.reject && (action === "cancel" || action === "close")) {
        currentMsg.reject(action);
      }
    }
  }
};

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement("div"),
  });

  instance.callback = defaultCallback;
};

const showMessage = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = "";

  if (!instance.visible || instance.closeTimer) {
    if (MessageCollection.length > 0) {
      currentMsg = MessageCollection.shift();
      const options = currentMsg.options;
      for (const prop in options) {
        if (hasOwn(options, prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      const oldCb = instance.callback;
      instance.callback = (action, stance) => {
        oldCb(action, stance);
        showMessage();
      };

      if (isVNode(instance.content)) {
        instance.$slots.default = [instance.content];
        instance.message = null;
      } else {
        delete instance.$slots.default;
      }

      ["showClose"].forEach((prop) => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      // 插入message box
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        // 设置实例 data 参数
        instance.visible = true;
      });
    }
  }
};

// eslint-disable-next-line consistent-return
const MessageBox = function (options, callback) {
  // eslint-disable-next-line no-param-reassign
  callback = options.callback;
  if (typeof Promise !== "undefined") {
    return new Promise((resolve, reject) => {
      MessageCollection.push({
        options: merge({}, optionsDefault, options),
        callback,
        resolve,
        reject,
      });
      showMessage();
    });
  }

  MessageCollection.push({
    options: merge({}, optionsDefault, options),
    callback,
  });
  showMessage();
};

MessageBox.alert = function (title, content, options) {
  if (typeof title === "object") {
    // eslint-disable-next-line no-param-reassign
    options = title;
  }
  if (options && options.showInput) {
    options.showInput = false;
  }
  return MessageBox(merge({
    type: "$alert",
    title,
    content,
  }, options));
};

MessageBox.prompt = function (title, content, options) {
  if (typeof title === "object") {
    // eslint-disable-next-line no-param-reassign
    options = title;
  }
  return MessageBox(merge({
    type: "$prompt",
    title,
    content,
    showInput: true,
  }, options));
};

export default MessageBox;
