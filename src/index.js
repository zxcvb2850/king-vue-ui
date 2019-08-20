import Alert from "./components/alert";
import Message from "./components/message";
import Form from "./components/form";
import FormItem from "./components/form-item";
import Button from "./components/button";
import Input from "./components/input";
import Icon from "./components/icon";
import Dialog from "./components/dialog";

const components = [
  Alert,
  Form,
  FormItem,
  Button,
  Input,
  Icon,
  Dialog,
];

const install = (Vue) => {
  if (install.installed) return;

  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.Message = Message;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // version: process.env.VERSION,
  install,
  ...components,
};
