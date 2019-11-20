import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewHome from './views/Home.vue';
import DollarRate from './views/DollarRate.vue';
import Stock from './views/Stock.vue';
import MoneyNews from './views/MoneyNews.vue';
// import GitbookEditor from './views/GitbookEditor.vue';
import Error404 from './views/Error-404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewHome
  },
  {
    path: '/rate',
    name: 'rate',
    component: DollarRate
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock
  },
  {
    path: '/money-news',
    name: 'money-news',
    component: MoneyNews
  },
  // {
  //   path: '/gitbook-editor',
  //   name: 'gitbook-editor',
  //   component: GitbookEditor
  // },
  {
    path: '*',
    name: 'Error-404',
    component: Error404
  }
]

export default new VueRouter({
  // mode: 'history',
  routes,
});
