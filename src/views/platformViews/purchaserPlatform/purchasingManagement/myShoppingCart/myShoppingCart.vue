<template>
  <!-- 我的购物车页 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="trade-tabs">
      <el-tabs v-model="activeStatus" @tab-click="activeNameClick">
        <!-- 1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消") -->
        <el-tab-pane label="我的购物车(药品)" name="1"></el-tab-pane>
        <el-tab-pane label="我的购物车(器械)" name="2"></el-tab-pane>
        <el-tab-pane label="其它商品" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <cu-animation ref="cu_animation" :type="'slideInRight'" :time="0.5">
      <div class="mt_20">
        <el-button
          class="btn_156CC2 mr_10"
          type="primary"
          @click="addItemButton()"
          >添加商品</el-button
        >
      </div>
      <div>
        <CartGoods
          :tableLoading="tableLoading"
          @chosetableLoading="chosetableLoading"
          v-if="activeStatus"
          :goodsCate="activeStatus"
          :tableData="tableData"
          @generateOrder="generateOrder"
        ></CartGoods>
      </div>
    </cu-animation>

    <addItem
      v-if="addItemVisible"
      :ifDisabled="addItemIfDisabled"
      :typeSelcet="addItemTypeSelcet"
      :addItemVisible="addItemVisible"
      @addItemHandleClose="addItemHandleClose"
      @addItemHandleOk="addItemHandleOk"
    >
    </addItem>

    <!-- 生成采购弹框组件 -->
    <generateOrder
      v-if="generateOrderVisible"
      :generateOrderVisible="generateOrderVisible"
      @generateOrderHandleClose="generateOrderHandleClose"
      :listItem="listItem"
    ></generateOrder>
  </div>
