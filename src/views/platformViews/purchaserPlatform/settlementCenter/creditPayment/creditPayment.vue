<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="content_one">
      <div class="card_logo" @click="activeNameChange">
        <!-- <img class="logo_img" src="./image/logo.png" alt="" srcset="" /> -->
        <img class="logo_img" :src="ToPay.logoUrl" alt="" srcset="" />
        <div class="logo_title">{{ToPay.unitName}}</div>
        <div class="logo_body">
          信用分:&nbsp;&nbsp;
          <span style="color: red"> {{ToPay.score}} </span>
          &nbsp;&nbsp;  {{
            ToPay.score &lt;  60
    ? "差"
                : ToPay.score >= 60 && ToPay.score &lt; 80
    ? "一般"
                : ToPay.score >= 80 && ToPay.score &lt; 90
    ? "良好"
                : "极好"
                }}
        </div>
      </div>
      <div class="content_one1" v-if="activeName == '未使用'">
        <div class="lableTitle">最高额度</div>
        <div class="lableNumber mt_10 mb_50">50000.00</div>
        <el-button type="primary" class="btn_ff480e">去申请</el-button>
      </div>
      <div class="content_oneBody">
        <div class="content_one1 mr_80" v-if="activeName == '已使用'">
          <div class="lableTitle">待还款</div>
          <div class="lableNumber mt_10 mb_50">{{ToPay.credit-ToPay.usedCredit}}</div>
          <el-button type="primary" class="btn_ff480e">立即还款</el-button>
        </div>
        <div class="content_one2" v-if="activeName == '已使用'">
          <div>
            <span class="lableTitle mr_20">总额度(元):</span>
            <span class="lableNumber">{{ToPay.credit}}</span>
          </div>
          <div class="mt_20">
            <span class="lableTitle mr_20">剩余额度(元):</span>
            <span class="lableNumber">{{ToPay.usedCredit}}</span>
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
          {{value.value.status==1?'已还':'未还' }}
        </template>
        </cu-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  settlementCreditToPay,
  getloanPage
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
export default {
  data() {
    return {
      activeName: "已使用", //未使用 已使用
      el_date_picker: [],
      el_input: "",
      el_select: "",
      tableHeight: 0,
      tableLoading: false,
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableHeader: [
        {
          title: "订单编号",
          key: "orderNo",
          width: "120",
        },
        {
          title: "付款金额",
          key: "amount",
          width: "120",
        },
        {
          title: "付款日期",
          slot: "oanDate", // 1 药品  2  器械
        },
        {
          title: "还款日期",
          key: "backDate",
          width: "120",
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
          width: "120",
        },
        {
          title: "付款人",
          slot: "unitName", 
        },
        {
          title: "状态",
          slot: "status", 
        },
        // {
        //   title: "操作",
        //   slot: "operate",
        // },
      ],

      tableData: [],
      ToPay:[],
    };
  },
  created () {
      this.settlementCreditToPay()
      this.getloanPage()
  },
  mounted() {
    this.handleHeight();
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs.contentBox.offsetHeight - 550;
      });
    },
    activeNameChange() {
      if (this.activeName == "未使用") {
        this.activeName = "已使用";
      } else {
        this.activeName = "未使用";
      }
    },
   async settlementCreditToPay(){
      settlementCreditToPay().then(res =>{
        console.log(res);
        if (res.code ==200) {
          this.ToPay = res.data
        }
      })
    },
    getloanPage(){
      console.log(new Date(this.el_date_picker[0]).Format("yyyy-MM-dd ss:hh:mm"));
      let params = {
        pageSize:this.pages.size,
        currPageNo:this.pages.current,
        startTime:this.el_date_picker[0]?new Date(this.el_date_picker[0]).Format("yyyy-MM-dd "):null,
        endTime:this.el_date_picker[1]?new Date(this.el_date_picker[0]).Format("yyyy-MM-dd "):null,
        orderNo:this.el_input,
        status:this.el_select,
      }
      getloanPage(params).then(res => {
        if (res.code == 200) {
            this.tableData = res.data.list
            console.log(this.tableData);
            this.pages.total= res.data.totalCount
        }
      })
    },
    search() {
      this.getloanPage()
    },
    handleSizeChange(val) {
      this.pages.size = val;
      this.getloanPage()
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.getloanPage()
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./creditPayment.scss";
</style>
