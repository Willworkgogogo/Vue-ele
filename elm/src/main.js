// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import VueResource from 'vue-resource';

// components
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

// css
import 'common/stylus/index.styl';

// 全局注册
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

const routes = [
  {path: '/', component: goods},
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

const router = new VueRouter({
  routes,
  'linkActiveClass': 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
