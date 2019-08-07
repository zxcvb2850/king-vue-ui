import Vue from "vue";
import KingUI from "KingUI";
import Checkbox from "KingUI/components/checkbox";
import Input from "KingUI/components/input";
import Table from "KingUI/components/table";
import Dialog from "KingUI/components/dialog";
import Icon from "KingUI/components/icon";
import App from "./src/App.vue";
import "KingUI/theme/index.less";

Vue.use(KingUI);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(Dialog.name, Dialog);
Vue.component(Icon.name, Icon);

console.log(KingUI);

new Vue({
  render: h => h(App),
}).$mount("#app");
