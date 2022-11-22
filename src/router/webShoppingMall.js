export let webShoppingMallRoute = [{
    path: '/webHomePage', // 首页
    name: 'webHomePage',
    component: () => import( /* webpackChunkName: "webHomePage" */ '../views/webpageViews/webHomePage/webHomePage.vue'),
  },
  {
    path: "/webHomePageRegister", //首页-查看详情
    name: "webHomePageRegister",
    component: () => import( /* webpackChunkName: "webHomePageRegister" */ "../views/webpageViews/components/webHomePageRegister.vue"),
  },
  {
    path: "/webEntrepot", //集散中心
    name: "webEntrepot",
    component: () => import( /* webpackChunkName: "webEntrepot" */ "../views/webpageViews/webEntrepot/webEntrepot.vue"),
  },

  {
    path: "/webEntrepotRegister", //中心招商会员入驻
    name: "webEntrepotRegister",
    component: () => import( /* webpackChunkName: "webEntrepotRegister" */ "../views/webpageViews/webEntrepot/webEntrepotRegister/webEntrepotRegister.vue"),
  },
  {
    path: "/webEntrepotPropertyPayment", //物业缴费
    name: "webEntrepotPropertyPayment",
    component: () => import( /* webpackChunkName: "webEntrepotPropertyPayment" */ "../views/webpageViews/webEntrepot/webEntrepotPropertyPayment/webEntrepotPropertyPayment.vue"),
  },
  {
    path: "/webCentralTransaction", //中心交易
    name: "webCentralTransaction",
    component: () => import( /* webpackChunkName: "webCentralTransaction" */ "../views/webpageViews/webCentralTransaction/webCentralTransaction.vue"),
  },
  {
    path: "/webIndustrySupervision", //工业监管
    name: "webIndustrySupervision",
    component: () => import( /* webpackChunkName: "webIndustrySupervision" */ "../views/webpageViews/webIndustrySupervision/webIndustrySupervision.vue"),
  },
  {
    path: "/webUnderConstruction", //建设中
    name: "webUnderConstruction",
    component: () => import( /* webpackChunkName: "webUnderConstruction" */ "../views/webpageViews/webUnderConstruction/webUnderConstruction.vue"),
  },
  {
    path: "/webTradingMall", // 交易商城
    name: "webTradingMall",
    component: () => import( /* webpackChunkName: "webTradingMall" */ "../views/webpageViews/webTradingMall/webTradingMall.vue"),
  },
  {
    path: "/webTradingMallSearch", // 点击搜索框取到交易商城搜索
    name: "webTradingMallSearch",
    component: () => import( /* webpackChunkName: "webTradingMallSearch" */ "../views/webpageViews/webTradingMall/webTradingMallSearch/webTradingMallSearch.vue"),
  },
  {
    path: "/webTradingMall/webGoodsDetail", // 交易商城- 商品详情
    name: "/webTradingMall/webGoodsDetail",
    component: () => import( /* webpackChunkName: "webTradingMall" */ "../views/webpageViews/webTradingMall/webGoodsDetail/webGoodsDetail.vue"),
  },
  {
    path: "/webTradingMall/webFoodDetail", // 交易商城-美食详情
    name: "/webTradingMall/webFoodDetail",
    component: () => import( /* webpackChunkName: "webTradingMall" */ "../views/webpageViews/webTradingMall/webFoodDetail/webFoodDetail.vue"),
  },
  {
    path: "/webGoodsDetail/:type/:id", // 商品详情
    name: "webGoodsDetail",
    component: () => import( /* webpackChunkName: "webTradingMall" */ "../views/webpageViews/webTradingMall/webGoodsDetail/webGoodsDetail.vue"),
  },
  {
    path: "/webFoodDetail/:type/:id", // 美食详情
    name: "webFoodDetail",
    component: () => import( /* webpackChunkName: "webTradingMall" */ "../views/webpageViews/webTradingMall/webFoodDetail/webFoodDetail.vue"),
  },
  {
    path: "/webNoticeAndAnnouncement", // 通知公告
    name: "webNoticeAndAnnouncement",
    component: () => import( /* webpackChunkName: "webNoticeAndAnnouncement" */ "../views/webpageViews/webNoticeAndAnnouncement/webNoticeAndAnnouncement.vue"),
  },
  {
    path: "/webPoliciesAndRegulations", // 政策法规
    name: "webPoliciesAndRegulations",
    component: () => import( /* webpackChunkName: "webPoliciesAndRegulations" */ "../views/webpageViews/webPoliciesAndRegulations/webPoliciesAndRegulations.vue"),
  },
  {
    path: "/webFinancialService", // 金融服务
    name: "webFinancialService",
    component: () => import( /* webpackChunkName: "webFinancialService" */ "../views/webpageViews/webFinancialService/webFinancialService.vue"),
  },
  {
    path: "/webPartyBuildingCulture", // 党建文化
    name: "webPartyBuildingCulture",
    component: () => import( /* webpackChunkName: "webPartyBuildingCulture" */ "../views/webpageViews/webPartyBuildingCulture/webPartyBuildingCulture.vue"),
  },
  {
    path: "/textDetails", // 商城平台-文本类详情组件
    name: "textDetails",
    component: () => import( /* webpackChunkName: "textDetails" */ "../views/webpageViews/components/textDetails/textDetails.vue"),
  },
]
