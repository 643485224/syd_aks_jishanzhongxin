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
import { getPropertyList, propertyExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
export default {
    props: {
        status: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: 221,
        },
    showTitle: {
      type: Boolean,
      default: false,
    },
    },
    data() {
        return {
            tableHeader: [
                {
                    title: "日期",
                    key: "yf",
                },
                {
                    title: "水费",
                    key: "waterFee",
                },
                {
                    title: "电费",
                    key: "electricFee",
                },
                {
                    title: "取暖费",
                    key: "propertyFee",
                },
                {
                    title: "房租",
                    key: "rentFee",
                },
                {
                    title: "应收总额",
                    key: "receivableFee",
                },
                {
                    title: "已收总额",
                    key: "receivedFee",
                },
                {
                    title: "末收总额",
                    key: "uncollectedFee",
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
        this.getPropertyLists()
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
            this.getPropertyLists()
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getPropertyLists()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getPropertyLists()
        },
        async getPropertyLists() {
            this.tableLoading = true;
            
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
            }
            this.tableData = []
            getPropertyList(params).then(res => {
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
                    console.log(this.tableData);
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
            propertyExportXls(params).then(res => {
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
        height: 32px;
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
