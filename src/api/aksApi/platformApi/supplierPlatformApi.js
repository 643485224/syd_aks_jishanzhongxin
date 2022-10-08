import {
  http,
  baseURL
} from "@/api/conf/index-json";
import Qs from 'qs'


// 首页 => 本年度采购趋势
export const getAnnualPurchasingTrends = (params = {}) => {
  console.log(params);
  return http.get(`${baseURL}/supplier-home-page/getAnnualPurchasingTrends`, { params }).then(res => res.data)
};

// 首页 => 平台近30天器械排行前20
export const getApparatus30Top20 = () => {
  return http.get(`${baseURL}/supplier-home-page/getApparatus30Top20`).then(res => res.data)
}
// 首页 => 本店近30天器械排行前20
export const getApparatus30Top20OurShop = () => {
  return http.get(`${baseURL}/supplier-home-page/getApparatus30Top20OurShop`).then(res => res.data)
}

// 首页 => 平台近30天药品排行前20
export const getDrug30Top20 = () => {
  return http.get(`${baseURL}/supplier-home-page/getDrug30Top20`).then(res => res.data)
}

// 首页 => 本店近30天药品排行前20
export const getDrug30Top20Shop = () => {
  return http.get(`${baseURL}/supplier-home-page/getDrug30Top20OurShop`).then(res => res.data)
}

// 首页 => 统计信息
export const getStatistics = () => {
  return http.get(`${baseURL}/supplier-home-page/getStatistics`).then(res => res.data)
}







// 交易管理 => 订单查询
export const tradeOrderList = (params = {}) => {
  return http.get(`${baseURL}/supplier-transaction-manage/orderQuery`, { params }).then(res => res.data)
};


// 交易管理 => 接单
export const acceptOrder = (params = {}) => {
  return http.post(`${baseURL}/supplier-transaction-manage/acceptOrder?${Qs.stringify(params)}`).then(res => res.data)
};
// 交易管理 => 拒单
export const rejectOrder = (params = {}) => {
  return http.post(`${baseURL}/supplier-transaction-manage/rejectOrder?${Qs.stringify(params)}`).then(res => res.data)
};
// 交易管理 => 发货
export const goodsShipped = (params = {}) => {
  return http.post(`${baseURL}/supplier-transaction-manage/goodsShipped?${Qs.stringify(params)}`).then(res => res.data)
};
// 交易管理 => 退货审核通过
export const returnPass = (params = {}) => {
  return http.post(`${baseURL}/supplier-transaction-manage/returnPass?${Qs.stringify(params)}`).then(res => res.data)
};

// 交易管理 => 订单详情
export const orderInfo = (params = {}) => {
  return http.get(`${baseURL}/supplier-transaction-manage/orderInfo`, { params }).then(res => res.data)
};

// 交易管理 => 订单取消审核
export const orderCancelAudit = (params = {}) => {
  return http.post(`${baseURL}/supplier-transaction-manage/orderCancelAudit`, params).then(res => res.data)
};

// 交易管理 => 销售日报统计
export const getSalesDailyStatistics = (params = {}) => {
  return http.get(`${baseURL}/supplier-transaction-manage/getSalesDailyStatistics`, { params }).then(res => res.data)
};






// 商品管理 => 获取药品列表及新增查询
export const getDrugList = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/getDrugList`, { params }).then(res => res.data)
};

// 商品管理 => 申报
export const declareGoods = (params = {}) => {
  return http.post(`${baseURL}/supplier-goods-manage/declare?${Qs.stringify(params)}`).then(res => res.data)
};

// 商品管理 => 撤回
export const withdraw = (params = {}) => {
  return http.post(`${baseURL}/supplier-goods-manage/withdraw?${Qs.stringify(params)}`).then(res => res.data)
};

// 商品管理 => 上架
export const onShelf = (params = {}) => {
  return http.put(`${baseURL}/supplier-goods-manage/onShelf?${Qs.stringify(params)}`).then(res => res.data)
};

// 商品管理 => 下架
export const offShelf = (params = {}) => {
  return http.put(`${baseURL}/supplier-goods-manage/offShelf?${Qs.stringify(params)}`).then(res => res.data)
};

// 商品管理 => 新增供应商商品及商品库存
export const addSupplierGoods = (params = {}) => {
  return http.post(`${baseURL}/supplier-goods-manage/addSupplierGoods`, params).then(res => res.data)
};


// 商品管理 => 器械列表查询
export const getApparatusList = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/getApparatusList`, { params }).then(res => res.data)
};

