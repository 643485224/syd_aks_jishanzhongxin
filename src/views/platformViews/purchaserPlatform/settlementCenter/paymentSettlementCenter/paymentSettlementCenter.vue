<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one11">
          {{ settlementGetStatInfoObject.amount }}
        </div>
        <div class="content_one12 mt_10">账号余额（元）</div>
      </div>
      <div class="content_one2">
        <div class="content_one21">
          <el-button
            type="primary"
            class="btn_ff480e"
            @click="settlementTopUpButton"
            >充值</el-button
          >
        </div>
        <div class="content_one22 mt_20">
          <el-button
            type="primary"
            class="btn_156CC2"
            @click="settlementWithdrawDepositButton"
            >提现</el-button
          >
        </div>
      </div>
      <div class="content_one3">
        <div class="content_one31">
          <span class="content_one311 mr_20">待支付发票(元):</span>
          <span class="content_one312">{{
            settlementGetStatInfoObject.dzfAmount
          }}</span>
        </div>
        <div class="content_one31 mt_20">
          <span class="content_one311 mr_20">已支付发票(元):</span>
          <span class="content_one312">{{
            settlementGetStatInfoObject.yzfAmount
          }}</span>
        </div>
      </div>
    </div>

    <div class="content_two mt_40 mb_20"></div>

    <div class="content_three mb_20">交易统计(元)</div>
    <div class="content_four mb_20">
      <div class="content_four1">
        <span class="mr_10">交易金额:</span>
        <span>{{ settlementGetStatInfoObject.orderAmount }}</span>
      </div>
      <div class="content_four2">
        <span class="mr_10">待开票金额:</span>
        <span>{{ settlementGetStatInfoObject.dkpAmount }}</span>
      </div>
      <div class="content_four3">
        <span class="mr_10">待收票金额:</span>
        <span>{{ settlementGetStatInfoObject.dspAmount }}</span>
      </div>
    </div>
    <div class="content_three mb_20">待支付发票</div>
    <div>
      <!--  :selection="true"  
        @handleSizeChange="handleSizeChange" -->
      <cu-table
        class="sale-table"
        :showTitle="false"
        :height="tableHeight"
        :loading="tableLoading"
        :tableHeader="tableHeader"
        :tableData="tableData"
        :total="pages.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
      >
        <template slot="expand" slot-scope="value">
          <div class="expand-info">
            <div class="title">发票信息</div>
            <div class="content">
              <div class="item">
                <div class="label">发票代码:</div>
                <div class="value">{{ value.value.invoiceCode }}</div>
              </div>
              <div class="item">
                <div class="label">发票号码:</div>
                <div class="value">{{ value.value.invoiceNo }}</div>
              </div>
              <div class="item">
                <div class="label">最迟付款时间:</div>
                <div class="value">{{ value.value.payLimitDate }}</div>
              </div>
              <div class="item">
                <div class="label">收票时间:</div>
                <div class="value">{{ value.value.receiveInvoiceTime }}</div>
              </div>
              <div class="item">
                <div class="label">开票人:</div>
                <div class="value">{{ value.value.invoiceBy }}</div>
              </div>
              <!-- <div class="item"><div class="label">发票备注:</div><div class="value">{{value.value.invoiceRemark}}</div></div>
              <div class="item"><div class="label">收票时间:</div><div class="value">{{value.value.receiveInvoiceTime }}</div></div> -->
              <!-- <div class="item"><div class="label">退货状态:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
              <!-- <div class="item"><div class="label">交易时间:</div><div class="value">{{value.value.orderTime}}</div></div> -->
              <!-- <div class="item"><div class="label">退货类型:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
              <!-- <div class="item"><div class="label">商品类型:</div><div class="value">{{value.value.goodsType == 1?'药品':'器械'}}</div></div> -->
              <!-- <div class="item"><div class="label">支付方式:</div><div class="value">{{value.value.type}}</div></div> -->
              <!-- <div class="item"><div class="label">商品数量:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
              <!-- <div class="item"><div class="label">供应商名称:</div><div class="value">{{value.value.supplierName}}</div></div> -->
            </div>
          </div>
        </template>
        <template slot="operate" slot-scope="value">
          <a
            style="color: #ff480e"
            v-if="true"
            @click="paymentButton(value.value)"
            >支付</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(审核通过)才可支付"
            placement="top"
          >
            <a class="aDisabled" style="color: #ff480e"> 支付 </a>
          </el-tooltip> -->
          <a class="ml_20" @click="detailsButton(value.value)">详情</a>
        </template>
      </cu-table>
    </div>

    <onlinePayment
      diyPayType="支付结算中页面支付"
      v-if="onlinePaymentVisible"
      :fkType="2"
      :onlinePaymentVisible="onlinePaymentVisible"
      :tableItemData="tableItemData"
      @onlinePaymentHandleClose="onlinePaymentHandleClose"
    ></onlinePayment>

    <cu-dialog
      width="600px"
      title="充值"
      :center="'center'"
      :showClose="true"
      :visible="settlementTopUpVisible"
      @handleClose="settlementTopUpHandleClose()"
      @handleOk="settlementTopUpHandleOk()"
    >
      <div class="flex_fc_ac">
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">银行卡号:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementTopUpRequest.bankCardNo"
              placeholder="请输入银行卡号"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">充值金额:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementTopUpRequest.payAmount"
              placeholder="请输入充值金额"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">充值备注:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementTopUpRequest.remark"
              placeholder="请输入充值备注"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </cu-dialog>

    <cu-dialog
      width="40vw"
      title="提现"
      :center="'center'"
      :showClose="true"
      :visible="settlementWithdrawDepositVisible"
      @handleClose="settlementWithdrawDepositHandleClose()"
      @handleOk="settlementWithdrawDepositHandleOk()"
    >
      <div class="flex_fc_ac">
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">银行卡号:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementWithdrawDepositRequest.bankCardNo"
              placeholder="请输入银行卡号"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">提现金额:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementWithdrawDepositRequest.withdrawAmount"
              placeholder="请输入提现金额"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">提现备注:</div>
            <el-input
              clearable
              class="el_input"
              v-model="settlementWithdrawDepositRequest.remark"
              placeholder="请输入提现备注"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  settlementGetNoPaymentOrderList,
  settlementGetStatInfo,
  settlementTopUp,
  settlementWithdrawDeposit,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import onlinePayment from "../../components/onlinePayment/onlinePayment.vue";
