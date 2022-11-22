<template>



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

  <div ref="contentBox" class="page-container table-page">
    <div class="content_one">
      <div class="card_logo" @click="activeNameChange">
        <img class="logo_img" :src="settleInfo.logoUrl" alt="" srcset="" />
        <div class="logo_title">{{settleInfo.unitName}}</div>
        <div class="logo_body">
          信用分:&nbsp;&nbsp;
          <span style="color: red"> {{settleInfo.score}} </span>
          &nbsp;&nbsp;{{
            settleInfo.score &lt;  60
    ? "差"
                : settleInfo.score >= 60 && settleInfo.score &lt; 80
    ? "一般"
                : settleInfo.score >= 80 && settleInfo.score &lt; 90
    ? "良好"
                : "极好"
                }}
        </div>
      </div>
      <div class="content_one1" v-if="activeName == '未使用'">
        <div class="lableTitle">待还款+</div>
        <div class="lableNumber mt_10 mb_50">1500000</div>
        <el-button type="primary" class="btn_ff480e">去申请</el-button>
      </div>
      <div class="content_oneBody">
        <div class="content_one1 mr_80" v-if="activeName == '已使用'">
          <div class="lableTitle">可借额度</div>
          <div class="lableNumber mt_10 mb_20">{{settleInfo.credit-settleInfo.usedCredit}}</div>
          <p class="btn_ff480"><span>惠</span>手续费<span>5</span>折优惠</p>
          <el-button type="primary" class="btn_ff480e">去借钱</el-button>
        </div>
        <div class="content_one2" v-if="activeName == '已使用'">
          <div>
            <span class="lableTitle mr_20">总额度(元):</span>
            <span class="lableNumber">{{ settleInfo.credit}}</span>
          </div>
          <div class="mt_20">
            <span class="lableTitle mr_20">剩余额度(元):</span>
            <span class="lableNumber">{{settleInfo.usedCredit}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content_two mt_60" v-if="activeName == '未使用'">
      <div class="lableTitle mb_10">注意事项</div>
      <div class="lableText">说明文字</div>
    </div>
    <div v-if="activeName == '已使用'">
      <div class="fenge mt_30 mb_20"></div>
      <div class="content_three">付款记录</div>
      <div class="content_four mt_10">
        <div class="mb_10">
          <span class="mr_10">订单编号:</span>
          <el-input
            clearable
            class="el_input"
            v-model="el_input"
            placeholder="请输入订单编号"
          >
          </el-input>
        </div>
        <div class="ml_20 mb_10">
          <span class="mr_10">结算状态:</span>
          <el-select
            class="el_select"
            v-model="el_select"
            placeholder="请选择"
          >
          <el-option label="全部" :value="''"></el-option>
            <el-option label="未还" :value="0"></el-option>
            <el-option label="已还" :value="1"></el-option>
          </el-select>
        </div>
        <div class="ml_20">
          <span class="mr_10">交易时间:</span>
          <el-date-picker
            class="el_date_picker"
            v-model="el_date_picker"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" class="btn_ff480e" @click="search"
          >查询</el-button
        >
      </div>
      <div class="mt_10">
        <cu-table
          class="sale-table"
          :loading="tableLoading"
          :height="tableHeight"
          :showTitle="false"
          :tableHeader="tableHeader"
          :tableData="tableData"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :total="pages.total"
        >
        <template slot="status" slot-scope="value">
          {{ value.value.status==1?'已还':'未还' }}
        </template>
        </cu-table>
      </div>
    </div>

</div>
</template>
<script>
import { getSupplierSettlement,getSupplierLoanRecordsList } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      logo: require('@/assets/images/Logo.png'),
      tableHeight: 0,
      tableLoading: false,
      tableHeader: [
        {
          title: "借款单号",
          key: "loanNo",
        },
        {
          title: "借款金额",
          key: "amount",
        },
        {
          title: "借款日期",
          slot: "loanDate", // 1 药品  2  器械
        },
        {
          title: "还款日期",
          key: "backDate",
        },
        {
          title: "还款金额",
          key: "backAmount",
        },
        {
          title: "日利率",
          key: "dayRate",
        },
        {
          title: "计息方式",
          key: "calcMethod",
        },
        {
          title: "贷款人",
          slot: "fkType", //  1 在线支付  2 货到付款
        },
        {
          title: "状态",
          slot: "status", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
        },
        // {
        //   title: "操作",
        //   slot: "operate",
        // },
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
      settleInfo: {},
      activeName:'已使用',
      el_date_picker: [],
      el_input: "",
      el_select: "",
      tableHeight: 0,
      tableLoading: false,
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
  created () {
    this.getSettlementInfo()
    this.getSupplierLoanRecordsList()
  },
  methods: {
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs.contentBox.offsetHeight - 437;
      });
    },
    activeNameChange() {
      if (this.activeName == "未使用") {
        this.activeName = "已使用";
      } else {
        this.activeName = "未使用";
      }
    },
  async  getSupplierLoanRecordsList(){
    let params = {
        pageSize:this.pages.size,
        currPageNo:this.pages.current,
        beginMonth:this.el_date_picker[0]?new Date(this.el_date_picker[0]).Format("yyyy-MM-dd "):null,
        endMonth:this.el_date_picker[1]?new Date(this.el_date_picker[0]).Format("yyyy-MM-dd "):null,
        orderNo:this.el_input,
        status:this.el_select,
      }
    getSupplierLoanRecordsList(params).then(res => {
      if(res.code == 200){
        this.tableData = res.data.records
        this.pages.total = res.data.total
      }
    })
  },
    search() {
      this.getSupplierLoanRecordsList()
    },
    
    handleSizeChange(val) {
      this.pages.size = val;
      this.getSupplierLoanRecordsList()
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.getSupplierLoanRecordsList()
    },
    getSettlementInfo() {
      getSupplierSettlement()
        .then((res) => {
          console.log(res,888);
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
