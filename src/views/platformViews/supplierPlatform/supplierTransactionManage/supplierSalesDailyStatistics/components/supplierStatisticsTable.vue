<template>
    <div>
        <div class="search-bar">
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
            <template slot="statDate" slot-scope="value">
                {{ value.value.statDate ? new Date(value.value.statDate).Format("yyyy-MM-dd") : "" }}
            </template>
        </cu-table>

    </div>
</template>
<script>
import { getSalesDailyStatistics, acceptOrder, rejectOrder, goodsShipped, orderCancelAudit, returnPass } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
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
            tableHeader: [
                {
                    title: "日期",
                    slot: "statDate",
                },
                {
                    title: "销售金额",
                    key: "saleAmount",
                },

                {
                    title: "商品销售种类",
                    key: "saleCategoryCount",
                },
                {
                    title: "商品销售数量",
                    key: "saleCount",

                },
                {
                    title: "销售笔数",
                    key: "orderCount",
                },
                {
                    title: "采购商数量",
                    key: "buyerCount",
                },
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 0,
            date: [],
            tableLoading: false,
        }
    },
    created() {

    },
    mounted() {
        this.getSalesList()
    },
    computed: {

    },
    methods: {

        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getSalesList()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getSalesList()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getSalesList()
        },
        async getSalesList() {
            this.tableLoading = true;
            if (this.date.length) {
                this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
                this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            }
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                // orderNo: this.orderNum,
                beginMonth: this.date && this.date[0],
                endMonth: this.date && this.date[1],
                days: this.status,
            }
            console.log(params);
            this.tableData = []
            getSalesDailyStatistics(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data;
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

</style>
