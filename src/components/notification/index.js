// eslint-disable-next-line import/no-cycle
import Notification from './notification';

let messageInstance;

function getMessageInstance() {
  // 此处为单例模式，再次调用，如果存在则无需调用
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = '' }) {
  const instance = getMessageInstance();
  // eslint-disable-next-line no-undef
  // console.log(args);

  instance.add({ content, duration });
}

export default {
  info(options) {
    if (typeof options === 'string') {
      // eslint-disable-next-line no-param-reassign
      options = {
        content: options,
      };
    }
    return notice(options);
  },
};
