<template>
    <div class="page-container table-page">
        <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
        <div class="header">
            <h2 class="header-title">发票详情</h2>
        </div>
        <div class="content">
            <div class="info">
                <el-steps :active="activeType[details.fpStatus]" align-center process-status="wait" finish-status="success">
                    <el-step>
                        <template slot="description">
                            <div class="box1_item2_span mt_10">开票</div>
                        </template>
                    </el-step>
                    <el-step :status="details.fpStatus == 6?'error':''">
                        <template slot="description">
                            <div class="box1_item2_span mt_10">{{details.fpStatus == 6?"拒绝收票":"收票"}}</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template slot="description">
                            <div class="box1_item2_span mt_10">付款</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template slot="description">
                            <div class="box1_item2_span mt_10">结算</div>
                        </template>
                    </el-step>
                    <el-step>
                        <template slot="description">
                            <div class="box1_item2_span mt_10">完成</div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
            <div class="info">
                <div class="info-title">发票信息</div>
                <div class="info-table">
                    <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                        :showPagination="false" :showHeight="false">
                        <template slot="fpStatus" slot-scope="value">
                            {{ fpStatusType[value.value.fpStatus] }}
                        </template>
                        <template slot="invoiceType" slot-scope="value">
                            {{ value.value.invoiceType }}
                        </template>
                    </cu-table>
                </div>
            </div>
            <div class="info">
                <div class="info-title">商品信息</div>
                <div class="info-table">
                    <cu-table :showTitle="false" :tableHeader="tableHeader2" :tableData="tableData2"
                        :showPagination="false" :showHeight="false">
                        <template slot="amount" slot-scope="value">
                            {{ getAmount(value.value.quantity,value.value.price )}}
                        </template>

                    </cu-table>
                </div>
            </div>
            <div class="info">
                <div class="info-title">日志</div>
                <div class="info-content">
                    <div class="info-item ">
                        <span>【确认收票】: &nbsp;{{ details.consignee }}</span>
                        <span>操作人: &nbsp;{{ details.receiveInvoiceBy }}</span>
                        <span> &nbsp;{{ details.receiveInvoiceTime }}</span>
                    </div>
                    <div class="info-item ">
                        <span>【创建发票】: &nbsp;{{ details.consignee }}</span>
                        <span>操作人: &nbsp;{{ details.invoiceBy }}</span>
                        <span> &nbsp;{{ details.invoiceTime }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getBillDetail } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
    data() {
        return {
            details: {},
            orderNo: '',
            orderId: '',
            tableHeight: 130,
            tableHeader: [
                {
                    title: "发票代码",
                    key: "invoiceCode",
                },
                {
                    title: "发票号码",
                    key: "invoiceNo",
                },
                {
                    title: "关联合同编号",
                    key: "contractNo",
                    width: 160,

                },
                {
                    title: "关联订单编号",
                    key: "orderNo",
                    width: 160,
                },
                {
                    title: "开票时间",
                    key: "invoiceTime",
                },
                {
                    title: "收票时间",
                    key: "receiveInvoiceTime",
                },
                {
                    title: "收票用户",
                    key: "receiveInvoiceBy",
                },
                {
                    title: "发票金额",
                    key: "invoiceAmount",
                },
                {
                    title: "发票状态",
                    slot: "fpStatus",
                },
                {
                    title: "发票类型",
                    slot: "invoiceType",// 发票类型 @ 1  纸质发票  2  电子发票
                },
            ],
            tableHeader2: [
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
                    slot: "amount",
                },
            ],
            tableData: [],
            tableData2: [],
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
            invoiceTypes: {
                1: '纸质发票',
                2: '电子发票'
            },
            fpStatusType: {// 发票状态@ 1  待开票  2  待收票  3 待付款（已收票）  4  结算    5  完成  6 拒绝收票
                1: '待开票',
                2: '待收票',
                3: '待付款（已收票）',
                4: '完成收款',
                5: '拒绝收票',

            },
            activeType: {// 进度条激活状态  0  开票   创建：2收票 /6 拒绝收票   响应：3 支付   确认收货： 4 结算    支付成功: 5  完成
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 2,
            },
            expressNumber: '',
            refuseVisible: false,
            shipVisible: false,
            rejectReason: '',
            auditVisible: false,
            auditRemark: ''
        }
    },
    created() {
        this.orderNo = this.$route.params.orderNo;
        this.orderId = this.$route.params.orderId;
        this.getBillDetail()
        console.log(this.orderNo);
    },
    methods: {
        getBillDetail() {
            getBillDetail({ orderId: this.orderId }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.details = res.data;
                    this.tableData2 = res.data.list;
                    console.log(this.details);
                    this.tableData = [res.data];

                } else {
                    this.$message.warning("发票详情获取失败")

                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getAmount(unit,price){
          price = price.toString()
          // let bit = 0;
          // unit = unit.toString()
          // price = price.toString()
          // if(price.indexOf('.') != -1){
          //   bit = price.length - price.indexOf('.') - 1;
          //   price = price*bit
          //   console.log(bit);
          // }
          // console.log(bit);
          // return bit?(unit*price/bit).toFixed(2):(unit*price).toFixed(2)
          return price.indexOf('.') == -1?(unit*price):(unit*price).toFixed(2)
        },

        back() {
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss" src="./supplierInvoicedDetail.scss" scoped>

</style>
