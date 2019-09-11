/**
 * 弹窗相关的公共参数
 * */
let zIndex = 1000;
let hasModal = false; // v-modal 是否展示了
let hasInitZIndex = false;

/* eslint-disable */
const getModal = function () {
  let { modalDom } = PopupManager;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false
    modalDom = document.createElement('div');
    modalDom.classList.add('v-modal');
    // eslint-disable-next-line no-use-before-define
    PopupManager.modalDom = modalDom;

    // 遮罩层添加监听事件
    modalDom.addEventListener('click', () => {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }
  return modalDom;
};
/* eslint-enable */

const instances = {};

const PopupManager = {
  // dialog是否展示
  modalFade: true,
  // 获取ID对应的实例
  getInstance(id) {
    return instances[id];
  },
  // 注册实例
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  // 删除ID对应的实例
  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  // 增长zIndex的值
  nextZIndex() {
    // eslint-disable-next-line no-plusplus
    return PopupManager.zIndex++;
  },
  // 保存 dialog 的实例
  modalStack: [],
  // 点击背景移除最顶层的dialog
  doOnModalClick() {
    // 最后一个展示的dialog
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return false;
    // 获取当前的dialog的实例
    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.clickModalClose) {
      instance.close();
    }
    return true;
  },
  // 打开dialog
  // eslint-disable-next-line no-shadow
  openModal(id, zIndex, dom, modalClass, modalFade) {
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const { modalStack } = this;

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = modalStack.length; i < len; i++) {
      const item = modalStack[i];
      if (item.id === id) break;
    }

    const modalDom = getModal();
    // 添加 vue 动画过渡css
    if (this.modalFade && !hasModal) {
      modalDom.classList.add("v-modal-enter");
    }
    // 如果额外有class的话，则添加
    if (modalClass) {
      const classArr = modalClass.trim().split(/s+/);
      classArr.forEach(item => modalDom.classList.add(item));
    }
    // 动画结束移除class
    setTimeout(() => {
      modalDom.classList.remove("v-modal-enter");
    }, 200);

    /**
     * todo 有待理解...
     */
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }
    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = "";
    // 保存当前状态
    this.modalStack.push({ id, zIndex, modalClass });
  },
  // 关闭 dialog 时
  closeModal(id) {
    const { modalStack } = this;
    const modalDom = getModal();
    // 判断是否有多个dialog
    // eslint-disable-next-line no-empty
    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          const classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(item => modalDom.classList.remove(item));
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        // eslint-disable-next-line no-plusplus
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }
    if (modalStack.length === 0) {
      if (this.modalFade) {
        modalDom.classList.add("v-modal-leave");
      }
      setTimeout(() => {
        // 如果没有dialog了，则移除v-modal
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = "node";
          PopupManager.modalDom = null;
        }
        // 移除过渡动画class
        modalDom.classList.remove("v-modal-leave");
      }, 200);
    }
  },
};

// 监听 zIndex 的变化
Object.defineProperty(PopupManager, "zIndex", {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || 1000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(val) {
    zIndex = val;
  },
});

export default PopupManager;
