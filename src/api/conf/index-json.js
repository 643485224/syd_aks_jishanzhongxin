/**
 * 平台模式下接口
 * 业务走json -> (params)
 */
import Vue from "vue";
import axios from "axios";
import store from '../../store'
import {
  Message
} from 'element-ui'
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Message)

// 创建自定义接口服务实例
export const http = axios.create({
  timeout: 20000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/vnd.ms-excel',
  // },
});

// 当 npm run serve (开发环境)时，process.env.NODE_ENV的值为development
// 当 npm run test  (测试环境)时，process.env.NODE_ENV的值为test （需在scripts手动添加test）
// 当 npm run build (线上环境)时，process.env.NODE_ENV的值为production

export const baseURL = Object.is(process.env.NODE_ENV, "production") ?
  "/prod-api" :
  "/api"; //走开发环境代理

// 请求拦截器
http.interceptors.request.use(

  (config) => {
    // 性能优化-路由跳转的时候清空上一次页面的所有请求
    config.cancelToken = new axios.CancelToken(cancel => {
      window._axiosPromiseArr.push({
        cancel
      })
    })
    config.headers['Authorization'] = store.state.vuex_token.tokenHead + store.state.vuex_token.token
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截器
http.interceptors.response.use(
  (data) => {
    // 响应成功关闭loading
    // Spin.hide();
    let res = data.data;
    if (data.status == 200) {
      if (res.code == 401) { //后台返回状态401 默认重新登录
        // 清楚本地存储,重置路由，前往登录页
        Message({
          message: res.message,
          type: 'error'
        })
        // 清楚本地存储,重置路由
        setTimeout(() => {
          localStorage.clear();
          window.location.href = `${location.origin}/#/login`;
        }, 500);
      }
    }
    return data;
  },
  (error) => {
    if (String(error).indexOf("timeout") !== -1) {
      return Message({
        message: '连接超时',
        type: 'error'
      })

    }
    if (error && error.response) {
      switch (
        error.response.status // 跨域存在获取不到状态码的情况
      ) {
        case 400:
          Message({
            message: '错误请求(400)',
            type: 'error'
          })
          break;
        case 401:
          Message({
            message: '未授权,请重新登录(401)',
            type: 'error'
          })
          break;
        case 403:
          Message({
            message: '拒绝访问(403)',
            type: 'error'
          })
          break;
        case 404:
          Message({
            message: '请求错误,未找到该资源(404)',
            type: 'error'
          })
          break;
        case 405:
          Message({
            message: '错误请求(405)',
            type: 'error'
          })
          break;
        case 408:
          Message({
            message: '请求超时(408)',
            type: 'error'
          })
          break;
        case 500:
          Message({
            message: '服务器错误(500)',
            type: 'error'
          })

          break;
        case 501:
          Message({
            message: '服务未实现(501)',
            type: 'error'
          })
          break;
        case 502:
          Message({
            message: '网络错误(502)',
            type: 'error'
          })
          break;
        case 503:
          Message({
            message: '服务不可用(503)',
            type: 'error'
          })
          break;
        case 504:
          Message({
            message: '网络超时(504)',
            type: 'error'
          })
          break;
        case 505:
          Message({
            message: 'HTTP版本不受支持(505)',
            type: 'error'
          })
          break;
        default:
          Message({
            message: '网络出现问题,请稍后再试',
            type: 'error'
          })
          break;
      }
    }
    if (error && error.response && error && error.response.data && error.response.data.code == 401) {
      Message({
        message: error.response.data.message,
        type: 'error'
      });
      // 清楚本地存储,重置路由
      setTimeout(() => {
        localStorage.clear();
        window.location.href = `${location.origin}/#/login`;
      }, 500);
    }

    return Promise.reject(error);
  }
);
