<template>
  <!-- 我的购物车页 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="trade-tabs">
      <el-tabs v-model="activeName" @tab-click="activeNameClick">
        <!-- 1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消") -->
        <el-tab-pane
          label="我的购物车(药品)"
          name="我的购物车(药品)"
        ></el-tab-pane>
        <el-tab-pane
          label="我的购物车(器械)"
          name="我的购物车(器械)"
        ></el-tab-pane>
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
        <el-button class="btn_ff480e" type="primary" @click="deleteButton()"
          >批量删除</el-button
        >
      </div>
      <div>
        <cu-table
          :selection="true"
          :showHeight="false"
          :showTitle="false"
          :showPagination="false"
          :loading="tableLoading"
          :tableHeader="
            activeName == '我的购物车(药品)' ? tableHeader1 : tableHeader2
          "
          :tableData="tableData"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #goodsName="value">
            {{ value.value.goodsName }}
            {{ value.value.productName }}
          </template>
          <template #basicProperty="value">
            {{ basicPropertyList[value.value.basicProperty] }}
          </template>
          <template #quantity="value">
            <el-input-number
              v-if="elInputNumberShow"
              :controls="true"
              v-model="value.value.quantity"
              :min="1"
              :precision="0"
              @change="
                quantityChange(
                  value.value.squantity,
                  value.value.quantity,
                  value.index
                )
              "
            ></el-input-number>
          </template>
        </cu-table>
      </div>
      <div class="flex_ac_jb">
        <div>
          <span class="mr_20">商品种类：{{ commodityCategory }}</span>
          <span>商品数量：{{ commodityQuantity }}</span>
        </div>
        <div class="flex_ac mt_20">
          <span>所有商品总价：</span>
          <span
            class="allNumber"
            style="
              font-size: 24px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 600;
              color: #ff480e;
            "
          >
            <CountUp
              :delay="delay"
              :endVal="commodityTotalPrice"
              :options="options"
              @ready="onReady"
            />
          </span>
          <el-button
            class="btn_ff480e ml_20"
            type="primary"
            @click="generateOrderButton()"
            >生成订单</el-button
          >
        </div>
      </div>
    </cu-animation>

    <addItem
      v-if="addItemVisible"
      :ifDisabled="addItemIfDisabled"
      :typeSelcet="addItemTypeSelcet"
      :addItemVisible="addItemVisible"
      @addItemHandleClose="addItemHandleClose"
      @addItemHandleOk="addItemHandleOk"
    ></addItem>

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
export default {
  components: {
    CountUp,
    addItem,
    generateOrder,
  },
  data() {
    return {
      basicPropertyList: {
        1: "基础药",
        2: "非基础药",
      },
      min: "",
      sec: "",
      activeName: "我的购物车(药品)", //我的购物车(器械) 我的购物车(药品)
      commodityCategory: 0, //商品种类
      commodityQuantity: 0, //商品数量
      commodityTotalPrice: 0, //商品总价
      tableHeader1: [
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
          title: "基础药/非基础药",
          slot: "basicProperty",
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
    };
  },

  mounted() {
    this.cartGetShopCarPageApi(); // 获取购物车列表 (器械)-接口
  },
  methods: {
    // 获取购物车列表-接口
    cartGetShopCarPageApi() {
      let type = 1;
      if (this.activeName == "我的购物车(器械)") {
        type = 2;
      } else if (this.activeName == "我的购物车(药品)") {
        type = 1;
      }

      this.tableLoading = true;
      let valueData = {
        currPageNo: 1,
        pageSize: 100000000,
        goodsType: type,
      };
      cartGetShopCarPage(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.cartList.list;
            this.commodityCategory = this.tableData.length; //商品种类
            this.commodityQuantity = 0; //商品数量
            this.commodityTotalPrice = 0; //商品总价
            this.tableData.forEach((element) => {
              this.commodityTotalPrice =
                this.commodityTotalPrice + element.quantity * element.buyPrice; //商品总价
              this.commodityQuantity =
                this.commodityQuantity + element.quantity; //商品数量
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 批量删除购物车信息-接口
    cartBatchDelCartApi() {
      this.tableLoading = true;
      let valueData = "?";
      this.handleSelectionData.forEach((element) => {
        valueData +=
          "cartIds=" + element.id + "&" + "goodsIds=" + element.goodsId + "&";
      });
      valueData = valueData.substring(0, valueData.length - 1);
      cartBatchDelCart(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.cartGetShopCarPageApi(); // 获取购物车列表-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 添加商品按钮
    addItemButton() {
      if (this.activeName == "我的购物车(器械)") {
        this.addItemTypeSelcet = 2; //进入添加商品直接查询 1药品 2药械
      } else if (this.activeName == "我的购物车(药品)") {
        this.addItemTypeSelcet = 1; //进入添加商品直接查询 1药品 2药械
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
            this.cartGetShopCarPageApi();
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

    // 表选择
    handleSelectionChange(value) {
      this.handleSelectionData = value;
      console.log(this.handleSelectionData);
    },
    // 批量删除
    deleteButton() {
      if (this.handleSelectionData.length == 0) {
        this.$message.info("请先在表格中勾选需删除的商品");
        return;
      }
      this.cartBatchDelCartApi(); // 批量删除购物车信息-接口
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
      this.cartGetShopCarPageApi(); // 获取购物车列表-接口
    },
    // 改变购物车商品数量-接口
    cartChangeCartQuantityApi(index) {
      let valueData = new FormData();
      valueData.append("cartId", this.tableData[index].id);
      valueData.append("goodsId", this.tableData[index].goodsId);
      valueData.append("quantity", this.tableData[index].quantity);
      cartChangeCartQuantity(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.cartGetShopCarPageApi(); // 获取购物车列表-接口
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    quantityChange(squantity, quantity, index) {
      if (!squantity) {
        this.elInputNumberShow = false;
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.tableData[index].quantity = 1;
          this.cartChangeCartQuantityApi(index);
        });
      } else {
        if (quantity > squantity) {
          this.elInputNumberShow = false;
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.elInputNumberShow = true;
            this.tableData[index].quantity = 1;
            this.cartChangeCartQuantityApi(index);
          });
        } else {
          this.cartChangeCartQuantityApi(index);
        }
      }
      if (
        quantity == null ||
        quantity == undefined ||
        quantity == 0 ||
        quantity == ""
      ) {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.tableData[index].quantity = 1;
          this.cartChangeCartQuantityApi(index);
          // this.commodityTotalPrice = 0; //商品总价
          // this.commodityQuantity = 0; //商品数量
          // this.tableData.forEach((element) => {
          //   this.commodityTotalPrice =
          //     this.commodityTotalPrice + element.quantity * element.buyPrice; //商品总价
          //   this.commodityQuantity = this.commodityQuantity + element.quantity; //商品数量
          // });
        });
      }
    },

    // 生成订单按钮
    generateOrderButton() {
      let goodsType = 1;
      if (this.activeName == "我的购物车(器械)") {
        goodsType = 2;
      } else if (this.activeName == "我的购物车(药品)") {
        goodsType = 1;
      }
      let object = {
        id: this.tableData[0].id, // 业务id  采购单id/购物车id,
        goodsType: goodsType, ////判断订单类型 药品/器械
      };
      this.listItem = object;
      this.generateOrderVisible = true;
      return;
    },
    // 生成订单弹框-取消按钮
    generateOrderHandleClose(value) {
      this.generateOrderVisible = value;
      this.cartGetShopCarPageApi(); // 查询采购登记信息-接口
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./myShoppingCart.scss";
</style>
