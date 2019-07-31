import Vue from "vue";
import KingUI from "KingUI";
import Checkbox from "KingUI/components/checkbox";
import Table from "KingUI/components/Table";
import Dialog from "KingUI/components/Dialog";
import App from "./src/App.vue";
import "KingUI/theme/index.less";

Vue.use(KingUI);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Table.name, Table);
Vue.component(Dialog.name, Dialog);

console.log(KingUI);

new Vue({
  render: h => h(App),
}).$mount("#app");
