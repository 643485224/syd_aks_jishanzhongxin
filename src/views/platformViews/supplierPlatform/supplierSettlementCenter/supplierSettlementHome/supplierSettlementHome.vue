<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="content-top">
      <div class="left">
        <div class="price">{{settleInfo.todaySettleAmount || 0}}</div>
        <div class="label mt_10">今日结算金额（元）</div>
      </div>
      <div class="center">
        <div class="content_one31">
          <span class="label" style="">可提现金额(元):</span>
          <span class="small-price">{{settleInfo.ktxAmount || 0}} </span>
        </div>
        <div class="content_one31 mt_20">
          <span class="label" style="">已提现金额(元):</span>
          <span class="small-price">{{settleInfo.ytxAmount || 0}}</span>
        </div>
      </div>
      <div class="right">
        <div class=" mt_20">
          <el-button type="primary" class="btn_156CC2" @click="withdrawDialog">提现</el-button>
        </div>
      </div>
    </div>

    <div class="content-center  mt_40 mb_20 ">
      <div class="left mr_20">
        <div class="label mb_20">结算统计(元)</div>
        <div class="left-content p_20">
          <div class="settle-item">
            <span class="mr_10">已结算金额:</span>
            <span class="small-price">{{settleInfo.yjsAmount || 0}}</span>
          </div>
          <div class="settle-item ">
            <span class="mr_10">未结算金额:</span>
            <span class="small-price">{{settleInfo.wjsAmount || 0}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="label mb_20">交易统计(元)</div>
        <div class="right-content p_20">
          <div class="settle-item">
            <span class="mr_10">交易金额:</span>
            <span class="small-price">{{settleInfo.jyAmount || 0}}</span>
          </div>
          <div class="settle-item">
            <span class="mr_10">已支付金额:</span>
            <span class="small-price">{{settleInfo.yzfAmount || 0}}</span>
          </div>
          <div class="settle-item">
            <span class="mr_10">待支付发票金额:</span>
            <span class="small-price">{{settleInfo.dzffpAmount || 0}}</span>
          </div>
          <div class="settle-item">
            <span class="mr_10">待开票金额:</span>
            <span class="small-price">{{settleInfo.dkpAmount || 0}}</span>
          </div>
          <div class="settle-item">
            <span class="mr_10">待收票金额:</span>
            <span class="small-price">{{settleInfo.dspAmount || 0}}</span>
          </div>
        </div>
      </div>
    </div>


    <div class="label mb_20">待支付发票</div>
    <div>
      <cu-table class="sale-table" :showTitle="false" :height="tableHeight" :loading="tableLoading"
        :tableHeader="tableHeader" :tableData="tableData" :total="pages.total" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
        <template slot="status" >
          待支付
        </template>
        <template slot="fpStatus" slot-scope="value">
          {{fpStatusType[value.value.fpStatus]}}
        </template>
        <template slot="operation" slot-scope="value">
          <el-button type="text" @click="urge(value.value.orderNo)">催一下</el-button>
          <el-button type="text" @click="showDetails(value.value.id)">详情</el-button>
        </template>
      </cu-table>
    </div>
     <cu-dialog :title="'提现'" width="700px" :visible.sync="withdrawVisible" center :showClose="true" @handleClose="withdrawVisible=false"
      @handleOk="withdraw">
      <cu-form
        ref="form"
        :formData.sync="withdrawData"
        :formRule="rules"
        class="form" @submitForm="submitForm"

      >    <template #footer>
        <div></div>
      </template>
      <!-- @submitForm="submitForm"
        @closeForm="closeForm" -->
      </cu-form>
      <template #footer>
        <!-- <el-button type="primary">提现</el-button>
        <el-button>关闭</el-button> -->
      </template>
    </cu-dialog>
  </div>
</template>
<script>

import { getSupplierSettlement, getToBePaidBill,messageNotification,urge,settlementWithdraw } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
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
      tableHeight: 0,
      tableLoading: false,
      fpStatusType: {
        1: '待开票',
        2: '待收票',
        3: '待付款（已收票）',
        4: '完成收款',
        5: '拒绝收票',

      },
      tableHeader: [
        // {
        //   title: "序号",
        //   key: "index",
        //   width: "80",
        //   align: "center",
        // },
        {
          title: "发票代码",
          key: "invoiceCode",
        },
        {
          title: "发票号码",
          key: "invoiceNo",
        },
        {
          title: "关联合同编号",
          key: "contractNo",
        },
        {
          title: "关联订单编号",
          key: "orderNo",
          width: "180",
        },
        {
          title: "开票时间",
          slot: "invoiceTime",
          width: "180",
        },
        {
          title: "最迟付款时间",
          slot: "payLimit",
          width: "180",

        },
        {
          title: "收票用户",
          key: "receiveInvoiceBy",
        },
        {
          title: "发票金额",
          key: "invoiceAmount",
        },
        {
          title: "发票状态",
          key: "fpStatus",
        },
        {
          title: "付款状态",
          slot: "status",
        },
        {
          title: "操作",
          slot: "operation",
          fixed: "right",
          width: "180",
        },
      ],
      settleInfo: {},
      tableData: [],
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
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
            { message: "银行账号格式错误", trigger: "blur",validator: validateBankCard },
          ],
        },
        {
          key: "txAmount",
          view: "input-number",
          label: "提现金额",
          placeholder: "请输入提现金额",
          rules: [
            { required: true, message: "请输入提现金额", trigger: "blur" },
            { validator:validatePrice, message: "提现金额不能小于等于0", trigger: "blur" },
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
  computed:{
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
      this.pages.size = value;
      // this.buyerFindSupplierPageApi();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      // this.buyerFindSupplierPageApi();
    },
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
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
    getTableData() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
      }
      getToBePaidBill(params)
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

    urge(orderNo){
      urge({orderNo}).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success('已提醒');
            this.getTableData()
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDetails(orderId) {
      console.log(orderId);
      this.$router.push({name:'supplierInvoicedDetail',params:{orderId}})
    },
    withdrawDialog(){
      this.withdrawData  = {}
      this.withdrawVisible = true;
    },
    withdraw(){
      console.log(this.$refs.form);
      this.$refs.form.submitForm()
    },
    submitForm(formData,formRef){
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
<style lang="scss" src="./supplierSettlementHome.scss" scoped>

</style>
