import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { App },
  strict: process.env.NODE_ENV !== 'production',
});
