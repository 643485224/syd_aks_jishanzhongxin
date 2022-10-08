<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="header">
      <h2 class="header-title">订单详情</h2>
    </div>
    <div class="content">
      <div class="info ">
        <div class="info-content flex_ac_jb">
          <div class="flex_1">
            <div class="status-text flex_ac">

              <p class="order-status">{{ orderStatusTypes[details.status] }}</p>
              <div class="info-item" v-if="details.status == (2 || 3 || 4 || 6)">
                发货物流号: &nbsp;
                <el-input class="logistics-input" v-if="details.status == 2" v-model="expressNumber" placeholder="">
                </el-input>
                <span v-else>{{ details.expressNumber }}</span>

              </div>
            </div>
            <el-button class="apply-btn" type="primary" plain size="mini" @click="ship(2)" v-if="details.status == 2">
              申请平台物流配送
            </el-button>
          </div>

          <el-button class="operate-btn" type="primary" plain size="mini" @click="ship(1)" v-if="details.status == 2">
            确认发货</el-button>
          <el-button class="operate-btn" type="primary" plain size="mini" @click="operation('response')"
            v-if="details.status == 1">响应订单</el-button>
          <el-button class="operate-btn" type="primary" plain size="mini" @click="operation('audit')"
            v-if="details.status == 10">审核</el-button>
          <el-button class="operate-btn" type="primary" plain size="mini" @click="operation('returnPass')"
            v-if="details.status == 11">待退货</el-button>
        </div>

      </div>
      <div class="info ">
        <div class="info-title">订单信息</div>
        <div class="info-content">
          <div class="info-item">
            订单编号: &nbsp;{{ details.orderNo }}
          </div>
          <div class="info-item">
            创建时间: &nbsp;{{ details.orderTime }}
          </div>
          <div class="info-item">
            订单状态: &nbsp;{{ orderStatusTypes[details.status] }}
          </div>
          <div class="info-item">
            订单类型: &nbsp;{{ orderTypes[details.orderType] }}
          </div>
        </div>
      </div>
      <div class="info">
        <div class="info-title">收货信息</div>
        <div class="info-content">
          <div class="info-item">
            收货人: &nbsp;{{ details.consignee }}
          </div>
          <div class="info-item">
            配送方式: &nbsp;{{ consigType[details.deliveryMethod] }}
          </div>
          <div class="info-item">
            手机号: &nbsp;{{ details.consigneePhone }}
          </div>
          <div class="info-item">
            配送时间: &nbsp;{{ details.deliveryTime }}
          </div>
          <div class="info-item">
            收货地址: &nbsp;{{ details.consigneeAddress }}
          </div>
          <div class="info-item">
            收货时间: &nbsp;{{ details.receiveGoodsTime }}
          </div>

        </div>
      </div>
      <div class="info">
        <div class="info-title">商品信息</div>
        <div class="info-table">
          <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="tableData" :showPagination="false"
            :showHeight="false">
            <template slot="auditStatus" slot-scope="value">
              {{ auditStatusType[value.value.auditStatus] }}
            </template>
          </cu-table>
        </div>
      </div>
      <div class="info flex_jb">
        <div class="info-title">总计:</div>
        <div class="prices ">
          <p class="goodsSum">商品总计:&nbsp;{{ details.amount }}&nbsp;元</p>
          <p class="goodsSum">运费合计:&nbsp;{{ details.transportFee }}&nbsp;元</p>
          <p class="goodsSum" v-if="details.payAmount">实付款:&nbsp;<span class="sum-price">{{ details.payAmount }}</span>&nbsp;元</p>
        </div>
      </div>
    </div>
    <cu-dialog :title="operateTitle[operateType]" width="50vw" :visible="dialogVisible" :showClose="true"
      @handleClose="operationClose" @handleOk="confirmOperate">
      <div class="dialog-form">
        <div class="select">
          操作：<el-radio-group v-if=" operateType =='response'" v-model="operateVal">
            <el-radio label="response">确定</el-radio>
            <el-radio label="refuse">拒绝</el-radio>
          </el-radio-group>
          <el-radio-group v-else-if="operateType =='audit'" v-model="operateVal">
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
  </div>
