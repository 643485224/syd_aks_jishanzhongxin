<template>
  <!-- 零购平台=>订单中心=>评价晒单 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="table-page-item">
      <div class="trade-tabs">
        <div class="crumbsList">
          <div
            :class="crumbsValue == '0' ? 'crumbsActive' : 'crumbs'"
            @click="crumbsFunction('0')"
          >
            待评价
          </div>
          <div
            :class="crumbsValue == '1' ? 'crumbsActive' : 'crumbs'"
            @click="crumbsFunction('1')"
          >
            待追评
          </div>
          <div
            :class="crumbsValue == '2' ? 'crumbsActive' : 'crumbs'"
            @click="crumbsFunction('2')"
          >
            已评价
          </div>
        </div>
        <div class="daipingjia" v-if="crumbsValue == '0'">
          <div class="tableTitle">
            <div class="tableTitle1">订单详情</div>
            <div class="tableTitle2">收货人</div>
            <div class="tableTitle3">金额</div>
            <div class="tableTitle4">全部状态</div>
            <div class="tableTitle5">操作</div>
          </div>
          <div
            v-for="(items, indexs) in orderCenterBeEvaluatedListReturn"
            :key="indexs"
          >
            <div
              class="tableBody"
              v-for="(item, index) in items.orderLsDetailVoList"
              :key="index"
            >
              <div class="tableItemTitle">
                <div class="tableItemTitle1">
                  <div class="tableItemTitle11 mr_20">
                    {{ items.orderTime }}
                  </div>
                  <div class="tableItemTitle12">
                    订单编号:{{ items.orderNo }}
                  </div>
                </div>

                <div class="tableItemTitle2">{{ items.supplierName }}</div>
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
              <div class="tableItemBody">
                <div class="tableItemBody1">
                  <img class="tableItemBody11" :src="item.mainPicture" alt="" />
                  <div class="tableItemBody12">
                    {{ item.goodsName }}
                  </div>
                  <div class="tableItemBody13">x{{ item.quantity }}</div>
                </div>
                <div class="tableItemBody2">{{ items.consignee }}</div>
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
                  <div v-if="items.status == 3" class="color_FF480E">
                    待收货
                  </div>
                  <div v-if="items.status == 1" class="color_FF480E">
                    待支付
                  </div>
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
                  <div class="color_020552" @click="toPath(items.id)">
                    订单详情
                  </div>
                </div>
                <div class="tableItemBody5">
                  <el-button
                    class="button_ff480e"
                    type="default"
                    @click="evaluateHandleButton(items.id)"
                    >评价晒单</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="daizhuiping" v-if="crumbsValue == '1'">
          <div class="tableTitle">
            <div class="tableTitle1">订单详情</div>
            <div class="tableTitle2">状态</div>
            <div class="tableTitle3">操作</div>
          </div>
          <div
            v-for="(items, indexs) in orderCenterBeReviewedListReturn"
            :key="indexs"
          >
            <div
              class="tableBody"
              v-for="(item, index) in items.orderLsDetailVoList"
              :key="index"
            >
              <div class="tableItemTitle">
                <div class="tableItemTitle1">
                  <div class="tableItemTitle11 mr_20">
                    {{ items.orderTime }}
                  </div>
                  <div class="tableItemTitle12">
                    订单编号:{{ items.orderNo }}
                  </div>
                </div>

                <div class="tableItemTitle2">{{ items.supplierName }}</div>
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
              <div class="tableItemBody">
                <div class="tableItemBody1">
                  <img class="tableItemBody11" :src="item.mainPicture" alt="" />
                  <div class="tableItemBody12">
                    {{ item.goodsName }}
                  </div>
                </div>
                <div class="tableItemBody4">
                  <div class="color_999999">2022-11-08 13:30:51 初评</div>
                </div>
                <div class="tableItemBody5">
                  <el-button
                    class="button_ff480e"
                    type="default"
                    @click="followUpCommentsButton()"
                    >追评</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="yipingjia" v-if="crumbsValue == '2'">
          <div class="tableTitle">
            <div class="tableTitle1">订单详情</div>
            <div class="tableTitle2">收货人</div>
            <div class="tableTitle3">金额</div>
            <div class="tableTitle4">全部状态</div>
            <div class="tableTitle5">操作</div>
          </div>
          <div
            v-for="(items, indexs) in orderCenterEvaluatedListReturn"
            :key="indexs"
          >
            <div
              class="tableBody"
              v-for="(item, index) in items.orderLsDetailVoList"
              :key="index"
            >
              <div class="tableItemTitle">
                <div class="tableItemTitle1">
                  <div class="tableItemTitle11 mr_20">
                    {{ items.orderTime }}
                  </div>
                  <div class="tableItemTitle12">
                    订单编号:{{ items.orderNo }}
                  </div>
                </div>

                <div class="tableItemTitle2">{{ items.supplierName }}</div>
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
              <div class="tableItemBody">
                <div class="tableItemBody1">
                  <img class="tableItemBody11" :src="item.mainPicture" alt="" />
                  <div class="tableItemBody12">
                    {{ item.goodsName }}
                  </div>
                  <div class="tableItemBody13">x{{ item.quantity }}</div>
                </div>
                <div class="tableItemBody2">{{ items.consignee }}</div>
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
                  <div v-if="items.status == 3" class="color_FF480E">
                    待收货
                  </div>
                  <div v-if="items.status == 1" class="color_FF480E">
                    待支付
                  </div>
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
                  <div class="color_020552" @click="toPath(items.id)">
                    订单详情
                  </div>
                </div>
                <div class="tableItemBody5">
                  <el-button
                    class="button_ff480e"
                    type="default"
                    @click="evaluateHandleButton(items.id)"
                    >评价晒单</el-button
                  >
                </div>
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
  orderCenterBeEvaluatedList,
  orderCenterBeReviewedList,
  orderCenterEvaluatedList,
  sysBuyerCancelOrder,
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
      crumbsValue: "0", //导航 0待评价列表 1待追评列表 2已评价列表
      menuIs: "", // webRetailMyOrder是我的订单页面进来 webRetailEvaluationSheet是评价晒单页面进来
      orderCenterBeEvaluatedListReturn: {}, //订单中心 => 待评价列表-接口回参
      orderCenterBeReviewedListReturn: {}, //订单中心 => 待追评列表-接口回参
      orderCenterEvaluatedListReturn: {}, //订单中心 => 已评价列表-接口回参

      // 订单业务-零售订单申请取消订单-接口传参
      sysBuyerCancelOrderOut: {
        orderId: null, // 订单id
        cancelRemark: "", //取消原因
      },
    };
  },

  mounted() {
    if (window.location.href.indexOf("webRetailMyOrder") != -1) {
      this.menuIs = "webRetailMyOrder"; //我的订单页面进来
    } else if (window.location.href.indexOf("webRetailEvaluationSheet") != -1) {
      this.menuIs = "webRetailEvaluationSheet"; //评价晒单页面进来
    }
    this.crumbsFunction(this.crumbsValue); //导航 0待评价列表 1待追评列表 2已评价列表
  },

  methods: {
    // 订单中心 => 待评价列表
    orderCenterBeEvaluatedListApi() {
      orderCenterBeEvaluatedList()
        .then((res) => {
          if (res.code == 200) {
            this.orderCenterBeEvaluatedListReturn = res.data; //订单中心 => 待评价列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单中心 => 待追评列表
    orderCenterBeReviewedListApi() {
      orderCenterBeReviewedList()
        .then((res) => {
          if (res.code == 200) {
            this.orderCenterBeReviewedListReturn = res.data; //订单中心 => 待追评列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单中心 => 已评价列表
    orderCenterEvaluatedListApi() {
      orderCenterEvaluatedList()
        .then((res) => {
          if (res.code == 200) {
            this.orderCenterEvaluatedListReturn = res.data; //订单中心 => 已评价列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单详情按钮
    toPath(id) {
      this.$router.push({
        path: "/webPersonalMain/" + this.menuIs + "/itemderDetail",
      });
      this.$store.commit("$uStore", {
        name: "vuex_retailOrders", //零售订单相关内容数据
        value: {
          id: id,
        },
      });
    },
    // 详情评价按钮
    evaluateHandleButton(id) {
      this.$router.push({
        path: "/webPersonalMain/" + this.menuIs + "/itemEvaluate",
      });
      this.$store.commit("$uStore", {
        name: "vuex_retailOrders", //零售订单相关内容数据
        value: {
          id: id,
        },
      });
    },
    // 追评按钮
    followUpCommentsButton() {
      this.$router.push({
        path: "/webPersonalMain/" + this.menuIs + "/itemFollowUpComments",
      });
      this.$store.commit("$uStore", {
        name: "vuex_retailOrders", //零售订单相关内容数据
        value: {
          id: id,
        },
      });
    },
    crumbsFunction(value) {
      this.crumbsValue = value; //导航 0待评价列表 1待追评列表 2已评价列表
      if (value == "0") {
        // 待评价
        this.orderCenterBeEvaluatedListApi(); // 订单中心 => 待评价列表
      } else if (value == "1") {
        // 待追评
        this.orderCenterBeReviewedListApi(); // 订单中心 => 待追评列表
      } else if (value == "2") {
        // 已评价
        this.orderCenterEvaluatedListApi(); // 订单中心 => 已评价列表
      }
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
            this.orderCenterBeEvaluatedListReturn[index].visible = false;
            this.orderCenterBeReviewedListReturn[index].visible = false;
            this.orderCenterEvaluatedListReturn[index].visible = false;
            this.crumbsFunction(this.crumbsValue); //导航 0待评价列表 1待追评列表 2已评价列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
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
// 待评价
.daipingjia {
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
        margin-right: 80px;
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
        div + .button_ff480e {
          margin-top: 10px;
        }
      }
    }
  }
}
// 待追评
.daizhuiping {
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
      width: 509px;
      margin-right: 3px;
      text-align: left;
    }
    .tableTitle2 {
      width: 299px;
      margin-right: 3px;
      text-align: center;
    }
    .tableTitle3 {
      width: 136px;
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
        margin-right: 80px;
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
        width: 509px;
        margin-right: 3px;
        text-align: left;

        display: flex;
        .tableItemBody11 {
          width: 80px;
          height: 80px;
        }
        .tableItemBody12 {
          margin-left: 10px;
          width: 330px;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
        }
      }
      .tableItemBody2 {
        padding-top: 15px;
        border-right: 1px solid #eeeeee;
        width: 145px;
        margin-right: 3px;
        text-align: center;
      }

      .tableItemBody4 {
        border-right: 1px solid #eeeeee;
        width: 299px;
        margin-right: 3px;
        font-size: 16px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        .color_999999 {
          color: #999999;
          cursor: pointer;
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
        div + .button_ff480e {
          margin-top: 10px;
        }
      }
    }
  }
}

// 已评价
.yipingjia {
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
        margin-right: 80px;
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
        div + .button_ff480e {
          margin-top: 10px;
        }
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
