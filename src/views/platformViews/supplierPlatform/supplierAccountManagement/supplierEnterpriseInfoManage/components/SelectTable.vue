<template>
  <div v-if="show">
    <cu-dialog title="添加仓库" width="700px" :visible="selectVisible" :showClose="true" @handleClose="handleClose"
      :destroy-on-close="true"  :modalAppendToBody="true" :appendToBody="true" @handleOk="select">
      <div class="dialog-details">
        <div class="search-bar">
          <div class="search-item">
            <div class="label">仓库编号:</div>
            <el-input class="selectInput" v-model="ckbh" placeholder="请输入仓库编号搜索">
            </el-input>
          </div>
          <div class="search-item operations">
            <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <!-- :height="tableHeight" -->
        <cu-table class="sale-table" :loading="tableLoading" :showTitle="false" selection
          @handleSelectionChange="handleSelectionChange" :tableHeader="tableHeader" :tableData="selectTableData"
          @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="pages.total">
          <template slot="ckType" slot-scope="value">
          {{ckTypes[value.value.ckType]}}
        </template>
        <template slot="status" slot-scope="value">
          {{statusTypes[value.value.status]}}
        </template>
        <template slot="useStatus" slot-scope="value">
          {{useStatusTypes[value.value.useStatus]}}
        </template>
          <template slot="operate" slot-scope="value">
            <el-button type="text" @click="toDetails(value.value.id)">详情</el-button>
          </template>
        </cu-table>
      </div>
      <template #footer>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import { getWarehouse } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  name: 'select-table',
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selectVisible: true,
      ckbh:'',
      tableHeader: [
        {
          title: "仓库编号",
          key: "ckbh"
        },
        {
          title: "仓库类型",
          slot: "ckType"
        },
        {
          title: "状态",
          slot: "status"
        },
        {
          title: "使用状态",
          slot: "useStatus"
        },
        {
          title: "仓库描述",
          key: "description"
        }
      ],
      tableData: [],
      tableLoading: false,
      statusTypes: {
        0: "禁用",
        1: "可用",
      },
      ckTypes: {
        0: '独占仓库',
        1: '共享仓库'
      },
      useStatusTypes: {
        0: '空闲',
        1: '已入驻',
      },
      pages: {
        current: 1,
        size: 10,
        total: 0
      },
    }
  },
  watch: {
   show(val){
    if(val){
      this.search()
    }
   }
  },
  created() {
    this.selectTableData = []
  },
  methods: {
    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.size = value;
      this.search();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.search();
    },
    search() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        ckbh: this.ckbh
      }
      getWarehouse(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.selectTableData = res.data.records;
          this.pages.total = res.data.total;
          this.tableLoading = false;
        } else {
          this.$message.warning(res.message)
          this.tableLoading = false;
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    handleSelectionChange(arr) {
      console.log(arr);
      if (arr.length) {
        this.list = arr
      }
    },
    // 选择采购商
    select() {
      this.$emit("select", this.list)
      this.$emit("update:show", false)

    },
    handleClose() {
      this.$emit("update:show", false)
    },
    toDetails(id) {
      console.log(id);
      this.$router.push({ name: 'supplierPurchaserInfo', params: { id } })
    },
  },
}
</script>
<style lang="scss" scoped>
// 选择商品表格搜索栏
.search-bar {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 20px 0 30px;
  font-size: 14px;
  color: #00023A;

  .search-item {
    display: flex;
    align-items: center;
    margin: 4px 10px 4px 0;

    .label {
      width: 90px;
      margin-right: 10px;
      text-align: right;
    }

    .selectInput {
      width: 200px;

      ::v-deep .el-input__inner {
        height: 32px;
      }
    }

    ::v-deep .el-range-editor.el-input__inner {
      width: 240px;
      height: 32px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1;
    }
  }

  .operations {
    margin-left: auto;
  }
}
</style>
