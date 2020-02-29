import services from '../services';


const $_state = {
};


const $_getters = {
};


// const UPDATE_PROFILE = 'UPDATE_PROFILE';


const $_actions = {
  async getRate() {
    const res = await services.getRate();
    return res;
  },
  async getStock(context, no) {
    const res = await services.getStock(no);
    return res;
  },
  async getFirstMoneyNews() {
    const res = await services.getFirstMoneyNews();
    return res;
  },
  async getBreakMoneyNews(context, page) {
    const res = await services.getBreakMoneyNews(page);
    return res;
  },
};


const $_mutations = {
};


export default {
  namespaced: true,
  state: $_state,
  getters: $_getters,
  actions: $_actions,
  mutations: $_mutations,
};
