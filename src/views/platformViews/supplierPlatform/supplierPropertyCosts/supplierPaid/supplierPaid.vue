<template>
  <div class="page-container table-page " ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        支付时间：
        <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <el-button class="search-btn" type="primary" @click="search">查询</el-button>

    </div>
    <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
      :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" :total="total">
      <template slot="payType" slot-scope="value">
        {{ payTypes[value.value.payType] }}
      </template>
      <template slot="feeType" slot-scope="value">
        {{ feeTypes[value.value.feeType] }}
      </template>
      <template slot="operate" slot-scope="value">
        <el-button type="text" @click="showDetails(value.value.id)">详情</el-button>
      </template>
    </cu-table>
    <cu-dialog title="详情" width="70vw" :visible="flagData" :showClose="true" @handleClose="handleClose" @handleOk="handleClose">
      <div class="wying">
        <div class="wying-item">
          <p>基本信息：</p>
          <div class="wying-content">
            <div class="wying-left">
              <div class="left-item">
                <span class="iocs1">支付金额：</span><span class="iocs2"> {{DetailVoList1.payAmount}}元</span>
              </div>
              <div class="left-item">
                <span class="iocs1">支付人：</span><span class="iocs2">{{DetailVoList1.payBy}}</span>
              </div>
            </div>
            <div class="wying-right">
              <div class="left-item">
                <span class="iocs1">支付方式：</span><span class="iocs2">{{payTypes[DetailVoList1.payType]}}</span>
              </div>
              <div class="left-item">
                <span class="iocs1">支付时间：</span><span class="iocs2">{{DetailVoList1.payTime}}</span>
              </div>
            </div>
            <div class="wying-title">
              <span class="iocs1">支付说明：</span><span class="ions">{{DetailVoList1.payRemark}}</span>
            </div>
          </div>
          <p>支付明细：</p>
          <cu-table
            :showHeight="false"
            :tableHeader="tableHeader1"
            :tableData="DetailVoList"
            :showPagination="false"
            :showTitle="false"
            >
            <template slot="feeType" slot-scope="value">
              {{ feeTypes[value.value.feeType] }}
                </template>
                <!-- <template slot="payTime" slot-scope="value">
              {{ formatDate(value.value.payTime, "yyyy-MM-dd") }}
                </template> -->
            </cu-table>
        </div>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import { payQuery, getPayInfo } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      date: [],
      feeTypes: {
        1: '水费',
        2: '电费',
        3: '物业费',
        4: '房租费',
        5: '取暖费',
      },
      payTypes:{
        1:'在线支付',
        2:'货到付款'
      },
      tableHeader1:[
        {
          title: "费用类型",
          slot: "feeType",
          align: "center",
        },
        {
          title: "月份",
          key: "feeMonth",
          align: "center",
        },
        {
          title: "应收费用",
          key: "receivableFee",
          align: "center",
        },
        {
          title: "支付金额",
          key: "amount",
          align: "center",
        },
      ],
      DetailVoList:[],
      DetailVoList1:'',
      tableHeader: [
        {
          title: "支付时间",
          slot: "payTime",
        },
        {
          title: "支付方式",
          slot: "payType",
          width: 160,

        },
        {
          title: "支付金额",
          key: "payAmount",
          width: 160,

        },
        {
          title: "支付人",
          key: "payBy",
        },
        {
          title: "支付说明",
          key: "payRemark",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      flagData:false,
      tableHeight: 0,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0,
      tableLoading: false,
    }
  },
  created() {
  },
  mounted() {
    this.getFeeList()
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {

  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    
    formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    pickDate(val) {
      console.log(val);
    },
    search() {
      this.getFeeList()
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getFeeList()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getFeeList()
    },
    async getFeeList() {
      this.tableLoading = true;
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      console.log(this.feeMonth);
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        beginDate: this.date && this.date[0],
        endDate: this.date && this.date[1],
      }
      console.log(params);
      this.tableData = []
      payQuery(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
          this.tableLoading = false;
          console.log(this.tableData);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    showDetails(value) {//详情
      console.log(value);
      this.flagData = true
      getPayInfo({id:value}).then(res => {
        console.log(res);
        if(res.code == 200){
          this.DetailVoList= res.data.payDetailVoList
          this.DetailVoList1 = res.data
        }
      })
    },
    handleClose(){
      this.flagData=false
    },
  }
}
</script>
<style lang="scss" src="./supplierPaid.scss" scoped>

</style>
