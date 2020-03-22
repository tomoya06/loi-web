import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

import '@/assets/css/main.css';

Vue.config.productionTip = false;

Vue.prototype.colSm = 8;
Vue.prototype.colMd = 6;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
