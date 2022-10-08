import Vue from "vue";
import VueRouter from "vue-router";
import {
  operationRoute
} from "./operation.js";
import {
  purchaserRoute
} from "./purchaser.js"
import {
  supplierRoute
} from "./supplier.js"
const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
console.log("operationRoute:", operationRoute);
console.log("purchaserRoute:", purchaserRoute);
console.log("supplierRoute:", supplierRoute);
// 设计理念-分两种模式： 网页模式  后台管理模式 可以相互切换
const routes = [
  // 网页模式
  {
    path: '/',
    name: 'webMain',
    component: () => import('../views/webpageViews/webMain'), //入口
    redirect: "/webHomePage", //重定向到网页首页
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
        path: '/webHomePage', // 首页
        name: 'webHomePage',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import("../views/webpageViews/webHomePage/webHomePage.vue"),
      },
      {
        path: "/webEntrepot", //集散中心
        name: "webEntrepot",
        component: () => import("../views/webpageViews/webEntrepot/webEntrepot.vue"),
      },
      {
        path: "/webCentralTransaction", //中心交易
        name: "webCentralTransaction",
        component: () => import("../views/webpageViews/webCentralTransaction/webCentralTransaction.vue"),
      },
      {
        path: "/webIndustrySupervision", //工业监管
        name: "webIndustrySupervision",
        component: () => import("../views/webpageViews/webIndustrySupervision/webIndustrySupervision.vue"),
      },
      {
        path: "/webUnderConstruction", //建设中
        name: "webUnderConstruction",
        component: () => import("../views/webpageViews/webUnderConstruction/webUnderConstruction.vue"),
      },
      {
        path: "/webTradingMall", // 交易商城
        name: "webTradingMall",
        component: () => import("../views/webpageViews/webTradingMall/webTradingMall.vue"),
      },
      {
        path: "/webNoticeAndAnnouncement", // 通知公告
        name: "webNoticeAndAnnouncement",
        component: () => import("../views/webpageViews/webNoticeAndAnnouncement/webNoticeAndAnnouncement.vue"),
      },
      {
        path: "/webPoliciesAndRegulations", // 政策法规
        name: "webPoliciesAndRegulations",
        component: () => import("../views/webpageViews/webPoliciesAndRegulations/webPoliciesAndRegulations.vue"),
      },
      {
        path: "/webFinancialService", // 金融服务
        name: "webFinancialService",
        component: () => import("../views/webpageViews/webFinancialService/webFinancialService.vue"),
      },
      {
        path: "/webPartyBuildingCulture", // 党建文化
        name: "webPartyBuildingCulture",
        component: () => import("../views/webpageViews/webPartyBuildingCulture/webPartyBuildingCulture.vue"),
      },
      {
        path: "/textDetails", // 商城平台-文本类详情组件
        name: "textDetails",
        component: () => import("../views/webpageViews/components/textDetails/textDetails.vue"),
      },
    ]
  },

  // 后台管理模式->三个平台：运营平台 采购商平台 供应商平台
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Login/Login.vue"),
  },
  {
    path: '/password',
    name: 'password',
    meta: {
      title: '找回密码',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Password/Password.vue"),
  },
  {
    path: '/admin/login',
    name: 'operatelogin',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/operateLogin/operateLogin.vue"),
  },

  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Register/Register.vue"),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/platformViews/main'), //入口
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      ...operationRoute,
      ...purchaserRoute,
      ...supplierRoute,
    ]
  },
  {
    path: "/operationStatistics", // 运营数据展板
    name: "operationStatistics",
    meta: {
      hideInMenu: true,
      title: '运营数据展板',
      notCache: true,
      isHeaderNav: true
    },
    component: () =>
      import("@/views/platformViews/operationStatistics/operationStatistics.vue"),
  },





];
// routes.push(...operationRoute)
// routes.push(...purchaserRoute)
const router = new VueRouter({
  routes,
});
// 性能优化-路由跳转的时候清空上一次页面的所有请求
window._axiosPromiseArr = []
router.beforeEach((to, from, next) => {
  window._axiosPromiseArr.forEach((ele, index) => {
    ele.cancel()
    delete window._axiosPromiseArr[index]
  })
  next()
})

export default router;
