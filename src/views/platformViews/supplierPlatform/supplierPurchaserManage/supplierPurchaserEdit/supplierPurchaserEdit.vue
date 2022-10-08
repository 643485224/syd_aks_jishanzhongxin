<template>
    <div class="page-container table-page">
        <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
        <div class="header">
            <h2 class="header-title">分组详情</h2>
        </div>
        <div class="content">

            <div class="info">
                <div class="info-title">采购商分组</div>
                <div class="info-table">
                    <cu-table  :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                        :showPagination="false" :showHeight="false">
                        <template slot="auditStatus" slot-scope="value">
                            {{  auditStatusType[value.value.auditStatus]  }}
                        </template>
                    </cu-table>
                </div>
            </div>
            <div class="info">

                <div class="info-title flex_ac_jb"><span>采购商列表</span> <el-button class="btn_ff480e" type="primary" >新增</el-button></div>
                <div class="info-table">
                    <cu-table  :showTitle="false" :tableHeader="tableHeader2" :tableData="tableData2"
                        :showPagination="false" :showHeight="false">
                        <template slot="auditStatus" slot-scope="value">
                            {{  auditStatusType[value.value.auditStatus]  }}
                        </template>
                        <template slot="operation" slot-scope="value">
                            <el-button type="text" @click="toDetails(value.value.buyerId)">详情</el-button>
                            <el-button  class="c_ff480e" type="text" >删除</el-button>
                        </template>
                    </cu-table>
                </div>
            </div>
        </div>
        <cu-dialog :title="'拒绝订单'" width="50vw" :visible="refuseVisible" :showClose="true" @handleClose="refuseClose"
            @handleOk="confirmRefuse">
            <div class="dialog-form">
                <p>请填写拒绝原因:</p>
                <el-input class="selectInput" type="textarea" :rows="6" v-model="rejectReason" placeholder="请输入拒绝原因">
                </el-input>
            </div>
            <template #footer>
            </template>
        </cu-dialog>

        <cu-dialog :title="'订单取消审核'" width="50vw" :visible="auditVisible" :showClose="true" @handleClose="auditClose"
            @handleOk="confirmRefuseAudit">
            <div class="dialog-form">
                <p>请填写拒绝原因:</p>
                <el-input class="selectInput" type="textarea" :rows="6" v-model="auditRemark" placeholder="请输入拒绝原因">
                </el-input>
            </div>
            <template #footer>
            </template>
        </cu-dialog>
    </div>
</template>
<script>
import { getBuyerGroupInfo } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
    data() {
        return {
            details: {},
            id: '',
            tableHeight: 130,
            tableHeader: [
                {
                    title: "序号",
                    key: "goodsCode",
                },
                {
                    title: "分组名称",
                    key: "commonName",
                },
                {
                    title: "采购商数量",
                    key: "jx",
                },
                {
                    title: "状态",
                    key: "specification",
                },
                {
                    title: "操作人",
                    key: "unit",
                },
                {
                    title: "创建时间",
                    key: "manufacturer",
                },
                {
                    title: "操作",
                    slot: "operation",
                },

            ],
            tableHeader2: [
                {
                    title: "采购商编号",
                    key: "buyerId",
                },
                {
                    title: "采购商名称",
                    key: "buyerName",
                },
                {
                    title: "企业联系人",
                    key: "jx",
                },
                {
                    title: "手机号",
                    key: "specification",
                },
                {
                    title: "商品种类",
                    key: "unt",
                },
                {
                    title: "商品数量",
                    key: "manufacturer",
                },
                {
                    title: "状态",
                    key: "uit",
                },
                {
                    title: "采购商类型",
                    key: "manuturer",
                },
                {
                    title: "创建时间",
                    key: "unit",
                },

                {
                    title: "操作",
                    slot: "operation",
                },

            ],
            tableData: [],
            tableData2: [],
            auditStatusType: {
                1: '待审核',
                2: '审核通过',
                3: '审核不通过',
            },
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
            payType: {
                1: '在线支付',
                2: '货到付款'
            },
            consigType: {
                1: '阿克苏集散中心物流',
                2: '普通快递'
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
        this.id = this.$route.params.id;
        this.getBuyerGroupDetails()
    },
    methods: {
        getBuyerGroupDetails() {
            getBuyerGroupInfo({ id: this.id }).then(res => {
                if (res.code == 200) {
                    this.details = res.data;
                    this.tableData = [];
                    this.tableData2 = res.data.buyerList;
                console.log(this.details);

                } else {
                    this.$message.warning("订单详情获取失败")

                }
            }).catch((err) => {
                console.log(err);
            });
        },
        responseOrder() {
            this.$confirm('是否响应该订单? ', '响应订单', {
                confirmButtonText: '响应',
                cancelButtonText: '拒绝',
                distinguishCancelAndClose: true,
                type: 'warning',
            }).then(() => {
                acceptOrder({ id: this.orderId }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("已响应该订单")
                        this.getOrderDetails()
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
                if (err == 'cancel') {
                    this.refuseVisible = true;
                }
            })

        },
        refuseClose() {
            this.clearDialog()
            this.refuseVisible = false;
        },
        clearDialog() {
            this.rejectReason = ''
            this.expressNumber = ''
        },
        confirmRefuse() {
            if (this.rejectReason.trim() == '') {
                return this.$message.error('请输入拒绝原因')
            }
            console.log(this.details);
            console.log({ id: this.orderId, rejectReason: this.rejectReason });
            rejectOrder({ id: this.orderId, rejectReason: this.rejectReason }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.clearDialog()
                    this.refuseVisible = false;
                    this.$message.success("已拒绝该订单")
                    this.getOrderDetails()
                }
            }).catch((err) => {
                console.log(err);
            });
        },

        ship() {
            if (this.expressNumber.trim() == '') {
                return this.$message.error('请输入发货物流号')
            }
            goodsShipped({ orderNo: this.orderNo, expressNumber: this.expressNumber }).then(res => {
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
        audit() {
            this.$confirm('确认审核通过? ', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '拒绝',
                type: 'warning',
                distinguishCancelAndClose: true,
            }).then(() => {
                returnPass({ id: this.orderId, auditType: 2, auditRemark: '' }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("操作成功")
                        this.getOrderDetails()
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
                if (err == 'cancel') {
                    this.auditVisible = true;
                }
            });

        },
        auditClose() {
            this.clearDialog()
            this.auditVisible = false;
        },
        confirmRefuseAudit() {
            if (this.auditRemark.trim() == '') {
                return this.$message.error('请输入拒绝原因')
            }
            orderCancelAudit({ id: this.orderId, auditRemark: this.auditRemark, auditType: 2 }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.clearDialog()
                    this.auditVisible = false;
                    this.$message.success("拒绝成功")
                    this.getOrderDetails()
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        toDetails(id){
            this.$router.push({name:'supplierPurchaserInfo',params:{id}})
        },
        back() {
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss" src="./supplierPurchaserEdit.scss" scoped>
</style>
