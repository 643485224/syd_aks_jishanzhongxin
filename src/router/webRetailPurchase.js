// 零购用户-个人中心路由
export let webRetailPurchaseRoute = [{
    //首页
    path: 'webRetailPurchaseHome',
    name: 'webRetailPurchaseHome',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailPurchaseHome/webRetailPurchaseHome.vue'),
  },

  // ---------------------------------------------我的订单------------------------------------------------
  { //我的订单
    path: 'webRetailMyOrder',
    name: 'webRetailMyOrder',
    meta: {
      hideInMenu: true,
      title: '我的订单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailMyOrder/webRetailMyOrder.vue'),
  },
  { //我的订单=>评价晒单
    path: 'webRetailMyOrder/itemEvaluate',
    name: 'webRetailMyOrder/itemEvaluate',
    meta: {
      hideInMenu: true,
      title: '评价晒单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemEvaluate/itemEvaluate.vue'),
  },
  { //我的订单=>订单详情
    path: 'webRetailMyOrder/itemderDetail',
    name: 'webRetailMyOrder/itemderDetail',
    meta: {
      hideInMenu: true,
      title: '订单详情',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemDetail/itemderDetail.vue'),
  },
  { // 我的订单=>订单详情=>查看物流
    path: 'webRetailMyOrder/itemderDetail/itemLogistics',
    name: 'webRetailMyOrder/itemderDetail/itemLogistics',
    meta: {
      hideInMenu: true,
      title: '查看物流',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemLogistics/itemLogistics.vue'),
  },
  { // 我的订单=>订单详情=>申请退货
    path: 'webRetailMyOrder/itemderDetail/itemReturnGoods',
    name: 'webRetailMyOrder/itemderDetail/itemReturnGoods',
    meta: {
      hideInMenu: true,
      title: '申请退货',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemReturnGoods/itemReturnGoods.vue'),
  },

  { // 我的订单=>订单详情=>评价晒单
    path: 'webRetailMyOrder/itemderDetail/itemEvaluate',
    name: 'webRetailMyOrder/itemderDetail/itemEvaluate',
    meta: {
      hideInMenu: true,
      title: '评价晒单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemEvaluate/itemEvaluate.vue'),
  },

  // ---------------------------------------------评价晒单------------------------------------------------
  { //评价晒单列表
    path: 'webRetailEvaluationSheet',
    name: 'webRetailEvaluationSheet',
    meta: {
      hideInMenu: true,
      title: '评价晒单列表',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailEvaluationSheet/webRetailEvaluationSheet.vue'),
  },
  { //评价晒单列表=>评价晒单
    path: 'webRetailEvaluationSheet/itemEvaluate',
    name: 'webRetailEvaluationSheet/itemEvaluate',
    meta: {
      hideInMenu: true,
      title: '评价晒单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemEvaluate/itemEvaluate.vue'),
  },
  { //评价晒单列表=>追评
    path: 'webRetailEvaluationSheet/itemFollowUpComments',
    name: 'webRetailEvaluationSheet/itemFollowUpComments',
    meta: {
      hideInMenu: true,
      title: '评价晒单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemFollowUpComments/itemFollowUpComments.vue'),
  },
  { //评价晒单列表=>订单详情
    path: 'webRetailEvaluationSheet/itemderDetail',
    name: 'webRetailEvaluationSheet/itemderDetail',
    meta: {
      hideInMenu: true,
      title: '订单详情',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemDetail/itemderDetail.vue'),
  },
  { // 评价晒单列表=>订单详情=>查看物流
    path: 'webRetailEvaluationSheet/itemderDetail/itemLogistics',
    name: 'webRetailEvaluationSheet/itemderDetail/itemLogistics',
    meta: {
      hideInMenu: true,
      title: '查看物流',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemLogistics/itemLogistics.vue'),
  },
  { // 评价晒单列表=>订单详情=>申请退货
    path: 'webRetailEvaluationSheet/itemderDetail/itemReturnGoods',
    name: 'webRetailEvaluationSheet/itemderDetail/itemReturnGoods',
    meta: {
      hideInMenu: true,
      title: '申请退货',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemReturnGoods/itemReturnGoods.vue'),
  },

  { // 评价晒单列表=>订单详情=>评价晒单
    path: 'webRetailEvaluationSheet/itemderDetail/itemEvaluate',
    name: 'webRetailEvaluationSheet/itemderDetail/itemEvaluate',
    meta: {
      hideInMenu: true,
      title: '评价晒单',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/components/itemEvaluate/itemEvaluate.vue'),
  },

  // ---------------------------------------------我的常购商品------------------------------------------------
  { //我的常购商品
    path: 'webRetailFrequentlyPurchased',
    name: 'webRetailFrequentlyPurchased',
    meta: {
      hideInMenu: true,
      title: '我的常购商品',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailFrequentlyPurchased/webRetailFrequentlyPurchased.vue'),
  },
  {
    path: 'webRetailShoppingCart', //我的购物车
    name: 'webRetailShoppingCart',
    meta: {
      hideInMenu: true,
      title: '我的购物车',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailShoppingCart/webRetailShoppingCart.vue'),
  },
  {
    path: 'cartPayment', //购物车 结算页
    name: 'cartPayment',
    meta: {
      hideInMenu: true,
      title: '结算页',
      notCache: true,
    },
    component: () => import( /* webpackChunkName: "cartPayment" */ '../views/webPersonalCenter/retailPurchase/webRetailShoppingCart/cartPayment/cartPayment.vue'),
  },

  {
    path: 'webRetailProductsConcerned', //关注的商品
    name: 'webRetailProductsConcerned',
    meta: {
      hideInMenu: true,
      title: '关注的商品',
      notCache: true,
      type: 'goods'
    },
    component: () => import( /* webpackChunkName: "webRetailPurchaseHome" */ '../views/webPersonalCenter/retailPurchase/webRetailProductsConcerned/webRetailProductsConcerned.vue'),
  }, {
    path: 'webRetailShopsConcerned', //关注的店铺
    name: 'webRetailShopsConcerned',
    meta: {
      hideInMenu: true,
      title: '关注的店铺',
      notCache: true,
      type: 'shop'

    },
    component: () => import( /* webpackChunkName: "webRetailPurchaseHome" */ '../views/webPersonalCenter/retailPurchase/webRetailProductsConcerned/webRetailProductsConcerned.vue'),
  },
  {
    path: 'webRetailLnformation', //个人信息
    name: 'webRetailLnformation',
    meta: {
      hideInMenu: true,
      title: '个人信息',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailLnformation/webRetailLnformation.vue'),
  }, {
    path: 'webRetailShipToAddress', //收货地址
    name: 'webRetailShipToAddress',
    meta: {
      hideInMenu: true,
      title: '收货地址',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailShipToAddress/webRetailShipToAddress.vue'),
  }, {
    path: 'webRetailAccountBinding', //账号绑定
    name: 'webRetailAccountBinding',
    meta: {
      hideInMenu: true,
      title: '账号绑定',
      notCache: true,
    },
    component: () => import('../views/webPersonalCenter/retailPurchase/webRetailAccountBinding/webRetailAccountBinding.vue'),
  },
]
