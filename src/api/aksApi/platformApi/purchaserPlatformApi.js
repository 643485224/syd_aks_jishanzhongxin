/**
 *  采购商平台相关接口v1.0  -> 业务接口 （需要权限）
 */
import {
  http,
  baseURL
} from "@/api/conf/index-json";
import qs from 'qs'

// 通用文件上传-上传图片
export const uploadImage = (params = {}) => {
  return http
    .post(`${baseURL}/upload-image`, params)
    .then(res => res.data)
};

// 始------------------------------------------------采购商-交易管理------------------------------------------------
// 新增集采订单
export const buyerTranManagerAddOrder = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/addOrder`, params)
    .then(res => res.data)
};
// 采购商取消订单
export const buyerTranManagerCancelOrder = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/cancelOrder`, params)
    .then(res => res.data)
}
// 查询订单详情(采购商)
export const buyerTranManagerFindOrderDetail = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/findOrderDetail/${params.id}/${params.orderType}`)
    .then(res => res.data)
}
// 查询交易信息列表(采购商)
export const buyerTranManagerFindTradeInfo = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/findTradeInfo`, {
      params
    })
    .then(res => res.data)
}
// 一键采购
export const purchaseOnekeyBuyer = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/onekeyBuyer`, params)
    .then(res => res.data)
}
// 支付
export const buyerTranManagerPayment = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/payment`, params)
    .then(res => res.data)
}
// 读取采购商余额、信用额度
export const buyerTranManagerReadBuyerBalance = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/readBuyerBalance`, params)
    .then(res => res.data)
}
// 采购商收货
export const buyerTranManagerReceivingOrder = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/receivingOrder`, qs.stringify(params))
    .then(res => res.data)
}
// 采购商申请退货
export const buyerTranManagerReturnOrder = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/returnOrder`, params)
    .then(res => res.data)
}

// 交易订单明细(评价)
export const buyerTranManagerOrderRate = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/orderRate`, params)
    .then(res => res.data)
}
// 退货订单明细(查询)
export const buyerTranManagerReturnOrderList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/returnOrderList`, {
      params
    })
    .then(res => res.data)
}
// 交易订单明细(评价)
export const buyerTranManagerCancelReturnOrder = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/cancelReturnOrder/${params}`)
    .then(res => res.data)
}

// 退货订单明细(详情)
export const buyerTranManagerFindReturnOrderDetail = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/findReturnOrderDetail/${params.id}/${params.orderType}`)
    .then(res => res.data)
}
//  支付验证
export const buyerTranManagerPayValidate = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/tranManager/payValidate`, params)
    .then(res => res.data)
}
// 获取在线支付时间戳
export const buyerTranManagerPayAutoTime = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/payAutoTime`)
    .then(res => res.data)
}
// 在线支付
export const buyerTranManagerOnlinePayment = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/onlinePayment/${params}`)
    .then(res => res.data)
}

// （一键采购）在线支付
export const buyerTranManagerOnlinePayAmount = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/onlinePayAmount${params}`)
    .then(res => res.data)
}
// 订单流程情况
export const buyerTranManagerOrderProcess = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/tranManager/orderProcess/${params}`, )
    .then(res => res.data)
}
// 末------------------------------------------------采购商-交易管理------------------------------------------------





