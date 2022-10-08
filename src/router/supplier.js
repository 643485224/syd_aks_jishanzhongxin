export let supplierRoute = [
    {
        path: 'supplierWorkbench',
        name: 'supplierWorkbench',
        meta: {
          hideInMenu: true,
          title: '工作台',
          notCache: true,
          breadcrumb:false,
        },
        component: () => import("@/views/platformViews/supplierPlatform/supplierWorkbench/supplierWorkbench.vue"),
        redirect: "/main/supplierWorkbench/supplierHome",
        children: [
          {
            path: 'supplierHome',
            name: 'supplierHome',
            meta: {
              hideInMenu: true,
              title: '首页概览',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierHome/supplierHome.vue"),
          },
          // 交易管理
          {
            path: "supplierTransactionOrderList", // 集采订单明细
            name: "supplierTransactionOrderList",
            meta: {
              hideInMenu: true,
              title: '集采订单明细',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierTransactionManage/supplierTransactionOrderList/supplierTransactionOrderList.vue"),
            children: [

            ]
          },
          {
            path: "supplierTransactionOrderDetails/:orderId/:orderNo", // 订单详情
            name: "supplierTransactionOrderDetails",
            meta: {
              hideInMenu: true,
              title: '订单详情',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierTransactionManage/supplierTransactionOrderDetails/supplierTransactionOrderDetails.vue"),
          },
          {
            path: "supplierRetailOrderList", // 零售订单明细
            name: "supplierRetailOrderList",
            meta: {
              hideInMenu: true,
              title: '零售订单明细',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierTransactionManage/supplierRetailOrderList/supplierRetailOrderList.vue"),
          },
          {
            path: "supplierSalesDailyStatistics", // 销售日报统计
            name: "supplierSalesDailyStatistics",
            meta: {
              hideInMenu: true,
              title: '销售日报统计',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierTransactionManage/supplierSalesDailyStatistics/supplierSalesDailyStatistics.vue"),
          },
          {
            path: "supplierCommoditySalesStatistics", // 商品销售统计
            name: "supplierCommoditySalesStatistics",
            meta: {
              hideInMenu: true,
              title: '商品销售统计',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierTransactionManage/supplierCommoditySalesStatistics/supplierCommoditySalesStatistics.vue"),
          },
          // 物流管理
          {
            path: "supplierLogisticsTracking", // 物流跟踪
            name: "supplierLogisticsTracking",
            meta: {
              hideInMenu: true,
              title: '物流跟踪',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierLogisticsManage/supplierLogisticsTracking/supplierLogisticsTracking.vue"),
          },
          {
            path: "supplierLogisticsShippingTemplate", // 运费模板
            name: "supplierLogisticsShippingTemplate",
            meta: {
              hideInMenu: true,
              title: '运费模板',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierLogisticsManage/supplierLogisticsShippingTemplate/supplierLogisticsShippingTemplate.vue"),
          },
          {
            path: "supplierLogisticsAddTpl/:id?", // 新增运费模板
            name: "supplierLogisticsAddTpl",
            meta: {
              hideInMenu: true,
              title: '新增运费模板',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierLogisticsManage/supplierLogisticsShippingTemplate/supplierLogisticsAddTpl/supplierLogisticsAddTpl.vue"),
          },
          // 商品管理
          {
            path: "supplierProductManage", // 药品管理
            name: "supplierProductManage",
            meta: {
              hideInMenu: true,
              title: '药品管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierProductManage.vue"),
          },
          {
            path: "supplierInstrumentManage", // 药械管理
            name: "supplierInstrumentManage",
            meta: {
              hideInMenu: true,
              title: '药械管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierInstrumentManage/supplierInstrumentManage.vue"),
          },
          {
            path: "supplierProductAdd", // 新增药品
            name: "supplierProductAdd",
            meta: {
              hideInMenu: true,
              title: '新增药品',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierProductEdit/supplierProductEdit.vue"),
          },
          {
            path: "supplierProductEdit/:sgId?", // 编辑药品
            name: "supplierProductEdit",
            meta: {
              hideInMenu: true,
              title: '编辑药品',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierProductEdit/supplierProductEdit.vue"),
          },
          {
            path: "supplierInstrumentAdd", // 新增药械
            name: "supplierInstrumentAdd",
            meta: {
              hideInMenu: true,
              title: '新增药械',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierInstrumentEdit/supplierInstrumentEdit.vue"),
          },
          {
            path: "supplierInstrumentEdit/:sgId?", // 编辑药械
            name: "supplierInstrumentEdit",
            meta: {
              hideInMenu: true,
              title: '编辑药械',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierInstrumentEdit/supplierInstrumentEdit.vue"),
          },
          {
            path: "supplierInstrumentBatchAdd", // 批量新增商品
            name: "supplierInstrumentBatchAdd",
            meta: {
              hideInMenu: true,
              title: '批量新增商品',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierProductManage/supplierInstrumentBatchAdd/supplierInstrumentBatchAdd.vue"),
          },

          // 采购商管理
          {
            path: "supplierPurchaserManage", // 采购商管理
            name: "supplierPurchaserManage",
            meta: {
              hideInMenu: true,
              title: '采购商管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPurchaserManage/supplierPurchaserManage.vue"),
          },
          {
            path: "supplierPurchaserEdit/:id?", // 采购商分组编辑
            name: "supplierPurchaserEdit",
            meta: {
              hideInMenu: true,
              title: '采购商分组编辑',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPurchaserManage/supplierPurchaserEdit/supplierPurchaserEdit.vue"),
          },
          {
            path: "supplierPurchaserInfo/:id?", // 供应商信息
            name: "supplierPurchaserInfo",
            meta: {
              hideInMenu: true,
              title: '供应商信息',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPurchaserManage/supplierPurchaserInfo/supplierPurchaserInfo.vue"),
          },

          // 账号管理
          {
            path: "supplierAccountManagement", // 权限账号管理
            name: "supplierAccountManagement",
            meta: {
              hideInMenu: true,
              title: '权限账号管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierAccountManagement/supplierAccountManagement.vue"),
          },
          {
            path: "supplierRoleManagement", // 角色管理
            name: "supplierRoleManagement",
            meta: {
              hideInMenu: true,
              title: '角色管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierAccountManagement/supplierRoleManagement/supplierRoleManagement.vue"),
          },
          {
            path: "supplierLoginLog", // 登录日志
            name: "supplierLoginLog",
            meta: {
              hideInMenu: true,
              title: '登录日志',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierAccountManagement/supplierLoginLog/supplierLoginLog.vue"),
          },
          {
            path: "supplierEnterpriseInfoManage", // 企业信息管理
            name: "supplierEnterpriseInfoManage",
            meta: {
              hideInMenu: true,
              title: '企业信息管理',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierAccountManagement/supplierEnterpriseInfoManage/supplierEnterpriseInfoManage.vue"),
          },
          {
            path: "supplierAccountSecurity", // 账号安全
            name: "supplierAccountSecurity",
            meta: {
              hideInMenu: true,
              title: '账号安全',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierAccountManagement/supplierAccountSecurity/supplierAccountSecurity.vue"),
          },
          // 发票管理
          {
            path: "supplierInvoiced", // 已开发票
            name: "supplierInvoiced",
            meta: {
              hideInMenu: true,
              title: '已开发票',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierInvoiceManage/supplierInvoiced/supplierInvoiced.vue"),
          },
          {
            path: "supplierInvoicedDetail/:orderId", // 发票详情
            name: "supplierInvoicedDetail",
            meta: {
              hideInMenu: true,
              title: '发票详情',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierInvoiceManage/supplierInvoiced/supplierInvoicedDetail/supplierInvoicedDetail.vue"),
          },
          {
            path: "supplierInvoiceUpload", // 发票上传
            name: "supplierInvoiceUpload",
            meta: {
              hideInMenu: true,
              title: '发票上传',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierInvoiceManage/supplierInvoiceUpload/supplierInvoiceUpload.vue"),
          },
          // 结算中心
          {
            path: "supplierSettlementHome", // 首页
            name: "supplierSettlementHome",
            meta: {
              hideInMenu: true,
              title: '首页',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierSettlementCenter/supplierSettlementHome/supplierSettlementHome.vue"),
          },
          {
            path: "supplierSettlementStatistics", // 结算统计
            name: "supplierSettlementStatistics",
            meta: {
              hideInMenu: true,
              title: '结算统计',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierSettlementCenter/supplierSettlementStatistics/supplierSettlementStatistics.vue"),
          },
          {
            path: "supplierSettlementLogDetails/:settleInfo", // 结算明细
            name: "supplierSettlementLogDetails",
            meta: {
              hideInMenu: true,
              title: '结算明细',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierSettlementCenter/supplierSettlementStatistics/supplierSettlementLogDetails/supplierSettlementLogDetails.vue"),
          },

          {
            path: "supplierCreditLoan", // 信用贷
            name: "supplierCreditLoan",
            meta: {
              hideInMenu: true,
              title: '信用贷',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierSettlementCenter/supplierCreditLoan/supplierCreditLoan.vue"),
          },

          // 物业费用
          {
            path: "supplierPendingPayMent", // 待缴费用
            name: "supplierPendingPayMent",
            meta: {
              hideInMenu: true,
              title: '待缴费用',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPropertyCosts/supplierPendingPayMent/supplierPendingPayMent.vue"),
          },
          {
            path: "supplierPaid", // 已付费用
            name: "supplierPaid",
            meta: {
              hideInMenu: true,
              title: '已付费用',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPropertyCosts/supplierPaid/supplierPaid.vue"),
          },
          {
            path: "supplierPropertyExpenses", // 物业费用
            name: "supplierPropertyExpenses",
            meta: {
              hideInMenu: true,
              title: '物业费用',
              notCache: true,
            },
            component: () => import("../views/platformViews/supplierPlatform/supplierPropertyCosts/supplierPropertyExpenses/supplierPropertyExpenses.vue"),
          },
        ]
      },
]
