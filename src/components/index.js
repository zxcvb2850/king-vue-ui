import Alert from './alert';
import Message from './message';
import Form from './form';
import FormItem from './formItem';

const components = [
  Alert,
  Form,
  FormItem,
];

const install = (Vue, options = {}) => {
  if (install.installed) return;

  components.forEach((component) => {
    Vue.component(component.name, component);
  })

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$message = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION,
  install,
  ...components,
};
