/**
 *  个人中心相关接口v1.0  -> 业务接口 （需要权限）
 */
import {
  http,
  baseURL
} from "@/api/conf/index-json";
import qs from 'qs'
// 药械采购清单
export const buyer_coreApparatusDetailedList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer-core/apparatusDetailedList`)
    .then(res => res.data)
}
// 药品采购清单
export const buyer_coreDuugDetailedList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer-core/duugDetailedList`)
    .then(res => res.data)
}
// 常购清单
export const buyer_coreFrequentlyPurchased = (params = {}) => {
  return http
    .get(`${baseURL}/buyer-core/frequentlyPurchased?top=${params}`)
    .then(res => res.data)
}
// 读取集散中心企业
export const buyer_coreGetSupplierTopN = (params = {}) => {
  return http
    .get(`${baseURL}/buyer-core/getSupplierTopN?top=${params}`)
    .then(res => res.data)
}
// 我的钱包
export const buyer_coreWallet = (params = {}) => {
  return http
    .get(`${baseURL}/buyer-core/wallet`)
    .then(res => res.data)
}
