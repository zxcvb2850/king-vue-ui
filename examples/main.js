import Vue from "vue";
import KingUI from "KingUI";
import Alert from "KingUI/components/alert";
import Button from "KingUI/components/button";
import ButtonGroup from "KingUI/components/button-group";
import Checkbox from "KingUI/components/checkbox";
import CheckboxGroup from "KingUI/components/checkbox-group";
import Dialog from "KingUI/components/dialog";
import Form from "KingUI/components/form";
import FormItem from "KingUI/components/form-item";
import Icon from "KingUI/components/icon";
import Input from "KingUI/components/input";
import Radio from "KingUI/components/radio";
import RadioGroup from "KingUI/components/radio-group";
import Table from "KingUI/components/table";
import Tree from "KingUI/components/tree";
import Message from "KingUI/components/message";
import App from "./src/App.vue";
import "KingUI/theme/index.less";

Vue.use(KingUI);
Vue.component(Alert.name, Alert);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Table.name, Table);
Vue.component(Tree.name, Tree);

Vue.prototype.Message = Message;

new Vue({
  render: h => h(App),
}).$mount("#app");
