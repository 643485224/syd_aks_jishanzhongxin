<template>
  <!-- 我的采购单页面 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input
          clearable
          class="selectInput"
          v-model="query.purchaseNo"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search-item">
        审核时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
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
      <el-button class="search-btn" type="primary" @click="queryButton"
        >查询</el-button
      >
    </div>
    <div>
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :showHeight="false"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="pages.total"
      >
      <template slot="expand" slot-scope="value">
          <div class="expand-info">
            <div class="title">订单信息</div>
            <div class="content">
              <div class="item"><div class="label">采购单编号:</div><div class="value">{{value.value.purchaseNo}}</div></div>
              <div class="item"><div class="label">项目名称:</div><div class="value">{{value.value.projectName}}</div></div>
              <div class="item"><div class="label">采购类型:</div><div class="value"> {{ typeList[value.value.type] }}</div></div>
              <div class="item"><div class="label">采购数量:</div><div class="value">{{ value.value.quantity }}</div></div>
              <div class="item"><div class="label">采购预算:</div><div class="value">{{ value.value.budget }}</div></div>
              <div class="item"><div class="label">创建时间:</div><div class="value">{{value.value.createTime}}</div></div>
              <div class="item"><div class="label">审核时间:</div><div class="value">{{value.value.auditTime}}</div></div>
              <div class="item"><div class="label">审核状态:</div><div class="value">{{ auditStatusList[value.value.auditStatus] }}</div></div>
              <div class="item"><div class="label">关联合同编号:</div><div class="value">{{value.value.contract_no}}</div></div>
              <div class="item"><div class="label">商品类型:</div><div class="value">{{value.value.goodsType == 1?'药品':'器械'}}</div></div>
              <div class="item"><div class="label">商品种类:</div><div class="value">{{value.value.category}}</div></div>
            </div>
          </div>
        </template>
        <template slot="type" slot-scope="value">
          {{ typeList[value.value.type] }}
        </template>
        <template slot="goodsType" slot-scope="value">
          {{ goodsTypeList[value.value.goodsType] }}
        </template>

        <template slot="auditStatus" slot-scope="value">
          <span class="c_ff480e">{{ auditStatusList[value.value.auditStatus] }}</span>
        </template>
        <template slot="operate" slot-scope="value">
          <a
            v-if="value.value.auditStatus == 3"
            @click="generateOrderButton(value.value)"
            >一键采购</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(审核通过)才可一键采购"
            placement="top"
          >
            <a class="aDisabled"> 一键采购 </a>
          </el-tooltip> -->
          <a
            class="ml_20"
            type="primary"
            @click="editPurchaseButton(value.value)"
          >
            详情
          </a>
        </template>
      </cu-table>
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
          :tableHeader="detailsTableHeader1"
          :tableData="detailsTableData1"
        >
          <template slot="type" slot-scope="value">
            {{ typeList[value.value.type] }}
          </template>
          <template slot="goodsType" slot-scope="value">
            {{ goodsTypeList[value.value.goodsType] }}
          </template>

          <template slot="auditStatus" slot-scope="value">
            {{ auditStatusList[value.value.auditStatus] }}
          </template>
        </cu-table>
        <div class="labelTitle mt_40 mb_10">采购单商品表</div>
        <cu-table
          class="sale-table"
          :selection="false"
          :showTitle="false"
          :showHeight="false"
          :showPagination="false"
          :tableHeader="detailsTableHeader2"
          :tableData="detailsTableData2"
        >
        </cu-table>

        <template slot="footer">
          <div class="flex"></div>
        </template>
      </div>
    </cu-dialog>

    <!-- 一键采购弹框组件 -->
    <oneClickPurchase
      v-if="generateOrderVisible"
      :generateOrderVisible="generateOrderVisible"
      @generateOrderHandleClose="generateOrderHandleClose"
      :listItem="tableDataItem"
    ></oneClickPurchase>
  </div>
