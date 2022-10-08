<template>
  <div ref="contentBox" class="page-container table-page">
    <div class="table-page-item">
      <div class="trade-tabs" v-show="distinguishName == '列表'">
        <el-tabs v-model="activeStatus" @tab-click="handleClick">
          <!-- 1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）
            7  已取消 8 已拒绝   9 已评价 10  待取消(取消待审核)  11  待退货（退货待审核）
            12 已退货") -->
          <el-tab-pane label="全部订单" name="0">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs0'"
              v-if="activeStatus == '0'"
              :status="''"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待响应" name="1">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs1'"
              v-if="activeStatus == '1'"
              :status="'1'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="2">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs2'"
              v-if="activeStatus == '2'"
              :status="'2'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待收货" name="3">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs3'"
              v-if="activeStatus == '3'"
              :status="'3'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已收货" name="4">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs4'"
              v-if="activeStatus == '4'"
              :status="'4'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="5">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs5'"
              v-if="activeStatus == '5'"
              :status="'5'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="6">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs6'"
              v-if="activeStatus == '6'"
              :status="'6'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已取消" name="7">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs7'"
              v-if="activeStatus == '7'"
              :status="'7'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已拒绝" name="8">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs8'"
              v-if="activeStatus == '8'"
              :status="'8'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已评价" name="9">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs9'"
              v-if="activeStatus == '9'"
              :status="'9'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待取消" name="10">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs10'"
              v-if="activeStatus == '10'"
              :status="'10'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="待退货" name="11">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs11'"
              v-if="activeStatus == '11'"
              :status="'11'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
          <el-tab-pane label="已退货" name="12">
            <itemTabs
              :tableLoading="tableLoading"
              @chosetableLoading="chosetableLoading"
              :ref="'itemTabs12'"
              v-if="activeStatus == '12'"
              :status="'12'"
              :height="tableHeight"
              @detailsButton="detailsButton"
            ></itemTabs>
          </el-tab-pane>
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
          @evaluateHandleButton="evaluateHandleButton"
          @confirmReceiptButton="confirmReceiptButton"
          @logisticsButton="logisticsButton"
          @returnGoodsButton="returnGoodsButton"
        ></itemderDetail>
      </div>
    </div>

    <cu-dialog
      title="订单评价"
      :showClose="true"
      :visible="evaluateVisible"
      @handleClose="evaluateHandleClose()"
      @handleOk="evaluateHandleOk()"
    >
      <div class="flex mt_40">
        <span class="mr_10">综合评分</span>
        <el-rate v-model="score"></el-rate>
      </div>
      <div class="flex mt_20">
        <span class="mr_10">商品评分</span>
        <el-rate v-model="goodsScore"></el-rate>
      </div>
      <div class="flex mt_20">
        <span class="mr_10">物流评分</span>
        <el-rate v-model="logisticsScore"></el-rate>
      </div>
      <div class="flex mt_20">
        <span class="mr_10">其他描述:</span>
        <textarea
          type="textarea"
          style="
            width: 750px;
            outline: none;
            border: 1px solid #dcdfe6;
            border-radius: 6px;
            height: 90px;
            font-size: 18px;
            padding: 10px;
          "
          v-model="elRateRemark"
        />
      </div>
      <div class="flex mt_20">
        <span class="mr_10">上传文件:</span>
        <el-upload
          action
          accept="image/jpeg,image/gif,image/png"
          :before-upload="onBeforeUpload"
          :http-request="uploadImageApi"
          multiple
          :limit="3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
        </el-upload>
      </div>
    </cu-dialog>
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

    <cu-dialog
      title="申请退货(订单状态为：待收货、已收货、待付款支持退货)"
      width="80vw"
      :visible="returnGoodsVisible"
      :showClose="true"
      @handleClose="returnGoodsClose"
      @handleOk="returnGoodsOk"
    >
      <div class="flex_ac mt_20">
        <span class="mr_10">选择操作:</span>
        <el-radio v-model="returnGoodsRadio" label="全部退货"
          >全部退货</el-radio
        >
        <el-radio v-model="returnGoodsRadio" label="部分退货"
          >部分退货</el-radio
        >
      </div>
      <div class="flex_ac mt_20">
        <div class="mr_10">退货原因:</div>
        <textarea
          type="textarea"
          style="
            flex:1
            outline: none;
            border: 1px solid #dcdfe6;
            border-radius: 6px;
            height: 90px;
            font-size: 18px;
            padding: 10px;
          "
          v-model="returnGoodsTextareaValue"
        />
      </div>
      <div v-show="returnGoodsRadio == '部分退货'">
        <div class="mt_20">商品信息:</div>
        <cu-table
          v-if="returnGoodsVisible"
          :tableHeader="returnGoodsTableHeader"
          :tableData="returnGoodsTableData"
          :showPagination="false"
          :showTitle="false"
        >
          <template #returnGoodsNum="value">
            <el-input-number
              :controls="true"
              v-model="value.value.returnGoodsNum"
              :min="0"
              :max="value.value.quantity"
              :precision="0"
            ></el-input-number>
          </template>
        </cu-table>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerTranManagerFindOrderDetail,
  buyerTranManagerReturnOrder,
  buyerTranManagerReceivingOrder,
  buyerTranManagerOrderRate,
  uploadImage,
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

      evaluateVisible: false, //评价弹框
      score: 0, //评价弹框-综合评分
      goodsScore: 0, //评价弹框-商品评分
      logisticsScore: 0, //评价弹框-物流评分
      elRateRemark: "", //评价弹框-其他描述
      elRateImage: "", //评价弹框-图片上传

      logisticsVisible: false, //查看物流弹框

      returnGoodsVisible: false, //申请退货弹框
      returnGoodsRadio: "全部退货", //退货单选值 全部退 部分退
      returnGoodsTextareaValue: "", //退货原因值
      //退货商品表头
      returnGoodsTableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "产品编号",
          key: "ybCode",
          align: "center",
        },
        {
          title: "通用名",
          key: "commonName",
          align: "center",
        },
        {
          title: "剂型",
          key: "jx",
          width: "120",
          align: "center",
        },
        {
          title: "规格",
          key: "specification",
          width: "120",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          width: "120",
          align: "center",
        },
        {
          title: "生产企业",
          key: "manufacturer",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          width: "200",
          align: "center",
        },
        {
          title: "采购价(元)",
          key: "buyPrice",
          width: "120",
          align: "center",
        },
        {
          title: "退货数量",
          slot: "returnGoodsNum",
          width: "180",
          align: "center",
        },
      ],
      //退货商品表内容
      returnGoodsTableData: [],
      orderId: null,
      // 订单流程情况接口回参
      buyerTranManagerOrderProcessObject: {},
    };
  },

  mounted() {
    this.handleHeight(); // 根据浏览器大小计算表格高度
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },

  methods: {
    // 采购商收货-接口
    buyerTranManagerReceivingOrderApi() {
      let valueData = {
        orderId: this.tableItemData.id,
      };
      buyerTranManagerReceivingOrder(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.$refs[
              "itemTabs" + this.activeStatus
            ].buyerTranManagerFindTradeInfoApi(); //刷新内部表格
            this.buyerTranManagerFindOrderDetailApi(); // 交易订单明细(详情)-接口
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 交易订单明细(详情)-接口
    async buyerTranManagerFindOrderDetailApi() {
      this.tableLoading = true;
      this.derDetailData = {};
      let valueData = {
        id: this.tableItemData.id, //订单ID
        orderType: this.tableItemData.orderType, //订单类型@ 1 药品  2  器械
      };
      await buyerTranManagerFindOrderDetail(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.derDetailData = res.data;
            this.derDetailData.goodsDetailVos.forEach((element) => {
              element.returnGoodsNum = 0;
            });
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
    // 交易订单明细(退货)-接口
    buyerTranManagerReturnOrderApi() {
      let valueData = {
        backRemark: this.returnGoodsTextareaValue, //退货原因
        backType: this.returnGoodsRadio == "全部退货" ? 1 : 2, // 退货类型（1 全部退货 2 部分退货）
        buyerId: this.$store.state.vuex_token.buyer.id, //采购商ID(登录人id)
        orderId: this.tableItemData.id, //订单ID
        //退货明细
        returnGoodsVoList: this.returnGoodsTableData,
      };
      buyerTranManagerReturnOrder(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$refs[
              "itemTabs" + this.activeStatus
            ].buyerTranManagerFindTradeInfoApi(); //刷新内部表格
            this.buyerTranManagerFindOrderDetailApi(); // 交易订单明细(详情)-接口
            this.returnGoodsVisible = false;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 交易订单明细(评价)-接口
    buyerTranManagerOrderRateApi() {
      let valueData = {
        orderId: this.tableItemData.id, //订单ID
        score: this.score, //Integer	综合评分	是
        goodsScore: this.goodsScore, //Long	商品评分	是
        logisticsScore: this.logisticsScore, //Integer	物流评分	是
        remark: this.elRateRemark, //String	描述	是
        image: this.elRateImage, //String	图片(图片路径，用逗号隔开)	是
      };
      buyerTranManagerOrderRate(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.evaluateVisible = false;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight =
          this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
      });
    },
    handleClick(value) {},
    // 详情按钮
    detailsButton(itemData) {
      this.tableItemData = {};
      this.tableItemData = itemData;

      this.buyerTranManagerFindOrderDetailApi();
    },
    // 确认收货按钮
    confirmReceiptButton() {
      this.buyerTranManagerReceivingOrderApi();
    },
    // 评价按钮
    evaluateHandleButton() {
      this.score = 5; //评价弹框-综合评分
      this.goodsScore = 5; //评价弹框-商品评分
      this.logisticsScore = 5; //评价弹框-物流评分
      this.elRateRemark = ""; //评价弹框-其他描述
      this.elRateImage = ""; //评价弹框-图片上传
      this.evaluateVisible = true;
    },
    // 评价弹框取消按钮
    evaluateHandleClose() {
      this.evaluateVisible = false;
    },
    // 评价弹框确定按钮
    evaluateHandleOk() {
      this.buyerTranManagerOrderRateApi();
    },
    // 查看物流按钮
    logisticsButton() {
      this.logisticsVisible = true;
    },
    // 查看物流取消按钮
    logisticsClose() {
      this.logisticsVisible = false;
    },
    // 申请退货按钮
    returnGoodsButton() {
      this.returnGoodsRadio = "全部退货"; //退货单选值 全部退 部分退
      this.returnGoodsTextareaValue = ""; //退货原因值

      this.returnGoodsTableData = JSON.parse(
        JSON.stringify(this.derDetailData.goodsDetailVos)
      );

      this.returnGoodsVisible = true;
    },
    // 申请退货弹框取消按钮
    returnGoodsClose() {
      this.returnGoodsVisible = false;
    },
    // 申请退货弹框确定按钮
    returnGoodsOk() {
      this.buyerTranManagerReturnOrderApi();
    },
    // 改变加载中值
    chosetableLoading(value) {
      this.tableLoading = value;
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isIMAGE && isLt1M;
    },
    // 上传文件-接口
    uploadImageApi(itemData) {
      this.loadingDrawer = true;
      this.loadingDrawerTitle = "附件上传中，请稍后...";
      let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
      FormDatas.append("file", itemData.file);
      uploadImage(FormDatas)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.Msg);
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((error) => {
          this.loadingDrawer = false;
          console.log(error);
        });
    },
    quantityChange(quantity, returnGoodsNum, index) {
      //赋值太快导致渲染不及时，加入定时器解决
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.returnGoodsTableData[index].returnGoodsNum = returnGoodsNum;
      //   }, 2000);
      // });
      // console.log("quantity:", quantity);
      // console.log("returnGoodsNum:", returnGoodsNum);
      // console.log("index:", index);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./transactionOrderDetails.scss";
</style>
