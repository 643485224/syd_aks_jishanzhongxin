<template>
  <div v-if="show">
    <cu-dialog title="添加采购商" width="70vw" :visible="selectVisible" :showClose="true" @handleClose="handleClose"
      :destroy-on-close="true" @handleOk="select">
      <div class="dialog-details">
        <div class="search-bar">
          <div class="search-item">
            <div class="label">采购商名称:</div>
            <el-input class="selectInput" v-model="searchObj.buyerName" placeholder="请输入采购商名称搜索">
            </el-input>
          </div>
          <div class="search-item operations">
            <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <!-- :height="tableHeight" -->
        <cu-table class="sale-table" :loading="tableLoading2" :showTitle="false" selection
          @handleSelectionChange="handleSelectionChange" :tableHeader="selectTableHeader" :tableData="selectTableData"
          @handleSizeChange="handleSizeChange2" @handleCurrentChange="handleCurrentChange2" :total="pages.total">
          <template slot="unitType" slot-scope="value">
            {{ types[value.value.unitType] }}
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
import { getBuyerList } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selectVisible: true,
      tableLoading2: false,
      selectTableData: [],
      selectTableHeader: [
        {
          title: "序号",
          key: "index",
        },
        {
          title: "采购商名称",
          key: "unitName",
        },
        {
          title: "采购商分类",
          slot: "unitType",
        },
        {
          title: "操作",
          slot: "operate",
          // width: 140,
          fixed: 'right'
        },

      ],
      types: {
        1: '医疗机构', 2: '药店', 3: '个人'
      },
      searchObj: {
        buyerName: ''
      },
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      list: [],
      filterList: [],// 过滤掉 不能选择的数据
    }
  },
  watch: {
    show(val) {
      console.log(val);
     if(val){
      this.list = []
      this.selectTableData = []
      this.search()
     }
    }
  },
  created() {
    this.search()
  },
  mounted() {
    console.log('mounted');


  },
  methods: {
    // 每页条数改变回调
    handleSizeChange2(value) {
      this.pages.size = value;
      this.search();
    },
    // 页码改变回调
    handleCurrentChange2(value) {
      this.pages.current = value;
      this.search();
    },
    search() {
      this.tableLoading2 = true;
      let params = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        buyerName: this.searchObj.buyerName
      }
      getBuyerList(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          console.log(this.filterList);
          let selectList = []
          // let data = res.data.records;
          // selectList = this.filterArray(data,this.filterList)
          // selectList = data
          this.selectTableData = res.data.records;
          this.pages.total = res.data.total;
          this.tableLoading2 = false;
        } else {
          this.$message.warning(res.message)
          this.tableLoading2 = false;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    filterArray(a, b) {
      let newArr = a.filter((itemA) => {
        return b.every((itemB) => {
          return itemA.id != itemB.id
        })
      })
      return newArr
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
