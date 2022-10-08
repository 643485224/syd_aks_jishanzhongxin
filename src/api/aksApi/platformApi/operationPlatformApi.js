import {
    http,
    baseURL
} from "@/api/conf/index-json";
import { number } from "echarts/lib/export";
import Qs from 'qs'


// 运营统计 => 交易统计信息
export const getPtjytjsj = () => {
    return http.get(`${baseURL}/manager/yytj/getPtjytjsj`).then(res => res.data)
};

// 运营统计 => 政策信息
export const policyList = () => {
    return http.get(`${baseURL}/manager/yytj/policyList`).then(res => res.data)
};

// 运营统计 => 企业销量分析
export const getQyxlfx = () => {
    return http.get(`${baseURL}/manager/yytj/getQyxlfx`).then(res => res.data)
};

// 运营统计 => 获取交易额数据
export const getJyesj = () => {
    return http.get(`${baseURL}/manager/yytj/getJyesj`).then(res => res.data)
};

// 运营统计 => 药品器械批发数据
export const getYpqxpfsj = () => {
    return http.get(`${baseURL}/manager/yytj/getYpqxpfsj`).then(res => res.data)
};


// 运营统计 => 年度涨幅趋势
export const getJyeYearZfqs = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/yytj/getJyeYearZfqs`, { params }).then(res => res.data)
};

// 运营统计 => 交易和企业数上升比例
export const getJyQysSsbl = (params = {}) => {
    return http.get(`${baseURL}/manager/yytj/getJyQysSsbl`, { params }).then(res => res.data)
};


// 运营统计 => 便捷服务
export const getBjfwList = (params = {}) => {
    return http.get(`${baseURL}/manager/yytj/getBjfwList`, { params }).then(res => res.data)
};




// 仓库概览=> 获取商品数量 - 接口
export const wareHouseGetGoodsCount = () => {
    return http.get(`${baseURL}/manager/kftj/getGoodsCount`).then(res => res.data)
};

// 仓库概览=> 获取仓库概览数据
export const wareHouseGetOverView = () => {
    return http.get(`${baseURL}/manager/kftj/getKfgl`).then(res => res.data)
};


// 仓库概览=> 获取仓库列表
export const wareHouseList = (params = {}) => {
    return http.get(`${baseURL}/manager/kftj/getWarehouseList`, { params }).then(res => res.data)
};


// 首页 => 首页概览 => 概览统计数据
export const getGltjData = (params = {}) => {
    return http.get(`${baseURL}/manager/homepage/getGltjData`, { params }).then(res => res.data)
};
// 首页 => 首页概览 => 年度采购趋势
export const getCgqsList = (params = { beginMonth: '2022-01', endMonth: '2022-07' }) => {
    return http.get(`${baseURL}/manager/homepage/getCgqsList`, { params }).then(res => res.data)
};
// 首页 => 首页概览 => 药品排行前20
export const getDrug30Top20 = (params = {}) => {
    return http.get(`${baseURL}/manager/homepage/getDrug30Top20`, { params }).then(res => res.data)
};
// 首页 => 首页概览 => 器械排行前20
export const getApparatus30Top20 = (params = {}) => {
    return http.get(`${baseURL}/manager/homepage/getApparatus30Top20`, { params }).then(res => res.data)
};



// 首页 => 结算统计
export const getSettleStatData = (params = {}) => {
    return http.get(`${baseURL}/manager/homepage/getSettleStatData`, { params }).then(res => res.data)
};


// // 首页 => 结算统计
// export const getSettleStatData = (params = {}) => {
//   return http.get(`${baseURL}/manager/homepage/getSettleStatData`,{params}).then(res => res.data)
// };



// 交易管理 => 订单查询
export const tradeOrderList = (params = {}) => {
    return http.get(`${baseURL}/manager/order/orderQuery`, { params }).then(res => res.data)
};
// 交易管理 => 订单详情
export const tradeorderInfo = (params = {}) => {
    return http.get(`${baseURL}/manager/order/orderInfo`, { params }).then(res => res.data)
};


// 物流管理=> 查看物流 => 物流信息查询
export const logisticsQuery = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/logisticsQuery`, { params }).then(res => res.data)
};