// 始------------------------------------------------采购商-购物车------------------------------------------------
// 新增购物车信息
export const cartAddCartInfo = (params = {}) => {
  return http
    .post(`${baseURL}/cart/addCartInfo`, params)
    .then(res => res.data)
};
// 添加商品
export const cartAddCart = (params = {}) => {
  return http
    .post(`${baseURL}/cart/addCart`, params)
    .then(res => res.data)
};
// 加入采购单
export const cartAddPurchaseOrder = (params = {}) => {
  return http
    .get(`${baseURL}/cart/addPurchaseOrder`, params)
    .then(res => res.data)
};
// 添加商品
export const cartAddGoods = (params = {}) => {
  return http
    .get(`${baseURL}/cart/addGoods?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 获取采购单详情（器械）
export const cartGetApparatusPurchaseOrderDetails = (params = {}) => {
  return http
    .get(`${baseURL}/cart/getApparatusPurchaseOrderDetails`, params)
    .then(res => res.data)
};

// 获取采购单详情（药品）
export const cartGetDrugPurchaseOrderDetails = (params = {}) => {
  return http
    .get(`${baseURL}/cart/getDrugPurchaseOrderDetails`, params)
    .then(res => res.data)
};

// 获取购物车列表
export const cartGetShopCarPage = (params = {}) => {
  return http
    .get(`${baseURL}/cart/getShopCartPage?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 批量删除购物车信息
export const cartBatchDelCart = (params = {}) => {
  return http
    .delete(`${baseURL}/cart/batchDelCart${params}`)
    .then(res => res.data)
};

// 删除购物车商品
export const cartDelCart = (cartId, goodsId) => {
  return http
    .delete(`${baseURL}/cart/delCart/${cartId}/${goodsId}`)
    .then(res => res.data)
};

// 购物车商品加入关注
export const cartFollow = (goodsType, goodsId) => {
  return http
    .post(`${baseURL}/cart/follow?goodsType=${goodsType}&goodsId=${goodsId}`)
    .then(res => res.data)
};
// 购物车 => 取消关注
export const cancelFollow = (goodsType,goodsId) => {
  return http
    .post(`${baseURL}/cart/cancelFollow?goodsType=${goodsType}&goodsId=${goodsId}`)
    .then(res => res.data)
}


// 一键采购
export const cartOneKeyBuy = ({
  cartId,
  goodsType,
  goodsIds
}) => {
  let listStr = goodsIds.map(item => 'goodsIds=' + item).join('&')
  return http
    .get(`${baseURL}/cart/oneKeyBuy?cartId=${cartId}&goodsType=${goodsType}&${listStr}`)
    .then(res => res.data)
};
// 改变购物车商品数量
export const cartChangeCartQuantity = (params = {}) => {
  return http
    .post(`${baseURL}/cart/changeCartQuantity`, params)
    .then(res => res.data)
};

// 末------------------------------------------------采购商-购物车------------------------------------------------





// 始------------------------------------------------采购商-采购单------------------------------------------------

// 批量审核通过
export const purchaseBatchPass = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/batchPass${params}`)
    .then(res => res.data)
};
// 批量审核拒绝
export const purchaseBatchReset = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/batchReset${params}`)
    .then(res => res.data)
};
// 查询待审核采购信息
export const purchaseCheckPending = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/checkPending`, params)
    .then(res => res.data)
};
// 查询采购登记信息
export const purchaseFindBuyerRegister = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/findBuyerRegister?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 采购登机详情
export const purchaseGetBuyerRegisterDetails = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/getBuyerRegisterDetails?${qs.stringify(params)}`)
    .then(res => res.data)
}

// 获取采购单详情
export const purchaseGetPurchaseOrderDetails = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/getPurchaseOrderDetails?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 采购登记（删除）-接口
export const purchaseDelBuyerRegister = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/delBuyerRegister/${params}`, )
    .then(res => res.data)
}
// 采购登记（禁用）-接口
export const purchaseDisabledBuyerRegister = (params = {}) => {
  return http
    .post(`${baseURL}purchase/disabledBuyerRegister/${params}`, )
    .then(res => res.data)
}

// 获取我的采购单列表
export const purchaseGetPurchasePage = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/getPurchasePage?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 新增采购登记信息
export const purchaseAddBuyerRegister = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/addBuyerRegister`, params)
    .then(res => res.data)
};
// 导入商品明细信息
export const purchaseImportPurchase = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/importPurchase`, params)
    .then(res => res.data)
};
// 编辑采购登记信息
export const purchaseModifyBuyerRegister = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/modifyBuyerRegister`, params)
    .then(res => res.data)
};
// 修改我的采购单
export const purchaseModifyPurchaseOrder = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/modifyPurchaseOrder`, params)
    .then(res => res.data)
};
// 采购审核查询
export const purchaseProcurementAuditEnquiry = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/procurementAuditEnquiry?${qs.stringify(params)}`)
    .then(res => res.data)
}
// 采购管理详情
export const purchaseProcurementManagementDetails = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/procurementManagementDetails`, params)
    .then(res => res.data)
}
// 提交采购单
export const purchaseSubmitPurchaseOrder = (params = {}) => {
  return http
    .post(`${baseURL}/purchase/submitPurchaseOrder`, params)
    .then(res => res.data)
};

// 查询审核记录
export const purchaseGetAuditLogging = (params = {}) => {
  return http
    .get(`${baseURL}/purchase/getAuditLogging?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 末------------------------------------------------采购商-采购单------------------------------------------------


