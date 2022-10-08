<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div @click="getfhsyi" class="get-search">返回上一页</div>
            <h2>交易详情</h2>
       
            <div class="box">
                <div class="box1_item2">
            <el-steps :active="status">
            <el-step  i icon="el-icon-tickets">
                <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">待响应</div>
                <div class="box1_item2_span">{{datalist.orderTime}}
                  <!-- {{ derDetailData.order.orderTime }} -->
                </div>
              </div>
            </template>
            </el-step>
            <el-step  icon="el-icon-printer">
                <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">待发货</div>
                <div class="box1_item2_span">{{datalist.orderTime}}
                  <!-- {{ derDetailData.order.orderTime }} -->
                </div>
              </div>
            </template>
            </el-step>
            <el-step icon="el-icon-box">
                <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">待收货</div>
                <div class="box1_item2_span">{{datalist.deliveryTime}}
                  <!-- {{ derDetailData.order.orderTime }} -->
                </div>
              </div>
            </template>
            </el-step>
            <el-step  icon="el-icon-document-checked">
                <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">已收货</div>
                <div class="box1_item2_span">{{datalist.receiveGoodsTime}}
                  <!-- {{ derDetailData.order.orderTime }} -->
                </div>
              </div>
            </template>
            </el-step>
            </el-steps>
      </div>
            </div>
        </div>
         <div class="box-conten">
            <h4>订单信息 </h4>
            <div class="box-box">
            <div class="box-left">
                <div class="left-item">
                    <span class="inocs1">订单编号：</span>
                    <span class="inocs2">{{datalist.orderNo}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">订单状态：</span>
                    <span class="inocs2">{{ getst(datalist.status)}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">付款方式：</span>
                    <span class="inocs2">{{getfktype(datalist.fkType)}}</span>
                </div>
            </div>
            <div class="box-right">
                <div class="left-item">
                    <span class="inocs1">创建时间：</span>
                    <span class="inocs2">{{datalist.orderTime}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">订单类型：</span>
                    <span class="inocs2">{{getorder(datalist.orderType)}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">订单金额：</span>
                    <span class="inocs2">{{datalist.amount}}</span>
                </div>
            </div>
            </div>
         </div>
         <div class="box-conten">
            <h4>收货信息</h4>
            <div class="box-box box-item">
            <div class="box-left">
                <div class="left-item">
                    <span class="inocs1">收货人:</span>
                    <span class="inocs2">{{datalist.consignee}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">手机号：</span>
                    <span class="inocs2">{{ datalist.consigneePhone}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">收货地址：</span>
                    <span class="inocs2">{{datalist.consigneeAddress}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">快递单号：</span>
                    <span class="inocs2">{{datalist.expressNumber}}</span>
                </div>
            </div>
            <div class="box-right">
                <div class="left-item">
                    <span class="inocs1">配送方式：</span>
                    <span class="inocs2">{{ getdelive(datalist.deliveryMethod)}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">配送时间：</span>
                    <span class="inocs2">{{datalist.deliveryTime}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">收货时间：</span>
                    <span class="inocs2">{{datalist.receiveGoodsTime}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">付款期限：</span>
                    <span class="inocs2">{{datalist.settleTime}}</span>
                </div>
            </div>
            </div>
         </div>
         <div class="box-conten">
            <h4>发票信息</h4>
            <div class="box-box">
            <div class="box-left">
                <div class="left-item">
                    <span class="inocs1">开票时间:</span>
                    <span class="inocs2">{{datalist.invoiceTime}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">开票人</span>
                    <span class="inocs2">{{ datalist.invoiceBy}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">发票备注：</span>
                    <span class="inocs2">{{datalist.invoiceRemark}}</span>
                </div>
            </div>
            <div class="box-right">
                <div class="left-item">
                    <span class="inocs1">收票时间：</span>
                    <span class="inocs2">{{datalist.receiveInvoiceTime}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">收票人：</span>
                    <span class="inocs2">{{datalist.receiveInvoiceBy}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">收票备注：</span>
                    <span class="inocs2">{{datalist.receiveRemark}}</span>
                </div>
            </div>
            </div>
         </div>
         <div class="box-conten">
            <h4>付款信息</h4>
            <div class="box-box">
            <div class="box-left">
                <div class="left-item">
                    <span class="inocs1">付款类型：</span>
                    <span class="inocs2">{{getpay(datalist.payType)}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">支付金额：</span>
                    <span class="inocs2">{{ datalist.payAmount}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">支付时间：</span>
                    <span class="inocs2">{{datalist.payTime}}</span>
                </div>
            </div>
            <div class="box-right">
                <div class="left-item">
                    <span class="inocs1">支付备注：</span>
                    <span class="inocs2">{{datalist.payRemark}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">支付人：</span>
                    <span class="inocs2">{{datalist.payBy}}</span>
                </div>
                <div class="left-item">
                    <span class="inocs1">结算状态：</span>
                    <span class="inocs2">{{getSeet(datalist.settleStatus)}}</span>
                </div>
            </div>
            </div>
         </div>
            <cu-table
            :showHeight="false"
            :tableHeader="tableHeader"
            :tableData="DetailVoList"
            :showPagination="false"
            :showTitle="false"
            >
            <template slot="status" slot-scope="value">
                {{ statusTypeList[value.value.status] }}
            </template>
            </cu-table>
            <div class="box-bot">
                <div class="bot-left">总计:</div>
                <div class="bot-right">
                    <div class="bot-item">商品总计：{{datalist.amount}} 元</div>
                    <div class="bot-item">运费总计：{{datalist.transportFee}} 元</div>
                    <div class="bot-item">实付款：<span>{{datalist.amount}}</span> 元</div>
                </div>
            </div>
        
    </div>
</template>
<script>
import { tradeorderInfo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
    data(){
        return{
            id:null,
            datalist:[],
            DetailVoList:[],
            status:null,
            tableHeader: [
                {
          title: "商品id",
          key: "goodsId",
          align: "center",
        },
        {
          title: "药品医保编码",
          key: "goodsCode",
          align: "center",
        },
        {
          title: "医用耗材医保编码",
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
          title: "耗材材质",
          key: "material",
          width: "120",
          align: "center",
        },
        
        {
          title: "规格",
          key: "specification",
          width: "100",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          width: "100",
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
          width: "100",
          align: "center",
        },
        {
          title: "采购价(元)",
          key: "buyPrice",
          width: "120",
          align: "center",
        },
        {
          title: "小计",
          key: "subtotal",
          width: "100",
          align: "center",
        },
        // {
        //   title: "退货数量",
        //   key: "backQuantity",
        //   width: "120",
        //   align: "center",
        // },
        // {
        //   title: "退货小计",
        //   key: "backSubtotal",
        //   width: "120",
        //   align: "center",
        // },
      ],
        }
    },
    created(){
        
        console.log();
        this.id = this.$route.query.ids
        this.tradeorderInfo()
    },
    methods:{
        getfktype(value){
            if (value == 1) {
                return '在线支付'
            } else if(value == 2){
                return '货到付款'
            }
        },
        getorder(value){
            if (value == 1) {
                return '药品'
            } else{
                return '器械'
            }
        },
        getpay(value){
            if (value == 1) {
                return '余额'
            } else{
                return '信用卡'
            }
        },
        getSeet(value){
            if (value == 0) {
                return '未结算'
            } else{
                return '已结算'
            }
        },
        getdelive(value){
            if (value == 1) {
                return '阿克苏集散中心物流'
            } else{
                return '普通快递'
            }
        },
        getst(value){
            if (value == 1) {
                this.status= 1
                return '待响应'
            } else if(value == 2){
                this.status= 2
                return '待发货'
            }else if(value == 3){
                this.status= 3
                return '待收货'
            }else if(value == 4){
                this.status= 4
                return '已发货'
            } else{
                this.status= 1
                return '待响应'
            }
        },
        async tradeorderInfo(){
            this.datalist = []
            let param ={
                id :this.id
            }
            tradeorderInfo(param).then(res => {
                console.log(res);
                if (res.code ==200) {
                    this.datalist = res.data
                    console.log(this.datalist);
                    this.DetailVoList = this.datalist.goodsDetailVoList
                    console.log( this.DetailVoList);//表格
                }
            })
        },
        getfhsyi(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
    .box-bot{
        margin-top: 48px;
        padding-top: 20px;
        border-top: 1px solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        .bot-left{
            padding-left: 20px;
            width: 349px;
            height: 29px;
            font-size: 16px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #00023A;
            line-height: 19px
        }
        .bot-right{
            padding-right: 20px;
            .bot-item{
                line-height: 32px;
                font-size: 14px;
                font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                font-weight: 500;
                color: #999999;
                span{
                    font-size: 20px;
                    color: #FF480E;
                }
            }
        }
    }
    .operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
}
.box-conten{
    margin-top: 10px;
    
    border-bottom: 1px solid #EEEEEE;
    h4{
        padding: 0 20px;
        color: #00023A;
        font-size: 16px;
        font-family: Source Han Sans CN-Medium;
    }
   
    flex-direction: column;
    .box-box{
        padding: 0 20px;
        height: 106px;
        display: flex;
        width: 100%;
        .box-right,
    .box-left{
        width: 50%;
        height: 20px;
        .left-item{
            line-height: 30px;
            font-size: 16px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #00023A;
        }
    }
    }
    .box-item{
        height: 135px;
    }
}
.search-bar {
    // display: flex;
    // align-items: flex-end;
    margin: 20px 0 30px;
    font-size: 14px;
    // // overflow: auto;
    // position: relative;
    .get-search{
        position: fixed;
        left: 269px;
    top: 177px;

        width: 110px;
        height: 32px;
        background: #156CC2;
        border-radius: 2px 2px 2px 2px;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        line-height: 32px;
        color: #EEEEEE;
        text-align: center;
    }
    h2{
        width: 100%;
        height: 30px;
        text-align: center;
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #00023A;
        line-height: 23px;
    }
    .box{
        margin-top: 23px;
        padding: 20px 0;
    border-top:1px solid #EEEEEE ;
    border-bottom:1px solid #EEEEEE ;
    }
    }
    ::v-deep.box1_item2 {
        margin:0 auto;
  width: 1000px;
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
      .flex_fc_ac{
        align-items:flex-start;
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
.page-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 40px;

    &::-webkit-scrollbar {
        width: 0px;
    }
}
</style>