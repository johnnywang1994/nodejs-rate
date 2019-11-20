import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'simplemde/dist/simplemde.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
