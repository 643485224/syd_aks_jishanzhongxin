<template>
  <!-- <div class="page-container table-page" ref="contentBox">
    <div class="trade-tabs">
      <el-tabs v-model="activeStatus" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="0">
          <supplierTransactionTable :ref="'table0'"   :status="null" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="3">
          <supplierTransactionTable :ref="'table3'" :status="3" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="2">
          <supplierTransactionTable :ref="'table2' "  :status="2" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div> -->
  <div style="height: 100%; width: 100%; background: #ffffff; padding: 100px">
    <cu-construction></cu-construction>
  </div>
</template>
<script>
import supplierTransactionTable from './components/supplierTransactionTable.vue'
export default {
  // components: {
  //   supplierTransactionTable
  // },
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
      this.$refs['table'+this.activeStatus].getOrderList()
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
