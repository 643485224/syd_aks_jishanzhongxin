<template>
  <!-- 零购平台=>我的订单=>订单详情页面 -->
  <div class="contentBox">
    <div class="box1">
      <div class="box1_item1">
        <div>{{ statusList[orderCenterSelectOrderDetailReturn.status] }}</div>
        <div>
          <el-button
            v-if="orderCenterSelectOrderDetailReturn.status > 3"
            class="box1_item1_button1"
            type="default"
            @click="logisticsButton"
            >查看物流</el-button
          >
          <el-popover
            placement="top"
            width="230"
            v-model="sysBuyerReceivingOrderReturn.visible"
          >
            <div>是否确认收货？</div>
            <div style="text-align: right; margin: 10px 0px 0px 0px">
              <el-button
                size="mini"
                type="text"
                @click="sysBuyerReceivingOrderReturn.visible = false"
                >取消</el-button
              >

              <el-button
                type="primary"
                size="mini"
                @click="sysBuyerReceivingOrderApi()"
                >确定</el-button
              >
            </div>
            <!-- v-if="orderCenterSelectOrderDetailReturn.status == 3" -->

            <el-button
              slot="reference"
              class="box1_item1_button2 mt_10 mb_10"
              type="primary"
              @click="confirmReceiptButton"
              >确认收货</el-button
            >
          </el-popover>

          <el-button
            v-if="
              orderCenterSelectOrderDetailReturn.status == 3 ||
              orderCenterSelectOrderDetailReturn.status == 4
            "
            class="box1_item1_button3"
            type="default"
            @click="returnGoodsButton"
            >申请退货</el-button
          >
        </div>
      </div>

      <div class="box1_item2">
        <el-steps :active="elStepsValue" align-center>
          <el-step icon="el-icon-tickets">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">提交订单</div>
                <div class="box1_item2_span">
                  {{ orderCenterSelectOrderDetailReturn.tjTime }}
                </div>
                <!-- <div class="box1_item2_span">18:20</div> -->
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-bank-card">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">付款成功</div>
                <div class="box1_item2_span">
                  {{ orderCenterSelectOrderDetailReturn.fkTime }}
                </div>
                <!-- <div class="box1_item2_span">18:20</div> -->
              </div>
            </template>
          </el-step>

          <el-step icon="el-icon-box">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">商品出库</div>
                <div class="box1_item2_span">
                  {{ orderCenterSelectOrderDetailReturn.ckTime }}
                </div>
                <!-- <div class="box1_item2_span">18:20</div> -->
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-truck">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待收货</div>
                <div class="box1_item2_span">
                  {{ orderCenterSelectOrderDetailReturn.ddshTime }}
                </div>
                <!-- <div class="box1_item2_span">18:20</div> -->
              </div>
            </template>
          </el-step>

          <el-step icon="el-icon-document-checked">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">已收货</div>
                <div class="box1_item2_span">
                  {{ orderCenterSelectOrderDetailReturn.wcTime }}
                </div>
                <!-- <div class="box1_item2_span">18:20</div> -->
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>

    <div class="fenge"></div>

    <div class="box2">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item1" :span="24">订单信息</el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">订单编号:</span
          >{{ orderCenterSelectOrderDetailReturn.orderNo }}</el-col
        >
        <el-col class="box2_item2" :span="12"
          ><span class="mr_10">下单时间:</span>
          {{ orderCenterSelectOrderDetailReturn.orderTime }}
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">订单状态:</span
          >{{ statusList[orderCenterSelectOrderDetailReturn.status] }}</el-col
        >
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">支付方式:</span
          >{{ payTypeList[orderCenterSelectOrderDetailReturn.payType] }}</el-col
        >
      </el-row>
    </div>

    <div class="fenge"></div>

    <div class="box2">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item1" :span="12">收货信息</el-col>
        <el-col class="box2_item1" :span="12">配送信息</el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货人:</span
          >{{ orderCenterSelectOrderDetailReturn.consignee }}</el-col
        >
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">快递公司:</span
          >{{ orderCenterSelectOrderDetailReturn.expressCompany }}</el-col
        >
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">手机号:</span
          >{{ orderCenterSelectOrderDetailReturn.consigneePhone }}</el-col
        >
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">配送时间:</span>
          （尚未对接）
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货地址:</span
          >{{ orderCenterSelectOrderDetailReturn.consigneeAddress }}</el-col
        >
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货时间:</span>
          {{ orderCenterSelectOrderDetailReturn.shTime }}
        </el-col>
      </el-row>
    </div>

    <div class="fenge"></div>

    <div class="box3">订单信息</div>
    <div class="box4">
      <div class="tableItemTitle">
        {{ orderCenterSelectOrderDetailReturn.supplierName }}
      </div>
      <div class="tableTitle">
        <div class="tableTitle1">订单详情</div>
        <div class="tableTitle2">收货人</div>
        <div class="tableTitle3">金额</div>
        <div class="tableTitle4">状态</div>
        <div class="tableTitle5">操作</div>
      </div>
      <div class="tableBody" v-for="(item, index) in tableBody" :key="index">
        <div class="tableItemBody">
          <div class="tableItemBody1">
            <img class="tableItemBody11" :src="item.mainPicture" alt="" />
            <div class="tableItemBody12">
              {{ item.goodsName }}
            </div>
            <div class="tableItemBody13">x{{ item.quantity }}</div>
          </div>
          <div class="tableItemBody2">
            {{ orderCenterSelectOrderDetailReturn.consignee }}
          </div>
          <div class="tableItemBody3">
            <div class="tableItemBody31">￥{{ item.price }}</div>
            <div class="tableItemBody32"></div>
            <div class="tableItemBody33">
              {{ payTypeList[orderCenterSelectOrderDetailReturn.payType] }}
            </div>
          </div>
          <div class="tableItemBody4">
            {{ statusList[orderCenterSelectOrderDetailReturn.status] }}
            <div
              v-if="orderCenterSelectOrderDetailReturn.status == 5"
              class="color_999999"
            >
              交易完成
            </div>
            <div
              v-if="orderCenterSelectOrderDetailReturn.status == 3"
              class="color_FF480E"
            >
              待收货
            </div>
            <div
              v-if="orderCenterSelectOrderDetailReturn.status == 1"
              class="color_FF480E"
            >
              待支付
            </div>
          </div>
          <div class="tableItemBody5">
            <div
              v-if="orderCenterSelectOrderDetailReturn.status == 4"
              class="color_020552"
              @click="evaluateHandleButton()"
            >
              评价晒单
            </div>
            <el-button
              class="button_ff480e"
              type="default"
              @click="toWebTradingMall('/webTradingMall')"
              >再次购买</el-button
            >
            <el-button
              v-if="orderCenterSelectOrderDetailReturn.status == 1"
              class="button_ff480e"
              type="default"
              >去结算</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="fenge"></div>
    <div class="box5">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box5_title" :span="24">总计</el-col>
      </el-row>
      <div class="box5_item1">
        <span class="mr_10">商品总计:</span>
        {{ orderCenterSelectOrderDetailReturn.amount }} 元
      </div>
      <div class="box5_item1">
        <span class="mr_10">运费总计:</span>
        {{ orderCenterSelectOrderDetailReturn.transportFee }} 元
      </div>
      <div class="box5_item1">
        <span class="mr_10">实付费:</span>
        <span class="box5_item2">
          {{ orderCenterSelectOrderDetailReturn.payAmount }}</span
        >
        元
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderCenterSelectOrderDetail,
  sysBuyerReceivingOrder,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["vuex_retailOrders"]),
  },
  data() {
    return {
      tableBody: [], // 订单中心 => 我的订单列表-表内容
      // 订单中心 => 订单详情-接口回参
      orderCenterSelectOrderDetailReturn: {},
      // 订单业务-收货-接口传参
      sysBuyerReceivingOrderReturn: {
        visible: false,
      },
      // 订单状态
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
      // 支付方式
      payTypeList: {
        1: "支付宝",
        2: "微信",
      },
      orderType: {
        1: "药品",
        2: "器械",
      },
      deliveryMethodType: {
        1: "阿克苏集散中心物流",
        2: "普通物流",
      },
      elStepsValue: 0, //步骤条状态
      menuIs: "", // webRetailMyOrder是我的订单页面进来 webRetailEvaluationSheet是评价晒单页面进来
    };
  },

  mounted() {
    if (window.location.href.indexOf("webRetailMyOrder") != -1) {
      this.menuIs = "webRetailMyOrder"; //我的订单页面进来
    } else if (window.location.href.indexOf("webRetailEvaluationSheet") != -1) {
      this.menuIs = "webRetailEvaluationSheet"; //评价晒单页面进来
    }

    //在线支付 流程控制显示，哪个有时间，点亮哪一个
    //  tjTime        提交订单
    //  fkTime        付款成功时间
    //  ckTime        商品出库
    //  ddshTime      等待收货
    //  wcTime        完成时间
    if (this.orderCenterSelectOrderDetailReturn.tjTime) {
      this.elStepsValue = 1;
    }
    if (this.orderCenterSelectOrderDetailReturn.fkTime) {
      this.elStepsValue = 2;
    }
    if (this.orderCenterSelectOrderDetailReturn.ckTime) {
      this.elStepsValue = 3;
    }
    if (this.orderCenterSelectOrderDetailReturn.ddshTime) {
      this.elStepsValue = 4;
    }
    if (this.orderCenterSelectOrderDetailReturn.wcTime) {
      this.elStepsValue = 5;
    }
    this.orderCenterSelectOrderDetailApi();
  },
  methods: {
    // 订单中心 => 订单详情-接口
    orderCenterSelectOrderDetailApi() {
      this.tableBody = [];
      let valueData = {
        orderId: this.vuex_retailOrders.id,
      };
      orderCenterSelectOrderDetail(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.orderCenterSelectOrderDetailReturn = res.data;
            this.tableBody = res.data.orderLsDetailVoList;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单业务-收货-接口
    sysBuyerReceivingOrderApi() {
      let valueData = new FormData();
      valueData.append("orderId", this.vuex_retailOrders.id);
      sysBuyerReceivingOrder(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.sysBuyerReceivingOrderReturn.visible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    toWebTradingMall(path) {
      // 新页面打开
      let routeData = this.$router.resolve({
        path: path,
        query: {},
      });
      window.open(routeData.href, "_blank");
    },
    // 查看物流按钮
    logisticsButton() {
      this.$router.push({
        path:
          "/webPersonalMain/" + this.menuIs + "/itemderDetail/itemLogistics",
      });
    },
    // 确认收货按钮
    confirmReceiptButton() {
      this.$emit("confirmReceiptButton");
    },
    // 评价晒单按钮
    evaluateHandleButton() {
      this.$router.push({
        path: "/webPersonalMain/" + this.menuIs + "/itemderDetail/itemEvaluate",
      });
    },
    // 申请退货按钮
    returnGoodsButton() {
      this.$router.push({
        path:
          "/webPersonalMain/" + this.menuIs + "/itemderDetail/itemReturnGoods",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.contentBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  &::-webkit-scrollbar {
    width: 0px;
  }
}

// 分隔线
.fenge {
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
.box1 {
  height: 240px;
  display: flex;
  align-items: center;
  .box1_item1 {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      font-size: 24px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #00c514;
      margin-bottom: 10px;
    }
    .box1_item1_button1 {
      width: 96px;
      height: 32px;
      display: flex;
      align-items: center;
      border-color: #156cc2;
      color: #156cc2;
    }
    .box1_item1_button2 {
      width: 96px;
      height: 32px;
      display: flex;
      align-items: center;
      border-color: #ff480e;
      background: #ff480e;
    }
    .box1_item1_button3 {
      width: 96px;
      height: 32px;
      display: flex;
      align-items: center;
      border-color: #999999;
      color: #999999;
    }
    .el-button + .el-button {
      margin-left: 0px;
      margin-top: 10px;
    }
  }
  ::v-deep.box1_item2 {
    width: 800px;
    margin-right: 64px;
    .el-steps {
      .el-step {
        .el-step__head.is-finish {
          color: #00c514;
          .el-step__line {
            background-color: #00c514;
            background: transparent;
            border-top: 5px dotted;
            .el-step__line-inner {
              border-width: 0 !important;
            }
          }
        }
        .el-step__head.is-process {
          .el-step__line {
            color: #c0c4cc !important;
          }
          .el-step__icon.is-icon {
            color: #c0c4cc !important;
          }
        }
      }
      .hong {
        .el-step__head.is-wait {
          .el-step__icon.is-icon {
            color: red !important;
          }
        }
        .el-step__main {
          color: red !important;
        }
      }
    }
    .el-step__line {
      background: transparent;
      border-top: 5px dotted;
      .el-step__line-inner {
        border-width: 0 !important;
      }
    }

    .box1_item2_span {
      width: 100px;
      font-size: 12px;
      color: #00023a;
      font-weight: 500;
    }
    .box1_item2_span_error {
      width: 100px;
      font-size: 12px;
      color: red;
      font-weight: 500;
    }
  }
}
.box2 {
  padding: 38px 30px 59px 30px;
  .box2_item1 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .box2_item2 {
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #00023a;
  }
}
.box3 {
  padding: 10px 30px 0px 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #00023a;
}
.box4 {
  padding: 10px 30px 48px 30px;
  .tableItemTitle {
    font-size: 16px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
  }
  .tableTitle {
    margin-top: 10px;
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
    width: 100%;
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
        width: 132px;
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
.box5 {
  padding: 32px 30px 40px 30px;
  .box5_title {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
  }
  .box5_item1 {
    text-align: right;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #999999;
    margin-bottom: 10px;
  }
  .box5_item2 {
    text-align: right;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ff480e;
  }
}
</style>
