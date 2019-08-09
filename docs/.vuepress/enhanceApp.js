import Vue from "vue";
import KingUI from "../../src/";
import "../../dist/style/index.css";

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(KingUI)
}