// 商品管理 => 器械新增查询
export const getApparatus = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/getApparatus`, { params }).then(res => res.data)
};



// 商品管理 => 新增时查询商品信息进行回显
export const getAddDrugList = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/getAddDrugList`, { params }).then(res => res.data)
};

// 商品管理 => 获取商城分类下拉框
export const getMallClassificationList = () => {
  return http.get(`${baseURL}/supplier-goods-manage/getMallClassificationList`).then(res => res.data)
};



// 商品管理 => 编辑回显
export const editEcho = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/editEcho`, { params }).then(res => res.data)
};

// 商品管理 => 编辑
export const edit = (params = {}) => {
  return http.post(`${baseURL}/supplier-goods-manage/edit`, params).then(res => res.data)
};


// 商品管理=> 药品信息导出
export const drugListExportXls = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/drugListExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};

// 商品管理=> 药械信息导出
export const apparatusListExportXls = (params = {}) => {
  return http.get(`${baseURL}/supplier-goods-manage/apparatusListExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};

// 商品管理=> 批量导入药品返回异常数据
export const importDrugSupplierGoods = (file = {}) => {
  console.log(file);
  return http.post(`${baseURL}/supplier-goods-manage/importDrugSupplierGoods`, file).then(res => res.data)
};
// 商品管理=> 批量导入器械返回异常数据
export const importApparatusSupplierGoods = (file = {}) => {
  console.log(file);
  return http.post(`${baseURL}/supplier-goods-manage/importApparatusSupplierGoods`, file).then(res => res.data)
};


// 商品管理=> 批量导入商品
export const saveSupplierGoods = (list = []) => {
  console.log(list);
  return http.post(`${baseURL}/supplier-goods-manage/saveSupplierGoods`, list).then(res => res.data)
};

// 商品管理=> 商品模板下载
export const downloadGoods = () => {
  return http.post(`${baseURL}/downloadGoods`).then(res => res.data)
};



// 采购商管理 => 获取采购商分组列表
export const getBuyerGroupList = () => {
  return http.get(`${baseURL}/supplier-buyer-manage/getBuyerGroupList`,).then(res => res.data)
};

// 采购商管理 => 获取采购商下拉列表
export const getBuyerList = (params = {}) => {
  return http.get(`${baseURL}/supplier-buyer-manage/getBuyerList`, { params }).then(res => res.data)
};

// 采购商管理 => 获取采购商分组详情
export const getBuyerGroupInfo = (params = {}) => {
  return http.get(`${baseURL}/supplier-buyer-manage/getBuyerGroupInfo`, { params }).then(res => res.data)
};

// 采购商管理 => 添加采购商分组列表
export const saveSupplierBuyerGroup = (params = {}) => {
  return http.post(`${baseURL}/supplier-buyer-manage/saveSupplierBuyerGroup`, params).then(res => res.data)
};

// 采购商管理 => 修改采购商分组列表
export const editSupplierBuyerGroup = (params = {}) => {
  return http.post(`${baseURL}/supplier-buyer-manage/editSupplierBuyerGroup`, params).then(res => res.data)
};

// 采购商管理 => 修改状态
export const changeStatus = (params = {}) => {
  return http.post(`${baseURL}/supplier-buyer-manage/changeStatus?${Qs.stringify(params)}`).then(res => res.data)
};


