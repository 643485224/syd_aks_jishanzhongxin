/**
 *  监管平台相关接口v1.0  -> 业务接口 （需要权限）
 */
import {
  http,
  baseURL
} from "@/api/conf/index-json";
import qs from 'qs'


// 监管平台====================>药品
// 查询订单详情
export const superviseDrugManageGetOrderDetail = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/getOrderDetail?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 查询订单物流
export const superviseDrugManageGetOrderLogistics = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/getOrderLogistics?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 获取药品分类
export const superviseDrugManageSelect = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/select`)
    .then(res => res.data)
}
// 获取企业信息
export const superviseDrugManageSelectCompanyInfo = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/selectCompanyInfo`, {
      params
    })
    .then(res => res.data)
}
// 获取药品列表
export const superviseDrugManageSelectDrugList = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/selectDrugList?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 查询药品关联订单
export const superviseDrugManageSelectOrderByDrug = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-drug-manage/selectOrderByDrug?${qs.stringify(params)}`)
    .then(res => res.data)
}


// 监管平台====================>药械
// 查询订单详情
export const superviseApparatusManageGetOrderDetail = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/getOrderDetail?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 查询订单物流
export const superviseApparatusManageGetOrderLogistics = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/getOrderLogistics?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 获取药械分类
export const superviseApparatusManageSelect = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/select`)
    .then(res => res.data)
}
// 获取药械列表
export const superviseApparatusManageSelectApparatusList = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/selectApparatusList?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 获取企业信息
export const superviseApparatusManageSelectCompanyInfo = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/selectCompanyInfo`, {
      params
    })
    .then(res => res.data)
}
// 查询药械关联订单
export const superviseApparatusManageSelectOrderByApparatus = (params = {}) => {
  return http
    .get(`${baseURL}/supervise-apparatus-manage/selectOrderByApparatus?${qs.stringify(params)}`)
    .then(res => res.data)
}


// 监管平台====================>企业
///企业商品汇总信息
export const genterpriseGoodsSumInfo = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/enterpriseGoodsSumInfo`, {
      params
    })
    .then(res => res.data)
}
// 查看企业资质
export const getEnterpriseAnnex = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/getEnterpriseAnnex`, {
      params
    })
    .then(res => res.data)
}
//搜索企业药品/药械信息
export const getEnterpriseGoodsInfo = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/getEnterpriseGoodsInfo?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 获取企业信息
export const superviseEnterpriseGetEnterpriseInfo = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/getEnterpriseInfo`, {
      params
    })
    .then(res => res.data)
}
//获取企业列表
export const getEnterprisePage = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/getEnterprisePage`, {
      params
    })
    .then(res => res.data)
}
// 查看企业简介
export const getEnterpriseProfile = (params = {}) => {
  return http
    .get(`${baseURL}/superviseEnterprise/getEnterpriseProfile`, {
      params
    })
    .then(res => res.data)
}
