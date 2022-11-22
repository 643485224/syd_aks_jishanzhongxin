<template>
  <!-- 我的购物车页 -->
  <div ref="contentBox" class="page-container table-page">
    <cu-animation ref="cu_animation" :type="'slideInRight'" :time="0.5">
      <div>
        <CartGoods :tableLoading="tableLoading" @chosetableLoading="chosetableLoading"
         v-if="activeStatus" :goodsCate="activeStatus"  @generateOrder="generateOrder"></CartGoods>
      </div>
    </cu-animation>
  </div>
</template>
<script>
import CartGoods from "./components/cartGoods.vue";
export default {
  components: {
    CartGoods
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
      elInputNumberShow: true, //重新渲染数字输入框使用

      timesss: 3,
      carId:null,// 购物车 id
    };
  },

  mounted() {
  },
  methods: {
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
    generateOrder({valueData}){
      console.log(valueData);
      this.$router.push({name:'cartPayment',params:{valueData}})
    },

    // 改变加载中值
    chosetableLoading(value) {
      this.tableLoading = value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./webRetailShoppingCart.scss";
</style>
