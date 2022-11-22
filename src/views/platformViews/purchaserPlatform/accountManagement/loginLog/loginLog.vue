<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        操作：
        <el-input
          class="selectInput"
          v-model="operType"
          placeholder="请输入操作方式"
        >
        </el-input>
      </div>
      <div class="search-item">
        用户：
        <el-input
          class="selectInput"
          v-model="operBy"
          placeholder="请输入用户名称"
        >
        </el-input>
      </div>
      <div class="search-item">
        创建时间：
        <!--   :default-time="['00:00:00', '23:59:59']" -->
        <el-date-picker
          v-model="date"
          @change="pickDate"
          format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="search-item">
        <el-button class="operation-btn bgOrange" type="primary" @click="search"
          >查询</el-button
        >
        <el-button
          class="operation-btn bgGreen"
          type="primary"
          @click="exportXls"
          >导出</el-button
        >
      </div>
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :height="tableHeight"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="total"
      >
        <template slot="status" slot-scope="value">
          {{ value.value.status == 1 ? "可用" : "禁用" }}
        </template>
      </cu-table>
    </cu-animation>
  </div>
</template>
<script>
import { loginLogQuery } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
  data() {
    return {
      sysId: null,
      sysType: null, // 系统类型@ 1 运营平台  2  采购商  3  供应商
      operType: "",
      operBy: "",
      date: [],
      tableHeader: [
        {
          title: "操作",
          key: "operType",
        },
        {
          title: "用户",
          key: "operBy",
        },

        {
          title: "时间",
          key: "operTime",
        },
        {
          title: "IP",
          key: "ip",
        },
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
      driverName: "", // 司机姓名
      lpn: "", // 车牌号
      logisticsNo: null, // 物流编号
      row: 10,
      tableLoading: false,
      tableHeight: 0,
      role: {
        name: "",
        roleName: "",
        roles: null,
        description: "",
      },
      formVisible: false,
      formRule: [],
      formType: "",
    };
  },
  created() {
    console.log(this.vuex_user);
    let { sysId, sysType } = this.vuex_user;
    this.sysId = sysId;
    this.sysType = sysType;
    this.getLoginLogList();
  },
  mounted() {
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {
    ...mapState(["vuex_user"]),
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
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    search() {
      this.getLoginLogList();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getLoginLogList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getLoginLogList();
    },
    getLoginLogList() {
      this.tableLoading = true;
      if (this.date && this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }else {
        this.date = []
      }
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        operType: this.operType,
        operBy: this.operBy,
        sysId: this.sysId,
        sysType: this.sysType,
        beginDate: this.date[0],
        endDate: this.date[1],
      };
      console.log(params);
      this.tableData = [];
      loginLogQuery(params)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.tableData = data.records;
            this.total = data.total;
            this.tableLoading = false;
            console.log(this.tableData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exportXls() {},
  },
};
</script>
<style lang="scss"  scoped>
@import "./loginLog.scss";
</style>