// 物流管理=> 查看物流 => 订单物流信息
export const orderLogisticsList = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/orderLogisticsList`, { params }).then(res => res.data)
};

// 物流管理=> 查看物流 => 物流信息导出
export const logisticsExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/logisticsExportXls`, {
        params,
        responseType: "blob", //指定响应中包含的数据类型,指定response 是一个包含二进制数据的 Blob 对象
    })
};


// 物流管理=> 订单派车 => 待派车订单
export const waitAssignOrderQuery = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/waitAssignOrderQuery`, { params }).then(res => res.data)
};

// 物流管理=> 订单派车 => 获取发货物流号
export const getLogisticsNo = () => {
    return http.get(`${baseURL}/manager/logistics/getLogisticsNo`).then(res => res.data)
};

// 物流管理=> 订单派车 => 指派车辆
export const assignCar = (params = {}) => {
    return http.post(`${baseURL}/manager/logistics/assignCar`, { params }).then(res => res.data)
};



// 物流管理=> 订单派车 => 获取司机列表
export const getDriverList = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/getDriverList`, { params }).then(res => res.data)
};


// 物流管理=> 订单派车 => 获取可用车辆列表
export const getFreeCarList = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/getFreeCarList`, { params }).then(res => res.data)
};


// 物流管理=> 车辆管理 => 车辆查询
export const carQuery = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/carQuery`, { params }).then(res => res.data)
};
// 物流管理=> 车辆管理 => 新增车辆
export const addCar = (params = {}) => {
    return http.post(`${baseURL}/manager/logistics/addCar`, params).then(res => res.data)
};
// // 物流管理=> 车辆管理 => 司机数据
// export const addCar = (params = {}) => {
//   return http.post(`${baseURL}/manager/logistics/addCar`, { params }).then(res => res.data)
// };


// 物流管理=> 车辆管理 => 车辆信息导出
export const carExportXls = (params = {}) => {

    return http.get(`${baseURL}/manager/logistics/carExportXls`, {
        params,
        responseType: "blob",
    }).then(res => res)
};

// 物流管理=> 司机管理 => 司机查询
export const driverQuery = (params = {}) => {
    return http.get(`${baseURL}/manager/logistics/driverQuery`, { params }).then(res => res.data)
};

// 物流管理=> 司机管理 => 新增司机
export const addDriver = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/logistics/addDriver`, params).then(res => {
        console.log(res);
        return res.data;
    })
};


// 物流管理=> 司机管理 => 编辑司机
export const editDriver = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/logistics/editDriver`, params).then(res => res.data)
};

// 物流管理=> 司机管理 => 删除司机
export const deleteDriver = (params = {}) => {
    console.log(params);
    return http.delete(`${baseURL}/manager/logistics/deleteDriver`, { params }).then(res => {
        console.log(res)
        return res.data;
    })
};




// 审核管理=> 入驻审核 => 入驻待审核列表
export const settleWaitAuditList = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/audit/settle/settleWaitAuditList`, { params }).then(res => res.data)
};
// 审核管理=> 入驻审核 => 批量删除
export const batchDel = (params = []) => {
    console.log(params);
    // return http.post(`${baseURL}/manager/audit/settle/batchDel/${Qs.stringify(params)}`, ).then(res => res.data)
    console.log(Qs.stringify(params));
    let str = Qs.stringify(params)
    var re = /\d(?==+)/g
    var s = str.replace(re, 'idList')
    console.log(s);
    return http.post(`${baseURL}/manager/audit/settle/batchDel?${s}`).then(res => res.data)
};
// 审核管理=> 审核管理 => 批量审核通过
export const batchAuditPass = (params = []) => {
    let str = Qs.stringify(params)
    var re = /\d(?==+)/g
    var s = str.replace(re, 'idList')
    console.log(s);
    return http.post(`${baseURL}/manager/audit/goods/batchAuditPass?${s}`).then(res => res.data)
};
// 审核管理=> 审核管理 => 批量审核删除
export const batchAuditRefuse = (params = []) => {
    let str = Qs.stringify(params)
    var re = /\d(?==+)/g
    var s = str.replace(re, 'idList')
    console.log(s);
    return http.post(`${baseURL}/manager/audit/goods/batchAuditRefuse?${s}`).then(res => res.data)
};

// 审核管理=> 入驻审核 => 入驻通过
export const settlePass = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/audit/settle/settlePass?${Qs.stringify(params)}`, ).then(res => res.data)
};
// 审核管理=> 入驻审核 => 入驻驳回
export const settleRefuse = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/audit/settle/settleRefuse`, Qs.stringify(params)).then(res => res.data)
};


// 审核管理=> 商品审核 => 商品待审核列表
export const goodsWaitAuditList = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/audit/goods/goodsWaitAuditList`, { params }).then(res => res.data)
};

