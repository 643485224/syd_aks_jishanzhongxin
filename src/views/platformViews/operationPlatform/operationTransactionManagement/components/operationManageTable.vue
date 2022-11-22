<template>
    <div>
        <div class="search-bar">
            <div class="search-item">
                订单编号：
                <el-input class="selectInput" v-model="orderNum" placeholder="请输入订单编号">
                </el-input>
            </div>
            <div class="search-item">
                交易时间：
                <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
                <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button class="search-btn" type="primary" @click="search">查询</el-button>
        </div>
        <cu-table class="sale-table" :loading="tableLoading" :height="height" :showTitle="false"
            :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange" :total="orderTotal">
            <template slot="status" slot-scope="value">
                {{ statusType[value.value.status] }}
            </template>
            <template slot="fkType" slot-scope="value">
                {{ payType[value.value.fkType] }}
            </template>
            <template slot="orderTime" slot-scope="value">
                {{ value.value.orderTime ? new Date(value.value.orderTime).Format("yyyy-MM-dd") : "" }}
            </template>
            <template slot="operate" slot-scope="value">
                <el-button type="text" @click="showDetails(value.value.id)">详情</el-button>
            </template>
        </cu-table>
        <cu-dialog
      title="交易详情"
      width="70vw"
      :visible="editAddDrugVisible"
      :showClose="true"
      @handleClose="handleCloseDrug"
      @handleOk="handleCloseDrug"
    >
    <div class="hand_list">
        <div class="hand-left">
            <div class="hand-title">
                <span class="ionse1">订单编号：</span> <span class="ionse2">{{editdat.orderNo}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">采购商名称：</span> <span class="ionse2">{{editdat.buyerName}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">关联合同编号：</span> <span class="ionse2">{{editdat.contractNo}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">商品种类：</span> <span class="ionse2">{{editdat.goodsCategoryCount}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">商品数量：</span> <span class="ionse2">{{editdat.goodsCount}}</span>
            </div>
        </div>
        <div class="hand-right">
            <div class="hand-title">
                <span class="ionse1">供应商名称：</span> <span class="ionse2">{{editdat.supplierName}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">订单状态：</span> <span class="ionse2">{{ statusType[editdat.status] }}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">支付方式：</span> <span class="ionse2">{{ payType[editdat.fkType] }}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">交易时间：</span> <span class="ionse2">{{editdat.orderTime}}</span>
            </div>
            <div class="hand-title">
                <span class="ionse1">订单金额：</span> <span class="ionse2">{{editdat.amount}}</span>
            </div>
        </div>
    </div>
    </cu-dialog>
    </div>
</template>
<script>
import { tradeOrderList } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import dayjs from 'dayjs';
export default {
    props: {
        status: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            statusType: {
                1: '待响应',
                2: '待发货',
                3: '待收货',
                4: '已收货',
                5: '待付款',
                6: '待评价',
                7: '已取消',
                8: '已拒绝'
            },
            payType: {
                1: '在线支付',
                2: '货到付款'
            },
            tableHeader: [
                {
                    title: "订单编号",
                    key: "orderNo",
                },
                {
                    title: "采购商名称",
                    key: "buyerName",
                },
                {
                    title: "关联合同编号",
                    key: "contractNo",
                },
                {
                    title: "商品种类",
                    key: "goodsCategoryCount",
                },
                {
                    title: "商品数量",
                    key: "goodsCount",
                },
                {
                    title: "供应商名称",
                    key: "supplierName",
                },
                {
                    title: "订单状态",
                    slot: "status",//  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
                },
                {
                    title: "支付方式",
                    slot: "fkType",//  1 在线支付  2 货到付款
                },
                {
                    title: "交易时间",
                    slot: "orderTime",
                },
                {
                    title: "订单金额",
                    key: "amount",
                },
                {
                    title: "操作",
                    slot: "operate",
                    fixed: "right"
                },
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderNum: '',
            date: [],
            row: 10,
            tableLoading: false,
            editAddDrugVisible: false,
            editdat:{}
        }
    },
    created() {
        this.getOrderList()
    },
    mounted() {

    },
    computed: {
    },
    methods: {
        handleCloseDrug(){
            this.editAddDrugVisible = false
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getOrderList()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getOrderList()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getOrderList()
        },
        async getOrderList() {
            this.tableLoading = true;
            // if (this.date.length) {
            //     this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
            //     this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            // }
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                orderNo: this.orderNum,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
                status: this.status,
            }
            console.log(params);
            this.tableData = []
            tradeOrderList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.orderTotal = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        showDetails(id) {
            // console.log(id);
            // this.editdat = {}
            // this.editdat = id
            // console.log();
            // his.$router.push("")
            this.$router.push("/main/operationManage/operationDetailsManagement?ids="+ id)
            // this.$message.info("点击详情按钮")
            // this.editAddDrugVisible = true
        }
    }
}
</script>
<style lang="scss" scoped>
.search-bar {
    display: flex;
    align-items: center;
    margin: 20px 0 30px;
    font-size: 14px;
    .search-item {
        margin-right: 18px;

        .el-input {
            width: 230px;

            ::v-deep .el-input__inner {
                height: 31px;
            }
        }

        ::v-deep .el-range-editor.el-input__inner {
            width: 250px;
            height: 31px !important;
        }

        ::v-deep .el-input__icon {
            line-height: 1;
        }
    }

    .search-btn {
        height: 32px;
        background: #FF480E;
        border: none;
        border-radius: 4px 4px 4px 4px;

    }
}
.hand_list{
    padding: 40px 0 60px 0;
    width: 100%;
    display: flex;
    justify-content:center;
    .hand-right,
    .hand-left{
        width: 35%;
        .hand-title{
            line-height: 32px;
            display: flex;
            span{
                font-size: 14px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                line-height: 32px;
            }
            .ionse1{
                width: 120px;
                text-align: right;
                color: #999999;
            }
            .ionse2{
                color: #00023A;
            }
        }
    }
}
.sale-table {
    // width: 100%;
    font-weight: 500;
}
</style>
