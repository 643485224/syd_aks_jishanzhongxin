<template>
    <div class="page-container table-page" style="height: 100%; width: 100%; background: #ffffff; padding: 25px; border-radius: 10px;">
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
            <template slot="id" slot-scope="value">
                {{ value.index+1 }}
            </template>
        </cu-table>
        </cu-animation>
    </div>
</template>
<script>
import { getSupplierBusinessList, supplierBusinessExportXls} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import dayjs from 'dayjs';
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
    },
    data() {
        return {
            tableHeader: [
                {
                    title: "序号",
                    slot: "id",
                },
                // {
                //     title: "库号",
                //     key: "waterFee",
                // },
                {
                    title: "供应商名称",
                    key: "supplierName",
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
        this.getSupplierBusinessLists()
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
            this.getSupplierBusinessLists()
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getSupplierBusinessLists()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getSupplierBusinessLists()
        },
        async getSupplierBusinessLists() {
            this.tableLoading = true;
            
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
            }
            this.tableData = []
            getSupplierBusinessList(params).then(res => {
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
            supplierBusinessExportXls(params).then(res => {
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
  .operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
}
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
.el-table.el-table--fit.el-table--border.el-table--scrollable-y.el-table--enable-row-hover.el-table--enable-row-transition{
    border-left: -1px solid red;
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

.dispatch-details {
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;

    .dispatch-item {
        display: flex;
        align-items: center;
        width: calc((100% - 80px)/2);
        margin: 20px 20px;

        .label {
            width: 90px;
            text-align: right;
            margin-right: 20px;
        }
        .require {
            color: red;
            vertical-align: sub;
        }

        .el-input,
        .el-select {
            flex: 1;
        }
    }

    .operation-row {
        display: flex;
        flex-flow: row-reverse;
        width: 100%;
        margin-right: 20px;
    }

}
</style>
