<template>
  <div>
    <cu-dialog title="仓库设置" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose"
      :destroy-on-close="true" :modalAppendToBody="true" :appendToBody="true" @handleOk="handleOk">
      <div class="form">
        <div class="form-item">
          <div class="label">添加仓库：</div>
          <el-input class="selectInput" @click.native="selectInfo" placeholder="" suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>

      <cu-table class="sale-table" :loading="tableLoading" :showTitle="false" :tableHeader="tableHeader"
        :tableData="tableData" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
        :total="pages.total">
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
          <el-button type="text" @click="remove(value.value)">删除</el-button>
        </template>
      </cu-table>

      <template #footer>

      </template>
    </cu-dialog>
    <!-- <select-table :show.sync="selectDialogVisible" @select="select"></select-table> -->
    <SelectTable :show.sync="selectDialogVisible" @select="select"></SelectTable>

  </div>
</template>
<script>
import SelectTable from "./SelectTable.vue";

export default {
  name: 'EditStoreHouse',
  components: {
    SelectTable
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [],
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
        },
        {
          title: "操作",
          slot: "operate",
          width:"100px"
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
      selectDialogVisible: false,
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    // dialogVisible: {
    //   get() {
    //     return this.show;
    //   },
    //   set(val) {
    //     this.$emit('update:show', val)
    //   }
    // }
  },
  watch: {
    immediate: true,
    data(val){
      this.list = val;
    },
    list(val) {
      console.log(val);
      this.getTablelist()
      this.$emit('update:data', val);
    }
  },
  created(){
    this.list = this.data;

  },
  mounted() {
    console.log(this.list, this.data);
    this.getTablelist()
  },
  methods: {
    handleClose() {
      console.log(this.dialogVisible);
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getTablelist();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getTablelist();
    },
    getTablelist() {
      console.log(this.list, this.data);

      this.tableLoading = true;
      let start = (this.pages.current - 1) * this.pages.size;
      let end = (this.pages.current - 1) * this.pages.size + this.pages.size;
      console.log(start, end);
      this.tableData = this.list.slice(start, end)
      this.pages.total = this.list.length;
      this.tableLoading = false;

    },
    remove(data) {
      this.list = this.list.filter(item => item.id == data.id ? false : true)
      // this.getTablelist()
    },
    selectInfo() {
      this.selectDialogVisible = true;
    },
    // 选择仓库
    select(toreHouseList) {
      console.log(this.list, toreHouseList);
      // 选择数组 与已选数组 去重
      let list = [...new Set([...this.list, ...toreHouseList])]
      this.list = list
      console.log(list);
      // this.getTablelist()
    },
    // 保存修改
    handleOk(){
      this.$emit("submit")
    }

  },
}
</script>
<style lang="scss" scoped>
.form {
  margin: 40px auto;
  width: 400px;

  .form-item {
    display: flex;
    align-items: center;

    .label {
      width: 100px;
    }
  }
}
</style>