// 始------------------------------------------------采购商-供应商管理------------------------------------------------
// 新增供应商列表
export const buyerAddSupplier = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/addSupplier`, params)
    .then(res => res.data)
};
// 新增供应商分组
export const buyerAddSupplierGroup = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/addSupplierGroup`, params)
    .then(res => res.data)
};
// 删除供应商分组
export const buyerDelSupplierGroup = (params = {}) => {
  return http
    .delete(`${baseURL}/buyer/delSupplierGroup/${params}`)
    .then(res => res.data)
};
// 获取供货商列表
export const buyerFindSupplierPage = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/findSupplierPage?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 查询平台注册供应商列表
export const buyerFindSupplierList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/findSupplierList?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 获取采购商关联供货商详情
export const buyerGetSupplierDetails = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/getSupplierDetails/${params}`)
    .then(res => res.data)
};
// 获取供应商分组列表
export const buyerGetSupplierGroupList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/getSupplierGroupList?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 获取供应商分组里面供应商列表
export const buyerGetSupplierList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/getSupplierList?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 更新供应商列表
export const buyerModifySupplier = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/modifySupplier`, params)
    .then(res => res.data)
};
// 更新供应商分组
export const buyerModifySupplierGroup = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/modifySupplierGroup`, params)
    .then(res => res.data)
};
// 末------------------------------------------------采购商-供应商管理------------------------------------------------


// 始------------------------------------------------采购商-发票管理------------------------------------------------
// 收票
export const buyerInvoiceBillToOperation = (params = {}) => {
  return http
    .put(`${baseURL}/buyerInvoice/billToOperation`, params)
    .then(res => res.data)
};
// 获取发票列表
export const buyerInvoiceFindInvoiceList = (params = {}) => {
  return http
    .get(`${baseURL}/buyerInvoice/findInvoiceList?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 获取发票详情
export const buyerInvoiceGetInvoiceDetails = (params = {}) => {
  return http
    .get(`${baseURL}/buyerInvoice/getInvoiceDetails?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 末------------------------------------------------采购商-发票管理------------------------------------------------

// 始------------------------------------------------采购商-采购商信息------------------------------------------------
// 获取年度采购趋势信息
export const buyerBuyerHomePageGetAnnualPurTrend = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/buyerHomePage/getAnnualPurTrend?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 获取平台近30天器械排行前20
export const buyerBuyerHomePageGetApparatus30Top20 = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/buyerHomePage/getApparatus30Top20?`)
    .then(res => res.data)
};
// 获取平台近30天药品排行前20
export const buyerBuyerHomePageGetDrug30Top20 = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/buyerHomePage/getDrug30Top20?`)
    .then(res => res.data)
};
// 获取采购商统计信息
export const buyerBuyerHomePageGetStats = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/buyerHomePage/getStats?`, )
    .then(res => res.data)
};
// 末------------------------------------------------采购商-采购商信息------------------------------------------------



// 始------------------------------------------------通用-验证码------------------------------------------------
// 获取支付验证码
export const payCaptcha = (params = {}) => {
  return http
    .get(`${baseURL}/payCaptcha?`, )
    .then(res => res.data)
};
// 末------------------------------------------------通用-验证码------------------------------------------------



// 始------------------------------------------------采购商-账号管理------------------------------------------------
// 完善企业信息
export const buyerAccountManageCompleteBuyerInfo = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/completeBuyerInfo`, params)
    .then(res => res.data)
};
// 获取企业信息
export const buyerAccountManageGetBuyer = (params = {}) => {
  return http
    .get(`${baseURL}/buyerAccountManage/getBuyer`)
    .then(res => res.data)
};
// 获取当前账号手机号
export const buyerAccountManageGetUserAndPhone = (params = {}) => {
  return http
    .get(`${baseURL}/buyerAccountManage/getUserAndPhone`, )
    .then(res => res.data)
};
// 更新企业信息
export const buyerAccountManageModifyBuyerInfo = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/modifyBuyerInfo`, params)
    .then(res => res.data)
};


// 设置支付密码
export const buyerAccountManageSetPayPwd = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/setPayPwd`, params)
    .then(res => res.data)
};
// 修改支付密码
export const buyerAccountManageUpdatePayPwd = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/updatePayPwd`, params)
    .then(res => res.data)
};
// 修改账号信息
export const buyerAccountManageUpdateAccount = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/updateAccount`, params)
    .then(res => res.data)
};
// 修改手机号
export const buyerAccountManageUpdatePhone = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAccountManage/updatePhone`, params)
    .then(res => res.data)
};
// 末------------------------------------------------采购商-账号管理------------------------------------------------



