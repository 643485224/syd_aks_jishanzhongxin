/**
 *  中心商城相关接口v1.0
 */
import {
  http,
  baseURL
} from "@/api/conf/index-json";
import qs from "qs";


// 中心商城 => 获取中心商城分类
export const getSaleCategoryMenuLevel = () => {
  return http.get(`${baseURL}/centerMall/getSaleCategoryMenuLevel`).then(res => res.data)
};


// 中心商城 => 获取中心商城药品列表
export const getDrugList = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getDrugList`, {
    params
  }).then(res => res.data)
};

// 中心商城 => 获取中心商城药械列表
export const getApparatusList = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getApparatusList`, {
    params
  }).then(res => res.data)
};
// 中心商城 => 获取中心商城美食列表
export const getFoodList = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getFoodList`, {
    params
  }).then(res => res.data)
};


// 中心商城 => 药品详情
export const getDrugDetail = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getDrugDetail`, {
    params
  }).then(res => res.data)
};

// 中心商城 => 药械详情
export const getApparatusDetail = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getApparatusDetail`, {
    params
  }).then(res => res.data)
};

// 中心商城 => 美食详情
export const getFoodsDetail = (params) => {
  return http.get(`${baseURL}/centerMall/getFoodInfo`,{
    params
  }).then(res => res.data)
};
//中心商城关注店铺
export const getaddShop = (supplierId) => {
  return http.post(`${baseURL}/centerMall/addShop/${supplierId}`,).then(res => res.data)
};
//中心商城取消关注店铺
export const getCancelShop = (shopId) => {
  return http.post(`${baseURL}/centerMall/cancelShop/${shopId}`,).then(res => res.data)
};

// 中心商城 => 获取商城搜索条件（品牌、厂家、型号、规格）
export const centerMallGetSearchCondition = (params = {}) => {
  return http.get(`${baseURL}/centerMall/getSearchCondition?keyword=${params}`).then(res => res.data)
};

// 中心商城 => 中心商城搜索商品
export const centerMallSearchGoods = (params = {}) => {
  return http
    .post(`${baseURL}/centerMall/searchGoods`, params)
    .then(res => res.data)
}

// 中心商城 => 中心商城立即购买
export const centerMallShopNow = (params = {}) => {
  return http
    .get(`${baseURL}/centerMall/shopNow?${qs.stringify(params)}`)
    .then(res => res.data)
}

// 改变商品数量
export const changeGoodsQuantity = (params = {}) => {
  return http
    .post(`${baseURL}/centerMall/changeGoodsQuantity`, params)
    .then(res => res.data)
};


// 添加关联药品列表查询
export const centerMallAddAssociatedDrugList = (params = {}) => {
  return http
    .post(`${baseURL}/centerMall/addAssociatedDrug`, params)
    .then(res => res.data)
};
