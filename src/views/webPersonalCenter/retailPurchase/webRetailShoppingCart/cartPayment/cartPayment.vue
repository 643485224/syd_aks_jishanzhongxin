<template>
  <div class="page-container cart-payment">
    <el-steps class="steps" :active="activeStep" finish-status="success" align-center>
      <el-step title="1.我的购物车"></el-step>
      <el-step title="2.填写核对订单信息"></el-step>
      <el-step title="3.成功提交订单"></el-step>
    </el-steps>
    <!-- 核对订单信息 -->
    <div class="title">填写核对订单信息</div>
    <div class="check-order">
      <!-- 收货地址 -->
      <div class="consignee-info">
        <div class="info-header">
          <div class="title">收货人信息</div>
          <el-button type="text" @click="toAddAddress">+新增收货地址</el-button>
        </div>
        <div class="info-content">
          <div class="consignee">{{ addressInfo.consignee }}</div>
          <span class="address">{{ addressInfo.address }}
            &nbsp;{{ addressInfo.phone }}</span>
          <span class="phone">{{ addressInfo.contactPhone }}</span>
          <el-tag type="info" size="mini" class="ml_10" v-if="addressInfo.isDefault == 1">默认地址</el-tag>
        </div>
      </div>

      <div class="order-list">
        <div class="title">送货清单</div>
        <div class="list">
          <div class="list-item" v-for="item in goodsList" :key="item.goodsId">
            <img class="cover mr_10" :src="item.mallPicture" alt="">
            <div class="name">{{ item.mallName }}</div>
            <div class="price">￥{{ item.buyPrice }}</div>
            <div class="count">x{{ item.quantity }}</div>
            <div class="amount">￥{{ item.subtotal }}</div>
          </div>
        </div>
      </div>
      <div class="price-info">
        <div class="info-top">
          <div class="count"><span class="label">商品数量：</span> {{ goodsCount }}</div>
          <div class="amount"><span class="label">商品金额：</span>￥{{ totalAmount }}</div>
          <div class="transportfee"><span class="label">合计运费：</span>￥12.00</div>
        </div>
        <div class="pay-consignee">
          <div class="payprice">应付金额：<span class="c_ff480e"><span class="payprice-num ">￥{{ totalAmount }}</span>元</span>
          </div>
          <div class="consignee ">配送至：{{ addressInfo.address }} <span class="ml_10 mr_10">收货人:{{ addressInfo.consignee }}</span>
            <span>{{ addressInfo.phone }}</span>
          </div>
        </div>
        <el-button class="submit-btn">提交订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDefaultAddress,
  buyerTranManagerAddOrder,
  buyerTranManagerPayment,
  lsoneKeyBuy,
  buyerTranManagerPayValidate,
  buyerTranManagerOnlinePayAmount,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import { payCaptcha } from "@/api/aksApi/platformApi/loginApi";
export default {
  data() {
    return {
      activeStep: 2,
      addressInfo: {},
      orderParams: {},// 查询订单数据携带参数
      goodsList: [],
      goodsCount: 0,// 商品数量
      totalAmount: 0,// 总金额
      receivingAddressInformation: {}, //收货地址信息
    }
  },
  created() {
    this.orderParams = this.$route.params.valueData;
    this.getOrderInfo()
    this.getAddress()
  },
  watch: {
    amount() {
      console.log(this.goodsList.reduce((prev, current, index, arr) => current.buyPrice, 0));
      return this.goodsList.reduce((prev, current, index, arr) => current.buyPrice, 0)
    }
  },
  methods: {
    // 获取订单数据-接口
    getOrderInfo() {
      console.log(this.orderParams);
      lsoneKeyBuy(this.orderParams)
        .then((res) => {
          if (res.code == 200) {
            console.log(res.data);
            let data = res.data;
            this.goodsCount = data.goodsCount;
            this.totalAmount = data.totalAmount;
            this.goodsList = []
            data.cartList.forEach(item => {
              this.goodsList.push(...item.retailCartGoodsVo)
            })
            console.log(this.goodsList);

          } else {
            console.log(res.message);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    // 获取采购商默认地址-接口
    getAddress() {
      getDefaultAddress()
        .then((res) => {
          if (res.code == 200) {
            console.log(res.data);
            this.addressInfo = res.data;
            this.addressInfo.address = this.addressInfo.areacode && this.addressInfo.areacode.replace(/,/g, '') + this.addressInfo.address
          } else {
            console.log(res.message);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    toAddAddress() {
      this.$router.push({ name: 'webRetailShipToAddress' })
    }
  },
}
</script>
<style lang="scss" scoped>
@import "./cartPayment.scss";
</style>
