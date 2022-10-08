<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="trade-tabs">
      <el-tabs v-model="activeStatus" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="0">
          <supplierTransactionTable :ref="'table0'"  v-if="activeStatus == '0'" :status="null" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="3">
          <supplierTransactionTable :ref="'table3'" v-if="activeStatus == '3'" :status="3" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="2">
          <supplierTransactionTable :ref="'table2' " v-if="activeStatus == '2'" :status="2" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待响应" name="1">
          <supplierTransactionTable :ref="'table1'" v-if="activeStatus == '1'" :status="1" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待取消" name="10">
          <supplierTransactionTable :ref="'table10'" v-if="activeStatus == '10'" :status="10" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
        <el-tab-pane label="待退货" name="11">
          <!-- 待退货 使用 back_state 字段 -->
          <supplierTransactionTable :ref="'table10'" v-if="activeStatus == '11'" :status="11" :height="tableHeight"></supplierTransactionTable>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import supplierTransactionTable from './components/supplierTransactionTable.vue'
export default {
  components: {
    supplierTransactionTable
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
        10: '待取消',
        11: '待退货',
          
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
      console.log(this.activeStatus);
    },
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
}
</script>
<style lang="scss" src="./supplierTransactionOrderList.scss" scoped>
</style>
