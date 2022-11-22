<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input
          clearable
          class="selectInput"
          v-model="query.orderNo"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search-item">
        发票代码：
        <el-input
          clearable
          class="selectInput"
          v-model="query.invoiceCode"
          placeholder="请输入发票代码"
        >
        </el-input>
      </div>
      <div class="search-item">
        发票号码：
        <el-input
          clearable
          class="selectInput"
          v-model="query.invoiceNo"
          placeholder="请输入发票号码"
        >
        </el-input>
      </div>
      <div class="search-item">
        收票用户：
        <el-input
          clearable
          class="selectInput"
          v-model="query.receiveInvoiceBy"
          placeholder="请输入收票用户"
        >
        </el-input>
      </div>
      <div class="search-item">
        发票状态：
        <el-select
          clearable
          class="selectInput"
          placeholder="请选择发票状态"
          v-model="query.fpStatus"
        >
          <el-option
            v-for="item in fpStatusForList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        下单时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
          v-model="query.date"
          @change="pickDate"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-button class="search-btn" type="primary" @click="search"
        >查询</el-button
      >
      <el-button class="operation-btn bgBlue" type="primary">导出</el-button>
    </div>
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
              <div class="label">开票人:</div>
              <div class="value">{{ value.value.invoiceBy }}</div>
            </div>
            <div class="item">
              <div class="label">收票人:</div>
              <div class="value">{{ value.value.receiveInvoiceBy }}</div>
            </div>
            <div class="item">
              <div class="label">支付方式:</div>
              <div class="value">{{ fkTypeList[value.value.fkType] }}</div>
            </div>
            <div class="item">
              <div class="label">发票备注:</div>
              <div class="value">{{ value.value.invoiceRemark }}</div>
            </div>
            <div class="item">
              <div class="label">收票时间:</div>
              <div class="value">{{ value.value.receiveInvoiceTime }}</div>
            </div>
            <!-- <div class="item"><div class="label">退货状态:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
            <div class="item">
              <div class="label">交易时间:</div>
              <div class="value">{{ value.value.orderTime }}</div>
            </div>
            <!-- <div class="item"><div class="label">退货类型:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
            <!-- <div class="item"><div class="label">商品类型:</div><div class="value">{{value.value.goodsType == 1?'药品':'器械'}}</div></div> -->
            <!-- <div class="item"><div class="label">支付方式:</div><div class="value">{{value.value.type}}</div></div> -->
            <!-- <div class="item"><div class="label">商品数量:</div><div class="value">{{value.value.auditStatus}}</div></div> -->
            <!-- <div class="item"><div class="label">供应商名称:</div><div class="value">{{value.value.supplierName}}</div></div> -->
          </div>
        </div>
      </template>
      <template slot="invoiceCode" slot-scope="value">
        {{ value.value.orderJcInvoice.invoiceCode }}
      </template>
      <template slot="invoiceNo" slot-scope="value">
        {{ value.value.orderJcInvoice.invoiceNo }}
      </template>

      <template slot="receiveInvoiceTime" slot-scope="value">
        {{
          value.value.receiveInvoiceTime
            ? new Date(value.value.receiveInvoiceTime).Format("yyyy-MM-dd")
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
      <!-- <template slot="fkType" slot-scope="value">
        {{ fkTypeList[value.value.fkType] }}
      </template> 支付方式-->
      <template slot="operate" slot-scope="value">
        <a
          v-if="value.value.fpStatus == 2"
          style="color: #ff480e"
          slot="reference"
          @click="billReceiptButton(value.value)"
          >收票</a
        >
        <!-- <el-tooltip
          v-else
          class="item"
          style="color: #ff480e"
          effect="dark"
          content="发票状态为（待收票）才能进行收票"
          placement="left"
        >
          <a class="aDisabled"> 收票 </a>
        </el-tooltip> -->

        <a
          v-if="value.value.fpStatus == 3"
          style="color: #ff480e"
          slot="reference"
          @click="paymentButton(value.value)"
          >支付</a
        >
        <!-- <el-tooltip
          v-else
          class="item ml_20"
          style="color: #ff480e"
          effect="dark"
          content="发票状态为（已收票）才能进行支付"
          placement="left"
        >
          <a class="aDisabled"> 支付 </a>
        </el-tooltip> -->
        <a class="ml_20" @click="detailsButton(value.value)">详情</a>
      </template>
    </cu-table>

    <cu-dialog
      :title="'是否收票？' + '(订单编号：' + tableItemData.orderNo + ')'"
      :showClose="true"
      :visible="billReceiptVisible"
      @handleClose="billReceiptClose()"
    >
      <div class="flex mt_20">
        <div class="mr_10" style="width: 60px">收票备注:</div>
        <textarea
          type="textarea"
          style="
            width: 750px;
            outline: none;
            border: 1px solid #dcdfe6;
            border-radius: 6px;
            height: 90px;
            font-size: 18px;
            padding: 10px;
          "
          v-model="buyerInvoiceBillToOperationRequest.rejectReason"
        />
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button class="elButtonOne btn_ff480e" @click="billReceiptOk(3)"
            >确认收票</el-button
          >
          <el-button
            class="elButtonTwo"
            type="primary"
            @click="billReceiptOk(6)"
            >拒绝收票</el-button
          >
        </div>
      </div>
    </cu-dialog>

    <onlinePayment
      :fkType="2"
      v-if="onlinePaymentVisible"
      :onlinePaymentVisible="onlinePaymentVisible"
      :tableItemData="tableItemData"
      @onlinePaymentHandleClose="onlinePaymentHandleClose"
    ></onlinePayment>
  </div>
</template>
<script>
import {
  buyerInvoiceBillToOperation,
  buyerInvoiceFindInvoiceList,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import dayjs from "dayjs";
import onlinePayment from "../components/onlinePayment/onlinePayment.vue";
export default {
  components: {
    onlinePayment,
  },
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
      fpStatusForList: [
        {
          id: 1,
          name: "待开票",
        },
        {
          id: 2,
          name: "待收票",
        },
        {
          id: 3,
          name: "已收票",
        },
        {
          id: 4,
          name: "待结算",
        },
        {
          id: 5,
          name: "完成收款",
        },
        {
          id: 6,
          name: "拒绝收票",
        },
      ],
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
      // 标题
      tableHeader: [
        {
          slot: "expand",
          align: "center",
        },
        {
          title: "序号",
          key: "id",
        },
        {
          title: "订单编号",
          key: "orderNo",
          width: 160,
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: 160,
        },
        // {
        //   title: "发票代码",
        //   slot: "invoiceCode",
        // },
        // {
        //   title: "发票号码",
        //   slot: "invoiceNo",
        // },

        // {
        //   title: "开票人",
        //   key: "invoiceBy ",
        // },
        // {
        //   title: "收票人",
        //   key: "receiveInvoiceBy",
        // },
        {
          title: "发票状态",
          slot: "fpStatus", // 发票状态@ 1  待开票  2  待收票  3 待付款（已收票）  4  完成收款   5  拒绝收票
        },
        // {
        //   title: "支付方式",
        //   slot: "fkType", // 支付方式fkType   1 在线支付  2 货到付款
        // },
        {
          title: "开票金额",
          key: "amount",
        },
        // {
        //   title: "发票备注",
        //   key: "invoiceRemark",
        // },
        {
          title: "开票时间",
          key: "invoiceTime",
          width: 140,
        },
        // {
        //   title: "收票时间",
        //   slot: "receiveInvoiceTime",
        //   width: 90,
        // },
        // {
        //   title: "交易时间",
        //   key: "orderTime",
        //   width: 90,
        // },

        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: 90,
        },
      ],
      tableLoading: false, //表加载
      tableHeight: 0, //表高度
      tableData: [], //表数据
      tableItemData: {}, //单条表数据
      // 分页
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      // 查询条件
      query: {
        fpStatus: "",
        invoiceCode: "", //发票代码
        invoiceNo: "", //发票号码
        orderNo: "", //订单编号
        receiveInvoiceBy: "", //收票用户
        date: [], //下单时间
      },

      billReceiptTitle: "", //收票弹框-弹框名
      billReceiptVisible: false, //收票弹框-开启/关闭
      buyerInvoiceBillToOperationRequest: {
        orderId: null, //订单id
        rejectReason: "", //收票备注
        typeId: null, //3 确认收票  5 拒绝收票
      },

      onlinePaymentVisible: false, //在线支付弹框

      fkType: 1, //1开启在线支付弹框，2开启货到付款支付弹框
    };
  },
  mounted() {
    this.buyerInvoiceFindInvoiceListApi();
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {},
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 获取发票列表-接口
    buyerInvoiceFindInvoiceListApi() {
      this.tableLoading = true;
      if (this.query.date) {
        if (this.query.date.length) {
          this.query.date[0] = dayjs(this.query.date[0]).format(
            "YYYY-MM-DD 00:00:00"
          );
          this.query.date[1] = dayjs(this.query.date[1]).format(
            "YYYY-MM-DD 23:59:59"
          );
        }
      }

      let params = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        startTime: this.query.date && this.query.date[0],
        endTime: this.query.date && this.query.date[1],
        fpStatus: this.query.fpStatus,
        invoiceCode: this.query.invoiceCode,
        invoiceNo: this.query.invoiceNo,
        orderNo: this.query.orderNo,
        receiveInvoiceBy: this.query.receiveInvoiceBy,
      };
      console.log(params);
      this.tableData = [];
      buyerInvoiceFindInvoiceList(params)
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.list;
            this.row = res.data.list.length;
            this.pages.total = res.data.totalCount;
            this.tableLoading = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 收票-接口
    buyerInvoiceBillToOperationApi() {
      let valueData = new FormData();
      valueData.append(
        "orderId",
        this.buyerInvoiceBillToOperationRequest.orderId
      );
      valueData.append(
        "rejectReason",
        this.buyerInvoiceBillToOperationRequest.rejectReason
      );
      valueData.append(
        "typeId",
        this.buyerInvoiceBillToOperationRequest.typeId
      );
      buyerInvoiceBillToOperation(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.billReceiptVisible = false;
            this.buyerInvoiceFindInvoiceListApi();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    pickDate(val) {
      console.log(val);
    },
    search() {
      this.buyerInvoiceFindInvoiceListApi(); //获取发票列表-接口
    },
    handleSizeChange(val) {
      this.pages.size = val;
      this.buyerInvoiceFindInvoiceListApi(); //获取发票列表-接口
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.buyerInvoiceFindInvoiceListApi(); //获取发票列表-接口
    },

    // 详情按钮
    detailsButton(tableItemData) {
      this.$router.push({
        name: "invoicedDetail",
        params: { tableItemData: tableItemData },
      });
    },
    // 收票按钮
    billReceiptButton(tableItemData) {
      this.tableItemData = tableItemData;
      this.buyerInvoiceBillToOperationRequest.orderId = this.tableItemData.id;
      this.buyerInvoiceBillToOperationRequest.rejectReason = "";
      this.billReceiptVisible = true;
    },
    // 收票弹框-取消按钮
    billReceiptClose() {
      this.billReceiptVisible = false;
    },
    // 收票弹框-确定按钮
    billReceiptOk(val) {
      this.buyerInvoiceBillToOperationRequest.typeId = val;
      this.buyerInvoiceBillToOperationApi();
    },

    // 订单付款-按钮 (开启在线支付弹框)
    paymentButton(tableItemData) {
      this.tableItemData = tableItemData;
      this.fkType = tableItemData.fkType;
      this.onlinePaymentVisible = true;
    },

    // 关闭在线支付弹框
    onlinePaymentHandleClose(value) {
      this.onlinePaymentVisible = value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./controlOverInvoices.scss";
</style>
