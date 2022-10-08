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
        <el-select class="selectInput"  clearable placeholder="请选择费用类型" v-model="feeType">
          <el-option v-for="(label,value) in feeTypes" :key="value" :label="label" :value="value">
          </el-option>
        </el-select>
      </div>

      <el-button class="search-btn" type="primary" @click="search">查询</el-button>

    </div>
    <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
      :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" :total="total">
      <template slot="status" slot-scope="value">
        {{ statusTypes[value.value.status] }}
      </template>
      <template slot="feeType" slot-scope="value">
        {{ feeTypes[value.value.feeType] }}
      </template>
    </cu-table>
  </div>
</template>
<script>
import { feeQuery } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from 'dayjs';
export default {
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
      feeQuery(params).then(res => {
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
  }
}
</script>
<style lang="scss" src="./supplierPropertyExpenses.scss" scoped>

</style>
