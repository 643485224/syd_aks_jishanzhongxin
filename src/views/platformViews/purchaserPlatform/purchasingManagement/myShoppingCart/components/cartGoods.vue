<template>
  <div>
    <el-pagination
      :current-page="pages.current"
      :page-size="pages.size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    >
    </el-pagination>
    <!-- :default-checked-keys="['a001','a003']" :invert="false"  -->
    <multi-check-list
      class="multi-check-list"
      :dataList="tableData"
      :fieldProps="{
        label: 'name',
        value: 'nodeId',
        children: 'cartGoodsList',
      }"
      :isCheckAll="true"
      :inline="false"
      :showLabel="false"
      @change="handlerDataCheck"
    >
      <template
        v-slot:checkallRender="{
          isIndeterminate,
          checkAll,
          handlerChange,
          totalLabel,
        }"
      >
        <div class="list-header">
          <div class="item-left">
            <el-checkbox
              label="全选"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handlerChange(0, null, $event)"
            >
              商品
            </el-checkbox>
          </div>
          <div class="item-right">
            <ul>
              <li>单价</li>
              <li>数量</li>
              <li>小计</li>
              <li>操作</li>
            </ul>
          </div>
        </div>
      </template>
      <!-- <template v-slot:checkallText>
        商品
      </template> -->
      <template v-slot:group="{ value, checkAll, handlerChange, totalLabel }">
        <p class="check-group-header">{{ value.supplierName }}</p>
      </template>
      <template v-slot:item="{ value }">
        <div class="check-group-item">
          <div class="check-group-item-left">
            <img :src="value.mallPicture" alt="" />
            <p class="check-group-title">{{ value.goodsName }}</p>
          </div>
          <div class="check-group-item-right">
            <div class="item-col">
              <span class="rmb">￥{{ value.buyPrice }}</span>
            </div>
            <div class="item-col">
              <span class="rmb">
                <el-input-number
                  v-if="elInputNumberShow"
                  :controls="true"
                  :value="value.quantity"
                  :min="1"
                  :max="value.squantity"
                  :precision="0"
                  size="mini"
                  @change="
                    quantityChange(
                      arguments[0],
                      value,
                      value.squantity,
                      value.quantity
                    )
                  "
                ></el-input-number>
              </span>
            </div>
            <div class="item-col">
              <span class="rmb">￥{{ value.quantity * value.buyPrice }}</span>
            </div>
            <div class="item-col">
              <el-button
                type="text"
                class="c_00023a"
                @click="deleteButton(value.goodsId)"
                >删除</el-button
              >
              <!-- <el-button
                type="text"
                class="c_ff480e"
                v-if="!value.follow"
                @click="cartFollow(value)"
                >加入关注</el-button
              >
              <el-button type="text" class="c_ff480e"  v-else
                @click="cancelFollow(value)">取消关注</el-button
              > -->
              <el-button
                type="text"
                @click="toDetail(value.goodsId, value.goodsType,value.supplierId)"
                >查看详情</el-button
              >
            </div>
          </div>
        </div>
      </template>
    </multi-check-list>
    <el-empty
      description="暂无商品"
      :image-size="200"
      v-if="!tableData.length"
    ></el-empty>

    <div class="flex_ac_jb mt_20 mb_20">
      <div>
        <el-button class="c_ff480e mr_20" type="text" @click="deleteButton()"
          >批量删除</el-button
        >
        <span class="mr_20">商品种类：{{ commodity.category }}</span>
        <span>商品数量：{{ commodity.quantity }}</span>
      </div>
      <div class="flex_ac">
        <span>所有商品总价：</span>
        <span class="allNumber">
          <CountUp
            :delay="delay"
            :endVal="commodity.price"
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
  </div>
</template>
<script>
import CountUp from "vue-countup-v2";

