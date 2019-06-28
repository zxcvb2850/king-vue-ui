import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Notify from './components/notification';
import KUI from './components/index';

import './theme/index.less';

Vue.config.productionTip = false;

Vue.prototype.$notify = Notify;

Vue.use(KUI);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