</template>
<script>
import {
  purchaseGetPurchasePage,
  purchaseGetPurchaseOrderDetails,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import oneClickPurchase from "../components/oneClickPurchase/oneClickPurchase.vue";
export default {
  components: {
    oneClickPurchase,
  },
  data() {
    return {
      typeList: {
        1: "招标需求采购",
        2: "临时需求采购",
      }, //类型
      auditStatusList: {
        1: "待提交",
        2: "待审核",
        3: "审核通过",
        4: "审核不通过",
      },
      goodsTypeList: {
        1: " 药品",
        2: " 器械",
      },
      // 查询功能
      query: {
        pickDate: [], //审核时间
        createBy: "",
        purchaseNo: "", //订单编号
        startTime: "", //开始时间
        endTime: "", //结束时间
      },
      tableHeader: [
        {
          slot: "expand",
          align: "center",
          width: "40",
        },
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },

        {
          title: "采购单编号",
          key: "purchaseNo",
        },
        {
          title: "项目名称",
          key: "projectName",
        },
        // {
        //   title: "采购类型", //类型@ 1  招标需求采购  2  临时需求采购
        //   slot: "type",
        // },
        // {
        //   title: "商品类型",
        //   slot: "goodsType", //商品类型：1 药品 2 器械
        // },
        // {
        //   title: "商品种类",
        //   key: "category",
        // },
        {
          title: "采购数量",
          key: "quantity",
        },
        {
          title: "采购预算",
          key: "budget",
        },
        {
          title: "审核状态",
          slot: "auditStatus", //审核状态@ 1   待提交  2   待审核  3  审核通过  4  审核不通过
        },
        // {
        //   title: "创建时间",
        //   slot: "createTime",
        //   width: "100",
        // },
        {
          title: "审核时间",
          slot: "auditTime",
          width: "100",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "180",
        },
      ],
      tableData: [],
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      tableLoading: false, //表格加载

      detailsVisible: false, //详情弹框
      detailsTableHeader1: [
        {
          title: "采购单编号",
          key: "purchaseNo",
        },
        {
          title: "项目名称",
          key: "projectName",
        },
        {
          title: "采购类型", //类型@ 1  招标需求采购  2  临时需求采购
          slot: "type",
        },
        {
          title: "商品类型",
          slot: "goodsType", //商品类型：1 药品 2 器械
        },
        {
          title: "采购数量",
          slot: "quantity",
        },
        {
          title: "采购预算",
          key: "budget",
        },
        {
          title: "审核状态",
          slot: "auditStatus", //审核状态@ 1   待提交  2   待审核  3  审核通过  4  审核不通过
        },
      ], //详情弹框-表一表头
      detailsTableData1: [], //详情弹框-表一内容

      detailsTableHeader2: [
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
      ], //详情弹框-表二表头
      detailsTableData2: [], //详情弹框-表二内容

      generateOrderVisible: false, //开启关闭一键采购弹框组件
    };
  },

  mounted() {
    this.purchaseGetPurchasePageApi(); //获取我的采购单列表
  },

  methods: {
    //获取我的采购单列表
    purchaseGetPurchasePageApi() {
      this.tableLoading = true;
      let valueData = {
        createBy: this.$store.state.vuex_user.username, //创建人（当前账号）
        currPageNo: this.pages.current, //页码
        pageSize: this.pages.size, //每页条数
        purchaseNo: this.query.purchaseNo, //采购单编号
        startTime: this.query.startTime, //开始时间
        endTime: this.query.endTime, //结束时间
      };
      purchaseGetPurchasePage(valueData)
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
    // 采购单详情-接口
    purchaseGetPurchaseOrderDetailsApi(value) {
      this.detailsTableData1 = [];
      this.detailsTableData2 = [];
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
            this.detailsTableData1.push(value);
            this.detailsTableData2 = res.data.purchaseOrderGoodsList.list;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 审核时间改变回调
    pickDate(val) {
      console.log(val);
    },
    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.current = 1;
      this.pages.size = value;
      this.purchaseGetPurchasePageApi();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.purchaseGetPurchasePageApi();
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

      this.pages.current = 1;
      this.purchaseGetPurchasePageApi();
    },
    // 查询按钮
    queryButton() {
      this.pages.current = 1;
      this.purchaseGetPurchasePageApi();
    },
    // 修改按钮
    editPurchaseButton(value) {
      this.purchaseGetPurchaseOrderDetailsApi(value);
    },
    // 修改弹框-取消按钮
    detailsHandleClose() {
      this.detailsVisible = false;
    },
    // 修改弹框-确定按钮
    detailsHandleOk() {
      this.detailsVisible = false;
    },

    // 一键采购按钮
    generateOrderButton(listItem) {
      this.generateOrderVisible = true;
      this.tableDataItem = listItem;
    },
    // 一键采购弹框-取消按钮
    generateOrderHandleClose(value) {
      this.generateOrderVisible = value;
      this.purchaseFindBuyerRegisterApi(); // 查询采购登记信息-接口
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./myPurchaseOrder.scss";
</style>