import dayjs from "dayjs";
import Test from "./test.vue";
import {
  cartGetShopCarPage,
  cartBatchDelCart,
  cartDelCart,
  cartAddCartInfo,
  cartFollow,
  cancelFollow,
  cartChangeCartQuantity,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { changeGoodsQuantity } from "@/api/aksApi/platformApi/centerMallApi.js";
import MultiCheckList from "./multiCheckList.vue";
export default {
  components: {
    CountUp,
    MultiCheckList,
  },
  props: {
    goodsCate: {
      // 商品分类  药品/药械
      type: String,
      default: "1",
    },

    height: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      checkAll: false,
      fpStatusTypeList: {
        1: "待开票",
        2: "待收票",
        3: "待付款（已收票）",
        4: "待结算（采购商已付款）",
        5: "完成收款",
        6: "拒绝收票",
      },
      fkTypeList: {
        1: "在线支付",
        2: "货到付款",
      },
      orderTypeList: {
        1: "药品",
        2: "器械",
      },
      backStateList: {
        1: "无退货",
        2: "退货中",
        3: "退货成功",
        3: "退货失败",
      },
      backTypeList: {
        1: "全部退",
        2: "部分退",
      },
      tableHeader: [
        {
          title: "订单编号",
          key: "orderNo",
          width: "200",
        },
        {
          title: "采购商名称",
          key: "buyerName",
          width: "200",
        },
        {
          title: "订单类型",
          slot: "orderType", // 1 药品  2  器械
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: "120",
        },
        {
          title: "商品种类(个)",
          key: "goodsCategoryCount",
          width: "100",
        },
        {
          title: "商品数量",
          key: "goodsCount",
        },
        {
          title: "供应商名称",
          key: "supplierName",
          width: "200",
        },
        {
          title: "支付方式",
          slot: "fkType", //  1 在线支付  2 货到付款
        },
        {
          title: "退货类型",
          slot: "backType", //退货类型@ 1  全部退   2  部分退
        },
        {
          title: "退货状态",
          slot: "backState", //退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败
        },
        {
          title: "结算状态",
          slot: "fpStatus", //1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票
        },
        {
          title: "交易时间",
          slot: "orderTime",
          width: "120",
        },
        {
          title: "订单金额",
          key: "amount",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "120",
        },
      ],
      tableData: [],
      orderId: null, //订单id
      pages: {
        total: 0,
        current: 1,
        size: 5,
      },
      orderNum: "",
      date: [],
      elInputNumberShow: true, //重新渲染数字输入框使用
      handleSelectionData: [], // 选择商品数组
      tableLoading: false,
      selectGoodsIdList: [], // 已选择商品id列表
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
      carId: null, // 购物车 id
    };
  },
  created() {
    this.cartGetShopCarPageApi();
  },
  watch: {
    goodsCate() {
      this.selectGoodsList = []
      this.cartGetShopCarPageApi();
    },
  },
  computed:{
    // 选择商品种类 数量 总价对象
    commodity(){
      let category = this.selectGoodsList.length;
      let { quantity, price } = this.getQuantity(this.selectGoodsList)
      return {category,quantity,price}
    }
  },
  methods: {
    // 选择商品
    handlerDataCheck(parent, child) {
      console.log(parent, child);
      this.selectGoodsIdList = child;
    },
    // 计算商品数量金额
    getQuantity(goodsIdList) {
      let quantity = 0;
      let price = 0;
      this.tableData.forEach((item) => {
        if (item.cartGoodsList && item.cartGoodsList.length) {
          item.cartGoodsList.forEach((goods) => {
            if (goodsIdList.findIndex((item) => item == goods.nodeId) != -1) {
              quantity += goods.quantity;
              price += goods.buyPrice * goods.quantity;
            }
          });
        }
      });
      return { quantity, price };
    },
    // 获取购物车列表-接口
    cartGetShopCarPageApi() {
      this.tableData = [];
      console.log(this.goodsCate);
      let type = +this.goodsCate;
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        goodsType: type,
      };
      cartGetShopCarPage(valueData)
        .then((res) => {
          console.log(res.data);
          this.tableLoading = false;
          if (res.code == 200) {
            let list = res.data.list;
            this.pages.total = res.data.list.length;
            if (list.length) {
              this.carId = list[0].cartGoodsList[0].id;
              let formatList = (data) =>
                data.map((item) => {
                  // 统一渲染字段
                  let {
                    cartGoodsList,
                    supplierId,
                    goodsId,
                    supplierName,
                    goodsName,
                  } = item;
                  if (goodsId) {
                    item["nodeId"] = goodsId;
                    item.name = goodsName;
                  } else {
                    item["nodeId"] = supplierId;
                    item.name = supplierName;
                  }
                  if (cartGoodsList && cartGoodsList.length) {
                    formatList(item.cartGoodsList);
                  }
                  return item;
                });
              this.tableData = formatList(list);
            }
            console.log(this.tableData, 1111);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 改变购物车商品数量
    quantityChange(val, goods, squantity, quantity) {
      console.log(val, quantity, goods, squantity, 1111);
      console.log(this.goods, 111);
      if (!squantity) {
        this.elInputNumberShow = false;
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          goods.quantity = 1;
          this.cartChangeCartQuantityApi(goods);
        });
        console.log(val, goods, squantity);
      } else {
        if (val > squantity) {
          console.log(val, goods, squantity);

          this.elInputNumberShow = false;
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.elInputNumberShow = true;
            goods.quantity = squantity;
            this.cartChangeCartQuantityApi(goods);
          });
        } else if (val == squantity) {
          goods.quantity = squantity;
          this.cartChangeCartQuantityApi(goods);
        } else {
          goods.quantity = val;
          this.cartChangeCartQuantityApi(goods);
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

        });
      }
    },
    // 改变购物车商品数量-接口
    cartChangeCartQuantityApi(item) {
      let valueData = new FormData();
      valueData.append("cartId", item.id);
      valueData.append("goodsId", item.goodsId);
      valueData.append("quantity", item.quantity);
      cartChangeCartQuantity(valueData)
        .then((res) => {
          if (res.code == 200) {
            // this.cartGetShopCarPageApi(); // 获取购物车列表-接口
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 删除商品
    deleteButton(id) {
      if (id) {
        // 单个删除
        this.cartDelCart(id);
      } else {
        // 批量删除
        if (this.selectGoodsIdList.length == 0) {
          this.$message.info("请先在表格中勾选需删除的商品");
          return;
        }
        this.cartBatchDelCartApi(); // 批量删除购物车信息-接口
      }
    },
    // 批量删除购物车信息-接口
    cartBatchDelCartApi() {
      this.tableLoading = true;
      let valueData = "?" + "cartIds=" + this.carId + "&";

      this.selectGoodsIdList.forEach((id) => {
        valueData += "goodsIds=" + id + "&";
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
    // 删除购物车商品-接口
    cartDelCart(id) {
      cartDelCart(this.carId, id)
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

    // 购物车商品加入关注
    cartFollow(value) {
      cartFollow(this.goodsCate, value.goodsId) // 购物车商品加入关注-接口
        .then((res) => {
          if (res.code == 200) {
            value.follow = true;
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
    // 购物车商品取消关注
    cancelFollow(value) {
      cancelFollow(this.goodsCate, value.goodsId) // 购物车商品取消关注-接口
        .then((res) => {
          if (res.code == 200) {
            value.follow = false;
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
    toDetail(goodsId, goodsType,supplierId) {
      console.log(this.goodsCate);
      console.log(goodsId, goodsType,supplierId);
      if (goodsType == 1) {
        if (this.goodsCate == "1") {
          window.open(
            this.$router.resolve({
              path: "/webTradingMall/webGoodsDetail",
              query: { type: "drug", id: goodsId ,supplierId},
            }).href,
            "_blank"
          );
        } else if (this.goodsCate == "2") {
          window.open(
            this.$router.resolve({
              path: "/webTradingMall/webGoodsDetail",
              query: { type: "apparatus", id: goodsId ,supplierId},
            }).href,
            "_blank"
          );
        }
      } else if (goodsType == 2) {
        window.open(
          this.$router.resolve({
            path: "/webTradingMall/webFoodDetail",
            query: { type: "foods", id: goodsId ,supplierId},
          }).href,
          "_blank"
        );
      }
    },
    search() {
      this.cartGetShopCarPageApi();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pages.size = val;
      this.cartGetShopCarPageApi();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pages.current = val;
      this.cartGetShopCarPageApi();
    },
    // 订单详情按钮
    detailsButton(valueData) {
      console.log(valueData);
      this.$emit("detailsButton", valueData);
    },
    // 数字动画重置
    onReady: function (instance, CountUp) {
      const that = this;
      instance.update(that.commodity.price);
    },
    // 生成订单按钮
    generateOrderButton() {
      if (!this.selectGoodsList.length) {
        return this.$message.info("请先选择商品");
      } else {
        let goodsType = +this.goodsCate;
        let carId = this.carId;
        this.$emit("generateOrder", {
          carId,
          goodsType,
          idList: this.selectGoodsIdList,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  font-size: 14px;

  .search-item {
    margin-right: 18px;

    .el-input {
      width: 230px;

      ::v-deep .el-input__inner {
        height: 31px;
      }
    }

    ::v-deep .el-range-editor.el-input__inner {
      width: 250px;
      height: 31px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1;
    }
  }

  .search-btn {
    height: 32px;
    background: #ff480e;
    border: none;
    border-radius: 4px 4px 4px 4px;
  }
}

::v-deep.el-pagination {
  margin: 10px 0;
}

.multi-check-list {
  padding-left: 12px;
  margin-top: 20px;
  border: 1px solid #eeeeee;

  ::v-deep .multi-check-group .el-checkbox .el-checkbox__inner {
    margin: 18px 0 !important;
  }
}

// 列表头部样式
.list-header {
  min-width: calc(100% + 12px);
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  height: 40px;
  margin: 0 -12px;
  padding: 0 0px 0 12px;
  background: #e8f0f8;
  font-size: 14px;
  color: #00023a;

  .item-left {
    flex: 1;
  }

  .item-right {
    ul {
      display: flex;
      list-style: none;

      li {
        width: 120px;
        text-align: center;
        font-size: 14px;
        color: #00023a;
      }
    }
  }
}

// 商户分组标题样式
.check-group-header {
  width: 100%;
  display: flex;
  padding: 18px 0;
  border-bottom: 1px solid #ff480e;
  font-size: 16px;
  font-weight: bold;
  color: #020552;

  // border: 1px solid #EEEEEE;
  //     box-sizing: border-box;
}

// 商品样式
.check-group-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #eeeeee;

  .check-group-item-left {
    flex: 1;
    display: flex;
    padding: 18px 0;
    font-size: 16px;
    color: #020552;

    img {
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }

    .check-group-title {
      display: inline;
      vertical-align: top;
    }
  }

  .check-group-item-right {
    // height: 100%;
    display: flex;

    .item-col {
      padding-top: 17px;
      box-sizing: border-box;
      width: 120px;
      text-align: center;
      height: 100%;
      border-left: 1px solid #eeeeee;

      span {
        color: #020552;
        font-size: 16px;
      }

      .rmb {
        display: inline-block;
        font-weight: 600;
        font-size: 16px;
      }

      .chui {
        font-size: 16px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #ff480e;
      }

      .el-input-number {
        width: 110px;
        height: 30px;
        line-height: 26px;
        margin: 0 4px;
      }
    }
  }
}

.allNumber {
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 600;
  color: #ff480e;
}
</style>
