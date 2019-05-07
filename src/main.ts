import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/store';
import '@/assets/css/common.css';

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import '@/assets/css/cover.css'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
