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
import {
  webShoppingMallRoute
} from "./webShoppingMall.js"
import {
  webPurchaserRoute
} from "./webPurchaser.js"
import {
  webSupplierRoute
} from "./webSupplier.js"
import {
  webRetailPurchaseRoute
} from "./webRetailPurchase.js"
import {
  webSuperviseRoute
} from "./webSupervise.js"
const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
// 使用路由懒加载提高页面初次渲染时间
// 路由同步加载模式： 一次性加载了所以的js文件
// 路由懒加载模式：
//        1. 路由懒加载的页面文件打包的时候被单独打包了
//        2. 路由懒加载的页面文件不会被打包到主文件（首次页面加载的时候就不会加载没有访问到的页面文件）
// /* webpackChunkName: "" */ 语义化文件名，更好区分文件打包
// 设计理念-分两种模式： 网页模式  后台管理模式 可以相互切换
const routes = [{ //商城平台入口
    path: '/',
    name: 'webMain',
    component: () => import( /* webpackChunkName: "webMain" */ '../views/webpageViews/webMain.vue'),
    redirect: "/webHomePage", //重定向到网页首页
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      ...webShoppingMallRoute
    ]
  },
  { //个人中心入口 （采购商个人中心、供应商个人中心,零购用户个人中心）
    path: '/webPersonalMain',
    name: 'webPersonalMain',
    component: () => import('../views/webPersonalCenter/webPersonalMain'),
    children: [
      ...webPurchaserRoute,
      ...webSupplierRoute,
      ...webRetailPurchaseRoute,
    ]
  },
  { //监管入口 （药品监管、企业监管、药械监管）
    path: '/webSuperviseMain',
    name: 'webSuperviseMain',
    component: () => import('../views/webSupervise/webSuperviseMain'),
    children: [
      ...webSuperviseRoute
    ]
  },
  { //后台入口 （运营平台、采购商平台、供应商平台）
    path: '/main',
    name: 'main',
    component: () => import('../views/platformViews/main'),
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
    path: '/login', //登录页面
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Login/Login.vue"),
  },
  {
    path: '/admin/login', // 运营登录页面
    name: 'operatelogin',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/operateLogin/operateLogin.vue"),
  },
  {
    path: '/password', // 找回密码页面
    name: 'password',
    meta: {
      title: '找回密码',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Password/Password.vue"),
  },
  {
    path: '/register', // 注册页面
    name: 'register',
    meta: {
      title: '注册',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/Register/Register.vue"),
  },
  {
    path: '/RetailRegistration', // 用户注册页面
    name: 'RetailRegistration',
    meta: {
      title: '注册',
      hideInMenu: true
    },
    component: () => import("../views/platformViews/RetailRegistration/RetailRegistration.vue"),
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
  {
    path: "/payProperty", // 手机端支付页面
    name: "payProperty",
    component: () =>
      import("@/views/platformViews/payProperty/payProperty.vue"),
  },

];
// routes.push(...operationRoute)
// routes.push(...purchaserRoute)
const router = new VueRouter({
  routes,
});
// 性能优化-路由跳转的时候清空上一次页面的所有请求
window._axiosPromiseArr = []
/**
 * @param {to} 将要去的路由
 * @param {from} 出发的路由
 * @param {next} 执行下一步
 */
router.beforeEach((to, from, next) => {
  window._axiosPromiseArr.forEach((ele, index) => {
    ele.cancel()
    delete window._axiosPromiseArr[index]
  })
  next()
})

export default router;
