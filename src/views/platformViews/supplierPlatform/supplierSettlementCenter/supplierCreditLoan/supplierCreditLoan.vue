<template>
   
  <div ref="contentBox" class="page-container table-page">

    <div class="content-top" >
      <div class="left">
        <div class="info-box">
          <img class="logo" :src="logo" alt="" srcset="">
          <div class="label mt_10">{{vuex_user.name}}</div>
          <div class="credit-info mt_10">
            <span>信用分:</span><span class="small-price">{{settleInfo.score || 0}}分</span><span class="">优秀</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="label">最高可贷额度</div>
        <div class="price">800<span class="small-price">万</span></div>
        <div class=" mt_20">
          <el-button type="primary" class="btn_156CC2">去申请</el-button>
        </div>
      </div>
    </div>


    <!-- <div class="label mb_20">结算记录</div>
    <div>
      <cu-table class="sale-table" :showTitle="false" :height="tableHeight" :loading="tableLoading"
        :tableHeader="tableHeader" :tableData="tableData" :total="pages.total" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange">
        <template slot="operation" slot-scope="value">
          <el-button type="text">明细</el-button>
        </template>
      </cu-table>
    </div> -->
  </div>
</template>
<script>
import { getSupplierSettlement } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      logo: require('@/assets/images/Logo.png'),
      tableHeight: 0,
      tableLoading: false,
      tableHeader: [
        {
          title: "结算单号",
          key: "quantity",
        },
        {
          title: "结算金额",
          key: "quantity",
        },
        {
          title: "结算订单数",
          key: "quantity",
        },
        {
          title: "订单总额",
          key: "quantity",
        },
        {
          title: "结算时间",
          key: "quantity",
        },
        {
          title: "状态",
          key: "quantity",
        },
        {
          title: "操作",
          slot: "operation",
          fixed: "right",
          width: "180",
        },
      ],
      tableData: [],
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      orderStatus: 1,
      orderNum: null,
      date: [],
      settleInfo: {}
    };
  },
  mounted() {
    this.handleHeight();
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {
    ...mapState(['vuex_user'])
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs.contentBox.offsetHeight - 437;
      });
    },
    getSettlementInfo() {
      getSupplierSettlement()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.settleInfo = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" src="./supplierCreditLoan.scss" scoped>

</style>
