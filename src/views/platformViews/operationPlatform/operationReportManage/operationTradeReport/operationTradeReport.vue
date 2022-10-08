<template>
    <div style="height: 100%; width: 100%; background: #ffffff; padding: 25px; border-radius: 10px;">
        <div class="search-bar">
            <div class="search-item">
                订单编号：
                <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>

            </div>
            <el-button class="search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="el-button-primarys" type="primary" @click="exportXls">导出报表</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
        <cu-table class="sale-table" :loading="tableLoading" :height="handleHeight" :showTitle="false" :type="'slideInRight'" :time=".5"
            :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange" :total="orderTotal">
        </cu-table>
        </cu-animation>
    </div>
</template>
<script>
import { getBusinessList, businessExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import dayjs from 'dayjs';
import { downloadXls } from "@/utils/exportXls.js";
export default {
    data() {
        return {
            tableHeader: [
                {
                    title: "日期",
                    key: "statDate",
                },
                {
                    title: "供应商数量",
                    key: "supplierCount",
                },
                {
                    title: "采购商数量",
                    key: "buyerCount",
                },
                {
                    title: "商品数量",
                    key: "goodsCount",
                },
                {
                    title: "完成订单数",
                    key: "orderCount",
                },
                {
                    title: "完成订单金额",
                    key: "orderAmount",
                },
                {
                    title: "总运输车次",
                    key: "transportCount",
                },
                {
                    title: "总运费费用",
                    key: "transportFee",
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
            tableLoading: false
        }
    },
    created() {
        this.getBusinessLists()
    },
    mounted() {

    },
    computed: {
        handleHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        },
    },
    methods: {
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getBusinessLists()
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getBusinessLists()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getBusinessLists()
        },
        async getBusinessLists() {
            this.tableLoading = true;
            
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
            }
            this.tableData = []
            getBusinessList(params).then(res => {
                console.log(res.data.code);
                if (res.data.code == 200) {
                    let data = res.data.data;
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.orderTotal = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                }
            }).catch((err) => {
                console.log(err);
            });
            
        },
        showDetails(id) {
            console.log(id);
            this.$message.info("点击详情按钮")
        },
        exportXls() {
            let params = {
                currPageNo: 1,
                pageSize: 10000,

            }
            console.log(params);
            businessExportXls(params).then(res => {
                console.log(res, res.headers);
                if (res.status == 200) {
                    this.$message.success("获取数据成功，等待导出...")
                    // var value = new FormData()
                    if (!res.data) {
                        this.$message.warning("文件下载失败")
                    }
                    console.log(res.headers);
                    downloadXls(res.headers, res.data)
                } else {
                    this.$message.error(res.message)
                }

            }).catch(err => {
                console.log(err);
            })
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
    .el-button-primarys{
        height: 32px !important;
        background: #409EFF;
        border: none;
        border-radius: 4px 4px 4px 4px;
    }
}

.sale-table {
    // width: 100%;
    font-weight: 500;
}
</style>