</template>
<script>
import { orderInfo } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import * as httpDataTypes from "@/utils/httpDataTypes.js";
import { acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  data() {
    return {
      ...httpDataTypes,
      // orderStatusTypes,
      // orderTypes,
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
      expressNumber: '',
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
    }
  },
  created() {
    this.orderNo = this.$route.params.orderNo;
    this.orderId = this.$route.params.orderId;
    this.getOrderDetails()
  },
  methods: {
    getOrderDetails() {
      orderInfo({ orderNo: this.orderNo }).then(res => {
        if (res.code == 200) {
          this.details = res.data;
          console.log(this.details);
          this.tableData = res.data.list;

        } else {
          this.$message.warning("订单详情获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    operation(type) {
      this.dialogVisible = true;
      this.operateType = type;
      this.operateVal = type;
    },

    operationClose() {
      this.clearDialog()
      this.dialogVisible = false;
    },
    clearDialog() {
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
          func = orderCancelAudit({ id: this.orderId, auditType: 1, auditRemark: this.reason });
          break;
        case 'rejectAudit':
          console.log({ id: this.orderId, auditType: 2, auditRemark: this.reason });
          func = orderCancelAudit({ id: this.orderId, auditType: 2, auditRemark: this.reason });
          break;
        case 'returnPass':
          func = returnPass({ id: this.orderId, type: 1, rejectReason: this.reason });
          break;
        case 'returnRefuse':
          func = returnPass({ id: this.orderId, type: 2, rejectReason: this.reason });
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
          this.getOrderDetails()
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    ship(type) {// type 1 普通  type 2 运营平台
      if (this.expressNumber.trim() == '') {
        return this.$message.error('请输入发货物流号')
      }
      goodsShipped({ orderNo: this.orderNo, expressNumber: this.expressNumber, type }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.clearDialog()
          this.$message.success("发货成功")
          this.getOrderDetails()
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    back() {
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
  padding: 0 20px 20px;
  overflow: auto;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;

  .back-btn {
    position: absolute;
    margin-top: 20px;
    z-index: 999;
    // width: 110px;
    height: 32px;
    background: #156CC2;
    border: none;
    outline: none;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 0px;
}

.header {
  position: relative;
  height: 76px;
  line-height: 76px;
  // border-bottom: 1px solid #EEEEEE;

  &-title {
    text-align: center;
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023A;
    text-align: center;
  }


}



.info {
  padding: 18px 5px;
  // padding-bottom: 10px 5px;
  border-top: 1px solid #eee;

  &-title {
    padding: 6px 0;
    font-size: 16px;
    font-weight: 500;
    font-weight: 600;
    color: #00023a;
  }


  &-content {
    display: flex;
    flex-wrap: wrap;





    .sum-price {
      font-size: 20px;
      color: #FF480E;
    }


  }

  &-item {
    width: 50%;
    padding: 6px 0;
    font-size: 14px;
    color: #999999;
  }

  &-table {
    padding: 10px 0 30px;
  }

  .order-status {
    padding: 10px 80px 20px 0;
    font-size: 24px;
    font-weight: bold;
    color: #00C514;
    white-space: nowrap;
  }

  .prices {
    padding: 6px 0;
    font-size: 14px;
    color: #999999;
  }

  .apply-btn {
    height: 32px;
    margin-left: 0;
    color: #fff;
    border: none;
    border-radius: 2px;
    background-color: #FF480E;

    &-hover,
    &-active {
      opacity: .9;
    }
  }

  .operate-btn {
    height: 32px;
    border-radius: 2px;

    // background-color: #FFFFFF;
    &-hover,
    &-active {
      opacity: .9;

    }
  }

  .logistics-input {
    display: inline-block;
    width: 200px;
  }
}





.dialog-form {
  padding: 20px;

  p {
    padding: 20px 0;
  }
}



.operate-reason {
  display: flex;
  margin-top: 10px;

  .label {
    margin-right: 10px;
    white-space: nowrap;

  }

  .red {
    color: red;
  }
}
</style>
