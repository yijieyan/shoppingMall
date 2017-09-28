import Http from 'axios';
import {getSessionStorage} from '../assets/util/currency.js'
//请求类
class ApiService {
  constructor() {
    this.interceptorsOfReq();
    this.interceptorsOfRes();
  }

  get(url, params) {
    if(params) {
      // url = `http://localhost:5000${url}`;
      return Http.get(url, {params}).then(res => res.data);
    }
    return Http.get(url).then(res => res.data);
  }

  post(url, params = {}) {
    // url = `http://localhost:5000${url}`;
    return Http.post(url, params).then(res => res.data);
  }

  setDefaultHeader(token) {
    return Http.defaults.headers.common['token'] = token;
  }

  interceptorsOfReq() {
    return Http.interceptors.request.use(
      config => {
        let token = getSessionStorage('shopToken').token;
        if(!config.headers.token && token) {
          config.headers.token = token;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      });
  }

  interceptorsOfRes() {
    Http.interceptors.response.use(function(response) {
      // console.log('响应数据', response.data);
      return response;
    }, function(error) {
      return Promise.reject(error);
    });
  }
}

//导出一个对象
export default new ApiService();