// 始------------------------------------------------采购商-结算中心------------------------------------------------
// 信用付头
export const settlementCreditToPay = (params = {}) => {
  return http
    .get(`${baseURL}/settlement/creditToPay`, params)
    .then(res => res.data)
};
///信用付列表
export const getloanPage = (params = {}) => {
  return http
    .get(`${baseURL}/settlement/loanPage`, {
      params
    })
    .then(res => res.data)
};
// 读取待支付订单列表
export const settlementGetNoPaymentOrderList = (params = {}) => {
  return http
    .get(`${baseURL}/settlement/getNoPaymentOrderList?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 读取结算首页统计信息
export const settlementGetStatInfo = (params = {}) => {
  return http
    .get(`${baseURL}/settlement/getStatInfo?${qs.stringify(params)}`)
    .then(res => res.data)
};
// 结算中心支付
export const settlementPayment = (params = {}) => {
  return http
    .post(`${baseURL}/settlement/payment`, params)
    .then(res => res.data)
};
// 设置支付密码
export const settlementSetPayPwd = (params = {}) => {
  return http
    .post(`${baseURL}/settlement/setPayPwd`, params)
    .then(res => res.data)
};
// 采购商充值
export const settlementTopUp = (params = {}) => {
  return http
    .post(`${baseURL}/settlement/topUp`, params)
    .then(res => res.data)
};
// 采购商提现
export const settlementWithdrawDeposit = (params = {}) => {
  return http
    .post(`${baseURL}/settlement/withdrawDeposit`, params)
    .then(res => res.data)
};

// 末------------------------------------------------采购商-结算中心------------------------------------------------


// 始------------------------------------------------采购商-收货地址管理------------------------------------------------
// 新增采购商地址
export const buyerAddressAddAddress = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAddress/addAddress`, params)
    .then(res => res.data)
};
// 删除采购商地址
export const buyerAddressDelAddress = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAddress/delAddress/${params}`)
    .then(res => res.data)
};
// 编辑采购商地址
export const buyerAddressEditAddress = (params = {}) => {
  return http
    .post(`${baseURL}/buyerAddress/editAddress`, params)
    .then(res => res.data)
};
// 获取采购商默认地址列表
export const buyerAddressGetAddressList = (params = {}) => {
  return http
    .get(`${baseURL}/buyerAddress/getAddressList`, params)
    .then(res => res.data)
};

// 获取采购商默认地址
export const buyerAddressGetDefaultAddress = (params = {}) => {
  return http
    .get(`${baseURL}/buyerAddress/getDefaultAddress`, params)
    .then(res => res.data)
};
// 设置采购商默认地址
export const buyerAddressSetDefaultAddress = (params = {}) => {
  return http
    .get(`${baseURL}/buyerAddress/setDefaultAddress/${params}`)
    .then(res => res.data)
};
// 末------------------------------------------------采购商-收货地址管理------------------------------------------------

// 始------------------------------------------------通用-文件下载------------------------------------------------
// 采购单-商品明细模板下载
export const download = (params = {}) => {
  return http
    .post(`${baseURL}/download`, params)
    .then(res => res.data)
};
// 末------------------------------------------------通用-文件下载------------------------------------------------


// 始------------------------------------------------采购商-结算中心-银行卡管理------------------------------------------------
// 添加银行卡
export const buyerBankCardAddBuyerBankCard = (params = {}) => {
  return http
    .post(`${baseURL}/buyerBankCard/addBuyerBankCard`, params)
    .then(res => res.data)
};
// 删除银行卡号
export const buyerBankCardDelBuyerBankCard = (params = {}) => {
  return http
    .delete(`${baseURL}/buyerBankCard/delBuyerBankCard/${params}`, )
    .then(res => res.data)
};
// 获取所有银行卡号
export const buyerBankCardGetBuyerBankCard = (params = {}) => {
  return http
    .get(`${baseURL}/buyerBankCard/getBuyerBankCard`, params)
    .then(res => res.data)
};
// 修改银行卡
export const buyerBankCardModifyBuyerBankCard = (params = {}) => {
  return http
    .post(`${baseURL}/buyerBankCard/modifyBuyerBankCard`, params)
    .then(res => res.data)
};

// 末------------------------------------------------采购商-结算中心-银行卡管理------------------------------------------------
