// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import store from './vuex/store';
import './assets/css/normalize.css';
import infiniteScroll from  'vue-infinite-scroll';
import './assets/css/base.css';
import './assets/css/product.css';
import './assets/css/checkout.css'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(infiniteScroll);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
