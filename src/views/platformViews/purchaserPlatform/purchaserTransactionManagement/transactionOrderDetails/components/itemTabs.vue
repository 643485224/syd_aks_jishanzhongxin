<template>
  <div>
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input
          clearable
          class="selectInput"
          v-model="orderNum"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search-item">
        交易时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
          v-model="date"
          @change="pickDate"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-button class="search-btn" type="primary" @click="search"
        >查询</el-button
      >
    </div>
    <!-- <cu-table
      class="sale-table"
      :loading="tableLoading"
      :height="height"
      :showTitle="false"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="pages.total"
    >
      <template slot="orderType" slot-scope="value">
        {{ orderTypeList[value.value.orderType] }}
      </template>
      <template slot="fkType" slot-scope="value">
        {{ fkTypeList[value.value.fkType] }}
      </template>
      <template slot="status" slot-scope="value">
        {{ statusTypeList[value.value.status] }}
      </template>
      <template slot="fpStatus" slot-scope="value">
        {{ fpStatusTypeList[value.value.fpStatus] }}
      </template>
      <template slot="orderTime" slot-scope="value">
        {{
          value.value.orderTime
            ? new Date(value.value.orderTime).Format("yyyy-MM-dd")
            : ""
        }}
      </template>
      <template slot="operate" slot-scope="value">
        <a
          v-if="value.value.status == 5"
          @click="orderPaymentButton(value.value)"
          >付款</a
        >
        <a class="ml_20 mr_20" @click="detailsButton(value.value)">详情</a>
        <a
          v-if="value.value.status == 1 || value.value.status == 2"
          style="color: #ff480e"
          @click="
            cancellationOfOrderButton(value.value.id, value.value.orderNo)
          "
          >取消</a
        >
      </template>
    </cu-table> -->
    <cu-dialog
      :title="cancellationOfOrderTitle"
      :showClose="true"
      :visible="cancellationOfOrderVisible"
      @handleClose="cancellationOfOrderClose()"
      @handleOk="cancellationOfOrderOk()"
    >
      <div class="flex mt_20">
        <span class="mr_10">取消订单原因:</span>
        <textarea
          type="textarea"
          style="
            width: 750px;
            outline: none;
            border: 1px solid #dcdfe6;
            border-radius: 6px;
            height: 90px;
            font-size: 18px;
            padding: 10px;
          "
          v-model="canceRemark"
        />
      </div>
    </cu-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pages.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    >
    </el-pagination>
    <div class="tab-list">
      <div class="tab-head">
        <div class="tab-head-item">
          <div class="item-left">
            <!-- <el-checkbox  v-model="checkedAll" @change="handleCheckAllChange">商品</el-checkbox> -->
            <input
              type="checkbox"
              class="chebox"
              name="check"
              v-model="checkedAll"
              @change="handleCheckAllChange"
            />
            <span>商品</span>
          </div>
          <div class="item-right">
            <ul>
              <li>订单金额</li>
              <li>数量</li>
              <!-- <li></li> -->
              <li>实付款</li>
              <li>交易状态</li>
              <li>操作</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-conter">
        <div class="tab-cont" v-for="(val, i) in tableData" :key="i">
          <div class="cont-list">
            <input
              class="chebox"
              type="checkbox"
              name="check"
              v-model="checkModel"
              :value="val.id"
            />
            <!-- <el-checkbox :value="val.id" @change="handleCheck"  v-model="checkModel"></el-checkbox> -->
            <div class="list-right">
              <p>{{ val.orderTime }}</p>
              <p>订单号: {{ val.orderNo }}</p>
              <!-- <p>{{ val.buyerName }}</p> -->
            </div>
          </div>
          <div class="cont-bod">
            <div class="cont-left">
              <div class="cont-item">
                <!-- 关于公布2022年第九批议价药品（自费药）挂网采购清单 -->
                {{ val.supplierName }}
              </div>
              <div class="cont-rmb">￥{{ val.amount }}</div>
              <div class="cont-rmb">{{ val.goodsCategoryCount }}</div>
              <!-- <div class="cont-rmb cont-rm1">
                {{ backTypeList[val.backType] }}
              </div> -->
            </div>
            <div class="cont-right">
              <div class="right-item">
                <span class="rmb"
                  >￥{{ val.amount * val.goodsCategoryCount }}</span
                ><br /><span>（{{ fkTypeList[val.fkType] }}）</span>
              </div>
              <div class="right-item">
                <span>{{ statusTypeList[val.status] }} </span><br />
              </div>
              <div class="right-item">
                <div
                  class="chui"
                  v-if="val.status == 5"
                  @click="orderPaymentButton(val)"
                >
                  付款
                </div>
                <div
                  v-if="val.status == 1 || val.status == 2"
                  class="chui"
                  @click="cancellationOfOrderButton(val.id, val.orderNo)"
                >
                  取消
                </div>
                <!-- 订单状态为待收货才能进行收货 -->
                <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
                <div
                  v-if="val.status == 3"
                  class="chui"
                  @click="listConfirmReceiptButton(val)"
                >
                  确认收货
                </div>

                <!-- 订单状态 已收货 或者 已完成 才能进行评价 -->
                <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
                <div
                  v-if="val.status == 4 || val.status == 6"
                  class="chui"
                  @click="evaluateHandleButton(val)"
                >
                  评价
                </div>

                <!-- 退货：（在线支付（退货申请）订单状态在未完成之前都可以进行退货（除待审核外））
                     （货到付款（退货申请）订单的发票状态在待开票、拒绝收票都可以进行退货） -->
                <!-- 支付方式fkType   1 在线支付  2 货到付款-->
                <!-- 发票状态fpStatus 1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票 -->
                <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
                <div
                  v-if="val.fkType == 1 && val.status < 6 && val.status != 1"
                  class="chui"
                  @click="listReturnGoodsButtonOut(val)"
                >
                  申请退货
                </div>
                <div
                  v-if="
                    val.fkType == 2 &&
                    (val.fpStatus == 1 || val.fpStatus == 6) &&
                    val.status < 6 &&
                    val.status != 1
                  "
                  class="chui"
                  @click="listReturnGoodsButtonOut(val)"
                >
                  申请退货
                </div>
                <div class="ck" @click="detailsButton(val)">查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <onlinePayment
      v-if="onlinePaymentVisible"
      :fkType="fkType"
      :onlinePaymentVisible="onlinePaymentVisible"
      :tableItemData="tableItemData"
      @onlinePaymentHandleClose="onlinePaymentHandleClose"
    ></onlinePayment>
  </div>
