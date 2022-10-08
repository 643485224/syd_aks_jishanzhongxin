<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back"
      >返回上一页</el-button
    >
    <div class="header">
      <h2 class="header-title">发票详情</h2>
    </div>
    <div class="content">
      <div class="info">
        <!-- 支付方式fkType   1 在线支付  2 货到付款-->
        <!-- 货到付款：开票、收票/拒绝、付款、结算、完成
             在线支付：开票、收票/拒绝-->
        <el-steps
          v-if="tableItemData.fkType == 1"
          :active="elStepsValue"
          align-center
          process-status="wait"
          finish-status="success"
        >
          <el-step>
            <template slot="description">
              <div class="box1_item2_span mt_10">开票</div>
            </template>
          </el-step>
          <el-step v-if="tableItemData.fpStatus != 6">
            <template slot="description">
              <div class="box1_item2_span mt_10">收票</div>
            </template>
          </el-step>
          <el-step v-if="tableItemData.fpStatus == 6">
            <template slot="description">
              <div class="box1_item2_span mt_10">拒绝</div>
            </template>
          </el-step>
        </el-steps>

        <el-steps
          v-else
          :active="elStepsValue"
          align-center
          process-status="wait"
          finish-status="success"
        >
          <el-step>
            <template slot="description">
              <div class="box1_item2_span mt_10">开票</div>
            </template>
          </el-step>
          <el-step v-if="tableItemData.fpStatus != 6">
            <template slot="description">
              <div class="box1_item2_span mt_10">收票</div>
            </template>
          </el-step>
          <el-step v-if="tableItemData.fpStatus == 6">
            <template slot="description">
              <div class="box1_item2_span mt_10">拒绝</div>
            </template>
          </el-step>
          <el-step>
            <template slot="description">
              <div class="box1_item2_span mt_10">付款</div>
            </template>
          </el-step>
          <el-step>
            <template slot="description">
              <div class="box1_item2_span mt_10">结算</div>
            </template>
          </el-step>
          <el-step>
            <template slot="description">
              <div class="box1_item2_span mt_10">完成</div>
            </template>
          </el-step>
        </el-steps>
      </div>
      <div class="info">
        <div class="info-title">发票信息</div>
        <div class="info-table">
          <cu-table
            :showTitle="false"
            :tableHeader="tableHeader"
            :tableData="tableData"
            :showPagination="false"
            :showHeight="false"
          >
            <template slot="invoiceCode" slot-scope="value">
              {{ value.value.orderJcInvoice.invoiceCode }}
            </template>
            <template slot="invoiceNo" slot-scope="value">
              {{ value.value.orderJcInvoice.invoiceNo }}
            </template>

            <template slot="receiveInvoiceTime" slot-scope="value">
              {{
                value.value.receiveInvoiceTime
                  ? new Date(value.value.receiveInvoiceTime).Format(
                      "yyyy-MM-dd"
                    )
                  : ""
              }}
            </template>

            <template slot="orderTime" slot-scope="value">
              {{
                value.value.orderTime
                  ? new Date(value.value.orderTime).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>
            <template slot="payLimit" slot-scope="value">
              {{
                value.value.payLimit
                  ? new Date(value.value.payLimit).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>

            <template slot="fpStatus" slot-scope="value">
              {{ fpStatusList[value.value.fpStatus] }}
            </template>
            <template slot="fkType" slot-scope="value">
              {{ fkTypeList[value.value.fkType] }}
            </template>
          </cu-table>
        </div>
      </div>
      <div class="info">
        <div class="info-title">商品信息</div>
        <div class="info-table">
          <cu-table
            :showTitle="false"
            :tableHeader="tableHeader2"
            :tableData="tableData2"
            :showPagination="false"
            :showHeight="false"
          >
            <template slot="receiveInvoiceTime" slot-scope="value">
              {{
                value.value.receiveInvoiceTime
                  ? new Date(value.value.receiveInvoiceTime).Format(
                      "yyyy-MM-dd"
                    )
                  : ""
              }}
            </template>
            <template slot="status" slot-scope="value">
              {{ statusList[value.value.status] }}
            </template>
            <template slot="orderTime" slot-scope="value">
              {{
                value.value.orderTime
                  ? new Date(value.value.orderTime).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>
            <template slot="payLimit" slot-scope="value">
              {{
                value.value.payLimit
                  ? new Date(value.value.payLimit).Format("yyyy-MM-dd")
                  : ""
              }}
            </template>
            <template slot="fpStatus" slot-scope="value">
              {{ fpStatusList[value.value.fpStatus] }}
            </template>
          </cu-table>
        </div>
      </div>
      <div class="info">
        <div class="info-title">日志</div>
        <div class="info-content">
          <div class="info-item">
            <span>【确认收票】 &nbsp;</span>
            <span class="ml_30">操作人: &nbsp;{{ orderLog1.operBy }}</span>
            <span class="ml_30">时间: &nbsp;{{ orderLog1.operTime }}</span>
          </div>
          <div class="info-item">
            <span>【创建发票】 &nbsp;</span>
            <span class="ml_30">操作人: &nbsp;{{ orderLog2.operBy }}</span>
            <span class="ml_30">时间: &nbsp;{{ orderLog2.operTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  buyerInvoiceGetInvoiceDetails,
  buyerTranManagerOrderProcess,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
export default {
  data() {
    return {
      fpStatusList: {
        1: "待开票",
        2: "待收票",
        3: "已收票",
        4: "待结算",
        5: "完成收款",
        6: "拒绝收票",
      },
      fkTypeList: {
        1: "在线支付",
        2: "货到付款",
      },
      auditStatusType: {
        1: "待审核",
        2: "审核通过",
        3: "审核不通过",
      },
      statusType: {
        1: "待响应",
        2: "待发货",
        3: "待收货",
        4: "已收货",
        5: "待付款",
        6: "待评价",
        7: "已取消",
        8: "已拒绝",
        10: "待取消",
      },
      payType: {
        1: "在线支付",
        2: "货到付款",
      },
      consigType: {
        1: "阿克苏集散中心物流",
        2: "普通快递",
      },
      tableItemData: {}, //上层列表单条数据
      details: {},
      orderNo: "",
      orderId: "",
      tableHeight: 130,
      // 标题
      tableHeader: [
        {
          title: "关联合同编号",
          key: "contractNo",
          width: 160,
        },
        {
          title: "订单编号",
          key: "orderNo",
        },
        {
          title: "发票代码",
          slot: "invoiceCode",
        },
        {
          title: "发票号码",
          slot: "invoiceNo",
        },

        {
          title: "开票人",
          key: "invoiceBy",
        },
        {
          title: "收票人",
          key: "receiveInvoiceBy",
        },
        {
          title: "发票状态",
          slot: "fpStatus", // 发票状态@ 1  待开票  2  待收票  3 待付款（已收票）  4  完成收款   5  拒绝收票
        },
        {
          title: "订单金额",
          key: "amount",
        },
        {
          title: "发票备注",
          key: "invoiceRemark",
        },
        {
          title: "开票时间",
          key: "invoiceTime",
          width: "90",
        },
        {
          title: "收票时间",
          slot: "receiveInvoiceTime",
          width: "90",
        },
        {
          title: "交易时间",
          key: "orderTime",
          width: "90",
        },
      ],
      tableHeader2: [
        {
          title: "产品编号",
          key: "goodsCode",
        },
        {
          title: "通用名",
          key: "commonName",
        },
        {
          title: "剂型",
          key: "jx",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "单位",
          key: "unit",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "数量",
          key: "quantity",
        },
        {
          title: "采购价(元)",
          key: "buyPrice",
        },
        {
          title: "小计",
          key: "subtotal",
        },
      ],
      tableData: [],
      tableData2: [],

      expressNumber: "",
      refuseVisible: false,
      shipVisible: false,
      rejectReason: "",
      auditVisible: false,
      auditRemark: "",

      pages: {
        current: 1,
        size: 10,
        total: 0,
      },

      orderLog1: {},
      orderLog2: {},

      // 订单流程情况接口回参
      buyerTranManagerOrderProcessObject: {},
      elStepsValue: 0, //步骤条状态
    };
  },
  mounted() {
    this.tableItemData = this.$route.params.tableItemData;
    console.log("this.tableItemData:", this.tableItemData);
    this.tableData = [];
    this.tableData.push(this.tableItemData);
    //  支付方式fkType   1 在线支付  2 货到付款
    // 1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票
    if (this.tableItemData.fkType == 1) {
      //  在线支付：开票、收票/拒绝
      if (this.tableItemData.fpStatus == 2) {
        this.elStepsValue = 1;
      }
      if (
        this.tableItemData.fpStatus == 3 ||
        this.tableItemData.fpStatus == 6
      ) {
        this.elStepsValue = 2;
      }
    } else {
      //  货到付款：开票、收票/拒绝、付款、结算、完成
      if (this.tableItemData.fpStatus == 2) {
        this.elStepsValue = 1;
      }
      if (
        this.tableItemData.fpStatus == 3 ||
        this.tableItemData.fpStatus == 6
      ) {
        this.elStepsValue = 2;
      }
      if (this.tableItemData.fpStatus == 4) {
        this.elStepsValue = 3;
      }
      if (this.tableItemData.fpStatus == 5) {
        this.elStepsValue = 5;
      }
    }

    this.buyerInvoiceGetInvoiceDetailsApi();
  },
  methods: {
    // 获取发票详情-接口
    async buyerInvoiceGetInvoiceDetailsApi() {
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        orderId: this.tableItemData.id, //订单ID
        orderType: this.tableItemData.orderType, //商品类型，1药品 2器械
      };
      await buyerInvoiceGetInvoiceDetails(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData2 = res.data.goodsInfoList.list;
            this.orderLog1 = res.data.orderLog1;
            this.orderLog2 = res.data.orderLog2;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
      // 获取订单流程-接口
      await buyerTranManagerOrderProcess(this.tableItemData.id)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.buyerTranManagerOrderProcessObject = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    refuseClose() {
      this.clearDialog();
      this.refuseVisible = false;
    },
    clearDialog() {
      this.rejectReason = "";
      this.expressNumber = "";
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./invoicedDetail.scss";
</style>
