import axios from 'axios';
import QS from 'qs';
import { toast } from 'vant';
import router from '../router';
import store from '../store';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com/';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.production.com/';
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    store.commit('UP_DateAjaxCount', 1);
    return config;
  },
  (error) => {
    store.commit('UP_DateAjaxCount', -1);
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    store.commit('UP_DateAjaxCount', -1);
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    store.commit('UP_DateAjaxCount', -1);
    if (error.response.status) {
      if (error.response.status === 401) {
        router.replace({
          path: '/login'
        });
      } else if (error.response.status === 403) {
        toast({
          message: '登录过期，请重新登录',
          duration: 1000,
          forbidClick: true
        });
        localStorage.removeItem('token');
        store.commit('loginSuccess', null);
        setTimeout(() => {
          router.replace({
            path: '/login'
          });
        }, 1000);
      } else if (error.response.status === 404) {
        toast({
          message: '网络请求不存在',
          duration: 1500,
          forbidClick: true
        });
      } else {
        toast({
          message: error.response.data.message,
          duration: 1500,
          forbidClick: true
        });
      }

      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