</template>
<script>
import {
  buyerTranManagerFindTradeInfo,
  buyerTranManagerCancelOrder,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import onlinePayment from "../../../components/onlinePayment/onlinePayment.vue";
import dayjs from "dayjs";
export default {
  components: {
    onlinePayment,
  },
  props: {
    status: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
      statusTypeList: {
        1: "待响应",
        2: "待发货",
        3: "待收货",
        4: "已收货",
        5: "待付款",
        6: "已完成",
        7: "已取消",
        8: "已拒绝",
        9: "已评价",
        10: "待取消",
        11: "待退货",
        12: "已退货",
      },
      fpStatusTypeList: {
        1: "待开票",
        2: "待收票",
        3: "待付款",
        4: "待结算",
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
          title: "订单状态",
          slot: "status", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
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
          title: "运费金额",
          key: "transportFee",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "180",
        },
      ],

      tableData: [],
      tableItemData: {},
      orderId: null, //订单id
      cancellationOfOrderVisible: false, //取消订单
      cancellationOfOrderTitle: "", //取消订单弹框title
      canceRemark: "", //取消订单原因
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      orderNum: "",
      date: [],

      onlinePaymentVisible: false, //在线支付弹框

      checkedAll: false, //是否是全选
      tableList: [], //所有数据
      checkModel: [], //批量选择id

      fkType: 1, //1开启在线支付弹框，2开启货到付款支付弹框
    };
  },
  created() {
    this.buyerTranManagerFindTradeInfoApi();
  },
  mounted() {},
  watch: {
    checkModel: {
      handler() {
        if (this.checkModel.length == this.tableList.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    // 列表确认收货按钮
    listConfirmReceiptButton(valueData) {
      this.$emit("listConfirmReceiptButton", valueData);
    },
    // 列表申请退货按钮
    listReturnGoodsButtonOut(valueData) {
      this.$emit("listReturnGoodsButtonOut", valueData);
    },
    // 评价按钮
    evaluateHandleButton(valueData) {
      this.$emit("evaluateHandleButton", valueData);
    },

    handleCheckAllChange(val) {
      this.tableList = this.tableData;
      this.checkModel = [];
      if (this.checkedAll) {
        for (var i in this.tableList) {
          this.checkModel.push(this.tableList[i].id);
        }
      }
      console.log(this.checkModel);
    },
    handleCheck(value) {
      console.log(value);
      this.checkModel.push(value);
      if (this.checkModel.length == this.tableData.length) {
        this.checkedAll = true;
      }
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 交易订单明细(查询)-接口
    buyerTranManagerFindTradeInfoApi() {
      this.$emit("chosetableLoading", true);
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      let params = {
        buyerId: this.$store.state.vuex_token.buyer.id, //采购商ID(登录人id)
        sort: "desc",
        currPageNo: this.pages.current,
        endTime: this.date && this.date[1],
        orderNo: this.orderNum, //订单编号
        pageSize: this.pages.size,
        startTime: this.date && this.date[0],
        status: this.status, //状态@  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝
      };
      this.tableData = [];
      buyerTranManagerFindTradeInfo(params)
        .then((res) => {
          this.$emit("chosetableLoading", false);
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.tableData = data.list;
            this.pages.total = data.totalCount;
          }
        })
        .catch((err) => {
          this.$emit("chosetableLoading", false);
          console.log(err);
        });
    },

    // 采购商申请取消订单-接口
    buyerTranManagerCancelOrder() {
      let valueData = new FormData();
      valueData.append("canceRemark", this.canceRemark); //取消原因
      valueData.append("orderId", this.orderId); //订单ID
      buyerTranManagerCancelOrder(valueData)
        .then((res) => {
          this.cancellationOfOrderVisible = false; //关闭取消订单弹框
          if (res.code == 200) {
            this.buyerTranManagerFindTradeInfoApi(); // 查询交易信息列表(采购商)-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.cancellationOfOrderVisible = false; //关闭取消订单弹框
          console.log(err);
        });
    },

    pickDate(val) {
      console.log(val);
    },
    search() {
      this.buyerTranManagerFindTradeInfoApi();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pages.size = val;
      this.buyerTranManagerFindTradeInfoApi();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pages.current = val;
      this.buyerTranManagerFindTradeInfoApi();
    },
    // 订单详情按钮
    detailsButton(valueData) {
      console.log(valueData);
      this.$emit("detailsButton", valueData);
    },
    // 取消订单按钮
    cancellationOfOrderButton(id, orderNo) {
      this.canceRemark = ""; //取消订单原因
      this.orderId = id;
      this.cancellationOfOrderTitle =
        "是否取消订单（订单编号：" + orderNo + "）";
      this.cancellationOfOrderVisible = true;
    },
    // 取消订单弹框
    cancellationOfOrderClose() {
      this.cancellationOfOrderVisible = false;
    },
    // 确定订单弹框
    cancellationOfOrderOk() {
      if (this.canceRemark) {
        this.buyerTranManagerCancelOrder();
      } else {
        this.$message.info("请先填写取消订单原因！");
      }
    },

    // 订单付款-按钮 (开启在线支付弹框)
    orderPaymentButton(tableItemData) {
      this.tableItemData = tableItemData;
      this.fkType = tableItemData.fkType;
      this.onlinePaymentVisible = true;
    },

    // 关闭在线支付弹框
    onlinePaymentHandleClose(value) {
      this.onlinePaymentVisible = value;
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-list {
  width: 100%;
  .tab-head-item {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    height: 40px;
    padding: 0 0px 0 24px;

    background: #e8f0f8;
    font-size: 14px;
    color: #00023a;
    .item-left {
      display: flex;
      align-items: center;
      width: 30%;
      line-height: 40px;
      height: 40px;
      input {
        margin: 0;
        margin-right: 12px;
      }
    }
    .item-right {
      width: 64%;
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
  .tab-conter {
    width: 100%;
    .tab-cont {
      margin-top: 14px;
      width: 100%;
      border: 1px solid #999999;
      box-sizing: border-box;
      .cont-list {
        line-height: 40px;
        height: 40px;
        padding: 0 30px 0 24px;
        background: #e8f0f8;
        font-size: 14px;
        color: #00023a;
        display: flex;
        .list-right {
          margin-left: 12px;
          display: flex;
          p {
            font-size: 16px;
            color: #020552;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            &:nth-child(1) {
              font-weight: 600;
              margin-right: 20px;
            }
            &:nth-child(2) {
              margin-right: 110px;
            }
            &:nth-child(3) {
              // display: flex;
              width: 230px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .cont-bod {
        height: 124px;
        width: 100%;
        display: flex;
        .cont-left {
          padding: 19px 0 0 47px;
          display: flex;
          .cont-item {
            width: 262px;
            height: 70px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 19px;
            margin-right: 50px;
          }
          .cont-rmb {
            width: 120px;
            text-align: center;
            // width: 69px;
            height: 24px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 19px;
          }
          .cont-rm1 {
            margin-right: 0;
            width: 120px;
          }
        }
        .cont-right {
          height: 100%;
          display: flex;
          .right-item {
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
            .ck {
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #0e78f3;
              cursor: pointer;
            }
            .chui {
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #ff480e;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

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

.sale-table {
  // width: 100%;
  font-weight: 500;
}

// 在线支付弹框
.onlinePayment {
  .onlinePayment_one {
    width: 100%;
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }

  .onlinePayment_two {
    width: 100%;
    height: 80px;
    background: #eeeeee;

    .el_radio_1 {
      display: inline-block;
      width: 300px;
      padding-left: 20px;
    }
  }
}

// 输入密码弹框
.inputPassword {
  width: 100%;

  .el_row {
    margin-top: 20px;
    width: 400px;

    .el_col {
      display: flex;
      align-items: center;

      .title {
        width: 120px;
        text-align: right;
        margin-right: 20px;
      }

      .el_input {
        width: 300px;

        ::v-deep .el-input__inner {
          border-radius: 0px 0px 0px 0px;
        }
      }
    }
  }
}

// 支付收银台弹框
.paymentCashier {
  height: 262px;

  .paymentCashier_one {
    height: 80px;
    width: 80px;
    // background: rebeccapurple;
    background: url("./image/success.png");
  }

  .paymentCashier_two {
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00c514;
  }

  .paymentCashier_three {
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
}
</style>
