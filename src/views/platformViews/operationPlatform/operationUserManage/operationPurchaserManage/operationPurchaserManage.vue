<template>
    <div class="page-container table-page">
      <div class="search-bar">
            <div class="search-item">
              账号：
                <el-input class="selectInput" v-model="supplierCode" placeholder="请输入账号搜索">
                </el-input>
            </div>
            <div class="search-item">
              单位名称：
                <el-input class="selectInput" v-model="unitName" placeholder="请输入单位名称搜索">
                </el-input>
            </div>
            <div class="search-item">
              状态：
                <el-select v-model="orderNum" placeholder="请选择状态" class="tzhigg">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn" type="primary" @click="exportXls">导出</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="statusName" slot-scope="value">
                    <el-button type="text" >{{value.value.statusName}}</el-button>
                </template>
            </cu-table>
        </cu-animation>
        </div>
    </template>
    <script>
import { getbuyerQuery,  getbuyerQueryExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
export default {
    data() {
        return {
            tableHeader: [
                {
                    title: "序号",
                    key: "id",
                },
                {
                    title: "单位名称",
                    key: "unitName",
                },

                {
                    title: "信用分",
                    key: "score",
                },
                {
                    title: "账号",
                    key: "username",
                },
                {
                    title: "联系人",
                    slot: "contactUser",
                },
                {
                    title: "手机号",
                    key: "phone",
                },
                {
                    title: "状态",
                    slot: "statusName",
                },
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderNum: '',
            date: [],
            supplierCode:'',
            unitName:''

        }
    },
    created() {
        this.getsupplierQuery()
    },
    mounted() {

    },
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        }
    },
    methods: {
        search() {
            this.getsupplierQuery()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getsupplierQuery()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getsupplierQuery()
        },
        async getsupplierQuery() {
            this.tableLoading = true;
            
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                status: this.orderNum || '',
                username: this.supplierCode || '',
                unitName: this.unitName || ''
            }
            console.log(params);
            this.tableData = []
            getbuyerQuery(params).then(res => {
                console.log(res);
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
        exportXls() {
            let params = {
                currPageNo: 1,
                pageSize: 10000,
                username: this.orderNum || '',
                status:this.supplierCode || '',
                unitName:this.unitName|| ''
            }
            console.log(params);
            getbuyerQueryExportXls(params).then(res => {
                console.log(res, res.headers);
                if (res.status == 200) {
                    this.$message.success("获取数据成功，等待导出...")
                    // var value = new FormData()
                    
                    console.log(res);
                    if (!res.data) {
                        this.$message.warning("文件下载失败")
                    }
                    console.log(res);
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


.tzhigg{
    height: 31px !important;
    line-height: 31px !important;
    ::v-deep .el-input__inner{
        height: 31px !important;
    line-height: 31px !important;
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
    }

    .search-btn {
        background: #FF480E;

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
    