</template>
<script>
import CountUp from "vue-countup-v2";
import {
  cartGetShopCarPage,
  cartBatchDelCart,
  cartAddCartInfo,
  cartChangeCartQuantity,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import addItem from "../components/addItem/addItem.vue";
import generateOrder from "../components/generateOrder/generateOrder.vue";
import CartGoods from "./components/cartGoods.vue";
export default {
  components: {
    CountUp,
    addItem,
    generateOrder,
    CartGoods,
  },
  data() {
    return {
      basicPropertyList: {
        1: "基础药",
        2: "非基础药",
      },
      min: "",
      sec: "",
      activeStatus: "1", //我的购物车(器械) 我的购物车(药品)
      commodityCategory: 0, //商品种类
      commodityQuantity: 0, //商品数量
      commodityTotalPrice: 0, //商品总价
      tableHeader1: [
        // {
        //   title: "序号",
        //   key: "index",
        //   width: "80",
        //   align: "center",
        // },
        // {
        //   title: "通用名",
        //   slot: "commonName",
        // },
        {
          title: "商品",
          slot: "supplierName",
        },
        // {
        //   title: "商品名称",
        //   slot: "goodsName",
        // },
        // {
        //   title: "基础药/非基础药",
        //   slot: "basicProperty",
        // },
        // {
        //   title: "规格",
        //   key: "specification",
        // },
        // {
        //   title: "批准文号",
        //   key: "approvalNumber",
        // },
        // {
        //   title: "供应商名称",
        //   key: "supplierName",
        // },
        // {
        //   title: "生产企业",
        //   key: "manufacturer",
        // },

        {
          title: "单价",
          slot: "buyPrice",
          width: "180",
        },
        // {
        //   title: "剩余库存",
        //   key: "squantity",
        // },
        {
          title: "数量",
          slot: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
          width: "180",
        },
        {
          title: "小计",
          slot: "total",
          width: "180",
        },
      ], // 表格表头
      tableHeader2: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名称",
          slot: "goodsName",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "批准文号",
          key: "approvalNumber",
        },
        {
          title: "供应商名称",
          key: "supplierName",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },

        {
          title: "采购价",
          key: "buyPrice",
        },
        {
          title: "剩余库存",
          key: "squantity",
        },
        {
          title: "数量",
          slot: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
          width: "180",
        },
      ], // 表格表头
      tableData: [], // 表格内容
      handleSelectionData: [], // 表格内容选中数据
      tableLoading: false, //表格加载中
      options: {
        startVal: 0, //开始时的值
        duration: 2, //持续多久 单位是秒
        useEasing: true,
        useGrouping: true,
        separator: ",", //千分位
        decimal: ".",
        decimalPlaces: 0, //控制小数位数
        prefix: "￥", //开头拼接
        suffix: "元", //末尾拼接
      },
      delay: 10, //延迟
      addItemVisible: false, // 添加商品弹框
      addItemIfDisabled: false, //是否置会添加商品的搜索
      addItemTypeSelcet: 1, //进入添加商品直接查询 1药品 2药械

      generateOrderVisible: false, //开启关闭生成订单弹框组件
      listItem: {}, //生成订单弹框组件传入数据
      elInputNumberShow: true, //重新渲染数字输入框使用

      timesss: 3,
      carId: null, // 购物车 id
    };
  },

  mounted() {},
  methods: {
    // 添加商品按钮
    addItemButton() {
      if (this.activeStatus == "2") {
        this.addItemTypeSelcet = 2; //进入添加商品直接查询 1药品 2药械
      } else if (this.activeStatus == "1") {
        this.addItemTypeSelcet = 1; //进入添加商品直接查询 1药品 2药械
      } else if (this.activeStatus == "3") {
        this.addItemTypeSelcet = 3; //进入添加商品直接查询 1药品 2药械
      }
      this.addItemIfDisabled = true; //置灰
      this.addItemVisible = true;
    },
    // 新增购物车信息-接口
    cartAddCartInfoApi(value) {
      cartAddCartInfo(value)
        .then((res) => {
          if (res.code == 200) {
            this.addItemVisible = false;
            this.activeStatus = null; // v-if 控制显示调用查询
            setTimeout(() => {
              this.activeStatus = "1";
            }, 250);
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 添加商品弹框-取消按钮
    addItemHandleClose(type) {
      this.addItemTypeSelcet = type;
      this.addItemVisible = false;
    },
    // 添加商品弹框-确定按钮
    addItemHandleOk(value, type) {
      this.addItemTypeSelcet = type;

      let goodsCategoryCount = value.length; //商品种类
      let goodsCount = 0; //商品数量
      let amount = 0; //商品总价
      value.forEach((element) => {
        amount = amount + element.quantity * element.buyPrice; //商品总价
        goodsCount = goodsCount + element.quantity; //商品数量

        element.goodsCategoryCount = goodsCategoryCount;
        element.goodsCount = goodsCount;
        element.amount = amount;
      });

      this.cartAddCartInfoApi(value);
    },
    // 动画重置
    platformChange() {
      this.$refs.cu_animation.again();
    },
    // 数字动画重置
    onReady: function (instance, CountUp) {
      const that = this;
      instance.update(that.commodityTotalPrice);
    },
    // tabs标签点击
    activeNameClick() {
      this.platformChange(); // 动画重置
    },
    // 生成订单按钮
    generateOrder({ carId, goodsType, idList }) {
      console.log(idList);
      this.listItem = {
        id: carId, // 业务id  采购单id/购物车id,
        goodsType: goodsType, ////判断订单类型 药品/器械
        goodsIdList: idList, ////判断订单类型 药品/器械
      };
      this.generateOrderVisible = true;
    },
    // 生成订单弹框-取消按钮
    generateOrderHandleClose(value) {
      this.generateOrderVisible = value;
      this.activeStatus = null; // v-if 控制显示调用查询
      this.activeStatus = "1";
    },

    // 改变加载中值
    chosetableLoading(value) {
      this.tableLoading = value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./myShoppingCart.scss";
</style>
