// eslint-disable-next-line import/no-cycle
import Notification from './notification';

let messageInstance;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = '' }) {
  const instance = getMessageInstance();

  instance.add({ content, duration });
}

export default {
  info(options) {
    return notice(options);
  },
};
