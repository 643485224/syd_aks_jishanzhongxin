<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="trade-tabs">
      <el-tabs v-model="activeStatus" @tab-click="handleClick">
        <el-tab-pane label="今天" name="0">
          <supplierStatisticsTable :ref="'table0'"  v-if="activeStatus == '0'" :status="0" :height="tableHeight"></supplierStatisticsTable>
        </el-tab-pane>
        <el-tab-pane label="昨天" name="3">
          <supplierStatisticsTable :ref="'table3'" v-if="activeStatus == '3'" :status="1" :height="tableHeight"></supplierStatisticsTable>
        </el-tab-pane>
        <el-tab-pane label="7天" name="2">
          <supplierStatisticsTable :ref="'table2' " v-if="activeStatus == '2'" :status="7" :height="tableHeight"></supplierStatisticsTable>
        </el-tab-pane>
         <el-tab-pane label="30天" name="1">
          <supplierStatisticsTable :ref="'table1'" v-if="activeStatus == '1'" :status="30" :height="tableHeight"></supplierStatisticsTable>
        </el-tab-pane>
        <!--<el-tab-pane label="待取消" name="10">
          <supplierTransactionTable :ref="'table10'" v-if="activeStatus == '10'" :status="10" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane> -->
      </el-tabs>
    </div>

  </div>
</template>
<script>
import supplierStatisticsTable from './components/supplierStatisticsTable.vue'
export default {
  components: {
    supplierStatisticsTable
  },
  data() {
    return {
      tableHeight: 0, //表格高度
      status: null,
      activeStatus: '0',
      statusType: {
        1: '待响应',
        2: '待发货',
        3: '待收货',
        4: '已收货',
        5: '待付款',
        6: '待评价',
        7: '已取消',
        8: '已拒绝',
        10: '待取消'
      },
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
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    handleClick() {
      console.log(this.activeStatus,this.$refs['table'+this.activeStatus]);
    },
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
}
</script>
<style lang="scss" src="./supplierCommoditySalesStatistics.scss" scoped>
</style>
