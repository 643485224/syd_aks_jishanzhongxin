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
                <el-button type="text" class="orange" @click="operation('returnPass',value.value.id)"
                    v-if="value.value.status == 11">退货</el-button>
                <el-button type="text" class="orange" @click="operation('response',value.value.id)"
                    v-if="value.value.status == 1">响应</el-button>
                <el-button type="text" class="orange" @click="ship(value.value.orderNo)" v-if="value.value.status == 2">
                    发货</el-button>
                <el-button type="text" class="orange" @click="operation('audit',value.value.id)"
                    v-if="value.value.status == 10">审核
                </el-button>
                <el-button type="text" @click="showDetails(value.value.id,value.value.orderNo)">详情</el-button>
            </template>
        </cu-table>
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
        <cu-dialog :title="'发货'" width="50vw" :visible="shipVisible" :showClose="true" @handleClose="shipClose"
            @handleOk="confirmShip">
            <div class="dialog-form">
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
import { tradeOrderList, acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
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
                8: '已拒绝',
                10: '待取消',
                11: '待退货',
                12: '已退货',
            },
            payType: {
                1: '在线支付',
                2: '货到付款'
            },
            tableHeader: [
                {
                    title: "订单编号",
                    key: "orderNo",
                    width: 160,
                },
                {
                    title: "关联合同编号",
                    key: "contractNo",
                    width: 120,
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
                    title: "采购商名称",
                    key: "buyerName",
                    width: 120,
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
                    width: 120,
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
            orderTotal: 0,
            orderNum: '',
            date: [],
            tableLoading: false,
            shipVisible: false,
            orderId: '',// 当前操作订单 id
            expressNumber: '',
            orderNo: '',
            dialogVisible: false,
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

    },
    mounted() {
        this.getOrderList()
    },
    computed: {

    },
    methods: {

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
            if (this.date.length) {
                this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
                this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            }
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                orderNo: this.orderNum,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
                status: this.status
            }
            console.log(params);
            this.tableData = []
            tradeOrderList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data.records;
                    this.orderTotal = data.total;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        showDetails(orderId, orderNo) {
            console.log(orderNo);
            // this.$router.push(`/supplierRetailOrderList/supplierTransactionOrderDetails/${orderId}/${orderNo}`)
            this.$router.push({ name: 'supplierTransactionOrderDetails', params: { orderId, orderNo } })

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
            if ((this.operateVal == 'refuse' || this.operateVal == 'rejectAudit'  || this.operateVal == 'returnRefuse') && this.reason.trim() == '') {
                return this.$message.error('请输入拒绝原因')
            }
            let func = null;
            console.log(this.operateVal,this.reason);
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
                    func = returnPass({ id: this.orderId,type:1, rejectReason: this.reason });
                    break;
                case 'returnRefuse':
                    func = returnPass({ id: this.orderId ,type:2 , rejectReason: this.reason});
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
            goodsShipped({ orderNo: this.orderNo, expressNumber: this.expressNumber,type:1 }).then(res => {
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

        ship(orderNo) {
            this.orderNo = orderNo;
            this.shipVisible = true;
        },


    }
}
</script>
<style lang="scss" scoped>
.orange {
    // margin-left: 10px;
    color: #ff480e;
}

.search-bar {
    display: flex;
    flex-wrap: wrap;
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

.sale-table {
    // width: 100%;
    font-weight: 500;
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
