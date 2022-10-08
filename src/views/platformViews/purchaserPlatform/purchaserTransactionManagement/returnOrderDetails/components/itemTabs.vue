<template>
  <div>
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input
          clearable
          class="selectInput"
          v-model="orderNum"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search-item">
        交易时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
          v-model="date"
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
    </div>
    <cu-table
      class="sale-table"
      :loading="tableLoading"
      :height="height"
      :showTitle="false"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="pages.total"
    >
      <template slot="orderType" slot-scope="value">
        {{ orderTypeList[value.value.orderType] }}
      </template>
      <template slot="fkType" slot-scope="value">
        {{ fkTypeList[value.value.fkType] }}
      </template>
      <template slot="fpStatus" slot-scope="value">
        {{ fpStatusTypeList[value.value.fpStatus] }}
      </template>
      <template slot="backState" slot-scope="value">
        {{ backStateList[value.value.backState] }}
      </template>
      <template slot="backType" slot-scope="value">
        {{ backTypeList[value.value.backType] }}
      </template>

      <template slot="orderTime" slot-scope="value">
        {{
          value.value.orderTime
            ? new Date(value.value.orderTime).Format("yyyy-MM-dd")
            : ""
        }}
      </template>
      <template slot="operate" slot-scope="value">
        <el-button type="text" @click="detailsButton(value.value)"
          >详情</el-button
        >
        <a
          v-if="value.value.backState == 1"
          type="text"
          class="ml_20"
          style="color: #ff480e"
          @click="
            cancellationOfOrderButton(value.value.id, value.value.orderNo)
          "
          >撤回</a
        >
        <!-- <el-tooltip
          v-else
          class="item ml_20"
          effect="dark"
          content="退货状态为(待审核)才可撤回订单"
          placement="left"
        >
          <a style="color: #ff480e" class="aDisabled">撤回</a>
        </el-tooltip> -->
      </template>
    </cu-table>
    <cu-dialog
      :title="cancellationOfOrderTitle"
      :showClose="true"
      :visible="cancellationOfOrderVisible"
      @handleClose="cancellationOfOrderClose()"
      @handleOk="cancellationOfOrderOk()"
    >
      <div class="flex mt_20">
        <span class="mr_10">撤回原因:</span>
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
          v-model="canceRemark"
        />
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerTranManagerReturnOrderList,
  buyerTranManagerCancelReturnOrder,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import dayjs from "dayjs";
export default {
  props: {
    backState: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fpStatusTypeList: {
        1: "待开票",
        2: "待收票",
        3: "待付款（已收票）",
        4: "待结算（采购商已付款）",
        5: "完成收款",
        6: "拒绝收票",
      },
      fkTypeList: {
        1: "在线支付",
        2: "货到付款",
      },
      orderTypeList: {
        1: "药品",
        2: "器械",
      },
      backStateList: {
        1: "无退货",
        2: "退货中",
        3: "退货成功",
        3: "退货失败",
      },
      backTypeList: {
        1: "全部退",
        2: "部分退",
      },
      tableHeader: [
        {
          title: "订单编号",
          key: "orderNo",
          width: "200",
        },
        {
          title: "采购商名称",
          key: "buyerName",
          width: "200",
        },
        {
          title: "订单类型",
          slot: "orderType", // 1 药品  2  器械
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: "120",
        },
        {
          title: "商品种类(个)",
          key: "goodsCategoryCount",
          width: "100",
        },
        {
          title: "商品数量",
          key: "goodsCount",
        },
        {
          title: "供应商名称",
          key: "supplierName",
          width: "200",
        },
        {
          title: "支付方式",
          slot: "fkType", //  1 在线支付  2 货到付款
        },
        {
          title: "退货类型",
          slot: "backType", //退货类型@ 1  全部退   2  部分退
        },
        {
          title: "退货状态",
          slot: "backState", //退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败
        },
        {
          title: "结算状态",
          slot: "fpStatus", //1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票
        },
        {
          title: "交易时间",
          slot: "orderTime",
          width: "120",
        },
        {
          title: "订单金额",
          key: "amount",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "120",
        },
      ],

      tableData: [],
      orderId: null, //订单id
      cancellationOfOrderVisible: false, //撤回
      cancellationOfOrderTitle: "", //撤回弹框title
      canceRemark: "", //撤回原因
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      orderNum: "",
      date: [],
    };
  },
  created() {
    this.buyerTranManagerReturnOrderListApi();
  },
  mounted() {},

  methods: {
    // 退货订单明细(查询)-接口
    buyerTranManagerReturnOrderListApi() {
      this.$emit("chosetableLoading", true);
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      let params = {
        buyerId: this.$store.state.vuex_token.buyer.id, //采购商ID(登录人id)
        sort: "desc",
        currPageNo: this.pages.current,
        endTime: this.date && this.date[1],
        orderNo: this.orderNum, //订单编号
        pageSize: this.pages.size,
        startTime: this.date && this.date[0],
        backState: this.backState, //退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败
      };
      this.tableData = [];
      buyerTranManagerReturnOrderList(params)
        .then((res) => {
          this.$emit("chosetableLoading", false);
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.tableData = data.list;
            this.pages.total = data.totalCount;

            console.log(this.tableData);
          }
        })
        .catch((err) => {
          this.$emit("chosetableLoading", false);
          console.log(err);
        });
    },

    // 采购商申请撤回-接口
    buyerTranManagerCancelReturnOrderApi() {
      buyerTranManagerCancelReturnOrder(this.orderId)
        .then((res) => {
          this.cancellationOfOrderVisible = false; //关闭撤回弹框
          if (res.code == 200) {
            this.buyerTranManagerReturnOrderListApi(); // 查询交易信息列表(采购商)-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.cancellationOfOrderVisible = false; //关闭撤回弹框
          console.log(err);
        });
    },

    pickDate(val) {
      console.log(val);
    },
    search() {
      this.buyerTranManagerReturnOrderListApi();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pages.size = val;
      this.buyerTranManagerReturnOrderListApi();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pages.current = val;
      this.buyerTranManagerReturnOrderListApi();
    },
    // 订单详情按钮
    detailsButton(valueData) {
      console.log(valueData);
      this.$emit("detailsButton", valueData);
    },
    // 撤回按钮
    cancellationOfOrderButton(id, orderNo) {
      this.canceRemark = ""; //撤回原因
      this.orderId = id;
      this.cancellationOfOrderTitle = "是否撤回（订单编号：" + orderNo + "）";
      this.cancellationOfOrderVisible = true;
    },
    // 撤回弹框-取消按钮
    cancellationOfOrderClose() {
      this.cancellationOfOrderVisible = false;
    },
    // 撤回弹框-确定按钮
    cancellationOfOrderOk() {
      this.buyerTranManagerCancelReturnOrderApi();
    },
  },
};
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  font-size: 14px;
  .search-item {
    margin-right: 18px;

    .el-input {
      width: 230px;

      ::v-deep .el-input__inner {
        height: 31px;
      }
    }

    ::v-deep .el-range-editor.el-input__inner {
      width: 250px;
      height: 31px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1;
    }
  }

  .search-btn {
    height: 32px;
    background: #ff480e;
    border: none;
    border-radius: 4px 4px 4px 4px;
  }
}

.sale-table {
  // width: 100%;
  font-weight: 500;
}
</style>
