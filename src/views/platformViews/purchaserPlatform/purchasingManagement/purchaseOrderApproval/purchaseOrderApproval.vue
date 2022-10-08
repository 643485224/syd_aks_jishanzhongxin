<template>
  <!-- 采购单审核页 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="addItem">
      <div class="search_box">
        <div class="search_item mr_20 mb_20">
          <span class="mr_10">采购单号:</span>
          <el-input
            clearable
            class="el_input"
            v-model="query.purchaseNo"
            placeholder="请输入采购单号"
          >
          </el-input>
        </div>

        <div class="search_item mr_20 mb_20">
          <span class="mr_10">审核时间:</span>
          <el-date-picker
            class="el_date_picker"
            v-model="query.pickDate"
            @change="pickDateChange"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-button
          class="btn_ff480e mb_20"
          type="primary"
          @click="purchaseProcurementAuditEnquiryApi()"
          >查询</el-button
        >
      </div>
      <div>
        <cu-table
          class="sale-table"
          :selection="true"
          :showTitle="false"
          :height="468"
          :loading="tableLoading"
          :tableHeader="tableHeader"
          :tableData="tableData"
          :total="pages.total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <template slot="auditStatus" slot-scope="value">
            {{ auditStatusList[value.value.auditStatus] }}
          </template>
          <template slot="operate" slot-scope="value">
            <a
              class="a_00C514"
              type="primary"
              @click="danPurchaseBatchPassApi(value.value.id)"
              >通过</a
            >
            <a
              class="a_FF480E ml_20 mr_20"
              type="primary"
              @click="danPurchaseBatchResetApi(value.value.id)"
              >拒绝</a
            >
            <a class="a_156CC2" type="primary" @click="detailsA(value.value)"
              >详情</a
            >
          </template>
        </cu-table>
      </div>
      <div class="flex_ac_je mt_20">
        <el-button type="default" @click="refuseButton">批量拒绝</el-button>
        <el-button type="primary" class="ml_20" @click="adoptButton"
          >批量通过</el-button
        >
      </div>

      <cu-dialog
        width="90vw"
        top="8vh"
        title="采购单详情"
        :showClose="true"
        center="center"
        :visible="detailsVisible"
        @handleClose="detailsHandleClose()"
        @handleOk="detailsHandleOk()"
      >
        <div class="purchaseOrderDetails">
          <cu-table
            class="mt_20"
            :selection="false"
            :showTitle="false"
            :showHeight="false"
            :showPagination="false"
            :tableHeader="tableHeader1"
            :tableData="tableData1"
          >
            <template slot="operate" slot-scope="value">
              <a
                class="a_00C514"
                type="primary"
                @click="danPurchaseBatchPassApi(value.value.id)"
                >通过</a
              >
              <a
                class="a_FF480E ml_20 mr_20"
                type="primary"
                @click="danPurchaseBatchResetApi(value.value.id)"
                >拒绝</a
              >
            </template>
          </cu-table>
          <div class="labelTitle mt_40 mb_10">采购单商品表</div>
          <cu-table
            class="sale-table"
            :selection="false"
            :showTitle="false"
            :showHeight="false"
            :showPagination="false"
            :tableHeader="tableHeader2"
            :tableData="tableData2"
          >
          </cu-table>

          <template slot="footer">
            <div class="flex"></div>
          </template>
        </div>
      </cu-dialog>
    </div>
  </div>
