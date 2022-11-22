<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="table-page-item">
      <div class="trade-tabs">
        <div class="crumbsList">
          <div
            :class="
              orderCenterSelectOrderLsListOut.status == '0'
                ? 'crumbsActive'
                : 'crumbs'
            "
            @click="crumbsFunction('0')"
          >
            全部订单
          </div>
          <div
            :class="
              orderCenterSelectOrderLsListOut.status == '1'
                ? 'crumbsActive'
                : 'crumbs'
            "
            @click="crumbsFunction('1')"
          >
            待付款
          </div>
          <div
            :class="
              orderCenterSelectOrderLsListOut.status == '3'
                ? 'crumbsActive'
                : 'crumbs'
            "
            @click="crumbsFunction('3')"
          >
            待收货
          </div>
          <div
            :class="
              orderCenterSelectOrderLsListOut.status == '7'
                ? 'crumbsActive'
                : 'crumbs'
            "
            @click="crumbsFunction('7')"
          >
            退货
          </div>
          <div
            :class="
              orderCenterSelectOrderLsListOut.status == '4'
                ? 'crumbsActive'
                : 'crumbs'
            "
            @click="crumbsFunction('4')"
          >
            待评价
          </div>
        </div>
        <div class="tableTitle">
          <div class="tableTitle1">订单详情</div>
          <div class="tableTitle2">收货人</div>
          <div class="tableTitle3">金额</div>
          <div class="tableTitle4">状态</div>
          <div class="tableTitle5">操作</div>
        </div>
        <div
          v-for="(items, indexs) in orderCenterSelectOrderLsListReturn.records"
          :key="indexs"
        >
          <div class="tableBody">
            <div class="tableItemTitle">
              <div class="tableItemTitle1">
                <div class="tableItemTitle11 mr_20">
                  {{ items.orderTime }}
                </div>
                <div class="tableItemTitle12 mr_50">
                  订单编号:{{ items.orderNo }}
                </div>
              </div>

              <div class="tableItemTitle2">
                {{ items.supplierName }}
              </div>
              <div class="tableItemTitle3">
                <el-popover
                  @show="sysBuyerCancelOrderButton(items.id, index)"
                  placement="top"
                  width="230"
                  v-model="items.visible"
                >
                  <div>确定取消订单吗？</div>
                  <div class="mt_10 mb_10">
                    <el-input
                      type="textarea"
                      style="width: 200px"
                      placeholder="请输入取消原因"
                      v-model="sysBuyerCancelOrderOut.cancelRemark"
                      :autosize="{ minRows: 3, maxRows: 3 }"
                    ></el-input>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="items.visible = false"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="sysBuyerCancelOrderApi(index)"
                      >确定</el-button
                    >
                  </div>
                  <img
                    class="tableItemTitle31"
                    src="./image/delete.png"
                    alt=""
                    slot="reference"
                  />
                </el-popover>
              </div>
            </div>
            <div
              class="tableItemBody"
              v-for="(item, index) in items.orderLsDetailVoList"
              :key="index"
            >
              <div class="tableItemBody1">
                <img class="tableItemBody11" :src="item.mainPicture" alt="" />
                <div class="tableItemBody12">
                  {{ item.goodsName }}
                </div>
                <div class="tableItemBody13">x{{ item.quantity }}</div>
              </div>
              <div class="tableItemBody2">
                {{ items.consignee }}
              </div>
              <div class="tableItemBody3">
                <div class="tableItemBody31">￥{{ item.price }}</div>
                <div class="tableItemBody32"></div>
                <div class="tableItemBody33">
                  {{ payTypeList[items.payType] }}
                </div>
              </div>
              <div class="tableItemBody4">
                <div v-if="items.status == 5" class="color_999999">
                  交易完成
                </div>
                <div v-if="items.status == 3" class="color_FF480E">待收货</div>
                <div v-if="items.status == 1" class="color_FF480E">待支付</div>
                <div
                  v-if="
                    !(
                      items.status == 1 ||
                      items.status == 3 ||
                      items.status == 5
                    )
                  "
                >
                  {{ statusList[items.status] }}
                </div>
                <div
                  class="color_020552"
                  @click="
                    toPath(
                      '/webPersonalMain/webRetailMyOrder/itemderDetail',
                      items.id
                    )
                  "
                >
                  订单详情
                </div>
              </div>
              <div class="tableItemBody5">
                <div
                  v-if="items.status == 4"
                  class="color_020552 mb_10"
                  @click="evaluateHandleButton(items.id)"
                >
                  评价晒单
                </div>
                <el-button
                  v-if="items.status == 1"
                  class="button_ff480e"
                  type="default"
                  @click="
                    sysBuyerPaymentApi(items.id, items.payType, items.payAmount)
                  "
                  >支付</el-button
                >
                <el-button
                  class="button_ff480e"
                  type="default"
                  @click="toWebTradingMall('/webTradingMall')"
                  >再次购买</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderCenterSelectOrderLsList,
  sysBuyerCancelOrder,
  sysBuyerPayment,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
