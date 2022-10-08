<template>
  <div class="page-container table-page " ref="contentBox">
    <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
      :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" :total="total">
      <template slot="receiveInvoiceTime" slot-scope="value">
        {{ value.value.receiveInvoiceTime ? new Date(value.value.receiveInvoiceTime).Format("yyyy-MM-dd") : "" }}
      </template>
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
        <!-- <el-button type="text" @click="billing(value.value.id)" v-if="value.value.fpStatus == 1">开票</el-button>
        <el-button type="text" @click="showUpload(value.value.id)" v-if="value.value.fpStatus == 2">上传发票</el-button> -->
        <el-button type="text" @click="showUpload(value.value.id)">开票</el-button>
      </template>
    </cu-table>
    <cu-dialog title="开票" width="900px" :visible="uploadVisible" :showClose="true" @handleClose="uploadClose"
      @handleOk="uploadInvoice">
      <!-- :destroyOnClose="true" -->
      <div class="form">
        <el-button type="primary" class="float_right" @click="addUpload()">添加发票</el-button>
        <cu-table class="sale-table" :showTitle="false" :tableHeader="tableHeader2" :tableData="tableData2" :height="'300'"
          @handleSizeChange="handleSizeChange2" @handleCurrentChange="handleCurrentChange2" :total="pages2.total">
          <template slot="operate" slot-scope="value">
            <el-button type="text" @click="remove(value.value)">删除</el-button>
          </template>
        </cu-table>
      </div>
      <template #footer>
      </template>
    </cu-dialog>
    <cu-dialog title="添加发票" width="700px" :visible="editVisible" :showClose="true" @handleClose="editVisible=false">
      <cu-form ref="form" :formData.sync="upload" :formRule="uploadRule" class="form" @submitForm="submitForm"
        @closeForm="closeForm" :disabledIgnoreValidate="true">
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import { getWaitOpenBill, openBill, uploadBill } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
export default {
  data() {
    let that = this;
    return {
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
          title: "订单编号",
          key: "orderNo",
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: 160,
        },
        {
          title: "商品数量",
          key: "goodsCount",
        },
        {
          title: "采购方名称",
          key: "buyerName",
        },
        {

          title: "订单状态",
          slot: "status",
        },
        {
          title: "交易时间",
          key: "orderTime",
        },
        {
          title: "订单金额",
          key: "amount",
        },
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
      uploadVisible: false,
      editVisible: false,
      upload: {
        invoiceAmount: "",
        invoiceCode: "",
        invoiceNo: "",
        invoiceType: "",
        orderId: "",
        remark: '',
      },
      uploadRule: [
        {
          key: 'invoiceAmount',
          view: 'input-number',
          label: '发票金额',
          placeholder: '',
          rules: [
            { required: true, message: "请输入发票金额", trigger: "blur" },
          ]
        },
        {
          key: 'invoiceCode',
          view: 'input',
          label: '发票代码',
          placeholder: '',
          rules: [
            { required: true, message: "请输入发票代码", trigger: "blur" },
            // { methods: 'number', message: "发票代码格式错误", trigger: "blur" ,validator: that.$cu.test.validator},
          ]
        },

        {
          key: 'invoiceNo',
          view: 'input',
          label: '发票号码',
          placeholder: '',
          rules: [
            { required: true, message: "请输入发票号码", trigger: "blur" },
            { methods: 'number', message: "发票号码格式错误", trigger: "blur", validator: that.$cu.test.validator },
          ]
        },
        {
          key: 'invoiceType',
          view: 'select',
          label: '发票类型',
          placeholder: '请选择发票类型',
          data: [
            { label: '电子发票', value: '电子发票' },
            { label: '纸质发票', value: '纸质发票' },
          ],
          rules: [
            { required: true, message: "请选择发票类型", trigger: "blur" },
          ]
        },
        {
          key: 'remark',
          view: 'input-textarea',
          label: '发票备注',
          placeholder: '',
        },
      ],
      uploadOrderId: '',
      tableHeader2: [
        { title: '发票代码', key: 'invoiceCode' },
        { title: '发票号码', key: 'invoiceNo' },
        { title: '发票类型', key: 'invoiceType' },
        { title: '发票金额', key: 'invoiceAmount' },
        { title: '发票备注', key: 'remark' },
        { title: '操作', slot: 'operate' },
      ],
      invoiceList: [],// 发票集合
      tableData2: [],// 上传发票表格当前页显示集合
      pages2: {
        current: 1,
        size: 10,
        total: 0
      }

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
    getInvoiceList() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
      }
      console.log(params);
      this.tableData = []
      getWaitOpenBill(params).then(res => {
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
    billing(id) {
      openBill({ id }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.getInvoiceList()
        } else {
          this.$message.warning(res.message)
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    showUpload(id) {
      this.upload = {}
      this.invoiceList = []
      this.uploadOrderId = id;
      this.uploadVisible = true;
    },
    addUpload() {
      this.editVisible = true;

    },
    uploadClose() {
      this.uploadVisible = false
    },
    handleSizeChange2(val) {
      console.log(val);
      this.pages2.size = val;

      this.gettablelist()
    },
    handleCurrentChange2(val) {
      console.log(val);
      this.pages2.current = val;
      this.gettablelist()
    },
    gettablelist() {
      let start = (this.pages2.current - 1) * this.pages2.size;
      let end = (this.pages2.current - 1) * this.pages2.size + this.pages2.size;
      console.log(start, end);
      this.tableData2 = this.invoiceList.slice(start, end)
      this.pages2.total = this.invoiceList.length;
    },
    remove(data) {
      this.invoiceList = this.invoiceList.filter(item => item.id == data.id ? false : true)
      this.gettablelist()
    },
    submitForm(formData, formRef) {
      console.log(formData);
      formData.orderId = this.uploadOrderId;
      this.invoiceList.push(formData)
      this.gettablelist()
      formRef.resetFields();
      this.editVisible = false;
    },
    closeForm(formRef) {
      formRef.resetFields();
      this.editVisible = false;
    },
    uploadInvoice() {
      console.log(this.invoiceList, this.uploadOrderId);
      if (!this.invoiceList.length) {
        return this.$message.error("请添加发票")
      }
      openBill({ orderId: this.uploadOrderId, list: this.invoiceList }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("发票上传成功")
          this.getInvoiceList()
        } else {
          this.$message.warning(res.message)
        }
      });
      this.uploadVisible = false;
    },


  }
}
</script>
<style lang="scss" src="./supplierInvoiceUpload.scss" scoped>

</style>
