<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="header">
      <h2 class="header-title">结算明细</h2>
    </div>
    <div class="content">

      <div class="info">
        <div class="info-title">结算明细</div>
        <div class="info-table">
          <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="[settleInfo]" :showPagination="false"
            :showHeight="false">
            <template slot="settleType" slot-scope="value">
              {{ settleType[value.value.settleStatus] }}
            </template>
          </cu-table>
        </div>
      </div>
      <div class="info">

        <div class="info-title flex_ac_jb"><span>订单明细</span></div>
        <div class="info-table">
          <cu-table :showTitle="false" :tableHeader="tableHeader2" :tableData="tableData2" :showPagination="false"
            :showHeight="false">
            <template slot="status" slot-scope="value">
              {{ statusType[value.value.status] }}
            </template>
            <template slot="operation" slot-scope="value">
              <el-button class="operation-btn" type="text" size="mini" @click="toDetails(value.value.orderId)">订单详情
              </el-button>

            </template>
          </cu-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSettlementDatail } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  data() {
    return {
      details: {},
      settleNo: '',
      settleInfo: {},
      settleType: {
        0: '未结算',
        1: '已结算',
      },
      tableHeight: 130,
      tableHeader: [
        {
          title: "结算单号",
          key: "settleNo",
        },
        {
          title: "结算金额",
          key: "orderAmount",
        },
        {
          title: "结算订单数",
          key: "orderCount",
        },
        {
          title: "订单总额",
          key: "amount",
        },
        {
          title: "结算时间",
          key: "settleTime",
        },
        {
          title: "状态",
          key: "settleStatus",
        },

      ],
      tableHeader2: [
        {
          title: "订单编号",
          key: "orderNo",
          width: 160,
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: 120,
        },
        {
          title: "发票代码",
          key: "invoiceCode",
          width: 120,
        },
        // {
        //     title: "商品种类",
        //     key: "goodsCategoryCount",
        // },
        // {
        //     title: "商品数量",
        //     key: "goodsCount",
        // },
        {
          title: "采购商名称",
          key: "buyerName",
          width: 120,
        },
        {
          title: "订单状态",
          slot: "status",//  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
        },
        // {
        //     title: "支付方式",
        //     slot: "fkType",//  1 在线支付  2 货到付款
        // },
        {
          title: "交易时间",
          slot: "orderTime",
          width: 120,
        },
        {
          title: "订单金额",
          key: "amount",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right"
        },
      ],
      tableData: [],
      tableData2: [],
      auditStatusType: {
        1: '待审核',
        2: '审核通过',
        3: '审核不通过',
      },
      statusType: {
        1: '待响应',
        2: '待发货',
        3: '待收货',
        4: '已收货',
        5: '待付款',
        6: '待评价',
        7: '已取消',
        8: '已拒绝',
        10: '待取消'
      },

    }
  },
  created() {
    this.settleNo = this.$route.params.settleNo;
    this.settleInfo = JSON.parse(this.$route.params.settleInfo);
    console.log(this.settleInfo);
    this.getSettlementDatail()
  },
  methods: {
    getSettlementDatail() {
      getSettlementDatail({ settleNo: this.settleInfo.settleNo }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.details = res.data;
          this.tableData2 = res.data.records;
          console.log(this.details);

        } else {
          this.$message.warning("订单详情获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },

    toDetails(orderId) {
      this.$router.push({ name: 'supplierTransactionOrderDetails', params: { orderId } })

    },
    back() {
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="scss" src="./supplierSettlementLogDetails.scss" scoped>

</style>