// 采购商管理 => 分组删除
export const groupDelete = (params = {}) => {
  return http.delete(`${baseURL}/supplier-buyer-manage/groupDelete`, { params }).then(res => res.data)
};

// 采购商管理 => 分组内采购商删除
export const groupDetailDelete = (params = {}) => {
  return http.delete(`${baseURL}/supplier-buyer-manage/groupDetailDelete`, { params }).then(res => res.data)
};

// 采购商管理 => 获取采购商详情
export const getBuyer = (params = {}) => {
  return http.get(`${baseURL}/supplier-buyer-manage/getBuyer`, { params }).then(res => res.data)
};


// 账号管理 => 获取企业信息
export const getSupplier = () => {
  return http.get(`${baseURL}/supplier-account-manage/getSupplier`).then(res => res.data)
};

// 账号管理 => 获取企业信息完善标记
export const getFlag = () => {
  return http.get(`${baseURL}/supplier-account-manage/getFlag`).then(res => res.data)
};

// 账号管理 => 查询可选仓库列表
export const getWarehouse = () => {
  return http.get(`${baseURL}/supplier-account-manage/getWarehouse`).then(res => res.data)
};

// 账号管理 => 完善采购商信息
export const updateSupplier = (params = {}) => {
  return http.put(`${baseURL}/supplier-account-manage/updateSupplier`, params).then(res => res.data)
};

// 账号管理 => 修改手机号
export const updatePhone = (params = {}) => {
  return http.post(`${baseURL}/supplier-account-manage/updatePhone?${Qs.stringify(params)}`).then(res => res.data)
};

// 账号管理 => 修改账号信息
export const updateAccount = (params = {}) => {
  return http.post(`${baseURL}/supplier-account-manage/updateAccount?${Qs.stringify(params)}`).then(res => res.data)
};

// 账号管理 => 设置支付密码
export const setPayPassword = (params = {}) => {
  return http.post(`${baseURL}/supplier/setPayPassword`,params).then(res => res.data)
};

// 账号管理 => 修改支付密码
export const changePayPassword = (params = {}) => {
  return http.post(`${baseURL}/supplier/changePayPassword`,params).then(res => res.data)
};






// 账号管理 => 查询管理员分页列表信息

export const userList = (params = {}) => {
  return http.get(`${baseURL}/sys/user/list`, { params }).then(res => res.data)
};


// 账号管理 => 新增账号
export const saveUser = (params = {}) => {
  return http.post(`${baseURL}/sys/user/saveUser`, params).then(res => res.data)
};
// 账号管理 => 判断账号是否已经存在
export const existsUsername = (params = {}) => {
  return http.get(`${baseURL}/sys/user/existsUsername`, { params }).then(res => res.data)
};

// 账号管理 => 保存修改后账号信息
export const updateUser = (params = {}) => {
  return http.post(`${baseURL}/sys/user/updateUser`, params).then(res => res.data)
};

// 账号管理 => 查询可选角色列表信息
export const roleList = (params = {}) => {
  return http.get(`${baseURL}/sys/role/list`, { params }).then(res => res.data)
};

// 账号管理 => 修改账号状态
export const updateUserStatus = (params = {}) => {
  return http.post(`${baseURL}/sys/user/updateStatus`, params).then(res => res.data)
};


// 账号管理 => 删除账号
export const delUser = (id) => {
  return http.get(`${baseURL}/sys/user/delUser/${id}`).then(res => res.data)
};

// 账号管理 => 通过操作员id查询操作员详情对象信息
export const getInfoById = (id) => {
  return http.get(`${baseURL}/sys/user/getById/${id}`).then(res => res.data)
};

