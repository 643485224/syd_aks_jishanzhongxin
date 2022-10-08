<template>
  <!-- 添加供应商公共组件 -->
  <cu-dialog
    width="90vw"
    top="8vh"
    title="添加供应商"
    :showClose="true"
    :visible="addSupplyVisible"
    @handleClose="addSupplyHandleClose()"
    @handleOk="addSupplyHandleOk()"
  >
    <div class="addSupply">
      <div class="search_box mt_20">
        <div class="search_item mr_20 mb_20">
          <span class="mr_10">供应商名称:</span>
          <el-input
            class="el_input"
            v-model="query.supplierName"
            placeholder="请输入供应商名称"
          >
          </el-input>
        </div>

        <div class="search_item mr_20 mb_20">
          <span class="mr_10">供应商类型:</span>
          <el-select
            class="el_select"
            v-model="query.supplierType"
            placeholder="请选择"
            @change="addSupplyTypeChange"
          >
            <el-option label="药品" :value="1"></el-option>
            <el-option label="器械" :value="2"></el-option>
          </el-select>
        </div>
        <el-button
          class="btn_ff480e mb_20"
          type="primary"
          @click="buyerFindSupplierListApi()"
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
          @handleSelectionChange="addSupplyHandleSelectionChange"
        >
          <template slot="status" slot-scope="value">
            {{ statusList[value.value.status] }}
          </template>
          <template slot="supplierType" slot-scope="value">
            {{ supplierTypeList[value.value.supplierType] }}
          </template>
          <template slot="operate" slot-scope="value">
            <a type="primary" @click="supplierDetailsButton(value.value)">
              详情
            </a>
          </template>
        </cu-table>
      </div>
    </div>
    <template slot="footer">
      <div class="flex">
        <el-button
          class="mr_20"
          style="height: 32px"
          type="default"
          @click="addSupplyHandleClose()"
          >取消</el-button
        >
        <el-button
          class="btn_ff480e"
          type="primary"
          :disabled="handleSelection.length == 0"
          @click="addSupplyHandleOk()"
          >已选择{{ handleSelection.length }}个供应商，确认添加</el-button
        >
      </div>
    </template>
  </cu-dialog>
</template>
<script>
import { buyerFindSupplierList } from "@/api/aksApi/platformApi/purchaserPlatformApi.js";

export default {
  name: "addSupply",
  props: {
    addSupplyVisible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // 状态
      statusList: {
        0: "禁用",
        1: "可用",
      },
      supplierTypeList: {
        1: "药品",
        2: "器械",
      },
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "供应商名称",
          key: "unitName",
        },
        {
          title: "企业联系人",
          key: "contactUser",
        },
        {
          title: "手机号",
          key: "phone",
        },
        {
          title: "供应商类型",
          slot: "supplierType",
        },
        {
          title: "操作",
          slot: "operate",
          width: "180",
        },
      ], // 添加供应商弹框-表格表头
      tableData: [], // 添加供应商弹框-表格内容
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      // 查询功能
      query: {
        supplierName: "", //供应商名称
        supplierType: "", //供应商类型@1药品 2器械
      },
      addSupply: {
        keyword: "",
        type: null,
      },

      tableLoading: false,
      handleSelection: [],
    };
  },
  mounted() {
    this.buyerFindSupplierListApi(); //获取供货商列表-接口
  },
  methods: {
    //获取供货商列表-接口
    buyerFindSupplierListApi() {
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        supplierName: this.query.supplierName,
        supplierType: this.query.supplierType,
      };
      buyerFindSupplierList(valueData)
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

    // 添加供应商弹框-取消按钮
    addSupplyHandleClose() {
      this.$emit("addSupplyHandleClose", false);
      this.buyerFindSupplierListApi(); //获取供货商列表-接口
    },
    // 添加供应商弹框-确定按钮
    addSupplyHandleOk() {
      this.$emit("addSupplyHandleOk", this.handleSelection);
    },
    // 添加供应商弹框-表选择
    addSupplyHandleSelectionChange(value) {
      this.handleSelection = value;
      console.log("this.handleSelection:", this.handleSelection);
      this.$emit("addSupplyHandleSelectionChange", this.handleSelection);
    },
    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.size = value;
      this.handleSelection = []; //重置
      this.buyerFindSupplierListApi(); //获取供货商列表-接口
    },

    handleCurrentChange(value) {
      this.pages.current = value;
      this.handleSelection = []; //重置
      this.buyerFindSupplierListApi(); //获取供货商列表-接口
    },
    addSupplyTypeChange() {
      this.pages.current = 1;
      this.handleSelection = []; //重置
      this.buyerFindSupplierListApi(); //获取供货商列表-接口
    },

    // 详情按钮
    supplierDetailsButton(value) {
      this.$emit("supplierDetailsButton", value);
    },
  },
};
</script>
<style lang="scss" scoped>
// 搜索功能
.search_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;

  .search_item {
    display: flex;
    align-items: center;

    .el_input {
      width: 200px;
      height: 32px;

      ::v-deep .el-input__inner {
        height: 32px;
      }
    }

    ::v-deep .el_date_picker.el-input__inner {
      width: 250px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::v-deep .el-input__icon {
      line-height: 24px;
    }

    ::v-deep .el-range-separator {
      line-height: 24px;
    }

    .el_select {
      width: 200px;

      ::v-deep .el-input__inner {
        height: 32px;
      }
    }
  }
}
// 添加供应商弹框
.addSupply {
  height: 68vh;
  width: 100%;
  overflow: auto;
}
</style>
