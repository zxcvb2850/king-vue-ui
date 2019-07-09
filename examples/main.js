import Vue from "vue";
import KingUI from "KingUI";
import Checkbox from "KingUI/components/checkbox";
import App from "./src/App.vue";
import "KingUI/theme/index.less";

Vue.use(KingUI);
Vue.component(Checkbox.name, Checkbox);

console.log(KingUI);

new Vue({
  render: h => h(App),
}).$mount("#app");