// 账号管理 => 账号导出
export const listExportXls = (params = {}) => {
  return http.get(`${baseURL}/sys/user/listExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};




// 角色管理 => 查询角色列表信息
export const pageRoleList = (params = {}) => {
  return http.get(`${baseURL}/sys/role/pageRoleList`, { params }).then(res => res.data)
};
// 角色管理 => 通过角色ID删除角色信息
export const delRole = (roleId) => {
  return http.delete(`${baseURL}/sys/role/delRole/${roleId}`).then(res => res.data)
};

// 角色管理 => 添加角色
export const saveRole = (params = {}) => {
  return http.post(`${baseURL}/sys/role/saveRole`, params).then(res => res.data)
};


// 角色管理 => 修改角色状态
export const modifyRole = (params = { roleId: null, status: null }) => {
  return http.post(`${baseURL}/sys/role/modifyRole?${Qs.stringify(params)}`).then(res => res.data)
};

// 角色管理 => 根据角色ID查询当前角色所拥有的权限列表
export const getMenuIdsByRoleId = (roleId) => {
  console.log(roleId);
  return http.get(`${baseURL}/sys/menu/getMenuListByRole/${roleId}`).then(res => res.data)
};



// 角色管理 => 保存修改后角色信息
export const updateRole = (params) => {
  console.log(params);
  return http.put(`${baseURL}/sys/role/updateRole`, params).then(res => res.data)
};



// 登录日志 => 登录日志查询
export const loginLogQuery = (params = {}) => {
  return http.get(`${baseURL}/sys/log/query`, { params }).then(res => res.data)
};

// 登录日志 => 登录日志导出
export const logExportXls = (params = {}) => {
  return http.get(`${baseURL}/sys/log/logExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};


// // 角色管理 => 为角色分配多个菜单权限
// export const assignMenu = (params = { roleId: '', menuId: [] }) => {
//     return http.post(`${baseURL}/sys/role/assignMenu`, params).then(res => res.data)
// };



// 发票管理 => 已开发票列表
export const getJcInvoice = (params = {}) => {
  return http.get(`${baseURL}/supplier-bill-manage/getJcInvoice`, { params }).then(res => res.data)
};


// 发票管理 => 待开发票列表
export const getWaitOpenBill = (params = {}) => {
  return http.get(`${baseURL}/supplier-bill-manage/getWaitOpenBill`, { params }).then(res => res.data)
};


// 发票管理 => 开票
export const openBill = (params = {}) => {
  return http.post(`${baseURL}/supplier-bill-manage/openBill`, params).then(res => res.data)
};


// 发票管理 => 上传发票
export const uploadBill = (params = {}) => {
  return http.post(`${baseURL}/supplier-bill-manage/uploadBill`, params).then(res => res.data)
};


// 发票管理 => 发票详情
export const getBillDetail = (params = {}) => {
  return http.get(`${baseURL}/supplier-bill-manage/getBillDetail`, { params }).then(res => res.data)
};

// 发票管理 => 已开发票导出
export const openJcInvoiceExportXls = (params = {}) => {
  return http.get(`${baseURL}/supplier-bill-manage/openJcInvoiceExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};



// 物流管理=> 查看物流 => 查询物流信息
export const getLogisticsList = (params = {}) => {
  return http.get(`${baseURL}/supplier-logistics-manage/getLogisticsList`, { params }).then(res => res.data)
};

// 物流管理=> 查看物流 => 物流信息导出
export const logisticsExportXls = (params = {}) => {
  return http.get(`${baseURL}/supplier-logistics-manage/logisticsExportXls`, {
    params,
    responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
  })
};

// 物流管理=> 查看物流 => 获取物流详情
export const getLogisticsDetail = (params = {}) => {
  return http.get(`${baseURL}/supplier-logistics-manage/getLogisticsDetail`, { params }).then(res => res.data)
};


// 物流管理=> 运费模板 => 供应商运费模板
export const getSupplierFreightTemplate = () => {
  return http.get(`${baseURL}/supplier-logistics-manage/getSupplierFreightTemplate`).then(res => res.data)
};

// 物流管理=> 运费模板 => 供应商运费模板添加
export const addSupplierFreightTemplate = (params = {}) => {
  return http.post(`${baseURL}/supplier-logistics-manage/addSupplierFreightTemplate`, params).then(res => res.data)
};

// 物流管理=> 运费模板 => 获取供应商运费模板详情
export const getFreightTemplateInfo = (params = {}) => {
  return http.get(`${baseURL}/supplier-logistics-manage/getFreightTemplateInfo`, { params }).then(res => res.data)
};


// 物流管理=> 运费模板 => 供应商运费模板修改
export const updateSupplierFreightTemplate = (params = {}) => {
  return http.post(`${baseURL}/supplier-logistics-manage/updateSupplierFreightTemplate`, params).then(res => res.data)
};

// 物流管理=> 运费模板 => 供应商运费模板删除
export const deleteSupplierFreightTemplate = (id) => {
  return http.delete(`${baseURL}/supplier-logistics-manage/deleteSupplierFreightTemplate/${id}`).then(res => res.data)
};


// 物流管理=> 运费模板 => 获取发货地区列表
export const getArea = () => {
  return http.get(`${baseURL}/supplier-logistics-manage/getArea`).then(res => res.data)
};



// 结算中心=> 结算首页 => 获取结算信息
export const getSupplierSettlement = () => {
  return http.get(`${baseURL}/supplier-settlement-center/getSupplierSettlement`).then(res => res.data)
};

// 结算中心=> 结算首页 => 获取待支付发票
export const getToBePaidBill = (params = {}) => {
  return http.get(`${baseURL}/supplier-settlement-center/getToBePaidBill`, { params }).then(res => res.data)
};

// 结算中心=> 结算统计 => 获取结算记录
export const getSettlementRecord = (params = {}) => {
  return http.get(`${baseURL}/supplier-settlement-center/getSettlementRecord`, { params }).then(res => res.data)
};


// 结算中心=> 结算统计 => 获取结算明细
export const getSettlementDatail = (params = {}) => {
  return http.get(`${baseURL}/supplier-settlement-center/getSettlementDatail`, { params }).then(res => res.data)
};

// 结算中心=> 结算统计 => 消息提醒超付款期限订单
export const messageNotification = () => {
  return http.get(`${baseURL}/supplier-settlement-center/messageNotification`).then(res => res.data)
};

// 结算中心=> 结算统计 => 待支付发票超时催促
export const urge = (params = {}) => {
  return http.post(`${baseURL}/supplier-settlement-center/urge?${Qs.stringify(params)}`).then(res => res.data)
};


// 结算中心=> 提现
export const settlementWithdraw = (params = {}) => {
  return http.put(`${baseURL}/supplier-settlement-center/withdraw`,params).then(res => res.data)
};




// 物业费用=> 待缴费用
export const waitPayFeeList = (params = {}) => {
  return http.get(`${baseURL}/supplier/properyFee/waitPayFeeList`, { params }).then(res => res.data)
};

// 物业费用=> 缴费查询
export const payQuery = (params = {}) => {
  return http.get(`${baseURL}/supplier/properyFee/payQuery`, { params }).then(res => res.data)
};
// 物业费用=> 缴费详情
export const getPayInfo = (params = {}) => {
  return http.get(`${baseURL}/supplier/properyFee/getPayInfo`, { params }).then(res => res.data)
};

// 物业费用=> 费用查询
export const feeQuery = (params = {}) => {
  return http.get(`${baseURL}/supplier/properyFee/feeQuery`, { params }).then(res => res.data)
};

// 物业费用=> 查询账户余额
export const getAmount = () => {
  return http.get(`${baseURL}/supplier/properyFee/getAmount`).then(res => res.data)
};


// 物业费用=> 支付
export const propertyCostsPay = (params = {}) => {
  return http.post(`${baseURL}/supplier/properyFee/pay`, params).then(res => res.data)
};

