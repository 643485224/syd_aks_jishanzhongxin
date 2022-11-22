/**
 *  零购用户-个人中心相关接口v1.0  -> 业务接口 （需要权限）
 */
import {
  http,
  baseURL
} from "@/api/conf/index-json";
import Qs from 'qs'

// 首页-读取客户基本信息
export const getBuyerBaseInfo = (params = {}) => {
  return http.get(`${baseURL}/buyer/retail/homePage/getBuyerBaseInfo`,
      params
    )
    .then(res => res.data)
}
//首页-订单待办数量
export const getAgencyOrderQuantity = (params = {}) => {
  return http.get(`${baseURL}/buyer/retail/homePage/getAgencyOrderQuantity`,
      params
    )
    .then(res => res.data)
}

//首页-获取采购商关注
export const getBuyerFollow = (params = {}) => {
  return http.get(`${baseURL}/buyer/retail/homePage/getBuyerFollow`,
      params
    )
    .then(res => res.data)
}
//首页-为你推荐
export const recommendGoods = (params = {}) => {
  return http.get(`${baseURL}/buyer/retail/homePage/recommendGoods`, {
      params
    })
    .then(res => res.data)
}
//首页-为你推荐
export const frequentlyPurcha = (params = {}) => {
  return http.get(`${baseURL}/buyer/retail/homePage/frequentlyPurchased`, {
      params
    })
    .then(res => res.data)
}
//地址管理-获取收货地址列表
export const getAddressList = (params = {}) => {
  return http.get(`${baseURL}/customerAddress/getAddressList`,
      params
    )
    .then(res => res.data)
}
//地址管理-获取收货默认地址
export const getDefaultAddress = (params = {}) => {
  return http.get(`${baseURL}/customerAddress/getDefaultAddress`,
      params
    )
    .then(res => res.data)
}
//地址管理-获取收货默认地址
export const setDefaultAddress = (params = {}) => {
  return http.post(`${baseURL}/customerAddress/setDefaultAddress/${params}`)
    .then(res => res.data)
}
//地址管理-编辑收货地址
export const getditAddress = (params = {}) => {
  return http.post(`${baseURL}/customerAddress/editAddress`, params)
    .then(res => res.data)
}
//地址管理-新增收货地址
export const getaddAddress = (params = {}) => {
  return http.post(`${baseURL}/customerAddress/addAddress`, params)
    .then(res => res.data)
}
//地址管理-删除收货地址
export const getdelAddress = (params = {}) => {
  return http.post(`${baseURL}/customerAddress/delAddress/${params}`)
    .then(res => res.data)
}

// 购物车 => 购物车列表
export const getMyCartList = () => {
  return http.get(`${baseURL}/customer-cart/getMyCartList`).then(res => res.data)
};

// 购物车 => 删除购物车商品
export const lsCartDel = (cartId) => {
  return http
    .delete(`${baseURL}/customer-cart/delCart/${cartId}`)
    .then(res => res.data)
};
// 加入购物车（零售）
export const customerCartAddRetailCart = (params = {}) => {
  return http.post(`${baseURL}/customer-cart/addRetailCart`, params)
    .then(res => res.data)
}

// 购物车 => 批量删除购物车商品
export const cartBatchDelCart = (params = {}) => {
  return http
    .delete(`${baseURL}/customer-cart/batchDelCart${params}`)
    .then(res => res.data)
};

// 购物车 => 结算数据查询
export const lsoneKeyBuy = (params = {}) => {
  return http
    .get(`${baseURL}/customer-cart/oneKeyBuy${params}`)
    .then(res => res.data)
}

// 购物车 => 加入关注
export const lsfollow = (goodsId, goodsType) => {
  return http
    .post(`${baseURL}/customer-cart/follow?goodsType=${goodsType}&goodsId=${goodsId}`)
    .then(res => res.data)
}
// 购物车 => 取消关注
export const lscancelFollow = (goodsId, goodsType) => {
  return http
    .post(`${baseURL}/customer-cart/cancelFollow?goodsType=${goodsType}&goodsId=${goodsId}`)
    .then(res => res.data)
}


