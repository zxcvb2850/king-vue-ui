import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Alert from './components/alert/alert';

Vue.config.productionTip = false;

Vue.prototype.$Alert = Alert;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
