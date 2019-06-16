/**
 * dialog相关配置
 * */

const instances = {};

const PopupManager = {
  getInstance(id) {
    return instances[id];
  },
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
};

export default PopupManager;
