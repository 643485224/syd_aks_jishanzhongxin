<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="table-page-item">
      <div class="trade-tabs" v-show="distinguishName == '列表'">
        <el-tabs v-model="activeStatus" @tab-click="handleClick">
          <!-- 退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败 -->
          <el-tab-pane label="全部订单" name="0">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs0'"
              v-if="activeStatus == '0'"
              :backState="''"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>

          <el-tab-pane label="待审核" name="2">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs2'"
              v-if="activeStatus == '2'"
              :backState="'2'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已退货" name="3">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs3'"
              v-if="activeStatus == '3'"
              :backState="'3'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <!-- <el-tab-pane label="退货失败" name="4">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs4'"
              v-if="activeStatus == '4'"
              :backState="'4'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane> -->
        </el-tabs>
      </div>
      <div
        class="contentBox_distinguis_one"
        v-if="distinguishName == '订单详情'"
      >
        <el-button
          class="Buttonposition"
          type="primary"
          @click="distinguishName = '列表'"
          >返回上一页</el-button
        >
        <div class="distinguis_Title">订单详情</div>
        <itemderDetail
          :tableItemData="tableItemData"
          :derDetailData="derDetailData"
          :buyerTranManagerOrderProcessObject="
            buyerTranManagerOrderProcessObject
          "
          @logisticsButton="logisticsButton"
        ></itemderDetail>
      </div>
    </div>

    <cu-dialog
      title="查看物流"
      width="70vw"
      :visible="logisticsVisible"
      :showClose="true"
      @handleClose="logisticsClose"
    >
      <div class="logistics-details">
        <div class="info">
          <div class="info-top">
            <p>物流单号: 123123</p>
            <p>快递员: 12312&emsp;123123</p>
          </div>
          <div class="stage">
            <div class="stage-item" v-for="(item, index) in 1" :key="index">
              <div class="time">
                2022-08-27 12:21:33
                <!-- {{ formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss") }} -->
              </div>
              <div class="address">
                [预计到达]：北京是紫禁城77栋1号
                <!-- [{{ logisticsTypes[item.type] }}]:{{ item.address }} -->
              </div>
            </div>
          </div>
        </div>
        <div class="map">
          <cu-gaudMap></cu-gaudMap>
        </div>
      </div>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerTranManagerFindReturnOrderDetail,
  buyerTranManagerOrderProcess,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import itemTabs from "./components/itemTabs.vue";
import itemderDetail from "./components/itemderDetail.vue";
export default {
  components: {
    itemTabs,
    itemderDetail,
  },
  data() {
    return {
      distinguishName: "列表",
      tableHeight: 0, //表格高度
      activeStatus: "0",
      status: null,
      tableLoading: false, //表格加载中
      tableItemData: {}, //表格单条数据
      derDetailData: {}, //详情数据

      logisticsVisible: false, //查看物流弹框

      // 订单流程情况接口回参
      buyerTranManagerOrderProcessObject: {},
    };
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
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },

  methods: {
    // 交易订单明细(详情)-接口
    async buyerTranManagerFindReturnOrderDetailApi() {
      this.tableLoading = true;
      this.derDetailData = {};
      let valueData = {
        id: this.tableItemData.id, //订单ID
        orderType: this.tableItemData.orderType, //订单类型@ 1 药品  2  器械
      };
      await buyerTranManagerFindReturnOrderDetail(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.derDetailData = res.data;
            // this.distinguishName = "订单详情";
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });

      await buyerTranManagerOrderProcess(this.tableItemData.id)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.buyerTranManagerOrderProcessObject = res.data;
            this.distinguishName = "订单详情";
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    handleClick(value) {},
    // 详情按钮
    detailsButton(itemData) {
      this.tableItemData = {};
      this.tableItemData = itemData;
      this.buyerTranManagerFindReturnOrderDetailApi();
    },

    // 查看物流按钮
    logisticsButton() {
      this.logisticsVisible = true;
    },
    // 查看物流取消按钮
    logisticsClose() {
      this.logisticsVisible = false;
    },

    // 改变加载中值
    chosetableLoading(value) {
      this.tableLoading = value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./returnOrderDetails.scss";
</style>
