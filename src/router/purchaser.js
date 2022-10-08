export let purchaserRoute = [{
    path: 'purchaserHome',
    name: 'purchaserHome',
    meta: {
      hideInMenu: true,
      title: '采购商平台-首页',
      notCache: true,
    },
    component: () => import("../views/platformViews/purchaserPlatform/purchaserHome/purchaserHome.vue"),
  },
  {
    path: "transactionOrderDetails", // 交易订单明细
    name: "transactionOrderDetails",
    meta: {
      hideInMenu: true,
      title: '交易订单明细',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchaserTransactionManagement/transactionOrderDetails/transactionOrderDetails.vue"),
  },
  {
    path: "returnOrderDetails", // 退货订单明细
    name: "returnOrderDetails",
    meta: {
      hideInMenu: true,
      title: '退货订单明细',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchaserTransactionManagement/returnOrderDetails/returnOrderDetails.vue"),
  },
  {
    path: "procurementRegistration", // 采购登记
    name: "procurementRegistration",
    meta: {
      hideInMenu: true,
      title: '采购登记',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchasingManagement/procurementRegistration/procurementRegistration.vue"),
  },
  {
    path: "myShoppingCart", // 我的购物车
    name: "myShoppingCart",
    meta: {
      hideInMenu: true,
      title: '我的购物车',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchasingManagement/myShoppingCart/myShoppingCart.vue"),
  },
  {
    path: "myPurchaseOrder", // 我的采购单
    name: "myPurchaseOrder",
    meta: {
      hideInMenu: true,
      title: '我的采购单',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchasingManagement/myPurchaseOrder/myPurchaseOrder.vue"),
  },
  {
    path: "purchaseOrderApproval", // 采购单审核
    name: "purchaseOrderApproval",
    meta: {
      hideInMenu: true,
      title: '采购单审核',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchasingManagement/purchaseOrderApproval/purchaseOrderApproval.vue"),
  },
  {
    path: "auditRecord", // 审核记录
    name: "auditRecord",
    meta: {
      hideInMenu: true,
      title: '审核记录',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/purchasingManagement/auditRecord/auditRecord.vue"),
  },
  {
    path: "supplierManagement", // 供应商管理
    name: "supplierManagement",
    meta: {
      hideInMenu: true,
      title: '供应商管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/supplierManagement/supplierManagement.vue"),
  },
  {
    path: "enterpriseInformationManagement", // 企业信息管理
    name: "enterpriseInformationManagement",
    meta: {
      hideInMenu: true,
      title: '企业信息管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/enterpriseInformationManagement/enterpriseInformationManagement.vue"),
  },
  {
    path: "accountSecurity", // 账号安全
    name: "accountSecurity",
    meta: {
      hideInMenu: true,
      title: '账号安全',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/accountSecurity/accountSecurity.vue"),
  },
  {
    path: "receivingAddressManagement", // 收货地址管理
    name: "receivingAddressManagement",
    meta: {
      hideInMenu: true,
      title: '收货地址管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/receivingAddressManagement/receivingAddressManagement.vue"),
  },
  {
    path: "authorityAccountManagement", // 权限账号管理
    name: "authorityAccountManagement",
    meta: {
      hideInMenu: true,
      title: '权限账号管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/authorityAccountManagement/authorityAccountManagement.vue"),
  },
  {
    path: "roleManagement", // 角色管理
    name: "roleManagement",
    meta: {
      hideInMenu: true,
      title: '角色管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/roleManagement/roleManagement.vue"),
  },
  {
    path: "loginLog", // 登录日志
    name: "loginLog",
    meta: {
      hideInMenu: true,
      title: '登录日志',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/accountManagement/loginLog/loginLog.vue"),
  },
  {
    path: "controlOverInvoices", // 发票管理
    name: "controlOverInvoices",
    meta: {
      hideInMenu: true,
      title: '发票管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/controlOverInvoices/controlOverInvoices.vue"),
  },
  {
    path: "invoicedDetail", // 发票管理
    name: "invoicedDetail",
    meta: {
      hideInMenu: true,
      title: '发票管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/controlOverInvoices/invoicedDetail/invoicedDetail.vue"),
  },
  {
    path: "paymentSettlementCenter", // 支付结算中心
    name: "paymentSettlementCenter",
    meta: {
      hideInMenu: true,
      title: '支付结算中心',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/settlementCenter/paymentSettlementCenter/paymentSettlementCenter.vue"),
  },
  {
    path: "bankCardManagement", // 银行卡管理
    name: "bankCardManagement",
    meta: {
      hideInMenu: true,
      title: '银行卡管理',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/settlementCenter/bankCardManagement/bankCardManagement.vue"),
  },
  {
    path: "creditPayment", // 信用付
    name: "creditPayment",
    meta: {
      hideInMenu: true,
      title: '信用付',
      notCache: true,
      isHeaderNav: false
    },
    component: () => import("@/views/platformViews/purchaserPlatform/settlementCenter/creditPayment/creditPayment.vue"),
  },

]
