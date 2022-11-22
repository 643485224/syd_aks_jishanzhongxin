<template>
  <div class="page-container table-page " ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        月份：
        <el-date-picker v-model="feeMonth" @change="pickDate" format="yyyy-MM" type="month">
        </el-date-picker>
      </div>
      <div class="search-item">
        费用类型：
        <el-select class="selectInput" placeholder="请选择费用类型"   clearable v-model="feeType">
          <el-option v-for="(label,value) in feeTypes" :key="value" :label="label" :value="value">
          </el-option>
        </el-select>
      </div>

      <el-button class="search-btn" type="primary" @click="search">查询</el-button>
      <el-button class="operation-btn bgBlue" type="primary" @click="toPayment">支付</el-button>

    </div>
    <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
      :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange" selection
      @handleSelectionChange="handleSelectionChange" @handleCurrentChange="handleCurrentChange" :total="total">
      <template slot="status" slot-scope="value">
        {{ statusTypes[value.value.status] }}
      </template>
      <template slot="feeType" slot-scope="value">
        {{ feeTypes[value.value.feeType] }}
      </template>
    </cu-table>
    <payment v-if="paymentVisible" :onlinePaymentVisible="paymentVisible" :paylist="selectList"
      @onlinePaymentHandleClose="onlinePaymentHandleClose" @afterSubmit="afterSubmit"></payment>
  </div>
</template>
<script>
import { waitPayFeeList } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from 'dayjs';
import payment from "../../components/payment/payment.vue";

export default {
  components: {
    payment
  },
  data() {
    return {
      feeMonth: '',
      feeType: '',
      feeTypes: {
        1: '水费',
        2: '电费',
        3: '物业费',
        4: '房租费',
        5: '取暖费',
      },
      statusTypes: {
        0:'未缴费',
        1: '已缴费'
      },
      tableHeader: [
        {
          title: "费用类型",
          slot: "feeType",// 费用类型@ 1  水费   2  电费  3   物业费  4   房租费 5  取暖费
        },
        {
          title: "月份",
          key: "feeMonth",
          width: 160,

        },
        {
          title: "应收费用",
          key: "receivableFee",
          width: 160,
        },
        {
          title: "已收费用",
          key: "receivedFee",
        },
        {
          title: "状态",
          slot: "status",
        },
      ],
      tableHeight: 0,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0,
      tableLoading: false,
      selectList: [],
      payList:[],
      paymentVisible: false

    }
  },
  created() {

  },
  mounted() {
    this.getpendingPayList()
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
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    pickDate(val) {
      console.log(val);
    },
    search() {
      this.getpendingPayList()
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getpendingPayList()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getpendingPayList()
    },
    async getpendingPayList() {
      this.tableLoading = true;
      if (this.feeMonth) {
        this.feeMonth = dayjs(this.feeMonth).format("YYYY-MM");
      }
      console.log(this.feeMonth);
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        feeMonth: this.feeMonth,
        feeType: this.feeType,
      }
      console.log(params);
      this.tableData = []
      waitPayFeeList(params).then(res => {
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
    toPayment() {
      if (!this.selectList.length) {
        return this.$message.warning("请先选择待缴费用")
      }
      console.log(this.selectList);
      if(this.selectList.length){
        this.paymentVisible = true;
      }
    },
    handleSelectionChange(arr) {
      console.log(arr);
      if (arr.length) {
        this.selectList = arr.map(item => {
        console.log((item.receivableFee?item.receivableFee:0) , (item.receivedFee?item.receivedFee:0));
        return {
          feeId:item.id,
          amount: (item.receivableFee?item.receivableFee:0) - (item.receivedFee?item.receivedFee:0)
        }
      })
      }
    },
    // 关闭在线支付弹框
    onlinePaymentHandleClose(value) {
      this.paymentVisible = value;

    },
    afterSubmit(value){
      this.paymentVisible = value;
      this.getpendingPayList()
      this.selectList = []
    }

  }
}
</script>
<style lang="scss" src="./supplierPendingPayMent.scss" scoped>

</style>
