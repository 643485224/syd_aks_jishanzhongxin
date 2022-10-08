/**
 *  登录相关接口v1.0  -> 业务接口
 */
import {
  http,
  baseURL
} from "../../conf/index-json";
import qs from "qs";
// 通用-验证码-接口
export const captcha = () => {
  return http
    .get(`${baseURL}/captcha`, {
      responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
    })
    .then((res) => res.data);
};
// 运营平台-登录-接口
export const login = (params = {}) => {
  return http
    .post(`${baseURL}/login`, params)
    .then((res) => res.data);
};

// 运营平台-登出-接口
export const logout = () => {
  return http
    .post(`${baseURL}/logout`)
    .then((res) => res.data);
};

// 运营平台-登录用户信息-接口
export const userInfo = (params = {
  name: ''
}) => {
  return http
    .get(`${baseURL}/user/info`, params)
    .then((res) => res.data);
};
// 获取所有的菜单列表(非分页带层级关系用于绑定树形菜单控件)
export const getAllMenuList = (params = { sysType: null}) => {
  return http
    .get(`${baseURL}/sys/menu/getAllMenuList`,{params} )
    .then((res) => res.data);
};

// 通过用户ID查询菜单列表
export const getMenusByUserId = () => {
  return http
    .get(`${baseURL}/sys/menu/getMenusByUserId` )
    .then((res) => {
      console.log(res);
      return res.data;
    });
};

// 采购商-用于采购商登录-接口
export const buyerLogin = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/login`, params)
    .then((res) => res.data);
};
// 供应商-用于供应商登录-接口
export const supplierLogin = (params = {}) => {
  return http
    .post(`${baseURL}/supplier/login`, params)
    .then((res) => res.data);
};


// 通用-用户注册-采购商注册-接口
export const buyerRegister = (params = {}) => {
  return http
    .post(`${baseURL}/buyerRegister`, params)
    .then((res) => res.data);
};

//忘记密码
export const forgetPassword = (params = {}) => {
  return http.post(`${baseURL}/forgetPassword`, params)
    .then((res) => res.data);
};
//通用 - 验证码
export const payCaptcha = (params = {}) => {
  return http.get(`${baseURL}/payCaptcha`,{
    params
  })
    .then((res) => res.data);
}
//忘记密码-修改密码/
export const changePassword = (params = {}) => {
  return http.post(`${baseURL}/changePassword`, params)
    .then((res) => res.data);
};
//忘记密码-修改密码/
export const verify = (params = {}) => {
  return http.post(`${baseURL}/captcha/verify`, params)
    .then((res) => res.data);
};
