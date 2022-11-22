<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="content-top">
      <div class="left">
        <div class="price">{{settleInfo.todaySettleAmount}}</div>
        <div class="label mt_10">今日结算金额（元）</div>
      </div>
      <div class="center">
        <div class="content_one31">
          <span class="label" style="">已结算余额(元):</span>
          <span class="small-price">{{settleInfo.yjsAmount}}</span>
        </div>
        <div class="content_one31 mt_20">
          <span class="label" style="">未结算余额(元):</span>
          <span class="small-price">{{settleInfo.wjsAmount}}</span>
        </div>
      </div>
      <div class="right">
        <div class=" mt_20">
          <el-button type="primary" class="btn_156CC2" @click="withdrawDialog">提现</el-button>
        </div>
      </div>
    </div>

    <div class="content-center  mt_20">
      <div class="search-bar">
        <div class="search-item">
          订单编号：
          <el-input class="selectInput" v-model="orderNum" placeholder="请输入订单编号">
          </el-input>
        </div>
        <div class="search-item">
          结算状态：
          <el-select v-model="settleStatus">
            <el-option label="全部" :value="2">全部</el-option>
            <el-option label="已结算" :value="0">已结算</el-option>
            <el-option label="未结算" :value="1">未结算</el-option>
          </el-select>
        </div>
        <div class="search-item">
          交易时间：
          <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
          <el-date-picker v-model="date" format="yyyy-MM-dd" type="daterange" range-separator="-"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button class="search-btn" type="primary" @click="getTableData">查询</el-button>
      </div>
    </div>


    <div class="label mb_20">结算记录</div>
    <div>
      <cu-table class="sale-table" :showTitle="false" :height="tableHeight" :loading="tableLoading"
        :tableHeader="tableHeader" :tableData="tableData" :total="pages.total" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
        <template slot="settleStatus">
          {{settleType[settleStatus]}}
        </template>
        <template slot="operation" slot-scope="value">
          <el-button type="text" @click="toDetails(value.value)">明细</el-button>
        </template>
      </cu-table>
    </div>
    <cu-dialog :title="'提现'" width="700px" :visible.sync="withdrawVisible" center :showClose="true"
      @handleClose="withdrawVisible=false" @handleOk="withdraw">
      <cu-form ref="form" :formData.sync="withdrawData" :formRule="rules" class="form" @submitForm="submitForm">
        <template #footer>
          <div></div>
        </template>
      </cu-form>
      <template #footer>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import { getSupplierSettlement, getSettlementRecord, settlementWithdraw } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { mapState } from "vuex";
import test from "@/cuview-ui/function/test.js";
export default {
  data() {
    var validateBankCard = (rule, value, callback) => {
      if (!test.bankcardNum(value)) {
        return callback(new Error('银行卡号格式错误'));
      } else {
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error('提现金额不得小于等于0'));
      } else {
        callback();
      }
    };
    return {
      settleType: {
        0: '未结算',
        1: '已结算',
      },
      tableHeight: 0,
      tableLoading: false,
      tableHeader: [
        {
          title: "结算单号",
          key: "settleNo",
        },
        {
          title: "结算金额",
          key: "amount",
        },
        {
          title: "结算订单数",
          key: "orderCount",
        },
        {
          title: "订单总额",
          key: "orderAmount",
        },
        {
          title: "结算时间",
          key: "settleTime",
        },
        {
          title: "状态",
          key: "settleStatus",
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
      settleStatus: 2,
      orderNum: null,
      date: [],
      settleInfo: {},
      withdrawVisible: false,
      withdrawData: {

      },
      rules: [
        {
          key: "bankCardNo",
          view: "input",
          label: "银行账号",
          placeholder: "请输入银行账号",
          rules: [
            { required: true, message: "请输入银行账号", trigger: "blur" },
            { message: "银行账号格式错误", trigger: "blur", validator: validateBankCard },
          ],
        },
        {
          key: "txAmount",
          view: "input-number",
          label: "提现金额",
          placeholder: "请输入提现金额",
          rules: [
            { required: true, message: "请输入提现金额", trigger: "blur" },
            { validator: validatePrice, message: "提现金额不能小于等于0", trigger: "blur" },
          ],
        },
        {
          key: "handler",
          view: "input",
          label: "经手人",
          placeholder: "请填写经手人",
          rules: [
            { required: true, message: "请填写经手人", trigger: "blur" },
          ],
        },
        {
          key: "remark",
          view: "input-textarea",
          label: "备注",
          placeholder: "请输入备注",
        },
      ]
    };
  },
  created() {
    this.getSettlementInfo()
    this.getTableData()
    this.withdrawData.account = this.vuex_token.supplier.bankAccountNo;

  },
  mounted() {
    this.handleHeight();
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {
    ...mapState(['vuex_token'])
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
    // 每页条数改变回调
    handleSizeChange(value) {
      console.log(value);
      this.pages.size = value;
      this.getTableData();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.getTableData();
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
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    getTableData() {
      this.tableLoading = true;
      if (this.date && this.date.length) {
        this.date[0] = this.formatDate(this.date[0], "yyyy-MM-dd 00:00:00");
        this.date[1] = this.formatDate(this.date[1], "yyyy-MM-dd 23:59:59");
      }else {
        this.date = []
      }
      let params = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        beginDate: this.date[0],
        endDate: this.date[1],
        orderNo: this.orderNo,
        settleStatus: this.settleStatus == 2 ? undefined : this.settleStatus,
      }
      console.log(params);
      getSettlementRecord(params)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.pages.total = res.data.total
            this.tableLoading = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);

        });
    },
    toDetails(settleInfo) {
      console.log(settleInfo);
      this.$router.push({ name: 'supplierSettlementLogDetails', params: { settleInfo: JSON.stringify(settleInfo) } })
    },
    withdrawDialog() {
      this.withdrawData = {}
      this.withdrawVisible = true;
    },
    withdraw() {
      console.log(this.$refs.form);
      this.$refs.form.submitForm()
    },
    submitForm(formData, formRef) {
      settlementWithdraw(formData).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success('提现成功');
          this.getSettlementInfo()
          this.withdrawVisible = false;

        } else {
          this.$message.error(res.message);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }

  },
};
</script>
<style lang="scss" src="./supplierSettlementStatistics.scss" scoped>

</style>
