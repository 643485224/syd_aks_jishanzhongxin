<template>
  <!-- 零购平台=>我的订单=>订单详情页面 -->
  <div class="contentBox">
    <div class="box1">
      <div class="box1_item1">
        <div>{{ statusTypeList[details.status] }}</div>
        <div>
          <!-- 订单状态为待收货才能进行收货 -->
          <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
          <el-button type="primary" class="btn_ff480e" @click="operation('returnPass', this.orderId)"
            v-if="details.status == 8">退货审核 </el-button>
          <el-button type="primary" class="btn_ff480e" @click="ship" v-if="details.status == 2">
            发货</el-button>
          <el-button type="primary" class="btn_ff480e" @click="operation('audit', this.orderId)"
            v-if="details.status == 9">取消审核
          </el-button>
        </div>
      </div>

      <div class="box1_item2" v-if="fkType == 2">
        <el-steps :active="elStepsValue" align-center>
          <el-step icon="el-icon-tickets">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">提交订单</div>
                <div class="box1_item2_span">{{ details.orderTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-bank-card">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">付款成功</div>
                <div class="box1_item2_span">{{ details.payTime }}</div>
              </div>
            </template>
          </el-step>

          <el-step icon="el-icon-box">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">商品出库</div>
                <div class="box1_item2_span">{{ details.deliveryTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-truck">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待收货</div>
                <div class="box1_item2_span">{{ details.receiveGoodsTime }}</div>
              </div>
            </template>
          </el-step>

          <el-step icon="el-icon-document-checked">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">完成</div>
                <div class="box1_item2_span">{{ details.completeTime }}</div>
                <div class="box1_item2_span">18:20</div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>

    <div class="fenge"></div>

    <div class="box2">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item1" :span="24">订单信息</el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">订单编号:</span>{{ details.orderNo }}
        </el-col>
        <el-col class="box2_item2" :span="12"><span class="mr_10">支付时间:</span>
          {{
              details.payTime == null
                ? null
                : new Date(details.payTime).Format(
                  "yyyy-MM-dd hh:mm:ss"
                )
          }}
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">订单状态:</span>{{ statusTypeList[details.status] }}
        </el-col>
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">支付方式:</span>{{ payTypes[details.payType] }}
        </el-col>
      </el-row>
    </div>

    <div class="fenge"></div>

    <div class="box2">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item1" :span="12">收货信息</el-col>
        <el-col class="box2_item1" :span="12">配送信息</el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货人:</span>{{ details.consignee }}
        </el-col>
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">配送方式:</span>{{ details.expressCompany }}
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">手机号:</span>{{ details.consigneePhone }}
        </el-col>
        <!-- <el-col class="box2_item2" :span="12">
          <span class="mr_10">配送时间:</span>
          {{
              derDetailData.order.deliveryTime == null
                ? null
                : new Date(derDetailData.order.deliveryTime).Format(
                  "yyyy-MM-dd hh:mm:ss"
                )
          }}
        </el-col> -->
      </el-row>
      <el-row :gutter="20" class="mt_10">
        <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货地址:</span>{{ details.consigneeAddress }}
        </el-col>
        <!-- <el-col class="box2_item2" :span="12">
          <span class="mr_10">收货时间:</span>
          {{
              derDetailData.order.receiveGoodsTime == null
                ? null
                : new Date(derDetailData.order.receiveGoodsTime).Format(
                  "yyyy-MM-dd hh:mm:ss"
                )
          }}
        </el-col> -->
      </el-row>
    </div>

    <div class="fenge"></div>

    <div class="box3">订单信息</div>
    <div class="box4">
      <!-- <div class="tableItemTitle">新疆阿克苏地区葫芦娃药业集团</div> -->
      <el-row type="flex" class="table-header mt_10" :gutter="20">
        <el-col class="" :span="12">
          商品
        </el-col>
        <!-- <el-col class="" :span="4">
          商品编号
        </el-col> -->
        <el-col class="" :span="4">
          收货人
        </el-col>
        <el-col class="" :span="4">
          金额
        </el-col>
        <el-col class="" :span="4">
          全部状态
        </el-col>
      </el-row>
      <el-row type="flex" class="table-row" :gutter="20" v-for="item in details.orderLsDetailVo" :key="item.orderNo">
        <el-col class="" :span="12">
          <div class="goods-info">
            <img class="table-image" :src="item.mainPicture" alt="" />
            <span class="ml_10 flex_1">{{ item.goodsName }}</span>
            <!-- <span class="mr_10">￥{{ item.price }}</span> -->
            <div class="goods-count">x{{ item.quantity }}</div>
          </div>
        </el-col>
        <!-- <el-col class="" :span="4">
          {{ item.orderNo }}
        </el-col> -->
        <el-col class="" :span="4">
          {{ item.username }}
        </el-col>
        <el-col class="" :span="4">
          <div class="goods-amount">￥{{ item.amount || 0 }}</div>
          <div class="border"></div>
          <div class="goods-paytype">在线支付/{{ payTypes[details.payType] }}</div>
        </el-col>
        <el-col class="" :span="4">
          <span class="goods-status">{{ statusTypeList[details.status] }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="fenge"></div>
    <div class="box5">
      <el-row :gutter="20" class="mt_10">
        <el-col class="box5_title" :span="24">总计</el-col>
      </el-row>
      <div class="box5_item1">
        <span class="mr_10">商品总计:</span>
        {{ details.amount }} 元
      </div>
      <div class="box5_item1">
        <span class="mr_10">运费总计:</span>{{ details.transportFee }} 元
      </div>
      <div class="box5_item1">
        <span class="mr_10">实付款:</span>
        <span class="box5_item2"> {{ details.payAmount }}</span>
        元
      </div>
    </div>
    <cu-dialog :title="operateTitle[operateType]" width="50vw" :visible="dialogVisible" :showClose="true"
      @handleClose="operationClose" @handleOk="confirmOperate">
      <div class="dialog-form">
        <div class="select">
          操作：<el-radio-group v-if="operateType == 'response'" v-model="operateVal">
            <el-radio label="response">确定</el-radio>
            <el-radio label="refuse">拒绝</el-radio>
          </el-radio-group>
          <el-radio-group v-else-if="operateType == 'audit'" v-model="operateVal">
            <el-radio label="audit">确定</el-radio>
            <el-radio label="rejectAudit">拒绝</el-radio>
          </el-radio-group>
          <el-radio-group v-else v-model="operateVal">
            <el-radio label="returnPass">确定</el-radio>
            <el-radio label="returnRefuse">拒绝</el-radio>
          </el-radio-group>
        </div>
        <div class="operate-reason">
          <span class="label"><span class="red"
              v-if="(operateVal == 'refuse' || operateVal == 'rejectAudit' || operateVal == 'returnRefuse')">*</span>原因:</span>
          <el-input class="selectInput" type="textarea" :rows="6" v-model="reason" placeholder="请输入原因">
          </el-input>
        </div>

      </div>
      <template #footer>
      </template>
    </cu-dialog>
    <cu-dialog :title="'发货'" width="50vw" :visible="shipVisible" :showClose="true" @handleClose="shipClose"
      @handleOk="confirmShip">
      <div class="dialog-form">
        <p>请填写物流公司:</p>
        <el-input class="selectInput" v-model="expressCompany" placeholder="请输入物流公司">
        </el-input>
        <p>请填写物流单号:</p>
        <el-input class="selectInput" v-model="expressNumber" placeholder="请输入物流单号">
        </el-input>
      </div>
      <template #footer>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import { customOrderStatusTypes } from "@/utils/httpDataTypes.js";
import { getOrderLsDetail, acceptOrder, rejectOrder, lsgoodsShipped, lsorderCancelAudit, lsorderReturnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  data() {
    return {
      statusTypeList: customOrderStatusTypes,
      orderType: {
        1: "药品",
        2: "器械",
      },
      payTypes: {
        1: '微信',
        2: '支付宝'
      },
      deliveryMethodType: {
        1: "阿克苏集散中心物流",
        2: "普通物流",
      },
      elStepsValue: 0, //步骤条状态
      shangpingAllamount: 0, //商品总计

      buyerTranManagerOrderProcessObject: {},
      fkType: 2,


      details: {},
      orderNo: '',
      orderId: '',
      tableHeight: 130,
      tableHeader: [
        {
          title: "产品编号",
          key: "goodsCode",
        },
        {
          title: "通用名",
          key: "commonName",
        },
        {
          title: "剂型",
          key: "jx",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "单位",
          key: "unit",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "数量",
          key: "quantity",
        },
        {
          title: "采购价(元)",
          key: "price",
        },
        {
          title: "小计",
          key: "amount",
        },
        // {
        //     title: "状态",// 审核状态@ 1  待审核  2  审核通过   3  审核不通过
        //     slot: "auditStatus",
        // },
      ],
      tableData: [],
      consigType: {
        1: '阿克苏集散中心物流',
        2: '普通快递'
      },
      expressNumber: '',// 物流单号
      expressCompany: '',// 物流公司
      dialogVisible: false,
      shipVisible: false,
      reason: '',// 操作原因
      operateType: '',// 操作类型
      operateVal: '',// 操作值
      operateTitle: {
        'response': '订单响应',
        'audit': '订单取消审核',
        'returnPass': '订单退货审核',
      },
      message: {// 不同操作显示文字
        'response': '响应',
        'refuse': '拒绝',
        'audit': '通过',
        'rejectAudit': '拒绝',
        'returnPass': '通过',
        'returnRefuse': '拒绝',

      }
    };
  },

  mounted() {
    this.orderNo = this.$route.params.orderNo;
    this.orderId = this.$route.params.orderId;
    this.getOrderDetails()
  },
  methods: {
    // 查看物流按钮
    logisticsButton() {
      this.$router.push({
        path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemLogistics",
        query: { id: "1" },
      });
    },
    // 确认收货按钮
    confirmReceiptButton() {
      this.$emit("confirmReceiptButton");
    },
    // 评价晒单按钮
    evaluateHandleButton() {
      this.$router.push({
        path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemEvaluate",
        query: { id: "1" },
      });
    },
    // 申请退货按钮
    returnGoodsButton() {
      this.$router.push({
        path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemReturnGoods",
        query: { id: "1" },
      });
    },
    getOrderDetails() {
      getOrderLsDetail({ id: this.orderId }).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.details = res.data;
          console.log(this.details);
          this.elStepsValue = 4;
          //在线支付
          //  tjTime             提交订单
          //  fkTime               支付时间
          //  ckTime          发货时间
          //  ddshTime      收货时间
          //  wcTime          完成时间
          if (this.details.tjTime) {
            this.elStepsValue = 1;
          }
          if (this.details.fkTime) {
            this.elStepsValue = 2;
          }
          if (this.details.ckTime) {
            this.elStepsValue = 3;
          }
          if (this.details.ddshTime) {
            this.elStepsValue = 4;
          }
          if (this.details.wcTime) {
            this.elStepsValue = 5;
          }
        } else {
          this.$message.warning("订单详情获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    operation(type, id) {
      this.orderId = id;
      this.dialogVisible = true;
      this.operateType = type;
      this.operateVal = type;
    },
    operationClose() {
      this.clearDialog()
      this.dialogVisible = false;
    },
    clearDialog() {
      this.orderId = '';
      this.reason = ''
      this.expressNumber = ''
      this.operateType = ''
      this.operateVal = ''
    },
    confirmOperate() {
      if ((this.operateVal == 'refuse' || this.operateVal == 'rejectAudit' || this.operateVal == 'returnRefuse') && this.reason.trim() == '') {
        return this.$message.error('请输入拒绝原因')
      }
      let func = null;
      console.log(this.operateVal, this.reason);
      switch (this.operateVal) {
        case 'response':
          func = acceptOrder({ id: this.orderId, rejectReason: this.reason });
          break;
        case 'refuse':
          func = rejectOrder({ id: this.orderId, rejectReason: this.reason });
          break;
        case 'audit':
          func = lsorderCancelAudit({ id: this.orderId, auditType: 1, auditRemark: this.reason });
          break;
        case 'rejectAudit':
          console.log({ id: this.orderId, auditType: 2, auditRemark: this.reason });
          func = lsorderCancelAudit({ id: this.orderId, auditType: 2, auditRemark: this.reason });
          break;
        case 'returnPass':
          func = lsorderReturnPass({ id: this.orderId, type: 1, rejectReason: this.reason });
          break;
        case 'returnRefuse':
          func = lsorderReturnPass({ id: this.orderId, type: 2, rejectReason: this.reason });
          break;

        default:
          break;
      }
      console.log(this.operateVal);
      func.then(res => {
        console.log(res);
        if (res.code == 200) {
          this.dialogVisible = false;
          this.$message.success(`已${this.message[this.operateVal]}`)
          this.clearDialog()
          this.getOrderList()
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    shipClose() {
      this.clearDialog()
      this.shipVisible = false;
    },
    confirmShip() {
      if (this.expressNumber.trim() == '') {
        return this.$message.error('请输入物流单号')
      }
      lsgoodsShipped({ id: this.orderId, expressNumber: this.expressNumber, expressCompany: this.expressCompany }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.clearDialog()
          this.shipVisible = false;
          this.$message.success("发货成功")
          this.getOrderList()
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    ship() {
      this.shipVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// 解决 el-col  无值不占位问题
.el-col {
  border: 1px solid transparent;
}


.contentBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;

  &::-webkit-scrollbar {
    width: 0px;
  }
}

// 分隔线
.fenge {
  width: 100%;
  height: 1px;
  background: #eeeeee;
}

.box1 {
  height: 240px;
  display: flex;
  align-items: center;

  .box1_item1 {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      font-size: 24px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #00c514;
      margin-bottom: 10px;
    }

    .box1_item1_button1 {
      width: 96px;
      height: 32px;
      display: flex;
      align-items: center;
      border-color: #156cc2;
      color: #156cc2;
    }

    .box1_item1_button2 {
      // width: 96px;
      height: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      border-color: #ff480e;
      background: #ff480e;
    }

    .box1_item1_button3 {
      width: 96px;
      height: 32px;
      display: flex;
      align-items: center;
      border-color: #999999;
      color: #999999;
    }

    .el-button+.el-button {
      margin-left: 0px;
      margin-top: 10px;
    }
  }

  ::v-deep.box1_item2 {
    width: 800px;
    margin-right: 64px;

    .el-steps {
      .el-step {
        .el-step__head.is-finish {
          color: #00c514;

          .el-step__line {
            background-color: #00c514;
            background: transparent;
            border-top: 5px dotted;

            .el-step__line-inner {
              border-width: 0 !important;
            }
          }
        }

        .el-step__head.is-process {
          .el-step__line {
            color: #c0c4cc !important;
          }

          .el-step__icon.is-icon {
            color: #c0c4cc !important;
          }
        }
      }

      .hong {
        .el-step__head.is-wait {
          .el-step__icon.is-icon {
            color: red !important;
          }
        }

        .el-step__main {
          color: red !important;
        }
      }
    }

    .el-step__line {
      background: transparent;
      border-top: 5px dotted;

      .el-step__line-inner {
        border-width: 0 !important;
      }
    }

    .box1_item2_span {
      width: 100px;
      font-size: 12px;
      color: #00023a;
      font-weight: 500;
    }

    .box1_item2_span_error {
      width: 100px;
      font-size: 12px;
      color: red;
      font-weight: 500;
    }
  }
}

.box2 {
  padding: 38px 30px 59px 30px;

  .box2_item1 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }

  .box2_item2 {
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #00023a;
  }
}

.box3 {
  padding: 10px 30px 0px 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #00023a;
}

.box4 {
  padding: 10px 30px 48px 30px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;


  .table-header {
    display: flex;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: #00023a;
    background: #e8f0f8;
  }

  .table-row {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #00023a;
    border: 1px solid #eee;

    .el-col {
      padding: 10px;

      &:not(:last-child) {
        border-right: 1px solid #eee;
      }
    }

    .table-image {
      width: 80px;
      height: 80px;
    }

    .goods-info {
      display: flex;
      justify-content: space-between;
      text-align: left;

    }

    .goods-count,
    .goods-amount,
    .goods-paytype,
    .goods-status {
      color: #999999;
      // cursor: pointer;
    }

    .border {
      width: 102px;
      margin: 0 auto;
      height: 1px;
      background: #999999;
    }
  }
}

.box5 {
  padding: 32px 30px 40px 30px;

  .box5_title {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
  }

  .box5_item1 {
    text-align: right;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #999999;
    margin-bottom: 10px;
  }

  .box5_item2 {
    text-align: right;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ff480e;
  }
}




.dialog-form {
  padding: 20px;

  p {
    padding: 20px 0;
  }
}
</style>