export default {
  data() {
    return {
      // 支付方式
      payTypeList: {
        1: "支付宝",
        2: "微信",
      },
      // 状态
      statusList: {
        1: "待支付",
        2: "待发货（已支付）",
        3: "待收货",
        4: "待评价（已收货）",
        5: "已完成",
        6: "已取消",
        7: "已退货 ",
        8: "取消中",
        9: "退货中",
      },
      // 订单中心 => 我的订单列表-接口传参
      orderCenterSelectOrderLsListOut: {
        beginDate: "",
        currPageNo: 1,
        endDate: "",
        keyword: "",
        pageSize: 10,
        status: "0", //状态@ 1 待支付  2  待发货（已支付）  3  待收货    4  待评价（已收货）5 已完成   6   已取消   7  已退货  8  取消中  9  退货中 ")
      },
      // 订单中心 => 我的订单列表-接口回参
      orderCenterSelectOrderLsListReturn: {},

      // 订单业务-零售订单申请取消订单-接口传参
      sysBuyerCancelOrderOut: {
        orderId: null, // 订单id
        cancelRemark: "", //取消原因
      },
      // 订单业务-零售订单申请取消订单-接口回参
      sysBuyerCancelOrderReturn: {},

      // 订单业务-支付-接口传参
      sysBuyerPaymentOut: {
        orderId: null, //  订单id
        payType: null, // 支付方式
        payAmount: null, //  支付金额
      },
      // 订单业务-支付-接口回参
      sysBuyerPaymentReturn: {},

      tableLoading: false, //表格加载中
    };
  },

  mounted() {
    this.orderCenterSelectOrderLsListApi(); // 订单中心 => 我的订单列表
  },
  methods: {
    // 订单中心 => 我的订单列表
    orderCenterSelectOrderLsListApi() {
      let valueData = {
        beginDate: this.orderCenterSelectOrderLsListOut.beginDate,
        currPageNo: this.orderCenterSelectOrderLsListOut.currPageNo,
        endDate: this.orderCenterSelectOrderLsListOut.endDate,
        keyword: this.orderCenterSelectOrderLsListOut.keyword, //关键字
        pageSize: this.orderCenterSelectOrderLsListOut.pageSize,
        status:
          this.orderCenterSelectOrderLsListOut.status == "0"
            ? ""
            : this.orderCenterSelectOrderLsListOut.status, //状态
      };
      orderCenterSelectOrderLsList(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.orderCenterSelectOrderLsListReturn = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 订单业务-零售订单申请取消订单
    sysBuyerCancelOrderApi(index) {
      this.tableLoading = true;
      let valueData = new FormData();
      valueData.append("orderId", this.sysBuyerCancelOrderOut.orderId);
      valueData.append(
        "cancelRemark",
        this.sysBuyerCancelOrderOut.cancelRemark
      );
      sysBuyerCancelOrder(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.$message.success(res.message);
            this.orderCenterSelectOrderLsListReturn.records[
              index
            ].visible = false;
            this.orderCenterSelectOrderLsListApi(); // 订单中心 => 我的订单列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 订单业务-支付
    sysBuyerPaymentApi(id, payType, payAmount) {
      this.tableLoading = true;
      let valueData = {
        orderId: id, //  订单id
        payType: payType, // 支付方式
        payAmount: payAmount, //  支付金额
      };

      sysBuyerPayment(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
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
    // 订单详情按钮
    toPath(path, id) {
      this.$router.push({ path: path });
      this.$store.commit("$uStore", {
        name: "vuex_retailOrders", //零售订单相关内容数据
        value: {
          id: id,
        },
      });
    },
    // 再次购买按钮
    toWebTradingMall(path) {
      // 新页面打开
      let routeData = this.$router.resolve({
        path: path,
        query: {},
      });
      window.open(routeData.href, "_blank");
    },
    // tabs切换调用
    crumbsFunction(value) {
      this.orderCenterSelectOrderLsListOut.status = value; //状态@ 1 待支付  2  待发货（已支付）  3  待收货    4  待评价（已收货）5 已完成   6   已取消   7  已退货  8  取消中  9  退货中 ")
      this.orderCenterSelectOrderLsListApi(); // 订单中心 => 我的订单列表
    },
    // 评价晒单按钮
    evaluateHandleButton(id) {
      this.$router.push({
        path: "/webPersonalMain/webRetailMyOrder/itemEvaluate",
      });
      this.$store.commit("$uStore", {
        name: "vuex_retailOrders", //零售订单相关内容数据
        value: {
          id: id,
        },
      });
    },
    // 垃圾桶二次弹框出现调用
    sysBuyerCancelOrderButton(id) {
      this.sysBuyerCancelOrderOut.cancelRemark = "";
      this.sysBuyerCancelOrderOut.orderId = id;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
}

// 导航
.crumbsList {
  display: flex;

  .crumbs {
    color: #00023a;
    margin-right: 38px;
    cursor: pointer;
    font-size: 20px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
  }
  .crumbsActive {
    color: #ff480e;
    margin-right: 38px;
    cursor: pointer;
    font-size: 20px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: bold;
  }
}

.tableTitle {
  margin-top: 28px;
  display: flex;
  background: #e8f0f8;
  padding: 10px 0px 10px 25px;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
  .tableTitle1 {
    width: 384px;
    margin-right: 3px;
    text-align: left;
  }
  .tableTitle2 {
    width: 145px;
    margin-right: 3px;
    text-align: center;
  }
  .tableTitle3 {
    width: 122px;
    margin-right: 3px;
    text-align: center;
  }
  .tableTitle4 {
    width: 133px;
    margin-right: 3px;
    text-align: center;
  }
  .tableTitle5 {
    width: 138px;
    text-align: center;
  }
}

.tableBody {
  margin-top: 20px;
  width: 100%;
  .tableItemTitle {
    width: 100%;
    background: #eeeeee;
    padding: 10px 10px 10px 25px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
    .tableItemTitle1 {
      display: flex;
      .tableItemTitle11 {
        width: 138px;
      }
      .tableItemTitle12 {
        width: 200px;
      }
    }
    .tableItemTitle2 {
      width: 490px;
    }
    .tableItemTitle3 {
      width: 20px;
      height: 20px;
      .tableItemTitle31 {
        width: 20px;
        height: 20px;
      }
    }
  }
  .tableItemBody {
    width: 100%;
    height: 125px;
    background: #ffffff;
    padding: 0px 0px 0px 25px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    display: flex;
    color: #020552;
    .tableItemBody1 {
      padding-top: 15px;
      border-right: 1px solid #eeeeee;
      width: 384px;
      margin-right: 3px;
      text-align: left;

      display: flex;
      .tableItemBody11 {
        width: 80px;
        height: 80px;
      }
      .tableItemBody12 {
        margin-left: 10px;
        width: 217px;
        font-size: 16px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
      }
      .tableItemBody13 {
        font-size: 16px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        width: 77px;
        text-align: center;
      }
    }
    .tableItemBody2 {
      padding-top: 15px;
      border-right: 1px solid #eeeeee;
      width: 145px;
      margin-right: 3px;
      text-align: center;
    }
    .tableItemBody3 {
      padding-top: 15px;
      border-right: 1px solid #eeeeee;
      width: 122px;
      margin-right: 3px;
      text-align: center;
      font-size: 16px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
      .tableItemBody32 {
        width: 102px;
        margin: 0 auto;
        height: 1px;
        background: #999999;
      }
    }
    .tableItemBody4 {
      padding-top: 15px;
      border-right: 1px solid #eeeeee;
      width: 133px;
      margin-right: 3px;
      text-align: center;
      font-size: 16px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;

      .color_999999 {
        color: #999999;
        cursor: pointer;
      }
      .color_FF480E {
        color: #ff480e;
        cursor: pointer;
      }
      .color_020552 {
        color: #020552;
        cursor: pointer;
      }
      .color_020552:hover {
        color: #ff480e;
      }
      div + div {
        margin-top: 10px;
      }
    }
    .tableItemBody5 {
      width: 138px;
      font-size: 16px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .color_020552 {
        color: #020552;
        cursor: pointer;
      }
      .color_020552:hover {
        color: #ff480e;
      }
      .button_ff480e {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 88px;
        height: 32px;
        border: 1px solid #ff480e;
        color: #ff480e;
        background: #ffffff;
      }
      .el-button + .el-button {
        margin-top: 10px;
        margin-left: 0px;
      }
    }
  }
}

// 订单详情(待收货)
.contentBox_distinguis_one {
  .distinguis_Title {
    height: 40px;
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
    text-align: center;
  }
}

// 订单详情(已收货)
.contentBox_distinguis_two {
  .distinguis_Title {
    height: 40px;
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
    text-align: center;
  }
}

.logistics-details {
  display: flex;
  padding: 50px;
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;

  .info {
    height: 50vh;
    margin-right: 62px;
    overflow: auto;

    .info-top {
      color: #00023a;
      padding-bottom: 40px;
    }

    .stage {
      .stage-item:not(:last-child) {
        padding-bottom: 40px;
      }
    }
  }

  .map {
    flex: 1;
  }
}

// 返回上一页按钮位置
.Buttonposition {
  position: absolute;
  z-index: 999;
}
</style>