export default {
  components: {
    onlinePayment,
  },
  data() {
    return {
      // 发票状态
      fpStatusList: {
        1: "待开票",
        2: "待收票",
        3: "待付款（已收票）",
        4: "待结算（采购商已付款）",
        5: "完成收款",
        6: "拒绝收票",
      },
      // 订单状态
      statusList: {
        1: "待响应",
        2: "待发货",
        3: "待收货",
        4: "已收货",
        5: "待付款",
        6: "待评价",
        7: "已取消",
        8: "已拒绝",
        9: "已评价",
        10: "待取消",
        11: "待退货",
        12: "已退货",
      },
      tableHeight: 0,
      tableLoading: false,
      tableHeader: [
        {
          slot: "expand",
          align: "center",
        },
        {
          title: "序号",
          key: "index",
          width: "60",
          align: "center",
        },
        // {
        //   title: "发票代码",
        //   key: "invoiceCode",
        // },
        // {
        //   title: "发票号码",
        //   key: "invoiceNo",
        // },
        {
          title: "关联合同编号",
          key: "contractNo",
        },
        {
          title: "关联订单编号",
          key: "orderNo",
        },
        // {
        //   title: "最迟付款时间",
        //   key: "payLimitDate",
        //   width: 90,
        // },
        // {
        //   title: "收票时间",
        //   key: "receiveInvoiceTime",
        //   width: 90,
        // },
        // {
        //   title: "开票人",
        //   key: "invoiceBy",
        // },
        {
          title: "发票金额",
          key: "invoiceAmount",
        },
        {
          title: "发票状态",
          key: "fpStatus",
        },
        {
          title: "订单状态",
          key: "status",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: 120,
        },
      ],
      tableData: [],
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      onlinePaymentVisible: false, //在线支付弹框
      // 支付结算中心(统计信息)-接口回参
      settlementGetStatInfoObject: {
        amount: 0, //余额
        dzfAmount: 0, //待支付发票
        yzfAmount: 0, //已支付发票
        orderAmount: 0, //交易金额
        dkpAmount: 0, //代开票金额
        dspAmount: 0, //代收票金额
      },
      // 支付结算中心(充值)-接口传参
      settlementTopUpRequest: {
        bankCardNo: "", //	银行卡号
        payAmount: 0, //	充值金额
        remark: "", //	充值备注
      },
      // 支付结算中心(提现)-接口传参
      settlementWithdrawDepositRequest: {
        bankCardNo: "", //	银行卡号
        withdrawAmount: 0, //	提现金额
        remark: "", //	提现备注
      },

      settlementTopUpVisible: false, //充值弹框
      settlementWithdrawDepositVisible: false, //提现弹框

      fkType: 1, //1开启在线支付弹框，2开启货到付款支付弹框
    };
  },
  mounted() {
    this.handleHeight();
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };

    this.settlementGetNoPaymentOrderListApi(); // 读取待支付订单列表-接口
    this.settlementGetStatInfoApi(); // 支付结算中心(统计信息)-接口
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 读取待支付订单列表-接口
    settlementGetNoPaymentOrderListApi() {
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
      };
      settlementGetNoPaymentOrderList(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.list;
            this.pages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 支付结算中心(统计信息)-接口
    settlementGetStatInfoApi() {
      settlementGetStatInfo()
        .then((res) => {
          if (res.code == 200) {
            this.settlementGetStatInfoObject = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 支付结算中心(充值)-接口
    settlementTopUpApi() {
      let valueData = new FormData();
      valueData.append("bankCardNo", this.settlementTopUpRequest.bankCardNo); //	银行卡号
      valueData.append("payAmount", this.settlementTopUpRequest.payAmount); //	提现金额
      valueData.append("remark", this.settlementTopUpRequest.remark); //	提现备注
      settlementTopUp(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.settlementGetNoPaymentOrderListApi(); // 读取待支付订单列表-接口
            this.settlementGetStatInfoApi(); // 支付结算中心(统计信息)-接口
            this.settlementTopUpVisible = false;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 支付结算中心(提现)-接口
    settlementWithdrawDepositApi() {
      let valueData = new FormData();
      valueData.append(
        "bankCardNo",
        this.settlementWithdrawDepositRequest.bankCardNo
      ); //	银行卡号
      valueData.append(
        "withdrawAmount",
        this.settlementWithdrawDepositRequest.withdrawAmount
      ); //	提现金额
      valueData.append("remark", this.settlementWithdrawDepositRequest.remark); //	提现备注
      settlementWithdrawDeposit(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.settlementGetNoPaymentOrderListApi(); // 读取待支付订单列表-接口
            this.settlementGetStatInfoApi(); // 支付结算中心(统计信息)-接口
            this.settlementWithdrawDepositVisible = false;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs.contentBox.offsetHeight - 437;
      });
    },
    handleCurrentChange(vlaue) {
      this.pages.current = vlaue;
      this.settlementGetNoPaymentOrderListApi();
    },
    handleSizeChange(vlaue) {
      this.pages.size = vlaue;
      this.settlementGetNoPaymentOrderListApi();
    },
    handleSelectionChange(valueData) {
      console.log(valueData);
    },

    // 支付-按钮 (开启在线支付弹框)
    paymentButton(tableItemData) {
      this.tableItemData = tableItemData;
      this.fkType = tableItemData.fkType;
      this.onlinePaymentVisible = true;
    },

    // 关闭在线支付弹框
    onlinePaymentHandleClose(value) {
      this.onlinePaymentVisible = value;
      this.settlementGetNoPaymentOrderListApi(); // 读取待支付订单列表-接口
    },

    // 详情按钮
    detailsButton(tableItemData) {
      this.$router.push({
        name: "invoicedDetail",
        params: { tableItemData: tableItemData },
      });
    },
    // 充值按钮
    settlementTopUpButton() {
      // 支付结算中心(充值)-接口传参
      this.settlementTopUpRequest.bankCardNo = ""; //	银行卡号
      this.settlementTopUpRequest.payAmount = 0; //	充值金额
      this.settlementTopUpRequest.remark = ""; //	充值备注
      this.settlementTopUpVisible = true;
    },
    // 充值弹框-取消按钮
    settlementTopUpHandleClose() {
      this.settlementTopUpVisible = false;
    },
    // 充值弹框-确定按钮
    settlementTopUpHandleOk() {
      this.settlementTopUpApi(); //支付结算中心(充值)-接口
    },
    // 提现按钮
    settlementWithdrawDepositButton() {
      // 支付结算中心(提现)-接口传参
      this.settlementWithdrawDepositRequest.bankCardNo = ""; //	银行卡号
      this.settlementWithdrawDepositRequest.withdrawAmount = 0; //	提现金额
      this.settlementWithdrawDepositRequest.remark = ""; //	提现备注
      this.settlementWithdrawDepositVisible = true;
    },
    // 提现弹框-取消按钮
    settlementWithdrawDepositHandleClose() {
      this.settlementWithdrawDepositVisible = false;
    },
    // 提现弹框-确定按钮
    settlementWithdrawDepositHandleOk() {
      this.settlementWithdrawDepositApi(); // 支付结算中心(提现)-接口
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./paymentSettlementCenter.scss";
</style>