// 审核管理=> 商品审核 => 审核通过
export const auditPass = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/audit/goods/auditPass?${Qs.stringify(params)}`, ).then(res => res.data)
};
// 审核管理=> 商品审核 => 审核驳回
export const auditRefuse = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/audit/goods/auditRefuse`, Qs.stringify(params)).then(res => res.data)
};
// 审核管理=> 商品审核 => 商品详情
export const getDrugInfo = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/audit/goods/getDrugInfo`, { params }).then(res => res.data)
};
// 审核管理=> 商品审核 => 器械详情
export const getApparatusInfo = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/audit/goods/getApparatusInfo`, { params }).then(res => res.data)
};

// 报表管理>交易报表  => 交易报表查询
export const getBusinessList = (params = {}) => {
    return http.get(`${baseURL}/manager/report/getBusinessList`, {
        params
    }).then(res => res)
};
// 报表管理>交易报表  => 交易报表导出
export const businessExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/report/businessExportXls`, {
        params,
        responseType: "blob",
    }).then(res => res)
};
// 报表管理>物业报表  => 物业报表查询
export const getPropertyList = (params = {}) => {
    return http.get(`${baseURL}/manager/report/getPropertyList`, {
        params
    }).then(res => res)
};
// 报表管理>物业报表  => 物业报表导出
export const propertyExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/report/propertyExportXls`, {
        params,
        responseType: "blob",
    }).then(res => res)
};
// 报表管理>商户交易报表  => 商户交易报表查询
export const getSupplierBusinessList = (params = {}) => {
    return http.get(`${baseURL}/manager/report/getSupplierBusinessList`, {
        params
    }).then(res => res)
};
// 报表管理>商户交易报表  => 商户交易导出
export const supplierBusinessExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/report/supplierBusinessExportXls`, {
        params,
        responseType: "blob",
    }).then(res => res)
};
//信息管理>仓库信息=>读取仓库信息
export const getWarehouseInformation = (params = {}) => {
        return http.get(`${baseURL}/manager/base/warehouse/query`, {
            params
        }).then(res => res)
    }
    //信息管理>仓库信息=>读取仓库信息
export const getOpsition = (params = {}) => {
        return http.get(`${baseURL}/manager/base/warehouse/position/query`, {
            params
        }).then(res => res)
    }
    //信息管理>仓库信息=>读取药品分类
export const getDrugClassification = (params = {}) => {
        return http.get(`${baseURL}/manager/base/drug/category/query`, {
            params
        }).then(res => res)
    }
    // 信息管理>信息管理  => 信息查询
export const getinformationlist = (params = {}) => {
    return http.get(`${baseURL}/manager/information/list`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 新增仓库
export const addWarehose = (params = {}) => {
    return http.post(`${baseURL}/manager/base/warehouse/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑仓库
