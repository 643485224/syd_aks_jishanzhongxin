/**
 *  商城平台相关接口v1.0  -> 业务接口 （不需要权限）
 */
import {
  http,
  baseURL
} from "../../conf/index-json-webpage";
import qs from "qs";


// 通过信息ID查询通知公告详情列表- 接口
export const infomationGetAnnouncementById = (params = {}) => {
  return http.get(`${baseURL}/infomation/getAnnouncementById/${params}`).then(res => res.data)
};
// 通过信息ID查询政策法规详情列表- 接口
export const infomationGetPoliciesById = (params = {}) => {
  return http.get(`${baseURL}/infomation/getPoliciesById/${params}`).then(res => res.data)
};
// 通过标题查询信息表中政策法规分页列表信息 （4 国家政策 5 地方政策 6 交易规则）-接口
export const infomationPagePoliciesList = (params = {}) => {
  return http.get(`${baseURL}/infomation/pagePoliciesList`, {
    params
  }).then(res => res.data)
};
// 通过标题查询信息表中通知公告分页列表信息（1 通知公告 2 中标公告 3 招标公告）-接口
export const infomationPolicyList = (params = {}) => {
  return http.get(`${baseURL}/infomation/policyList`, {
    params
  }).then(res => res.data)
};

// 药品销售top20 /*mall_category = 1:3 抗新冠药物目录:药品目录*/-接口
export const mallHomepageGetDrugSalesList = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getDrugSalesList/${params}`).then(res => res.data)
};
// 器械销售top20 /*mall_category = 2:4 抗新冠器械目录:器械目录*/-接口
export const mallHomepageGetEquipmentSales = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getEquipmentSales/${params}`).then(res => res.data)
};
// 获取阿克苏地区名-接口
export const mallHomepageGetLocation = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getLocation`, {
    params
  }).then(res => res.data)
};
// 会员分布信息-接口
export const mallHomepageGetMemberInfo = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getMemberInfo/${params}`).then(res => res.data)
};
// 月度金牌企业信息-接口
export const mallHomepageGetPessGoldInfo = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getPessGoldInfo`, {
    params
  }).then(res => res.data)
};
// 商品概览信息-接口
export const mallHomepageGetProductOverviewInfo = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getProductOverviewInfo`, {
    params
  }).then(res => res.data)
};
// 资源整合-接口
export const mallHomepageGetResourceIntegration = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/getResourceIntegration/${params}`, ).then(res => res.data)
};
// 查询采购商表中会员目录分页列表信息-接口
export const mallHomepagePageAnnouncementList = (params = {}) => {
  return http.get(`${baseURL}/mallHomepage/pageAnnouncementList`, {
    params
  }).then(res => res.data)
};
// 查询首页top信息-接口
export const reportStatHzOrderGetReportStatHzOrder = (params = {}) => {
  return http.get(`${baseURL}/reportStatHzOrder/getReportStatHzOrder`, {
    params
  }).then(res => res.data)
};
// 查询信息表中国家部委列表信息-接口
export const blogrollCadreList = (params = {}) => {
  return http.get(`${baseURL}/blogroll/cadreList`, {
    params
  }).then(res => res.data)
};
// 通过信息ID查询友情链接详情列表-接口
export const blogrollGetBlogrollById = (params = {}) => {
  return http.get(`${baseURL}/blogroll/getBlogrollById/${params}`).then(res => res.data)
};
// 查询信息表中县政府列表信息-接口
export const blogrollGovernmentList = (params = {}) => {
  return http.get(`${baseURL}/blogroll/governmentList`, {
    params
  }).then(res => res.data)
};
// 查询信息表中本地网站列表信息-接口
export const blogrollWebsiteList = (params = {}) => {
  return http.get(`${baseURL}/blogroll/websiteList`, {
    params
  }).then(res => res.data)
};
// 通过信息ID查询政策法规详情列表-接口
export const policiesGetPoliciesById = (params = {}) => {
  return http.get(`${baseURL}/policies/getPoliciesById`, {
    params
  }).then(res => res.data)
};
// 查询信息表中政策法规分页列表信息（4 国家政策 5 地方政策 6 交易规则）-接口
export const policiesPagePoliciesList = (params = {}) => {
  return http.get(`${baseURL}/policies/pagePoliciesList`, {
    params
  }).then(res => res.data)
};
// 通过信息ID查询通知公告详情列表-接口
export const announcementGetAnnouncementById = (params = {}) => {
  return http.get(`${baseURL}/announcement/getAnnouncementById/${params}`).then(res => res.data)
};
// 查询信息表中通知公告分页列表信息（ 1 通知公告 2 中标公告 3 招标公告）-接口
export const announcementPageAnnouncementList = (params = {}) => {
  return http.get(`${baseURL}/announcement/pageAnnouncementList`, {
    params
  }).then(res => res.data)
};














