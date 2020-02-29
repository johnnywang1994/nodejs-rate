import axios from 'axios';
import utils from '../utils';

const API = '/api';


const api = function(method, svc, data = {}) {
  const url = `${API}/${svc}`;
  const params = method.toUpperCase() === 'GET' ? 'params' : 'data';
  return axios({
    method,
    url,
    [params]: utils.snakifyKeys(data),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }).then((res) => utils.camelizeKeys(res));
};


/** API path starts from /api */
export default {
  getRate() {
    return api('get', 'rate');
  },
  getStock(no) {
    return api('get', 'stock', { no });
  },
  getStockPressure(data) {
    return api('get', 'stock-pressure', data);
  },
  getFirstMoneyNews() {
    return api('get', 'money-news/first');
  },
  getBreakMoneyNews(page) {
    return api('get', `money-news/break/${page}`)
  },
};