</template>
<script>
import {
  purchaseProcurementAuditEnquiry,
  purchaseBatchPass,
  purchaseBatchReset,
  purchaseGetPurchaseOrderDetails,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";

export default {
  data() {
    return {
      auditStatusList: {
        1: "待提交",
        2: "待审核",
        3: "审核通过",
        4: "审核不通过",
      },

      // 表头
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "采购单号",
          slot: "purchaseNo",
        },
        {
          title: "采购金额",
          slot: "budget",
        },
        {
          title: "商品种类（种）",
          key: "category",
        },
        {
          title: "商品数量",
          key: "quantity",
        },
        {
          title: "审核状态",
          slot: "auditStatus",
        },
        {
          title: "提交时间",
          key: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      // 表内容
      tableData: [],
      // 表头
      tableHeader1: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "采购单号",
          slot: "purchaseNo",
        },
        {
          title: "采购金额",
          slot: "budget",
        },
        {
          title: "商品种类（种）",
          key: "category",
        },
        {
          title: "商品数量",
          key: "quantity",
        },
        {
          title: "审核状态",
          key: "auditStatus",
        },
        {
          title: "提交时间",
          key: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      // 表内容
      tableData1: [],
      // 表头
      tableHeader2: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名称",
          slot: "goodsName",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "批准文号",
          key: "approvalNumber",
        },
        {
          title: "供应商名称",
          key: "supplierName",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "采购价",
          key: "buyPrice",
        },
        {
          title: "剩余库存",
          key: "squantity",
        },
        {
          title: "数量",
          slot: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
        },
      ],
      // 表内容
      tableData2: [],
      tableLoading: false, // 表加载

      // 分页
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      // 搜索功能
      query: {
        startTime: "", //审核开始时间
        endTime: "", //审核结束时间
        purchaseNo: "", //采购单号
        pickDate: [], //时间
      },
      handleSelectionData: [], //表选择数据

      detailsVisible: false, //详情弹框
    };
  },
  mounted() {
    this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
  },
  methods: {
    // 采购审核查询-接口
    purchaseProcurementAuditEnquiryApi() {
      this.tableLoading = true;
      let valueData = {
        sort: "desc",
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        startTime: this.query.startTime, //审核开始时间
        endTime: this.query.endTime, //审核结束时间
        purchaseNo: this.query.purchaseNo, //采购单号
      };
      purchaseProcurementAuditEnquiry(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.list;
            this.pages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 批量审核通过-接口
    purchaseBatchPassApi() {
      let valueData = "?";
      this.handleSelectionData.forEach((element) => {
        valueData += "purchaseId=" + element.id + "&";
      });
      valueData = valueData.substring(0, valueData.length - 1);
      purchaseBatchPass(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 批量审核拒绝-接口
    purchaseBatchResetApi() {
      let valueData = "?";
      this.handleSelectionData.forEach((element) => {
        valueData += "purchaseId=" + element.id + "&";
      });
      valueData = valueData.substring(0, valueData.length - 1);
      purchaseBatchReset(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 单个审核通过-接口
    danPurchaseBatchPassApi(id) {
      let valueData = "?purchaseId=" + id;
      purchaseBatchPass(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.detailsVisible = false;
            this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 单个审核拒绝-接口
    danPurchaseBatchResetApi(id) {
      let valueData = "?purchaseId=" + id;
      purchaseBatchReset(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.detailsVisible = false;
            this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 采购单详情-接口
    purchaseGetPurchaseOrderDetailsApi(value) {
      this.tableLoading = true;
      let valueData = {
        currPageNo: 1, //Integer	当前页码	是
        pageSize: 1000, //Integer	页数	是
        purchaseId: value.id, //Integer	采购单ID	是
        auditStatus: value.auditStatus, //Integer	采购单审核状态（1.待提交/2待审核/ 3. 审核通过/4.审核不通过）	否(采购审核必传)
        goodsType: value.goodsType, //Integer	商品类型（1.药品/2.器械）	是
      };
      purchaseGetPurchaseOrderDetails(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.detailsVisible = true;
            this.tableData2 = res.data.purchaseOrderGoodsList.list;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 表选择
    handleSelectionChange(value) {
      this.handleSelectionData = value;
      console.log(this.handleSelectionData);
    },
    // 分页-页大小改变回调
    handleSizeChange(value) {
      this.pages.current = 1;
      this.pages.size = value;
      this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
    },
    // 分页-页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.purchaseProcurementAuditEnquiryApi(); // 采购审核查询-接口
    },
    // 时间改变回调
    pickDateChange() {
      if (this.query.pickDate) {
        this.query.startTime = new Date(this.query.pickDate[0]).Format(
          "yyyy-MM-dd"
        );
        this.query.endTime = new Date(this.query.pickDate[1]).Format(
          "yyyy-MM-dd"
        );
      } else {
        this.query.startTime = "";
        this.query.endTime = "";
      }
    },
    // 通过-a标签
    adoptA(value) {},
    // 拒绝-a标签
    refuseA(value) {},
    // 详情-a标签
    detailsA(value) {
      this.tableData1 = [];
      this.tableData1.push(value);
      this.purchaseGetPurchaseOrderDetailsApi(value);
    },
    // 拒绝-按钮
    refuseButton() {
      if (this.handleSelectionData.length == 0) {
        this.$message.info("请先在表格中勾选需审核的采购单");
        return;
      }
      this.purchaseBatchResetApi(); // 批量拒绝-接口
    },
    // 通过-按钮
    adoptButton() {
      if (this.handleSelectionData.length == 0) {
        this.$message.info("请先在表格中勾选需审核的采购单");
        return;
      }
      this.purchaseBatchResetApi(); // 批量拒绝-接口
    },
    // 详情弹框-取消-按钮
    detailsHandleClose() {
      this.detailsVisible = false;
    },
    // 详情弹框-确定-按钮
    detailsHandleOk() {
      this.detailsVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./purchaseOrderApproval.scss";
</style>
