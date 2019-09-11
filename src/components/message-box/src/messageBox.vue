<template>
  <transition name="k-dialog-translate">
    <div
      v-show="visible"
      class="k-message-box__wrapper"
      @click.self="closeOnClickModal && handleAction('cancel')"
    >
      <div :class="['k-message-box', customClass, center ? 'is-center' : '']">
        <div class="k-message-box__header">
          <span v-if="!userHtmlString">{{ title }}</span>
          <span v-else v-html="title"></span>
          <i
            v-if="!!showClose"
            class="k-message-box__close k-icon-close"
            @click="handleAction('cancel')"
          ></i>
        </div>
        <div class="k-message-box__content">
          <span v-if="icon" :class="['k-message-box__status', icon]"></span>
          <div v-if="$slots.default" class="k-message-box__message">
            <slot></slot>
          </div>
          <div v-else class="k-message-box__message">
            <p v-if="!userHtmlString">{{ content }}</p>
            <p v-else v-html="content"></p>
          </div>
        </div>
        <div v-if="showInput" class="k-message-box__input">
          <k-input
            v-model="inputValue"
            :placeholder="inputPlaceholder"
            @keydown.enter.native="handleAction('confirm')"
          />
          <span
            v-show="inputError"
            class="k-message-box__input--message"
          >{{ inputErrorMessage }}</span>
        </div>
        <div v-if="!!confirmButtonText || !!cancelButtonText" class="k-message-box__footer">
          <k-button
            v-if="!!cancelButtonText"
            :class="cancelButtonClass"
            size="mini"
            @click="handleAction('cancel')"
          >
            {{ cancelBtnText }}
          </k-button>
          <k-button
            v-if="!!confirmButtonText"
            type="primary"
            :class="confirmButtonClass"
            size="mini"
            @click="handleAction('confirm')"
          >
            {{ confirmBtnText }}
          </k-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import KButton from "../../button";
import KInput from "../../input";
import PopupManager from "../../../utlis/popup";
import { TYPE_CLASSES_MAP } from "../../../utlis/common";
import { addClass, removeClass } from "../../../utlis/dom";

let idSeed = 0;

export default {
  name: "KMessageBox",
  components: { KButton, KInput },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 消息类型
    type: {
      type: String,
      default: "",
    },
    // 自定义 icon
    iconClass: {
      type: String,
      default: "",
    },
    // 自定义 MessageBox 类名
    customClass: {
      type: String,
      default: "",
    },
    // 是否展示关闭图标
    showClose: {
      type: Boolean,
      default: true,
    },
    // 打开是否锁定滚动条
    lockScroll: {
      type: Boolean,
      default: false,
    },
    // 关闭之前的判断
    beforeClose: {
      type: Function,
      default: null,
    },
    // 标题，内容是否是 html
    userHtmlString: {
      type: Boolean,
      default: false,
    },
    // 点击遮罩是否关闭
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // 是否展示确认按钮
    confirmButtonText: {
      type: [Boolean, String],
      default: "确定",
    },
    // 是否展示取消按钮
    cancelButtonText: {
      type: [Boolean, String],
      default: "取消",
    },
    // 确认按钮类名
    confirmButtonClass: {
      type: String,
      default: "",
    },
    // 取消按钮类名
    cancelButtonClass: {
      type: String,
      default: "",
    },
    // 是否居中
    center: Boolean,
    // 是否展示 input 输入框
    showInput: Boolean,
    // 输入框提示信息
    inputPlaceholder: {
      type: String,
      default: "",
    },
    // input 的正则
    inputRegexp: {
      type: RegExp,
      default: null,
    },
    // input 输入错误提示
    inputErrorMessage: {
      type: String,
      default: "输入错误",
    },
  },
  data() {
    return {
      title: "", // 消息标题
      content: "", // 消息内容
      inputValue: "", // 输入框内容
      inputError: false, // 是否展示输入框错误提示
    };
  },
  computed: {
    icon() {
      const { type, iconClass } = this;
      return iconClass || (type && TYPE_CLASSES_MAP[type] ? `k-message-box__status--${type} k-icon-${TYPE_CLASSES_MAP[type]}` : "");
    },
    cancelBtnText() {
      if (typeof this.cancelButtonText === "string") {
        return this.cancelButtonText;
      }
      return "取消";
    },
    confirmBtnText() {
      if (typeof this.confirmButtonText === "string") {
        return this.confirmButtonText;
      }
      return "确认";
    },
  },
  watch: {
    visible(val) {
      if (val) {
        const dom = this.$el;
        PopupManager.openModal(this._msgId, PopupManager.nextZIndex(), null, null, true);
        dom.style.zIndex = PopupManager.nextZIndex();
        if (this.lockScroll) {
          const body = document.querySelector("body");
          addClass(body, "k-popup-parent--hidden");
        }
      } else {
        PopupManager.closeModal(this._msgId);
      }
    },
    inputValue(val) {
      if (val && this.type === "$prompt") {
        this.isValidate();
      }
    },
  },
  beforeMount() {
    /* eslint-disable */
    this._msgId = `dialog-${idSeed++}`;
    /* eslint-disable-end */
    PopupManager.register(this._msgId, this);
  },
  mounted() {
  },
  methods: {
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      if (this.lockScroll) {
        const body = document.querySelector('body');
        removeClass(body, "k-popup-parent--hidden");
      }
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
        this.$nextTick(() => {
          // 关闭初始化变量
          // todo 此处过于粗暴和丑陋，需要思考优化方法
          if (this.type === "$prompt") {
            this.inputValue = "";
            this.inputError = false;
            this.inputErrorMessage = "";
          }
        });
      });
    },
    handleAction(action) {
      if (this.type === "$prompt" && action === "confirm" && !this.isValidate()) return;
      this.action = action;
      if (typeof this.beforeClose === "function") {
        this.beforeClose(action, this, this.doClose);
      } else {
        this.doClose();
      }
    },
    // 检测 input 输入框是否正确
    isValidate() {
      if (this.type === "$prompt") {
        if (this.inputRegexp && !this.inputRegexp.test(this.inputValue || "")) {
          this.inputError = true;
          return false;
        }
        this.inputError = false;
      }
      return true;
    },
  },
  beforeDestroy() {
    PopupManager.deregister(this._msgId);
    PopupManager.closeModal(this._msgId);
  },

};
</script>
