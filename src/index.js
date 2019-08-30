import Alert from "./components/alert";
import Message from "./components/message";
import Form from "./components/form";
import FormItem from "./components/form-item";
import Checkbox from "./components/checkbox";
import CheckboxGroup from "./components/checkbox-group";
import Radio from "./components/radio";
import RadioGroup from "./components/radio-group";
import Button from "./components/button";
import Input from "./components/input";
import Icon from "./components/icon";
import Dialog from "./components/dialog";
import Table from "./components/table";

const components = [
  Alert,
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Button,
  Input,
  Icon,
  Dialog,
  Table,
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
  version: "0.0.1",
  install,
  ...components,
};