export const editWarehose = (params = {}) => {
    return http.post(`${baseURL}/manager/base/warehouse/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 新增仓位
export const addOpsition = (params = {}) => {
    return http.post(`${baseURL}/manager/base/warehouse/position/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑仓位
export const editOpsition = (params = {}) => {
    return http.post(`${baseURL}/manager/base/warehouse/position/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 删除仓库
export const deletWarehose = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/warehouse/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 删除仓位
export const deletOpsition = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/warehouse/position/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 新增药品分类
export const addDrug = (params = {}) => {
    return http.post(`${baseURL}/manager/base/drug/category/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑药品分类
export const editDrug = (params = {}) => {
    return http.post(`${baseURL}/manager/base/drug/category/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 删除药品分类
export const deletDrug = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/drug/category/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 药品分类详情获取
export const getDetailsDrug = (params = {}) => {
    return http.get(`${baseURL}/manager/base/drug/category/info`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 药品管理列表获取
export const getDrugManagementlist = (params = {}) => {
    return http.get(`${baseURL}/manager/base/drug/query`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 新增药品管理
export const addDrugManagement = (params = {}) => {
    return http.post(`${baseURL}/manager/base/drug/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑药品管理
export const editDrugManagement = (params = {}) => {
    return http.post(`${baseURL}/manager/base/drug/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 药品分类详情获取
export const getDetailsDrugManager = (params = {}) => {
    return http.get(`${baseURL}/manager/base/drug/info`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 读取选择药品分类列表获取
export const selectdrugClass = (params = {}) => {
    return http.get(`${baseURL}/manager/base/drug/category/select`).then(res => res)
};
// 信息管理>信息管理  => 删除药品分类
export const deletDrugManagement = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/drug/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 器械分类列表获取
export const getCategoryClass = (params = {}) => {
    return http.get(`${baseURL}/manager/base/apparatus/category/query`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 读取选择器械分类列表获取
export const selectCategoryClass = (params = {}) => {
    return http.get(`${baseURL}/manager/base/apparatus/category/select`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 新增药械分类
export const addCategoryClass = (params = {}) => {
    return http.post(`${baseURL}/manager/base/apparatus/category/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑药械分类
export const editCategoryClass = (params = {}) => {
    return http.post(`${baseURL}/manager/base/apparatus/category/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 删除器械分类
export const deletCategoryClass = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/apparatus/category/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 药械分类详情获取
export const getDetailsCategoryClass = (params = {}) => {
    return http.get(`${baseURL}/manager/base/apparatus/category/info`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 器械管理列表获取
export const getApparatus = (params = {}) => {
    return http.get(`${baseURL}/manager/base/apparatus/query`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 新增药械管理
export const addApparatusManagement = (params = {}) => {
    return http.post(`${baseURL}/manager/base/apparatus/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  =>编辑药械管理
export const editApparatusManagement = (params = {}) => {
    return http.post(`${baseURL}/manager/base/apparatus/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 删除器械管理
export const deletApparatus = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/apparatus/delete`, { params }).then(res => res.data)
};
// 信息管理>信息管理  => 药械分类详情获取
export const getDetailsApparatus = (params = {}) => {
    return http.get(`${baseURL}/manager/base/apparatus/info`, {
        params
    }).then(res => res)
};
// 信息管理>信息管理  => 信息删除
export const getinformationdelete = (params = {}) => {
    return http.post(`${baseURL}/manager/information/delete`,
        params).then(res => res)
};
// 信息管理>信息管理  => 信息发布
export const getinformationrelease = (params = {}) => {
    return http.post(`${baseURL}/manager/information/release`, Qs.stringify(params)).then(res => res)
};
// 信息管理>信息管理  => 信息编辑
export const getinformationedit = (params = {}) => {
    return http.post(`${baseURL}/manager/information/edit`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 读取系统参数列表
export const getbasequery = (params = {}) => {
        return http.get(`${baseURL}/manager/base/parameter/query`, { params }).then(res => res)
    }
    // 信息管理>信息管理  => 删除系统参数列表
export const getbasedelete = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/parameter/delete`, { params }).then(res => res)
};
// 信息管理>信息管理  => 读取系统参数类型
export const getbasequeryType = (params = {}) => {
    return http.get(`${baseURL}/manager/base/parameter/queryType`).then(res => res)
};

// 信息管理>信息管理  => 编辑系统参数
export const getbaseedit = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/parameter/edit`, params).then(res => res)
};
// 信息管理>信息管理  => 新增系统参数
export const getbaseadd = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/parameter/add`, params).then(res => res)
};
// 信息管理>信息管理  => 读取数据字典列表
export const getquery = (params = {}) => {
    return http.get(`${baseURL}/manager/base/dict/query`, { params }).then(res => res)
};
// 信息管理>信息管理  => 删除数据字典列表
export const getdelete = (params = {}) => {
    console.log(params);
    return http.delete(`${baseURL}/manager/base/dict/delete`, { params }).then(res => res)
};
// 信息管理>信息管理  => 读取数据字典类型
export const getqueryType = (params = {}) => {
    return http.get(`${baseURL}/manager/base/dict/queryType`).then(res => res)
};
// 信息管理>信息管理  => 新增数据字典信息
export const getdictadd = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/dict/add`, params).then(res => res)
};
// 信息管理>信息管理  => 编辑数据字典信息
export const getdictedit = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/dict/edit`, params).then(res => res)
};
// 信息管理>信息管理  => 信息新增
export const getinformationadd = (params = {}) => {
    return http.post(`${baseURL}/manager/information/add`,
        params
    ).then(res => res)
};
// 信息管理>信息管理  => 读取商城分类
export const getsaleCategoryquery = (params = {}) => {
    return http.get(`${baseURL}/manager/base/saleCategory/query`, { params }).then(res => res)
};
// 信息管理>信息管理  => 删除出药品分类
export const getsaleCategorydelete = (params = {}) => {
    return http.delete(`${baseURL}/manager/base/saleCategory/delete`, { params }).then(res => res)
};
// 信息管理>信息管理  => 读取选择商城分类
export const getselect = (params = {}) => {
    return http.get(`${baseURL}/manager/base/saleCategory/select`).then(res => res)
};
// 信息管理>信息管理  => 编辑商城分类
export const getsaleCategoryedit = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/saleCategory/edit`, params).then(res => res)
};
// 信息管理>信息管理  => 新增商城分类
export const getsaleCategoryadd = (params = {}) => {
    console.log(params);
    return http.post(`${baseURL}/manager/base/saleCategory/add`, params).then(res => res)
};
// 信息管理>信息管理  => 商城分类详情
export const getsaleCategoryinfo = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/base/saleCategory/info`, { params }).then(res => res)
};
// 物业管理>物业费用  => 查询物业费用列表
export const getpropertyquery = (params = {}) => {
        console.log(params);
        return http.get(`${baseURL}/manager/property/query`, { params }).then(res => res)
    }
    // 物业管理>物业费用  => 删除物业费用列表
export const getpropertydelete = (params = {}) => {
    return http.delete(`${baseURL}/manager/property/delete`, { params }).then(res => res)
};
// 物业管理>物业费用  => 详情物业费用列表
export const getpropertyinfo = (params = {}) => {
    return http.get(`${baseURL}/manager/property/info`, { params }).then(res => res)
};
// 物业管理>物业费用  => 编辑物业费用列表
export const getpropertyedit = (params = {}) => {
    return http.post(`${baseURL}/manager/property/edit`,
        params
    ).then(res => res)
};
// 物业管理>物业费用  => 新添物业费用列表
export const getpropertyadd = (params = {}) => {
    return http.post(`${baseURL}/manager/property/add`,
        params
    ).then(res => res)
};
// 物业管理>物业费用  => 导出物业费用列表
export const propertyFeeExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/property/propertyFeeExportXls`, { params }).then(res => res)
};
// 用户管理>供应商管理  => 供应商查询
export const supplierQuery = (params = {}) => {
    console.log(params);
    return http.get(`${baseURL}/manager/customer/supplierQuery`, { params }).then(res => res)
};
// 用户管理>供应商管理  => 供应商详情
export const getSupplierInfo = (params = {}) => {
    return http.get(`${baseURL}/manager/customer/getSupplierInfo`, {
        params
    }).then(res => res)
};
// 用户管理>供应商管理  => 供应商导出
export const supplierQueryExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/customer/supplierQueryExportXls`, Qs.stringify(params)).then(res => res)
};
// 用户管理>采购商  => 采购商查询
export const getbuyerQuery = (params = {}) => {
    return http.get(`${baseURL}/manager/customer/buyerQuery`, {
        params
    }).then(res => res)
};
// 用户管理>采购商  => 采购商导出
export const getbuyerQueryExportXls = (params = {}) => {
    return http.get(`${baseURL}/manager/customer/buyerQueryExportXls`, Qs.stringify(params)).then(res => res)
};