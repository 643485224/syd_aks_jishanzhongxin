<template>
    <div class="page-container table-page" ref="contentBox">
        <div class="search-bar">
            <el-button class="operation-btn bgGreen" type="primary" @click="editTpl(null)">+新增运费模板</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <div class="tpl-list">
                <div class="tpl-item" v-for="item in tableData">
                    <div class="tpl-item-left">
                        <div class="title">{{item.templateName}}</div>
                        <div class="desc">发货地区：{{item.sendAreaName}}</div>
                    </div>
                    <div class="tpl-item-right">
                        <el-button class="del-btn" @click="del(item.id)">删除</el-button>
                        <el-button class="operation-btn edit-btn" type="primary" @click="editTpl(item.id)">修改
                        </el-button>

                    </div>
                </div>
            </div>
        </cu-animation>
    </div>
</template>
<script>

import { getSupplierFreightTemplate, deleteSupplierFreightTemplate } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from 'dayjs';
export default {

    data() {
        return {
            statusType: {
                1: "未出库",
                2: "已出库",
                3: "已签收"
            },
            logisticsTypes: {
                1: "出发",
                2: "途径",
                3: "到达",
            },
            tableHeader: [
                {
                    title: "订单编号",
                    key: "orderNo",
                    width: 160,
                },
                {
                    title: "供应商名称",
                    key: "supplierName",
                },
                {
                    title: "物流单号",
                    key: "logisticsNo",
                },
                {
                    title: "采购商名称",
                    key: "buyerName",
                },
                {
                    title: "收货人姓名",
                    key: "consigneeName",
                },
                {
                    title: "物流量",
                    key: "goodsCount",
                },
                {
                    title: "下单时间",
                    slot: "orderTime",
                    width: 120,

                },
                {
                    title: "目的地",
                    key: "destination",
                },
                {
                    title: "状态",
                    slot: "status", //  1  未出库  2  已出库  3  已签收 
                },
                {
                    title: "车辆",
                    key: "lpn",
                },
                {
                    title: "司机",
                    key: "driverName",
                },
                {
                    title: "操作",
                    slot: "operate",
                },
            ],
            tableData: [],
            tableHeight: 0,
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderNum: "",
            date: [],
            logisticsNo: null,
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            logisticsData: {
                courier: "",
                courierPhone: "",
                logisticsHistoryList: [
                    {
                        address: "",
                        id: "",
                        logisticsId: "",
                        type: "",
                        lng: "",
                        lat: "",
                        createdTime: "" // 流转时间
                    }
                ],
                logisticsNo: "" // 物流单号
            },
            mapPathData: []
        };
    },
    created() {
        this.getTplList();
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
    computed: {

    },
    methods: {
        handleHeight() {
            this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
        },
        dragMap() {
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getTplList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getTplList();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getTplList();
        },
        async getTplList() {
            this.tableLoading = true;
            if (this.date.length) {
                this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
                this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            }
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                orderNo: this.orderNum,
                beginMonth: this.date && this.date[0],
                endMonth: this.date && this.date[1],
                expressNumber: this.logisticsNo,
            };
            console.log(params);
            this.tableData = [];
            getSupplierFreightTemplate().then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data;
                    // this.pageNum = data.current;
                    // this.pageSize = data.size;
                    // this.orderTotal = data.total;
                    // this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        editTpl(id) {
            console.log(id);
            if (id) {
                return this.$router.push(`./supplierLogisticsAddTpl/${id}`)

            }
            this.$router.push(`./supplierLogisticsAddTpl`)
        },
        del(id) {
            this.$confirm(`确认删除该模板? `, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteSupplierFreightTemplate(id).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        let data = res.data;
                        this.tableData = data;
                        // this.pageNum = data.current;
                        // this.pageSize = data.size;
                        // this.orderTotal = data.total;
                        // this.pageCount = data.pages;
                        this.tableLoading = false;
                        this.getTplList()
                        console.log(this.tableData);
                    }
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });



        },
        handleClose() {
            this.dialogVisible = false;
        },

    },
}
</script>
<style lang="scss" scoped>
// 按钮背景色
.bgOrange {
    background: #ff480e;
}

.bgGreen {
    background: #00c514;
}

.bgBlue {
    background: #156cc2;
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


.search-bar {
    display: flex;
    align-items: flex-end;
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

        .operation-btn {
            height: 32px;
            border: none;
            border-radius: 4px 4px 4px 4px;
        }
    }



    .search-btn {
        background: #FF480E;

    }


}

.tpl-list {
    padding: 10px;

    width: 100%;

    .tpl-item {
        display: flex;
        align-items: center;
        margin: 40px 0;
        width: 60%;

        &-left {
            flex: 1;
            margin-right: 200px;

            .title {
                height: 24px;
                margin: 10px 0;
                font-size: 16px;
                font-weight: 600;
                color: #00023A;
            }

            .desc {
                height: 23px;
                font-size: 14px;
                color: #999999;
            }
        }

        &-right {
            .del-btn {
                width: 120px;
                height: 27px;
                border-radius: 4px 4px 4px 4px;
                opacity: 1;
            }

            .edit-btn {
                width: 120px;
                height: 27px;
                background: #156CC2;
                border-radius: 4px 4px 4px 4px;
                opacity: 1;
            }
        }
    }
}
</style>
