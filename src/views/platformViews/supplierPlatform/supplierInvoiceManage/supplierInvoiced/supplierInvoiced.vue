<template>
  <div class="page-container table-page " ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input class="selectInput" v-model="orderNo" placeholder="请输入订单编号">
        </el-input>
      </div>
      <div class="search-item">
        发票代码：
        <el-input class="selectInput" v-model="invoiceCode" placeholder="请输入发票代码">
        </el-input>
      </div>
      <div class="search-item">
        发票号码：
        <el-input class="selectInput" v-model="invoiceNo" placeholder="请输入发票号码">
        </el-input>
      </div>
      <div class="search-item">
        收票用户：
        <el-input class="selectInput" v-model="receiveInvoiceBy" placeholder="请输入收票用户">
        </el-input>
      </div>
      <div class="search-item">
        发票状态：
        <el-select class="selectInput" placeholder="请选择发票状态" v-model="fpStatus">
          <el-option v-for="label,value in fpStatusType" :key="value" :label="label" :value="value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        下单时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <el-button class="search-btn" type="primary" @click="search">查询</el-button>
      <el-button class="operation-btn bgBlue" type="primary" @click="exportXls">导出</el-button>

    </div>
    <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
      :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" :total="total">
      <template slot="expand" slot-scope="value">
          <div class="expand-info">
            <div class="title">发票信息</div>
            <div class="content">
              <div class="item"><div class="label">发票代码:</div><div class="value">{{value.value.invoiceCode}}</div></div>
              <div class="item"><div class="label">订单编号:</div><div class="value">{{value.value.orderNo}}</div></div>
              <div class="item"><div class="label">商品种类数量:</div><div class="value">{{value.value.goodsCategoryCount }}</div></div>
              <div class="item"><div class="label">商品数量:</div><div class="value">{{value.value.goodsCount }}</div></div>
              <div class="item"><div class="label">收票时间:</div><div class="value">{{value.value.receiveInvoiceTime ? new Date(value.value.receiveInvoiceTime).Format("yyyy-MM-dd") : ""}}</div></div>  
              <div class="item"><div class="label">发票金额:</div><div class="value">{{value.value.invoiceAmount}}</div></div>
              <div class="item"><div class="label">发票备注:</div><div class="value">{{value.value.invoiceRemark }}</div></div>
            </div>
          </div>
        </template>
      <!-- <template slot="receiveInvoiceTime" slot-scope="value">
        {{ value.value.receiveInvoiceTime ? new Date(value.value.receiveInvoiceTime).Format("yyyy-MM-dd") : "" }}
      </template> -->
      <template slot="status" slot-scope="value">
        {{ statusType[value.value.status] }}
      </template>
      <template slot="orderTime" slot-scope="value">
        {{ value.value.orderTime ? new Date(value.value.orderTime).Format("yyyy-MM-dd") : "" }}
      </template>
      <template slot="payLimit" slot-scope="value">
        {{ value.value.payLimit ? new Date(value.value.payLimit).Format("yyyy-MM-dd") : "" }}
      </template>
      <template slot="fpStatus" slot-scope="value">
        {{ fpStatusType[value.value.fpStatus] }}
      </template>
      <template slot="operate" slot-scope="value">
        <el-button type="text" @click="showDetails(value.value.id)">详情</el-button>
      </template>
    </cu-table>
  </div>
</template>
<script>
import { getJcInvoice,openJcInvoiceExportXls } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      fpStatus: '',
      invoiceCode: '',
      invoiceNo: '',
      orderNo: '',
      receiveInvoiceBy: '',
      date: [],
      fpStatusType: {
        1: '待开票',
        2: '待收票',
        3: '待付款（已收票）',
        4: '完成收款',
        5: '拒绝收票',

      },
      statusType: {
        1: '待响应',
        2: '待发货',
        3: '待收货',
        4: '已收货',
        5: '待付款',
        6: '待评价',
        7: '已取消',
        8: '已拒绝'
      },
      tableHeader: [
        {
          slot: "expand",
          align: "center",
        },
        // {
        //   title: "发票代码",
        //   key: "invoiceCode",
        //   width: 120,代码
        // },
        {
          title: "发票号码",
          key: "invoiceNo",
          width: 120,
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: 120,
        },
        // {
        //   title: "订单编号",
        //   key: "orderNo",
        //   width: 160,

        // },
        {
          title: "开票时间",
          key: "invoiceTime",
          width: 160,

        },
        // {
        //   title: "收票时间",
        //   slot: "receiveInvoiceTime",
        // },
        {
          title: "收票用户",
          key: "receiveInvoiceBy",
        },

        // {
        //   title: "商品种类数量",
        //   key: "goodsCategoryCount",
        //   width: 160,
        // },
        // {
        //   title: "商品数量",
        //   key: "goodsCount",
        // },
        // {
        //   title: "订单状态",
        //   slot: "status",
        // },
        // {
        //   title: "交易时间",
        //   key: "orderTime",
        // },
        //1 {
        //   title: "发票金额",
        //   key: "invoiceAmount",
        // },
        // {
        //   title: "最迟付款时间",
        //   slot: "payLimit",
        //   width: 160,
        // },
        {
          title: "发票状态",
          slot: "fpStatus",// 发票状态@ 1  待开票  2  待收票  3 待付款（已收票）  4  完成收款   5  拒绝收票
        },
        // {
        //   title: "发票备注",
        //   key: "invoiceRemark",
        // },
        {
          title: "操作",
          slot: "operate",
          fixed: "right"
        },
      ],
      tableHeight: 0,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0,
      orderNum: '',
      tableLoading: false,
    }
  },
  created() {

  },
  mounted() {
    this.getInvoiceList()
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
      this.getInvoiceList()
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getInvoiceList()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getInvoiceList()
    },
    async getInvoiceList() {
      this.tableLoading = true;
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        orderNo: this.orderNum,
        beginDate: this.date && this.date[0],
        endDate: this.date && this.date[1],
        fpStatus: this.fpStatus,
        invoiceCode: this.invoiceCode,
        invoiceNo: this.invoiceNo,
        orderNo: this.orderNo,
        receiveInvoiceBy: this.receiveInvoiceBy,
      }
      console.log(params);
      this.tableData = []
      getJcInvoice(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.tableData = data.records;
          this.row = data.records.length;
          this.total = data.total;
          this.tableLoading = false;
          console.log(this.tableData);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    showDetails(orderId) {
      console.log(orderId);
      this.$router.push({ name: 'supplierInvoicedDetail', params: { orderId } })
    },
    exportXls() {
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      let params = {
        currPageNo: 1,
        pageSize: 10000,
        orderNo: this.orderNum,
        beginDate: this.date && this.date[0],
        endDate: this.date && this.date[1],
        fpStatus: this.fpStatus,
        invoiceCode: this.invoiceCode,
        invoiceNo: this.invoiceNo,
        orderNo: this.orderNo,
        receiveInvoiceBy: this.receiveInvoiceBy,
      }
      console.log(params);
      openJcInvoiceExportXls(params).then(res => {
        console.log(res, res.headers);
        if (res.status == 200) {
          this.$message.success("获取数据成功，等待导出...");
          // var value = new FormData()
          if (!res.data) {
            this.$message.warning("文件下载失败");
          }
          console.log(res);
          downloadXls(res.headers, res.data);
        }
        else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },

  }
}
</script>
<style lang="scss" src="./supplierInvoiced.scss" scoped>

</style>