// 关注中心 => 读取关注分类
export const getFollowClassification = () => {
  return http
    .get(`${baseURL}/buyer/retail/follow/goods/getFollowClassification`)
    .then(res => res.data)
}



// 关注中心 => 关注商品列表查询
export const queryFollowList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/retail/follow/goods/queryFollowList`, {
      params
    })
    .then(res => res.data)
}


// 关注中心 => 关注店铺列表查询
export const getFollowShopList = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/retail/follow/shop/getFollowShopList`, {
      params
    })
    .then(res => res.data)
}

// 关注中心 => 读取关注店铺下商品
export const getGoodsListByFollowShop = (params = {}) => {
  return http
    .get(`${baseURL}/buyer/retail/follow/shop/getFollowGoodsList`, {
      params
    })
    .then(res => res.data)
}

// 关注中心 => 读取关注店铺下商品
export const followGoodsinsertCart = (id) => {
  return http
    .post(`${baseURL}/buyer/retail/follow/goods/insertCart?id=${id}`)
    .then(res => res.data)
}
//中心商城-加入购物车
export const insertCart = (params = {}) => {
  return http
    .post(`${baseURL}/buyer/retail/follow/goods/insertCart`, {
      params
    })
    .then(res => res.data)
}


///个人中心-获取个人信息
export const getPersonalDetails = () => {
  return http.get(`${baseURL}/customer/getPersonalDetails`).then(res => res.data)
};
///个人中心-编辑个人信息
export const editPersonalDetails = (params = {}) => {
  return http.post(`${baseURL}/customer/editPersonalDetails`, params)
    .then(res => res.data)
}

// 订单中心 => 待评价列表
export const orderCenterBeEvaluatedList = (params = {}) => {
  return http
    .get(`${baseURL}/order-center/beEvaluatedList?${Qs.stringify(params)}`)
    .then(res => res.data)
};
// 订单中心 => 待追评列表
export const orderCenterBeReviewedList = (params = {}) => {
  return http
    .get(`${baseURL}/order-center/beReviewedList?${Qs.stringify(params)}`)
    .then(res => res.data)
};
// 订单中心 => 已评价列表
export const orderCenterEvaluatedList = (params = {}) => {
  return http
    .get(`${baseURL}/order-center/evaluatedList?${Qs.stringify(params)}`)
    .then(res => res.data)
};
// 订单中心 => 评价
export const orderCenterSaveOrderLsEvaluate = (params = {}) => {
  return http
    .post(`${baseURL}/order-center/saveOrderLsEvaluate`, params)
    .then(res => res.data)
};
// 订单中心 => 订单详情
export const orderCenterSelectOrderDetail = (params = {}) => {
  return http
    .get(`${baseURL}/order-center/selectOrderDetail?${Qs.stringify(params)}`)
    .then(res => res.data)
};

// 订单中心 => 我的订单列表
export const orderCenterSelectOrderLsList = (params = {}) => {
  return http
    .get(`${baseURL}/order-center/selectOrderLsList?${Qs.stringify(params)}`)
    .then(res => res.data)
};
// 订单业务-下单
export const sysBuyerAddOrder = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/addOrder`, params)
    .then(res => res.data)
};

// 订单业务-零售订单申请取消订单
export const sysBuyerCancelOrder = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/cancelOrder`, params)
    .then(res => res.data)
};
// 订单业务-发货
export const sysBuyerGoodsShipped = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/goodsShipped`, params)
    .then(res => res.data)
};
// 订单业务-订单物流信息
export const sysBuyerOrderLogisticsList = (params = {}) => {
  return http
    .get(`${baseURL}/sys/buyer/orderLogisticsList?${Qs.stringify(params)}`)
    .then(res => res.data)
};
// 订单业务-零售订单评价
export const sysBuyerOrderRate = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/orderRate`, params)
    .then(res => res.data)
};
// 订单业务-支付
export const sysBuyerPayment = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/payment`, params)
    .then(res => res.data)
};
// 订单业务-收货
export const sysBuyerReceivingOrder = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/receivingOrder`, params)
    .then(res => res.data)
};
// 订单业务-零售订单申请退货
export const sysBuyerReturnOrder = (params = {}) => {
  return http
    .post(`${baseURL}/sys/buyer/returnOrder`, params)
    .then(res => res.data)
};
