<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="trade-tabs">
      <el-tabs v-model="activeStatus" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="0">
          <supplierRetailTable :ref="'table0'" :status="null" :height="tableHeight"></supplierRetailTable>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="3">
          <supplierRetailTable :ref="'table3'" :status="3" :height="tableHeight"></supplierRetailTable>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="2">
          <supplierRetailTable :ref="'table2'" :status="2" :height="tableHeight"></supplierRetailTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>
import supplierRetailTable from './components/supplierRetailTable.vue'
import { customOrderStatusTypes } from "@/utils/httpDataTypes.js";

export default {
  components: {
    supplierRetailTable
  },
  data() {
    return {
      tableHeight: 0, //表格高度
      status: null,
      activeStatus: '0',
      statusType: customOrderStatusTypes,
    }
  },
  created() {
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
  },
  methods: {
    // 根据浏览器大小计算表格高度
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 210;
    },
    handleClick() {
      console.log(this.activeStatus, this.$refs['table' + this.activeStatus]);
      this.$refs['table' + this.activeStatus].getOrderList()
    },
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
}
</script>
<style lang="scss" src="./supplierRetailOrderList.scss" scoped>

</style>
