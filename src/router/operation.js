export let operationRoute = [{
        path: "operationStatistics", // 运营统计
        name: "operationStatistics",
        meta: {
            hideInMenu: true,
            title: '运营统计',
            notCache: true,
            isHeaderNav: true
        },
        component: () =>
            import ("@/views/platformViews/operationPlatform/operationStatistics/operationStatistics.vue"),
    },
    {
        path: "warehouseStatistics", // 库房统计
        name: "warehouseStatistics",
        meta: {
            hideInMenu: true,
            title: '库房统计',
            notCache: true,
            isHeaderNav: true
        },
        component: () =>
            import ("@/views/platformViews/operationPlatform/warehouseStatistics/warehouseStatistics.vue"),
    },
    {
        path: 'operationManage',
        name: 'operationManage',
        meta: {
            hideInMenu: true,
            title: '综合管理',
            notCache: true,
        },
        component: () =>
            import ("@/views/platformViews/operationPlatform/operationManage/operationManage.vue"),
        redirect: "/main/operationManage/operationHome",
        children: [{
                path: 'operationHome',
                name: 'operationHome',
                meta: {
                    hideInMenu: true,
                    title: '首页概览',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationHome/operationHome.vue"),
            },
            {
                path: 'settlementStatistics',
                name: 'settlementStatistics',
                meta: {
                    hideInMenu: true,
                    title: '结算统计',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/settlementStatistics/settlementStatistics.vue"),
            },
            // 交易管理
            {
                path: "operationTransactionManagement",
                name: "operationTransactionManagement",
                meta: {
                    hideInMenu: true,
                    title: '交易管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationTransactionManagement/operationTransactionManagement.vue"),
            },
            // 交易管理详情
            {
                path: "operationDetailsManagement",
                name: "operationDetailsManagement",
                meta: {
                    hideInMenu: true,
                    title: '交易管理详情',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationTransactionManagement/operationDetailsManagement.vue"),
            },
            // 物流管理
            {
                path: "operationViewLogistics", // 查看物流
                name: "operationViewLogistics",
                meta: {
                    hideInMenu: true,
                    title: '查看物流',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationViewLogistics.vue"),
            },
            {
                path: "operationOrderDispatchCar", // 订单派车
                name: "operationOrderDispatchCar",
                meta: {
                    hideInMenu: true,
                    title: '订单派车',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationOrderDispatchCar.vue"),
            },
            {
                path: "operationLogisticsCarsManagement", // 车辆管理
                name: "operationLogisticsCarsManagement",
                meta: {
                    hideInMenu: true,
                    title: '车辆管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationLogisticsCarsManagement.vue"),
            },
            {
                path: "operationLogisticsVehicleManagement", // 车辆添加
                name: "operationLogisticsVehicleManagement",
                meta: {
                    hideInMenu: true,
                    title: '车辆添加',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationLogisticsVehicleManagement.vue"),
            },
            {
                path: "operationLogisticsAdditionManagement", // 车辆新增
                name: "operationLogisticsAdditionManagement",
                meta: {
                    hideInMenu: true,
                    title: '车辆新增',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationLogisticsAdditionManagement.vue"),
            },
            {
                path: "operationLogisticsDriverManagement", // 司机管理
                name: "operationLogisticsDriverManagement",
                meta: {
                    hideInMenu: true,
                    title: '司机管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationLogisticsManagement/operationLogisticsDriverManagement.vue"),
            },
            // 审核管理
            {
                path: "operationSettledAudit", // 入驻审核
                name: "operationSettledAudit",
                meta: {
                    hideInMenu: true,
                    title: '入驻审核',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAudit/operationSettledAudit.vue"),
            },
            {
                path: "operationProductAudit", // 商品审核
                name: "operationProductAudit",
                meta: {
                    hideInMenu: true,
                    title: '商品审核',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAudit/operationProductAudit.vue"),
            },
            {
                path: "operationDeliciousFood", // 美食审核
                name: "operationDeliciousFood",
                meta: {
                    hideInMenu: true,
                    title: '商品审核',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAudit/operationDeliciousFood.vue"),
            },
            // 物业管理
            {
                path: "operationPropertyManage", // 物业管理
                name: "operationPropertyManage",
                meta: {
                    hideInMenu: true,
                    title: '物业管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationPropertyManage/operationPropertyManage.vue"),
            },
             // 物业管理
             {
                path: "operationImportManage", // 物业管理
                name: "operationImportManage",
                meta: {
                    hideInMenu: true,
                    title: '物业管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationPropertyManage/operationImportManage.vue"),
            },
            // 报表管理
            {
                path: "operationTradeReport", // 交易报表
                name: "operationTradeReport",
                meta: {
                    hideInMenu: true,
                    title: '交易报表',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationReportManage/operationTradeReport/operationTradeReport.vue"),
            },
            {
                path: "operationMerchantTradeReport", // 商户交易报表
                name: "operationMerchantTradeReport",
                meta: {
                    hideInMenu: true,
                    title: '商户交易报表',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationReportManage/operationMerchantTradeReport/operationMerchantTradeReport.vue"),
            },
            {
                path: "operationPropertyReport", // 物业报表
                name: "operationPropertyReport",
                meta: {
                    hideInMenu: true,
                    title: '物业报表',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationReportManage/operationPropertyReport/operationPropertyReport.vue"),
            },
            // 信息管理
            {
                path: "operationInfoRelease", // 信息发布
                name: "operationInfoRelease",
                meta: {
                    hideInMenu: true,
                    title: '信息发布',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/operationInfoRelease/operationInfoRelease.vue"),
            },
            {
                path: "warehouseManagement", // 仓库管理
                name: "warehouseManagement",
                meta: {
                    hideInMenu: true,
                    title: '仓库管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/warehouseManagement/warehouseManagement.vue"),
            },
            {
                path: "drugClassification", // 药品分类
                name: "drugClassification",
                meta: {
                    hideInMenu: true,
                    title: '仓库管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/drugClassification/drugClassification.vue"),
            },
            {
                path: "drugManagement", // 药品管理
                name: "drugManagement",
                meta: {
                    hideInMenu: true,
                    title: '药品管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/drugManagement/drugManagement.vue"),
            },
            {
                path: "mechanicalClassification", // 机械分类
                name: "mechanicalClassification",
                meta: {
                    hideInMenu: true,
                    title: '药械分类',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/mechanicalClassification/mechanicalClassification.vue"),
            },
            {
                path: "medicineManagement", // 药械管理
                name: "medicineManagement",
                meta: {
                    hideInMenu: true,
                    title: '药械管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/medicineManagement/medicineManagement.vue"),
            },
            {
                path: "dataDictionary", //数据字典
                name: "dataDictionary",
                meta: {
                    hideInMenu: true,
                    title: "数据字典",
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/dataDictionary/dataDictionary.vue")
            },
            {
                path: "Classification", //商城分类
                name: "Classification",
                meta: {
                    hideInMenu: true,
                    title: "商城分类",
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/Classification/Classification.vue")
            },
            {
                path: "operationAboutus", //关于我们
                name: "operationAboutus",
                meta: {
                    hideInMenu: true,
                    title: "关于我们",
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/operationAboutus/operationAboutus.vue")
            },
            {
                path: "Systemreference", //系统参数
                name: "Systemreference",
                meta: {
                    hideInMenu: true,
                    title: "系统参数",
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationInfoManage/Systemreference/Systemreference.vue")
            },
            // 账号管理
            {
                path: "operationAccountManage", // 权限账号管理
                name: "operationAccountManage",
                meta: {
                    hideInMenu: true,
                    title: '权限账号管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAccountManage/operationAccountManage.vue"),
            },
            {
                path: "operationRoleManagement", // 角色管理
                name: "operationRoleManagement",
                meta: {
                    hideInMenu: true,
                    title: '角色管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAccountManage/operationRoleManagement/operationRoleManagement.vue"),
            },
            {
                path: "operationLoginLog", // 登陆日志
                name: "operationLoginLog",
                meta: {
                    hideInMenu: true,
                    title: '登录日志',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAccountManage/operationLoginLog/operationLoginLog.vue"),
            },
            {
                path: "operationAccountSecurity", // 账号安全
                name: "operationAccountSecurity",
                meta: {
                    hideInMenu: true,
                    title: '账号安全',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAccountManage/operationAccountSecurity/operationAccountSecurity.vue"),
            },
            {
                path: "operationAccessManage", // 接入管理
                name: "operationAccessManage",
                meta: {
                    hideInMenu: true,
                    title: '接入管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationAccountManage/operationAccessManage/operationAccessManage.vue"),
            },
            // 用户管理
            {
                path: "operationSupplierManage", // 供应商管理
                name: "operationSupplierManage",
                meta: {
                    hideInMenu: true,
                    title: '供应商管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationUserManage/operationSupplierManage/operationSupplierManage.vue"),
            },
            {
                path: "operationPurchaserManage", // 采购商管理
                name: "operationPurchaserManage",
                meta: {
                    hideInMenu: true,
                    title: '采购商管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationUserManage/operationPurchaserManage/operationPurchaserManage.vue"),
            },
            {
                path: "operationRegulatoryAuthorityManagement", // 监管机构管理
                name: "operationRegulatoryAuthorityManagement",
                meta: {
                    hideInMenu: true,
                    title: '监管机构管理',
                    notCache: true,
                },
                component: () =>
                    import ("@/views/platformViews/operationPlatform/operationUserManage/operationRegulatoryAuthorityManagement/operationRegulatoryAuthorityManagement.vue"),
            },

        ]
    },
]