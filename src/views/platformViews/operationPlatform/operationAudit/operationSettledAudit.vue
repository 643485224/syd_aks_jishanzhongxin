<template>
    <div class="page-container table-page" ref="contentBox">
        <div class="search-bar">
            <div class="search-item">
                企业名称:&nbsp;
                <el-input class="selectInput" v-model="unitName" placeholder="请输入关键字搜索">
                </el-input>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgGreen" type="primary" @click="batchDelOperate">批量删除</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :selection="true"
                :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                @handleSelectionChange="handleSelectionChange" :total="total">
                <template slot="sfType" slot-scope="value">
                    {{ sfTypes[value.value.sfType] }}
                </template>
                <template slot="qyType" slot-scope="value">
                    {{ qyTypes[value.value.qyType] }}
                </template>
                <template slot="applyTime" slot-scope="value">
                    {{ formatDate(value.value.applyTime, "yyyy-MM-dd") }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="pass(value.value.id)">通过</el-button>
                    <el-button type="text" class="orange" @click="refuse(value.value.id)">驳回</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog
      title="审核通过"
      width="40vw"
      :center="true"
      :visible="flagVisible"
      :showClose="false"
      @handleClose="handleCloseCategory"
      @handleOk="detailsCategoryOk"
    >
        <div class="bohui">
            <div class="bohui-title">
                请确定是否审核通过
            </div>
        </div>
    </cu-dialog>
    <!-- flagVisible1 -->
    <cu-dialog
      title="请说明拒绝原因"
      width="50vw"
      :center="true"
      :visible="flagVisible1"
      :showClose="false"
      @handleClose="handleCloseCategory1"
      @handleOk="detailsCategoryOk1"
    >
        <div class="qsmyy">
           <div class="qsmyy-content">
            <div class="qsmyy-title">审核不通过原因:</div>
            <textarea name="" id="" v-model="thisid1" class="item-text" cols="30" rows="10"></textarea>
           </div>
        </div>
    </cu-dialog>
    </div>
</template>
<script>

import { settleWaitAuditList, batchDel, settlePass, settleRefuse } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { mapState } from "vuex";
export default {
    data() {
        var checkMobile = (rule, value, callback) => {
            console.log(rule, value, callback, test.mobile);
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }
            if (!test.mobile(value)) {
                return callback(new Error('手机号码格式不正确'));
            }
            return callback();
        };
        return {
            sfTypes: {
                1: '供应商',
                2: '采购商'
            },
            qyTypes: {
                1: '药品企业',
                2: '器械企业'
            },
          
            tableHeader: [
                {
                    title: "企业名称",
                    key: "unitName",
                },
                {
                    title: "企业身份", // 身份@  1  供应商   2  采购商
                    slot: "sfType",
                },
                {
                    title: "企业类型",// 类型@  1  药品企业  2  器械企业
                    slot: "qyType",
                },
                {
                    title: "联系人",
                    key: "contactUser",
                },
                {
                    title: "联系方式",
                    key: "phone",
                },
                {
                    title: "申请时间",
                    slot: "applyTime",
                },
                {
                    title: "状态",
                    slot: "operate",
                    fixed: "right"
                },

            ],
            flagVisible:false,
            flagVisible1:false,
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
            unitName: "",// 关键字
            idList: [],// 批量删除id列表
            row: 10,
            tableLoading: false,
            tableHeight: 0,
            thisid:null,
            thisid1:null,
            thisid2:null
        };
    },
    created() {
        this.getSettledList();
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
    computed: {

        ...mapState(["vuex_user"])
    },
    methods: {
        handleCloseCategory(){
            this.flagVisible = false
        },
        detailsCategoryOk(){
            let params = {
                    id:this.thisid,
                }
                settlePass(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.getSettledList()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message+'!'
                        });
                        this.getSettledList()
                    }
                    this.flagVisible = false
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    });
                    this.flagVisible = false
                });

        },
        handleCloseCategory1(){
            this.flagVisible1 = false
        },
        detailsCategoryOk1(){
            console.log(this.thisid2);
            let params = {
                    id: this.thisid2,
                    auditReMark:this.thisid1 || ''
                }
                settleRefuse(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.getSettledList()
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    });
                });
                this.flagVisible1= false
        },
        handleHeight() {
            this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        search() {
            this.getSettledList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getSettledList();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getSettledList();
        },
        handleSelectionChange(arr) {
            if (arr.length) {
                this.idList = arr.map(item => item.id)
            }
        },
        getSettledList() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                unitName: this.unitName,
            };
            console.log(params);
            this.tableData = [];
            settleWaitAuditList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data.records;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.total = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        batchDelOperate() {
           let idList = this.idList

           this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                batchDel(idList).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getSettledList();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                })

            }).catch(() => {
                
            });

            // batchDel(idList).then(res => {
            //     console.log(res);
            //     if (res.code == 200) {
            //         this.idList = []
            //         this.getSettledList();
            //     } else {
            //         this.$message.error(res.message)
            //     }

            // }).catch(err => {
            //     console.log(err);
            // })
        },
        pass(id) {
            this.flagVisible = true
            this.thisid=''
            this.thisid = id
            // this.$confirm('确认审核通过?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning',
            //     // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            //     // inputErrorMessage: '邮箱格式不正确'
            // }).then(() => {
                
            // }).catch(() => {

            // });
        },
        refuse(id) {
            console.log(id);
            this.thisid1 = ''
            this.flagVisible1 = true
            this.thisid2=id
            console.log(this.thisid2);
            // this.$prompt('确认审核驳回? 填写驳回原因:', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(({ value }) => {
              

            // }).catch(() => {

            // });
        }
    },
    beforeDestroy() {
        //在组件生命周期结束的时候销毁。
        window.onresize = null;
    },

    // components: { CuForm }
}
</script>
<style lang="scss" scoped>
    .qsmyy{
        padding: 50px 30px;
        .qsmyy-content{
        display: flex;
        justify-content: center;
        .qsmyy-title{
            margin-top: 5px;
            font-size: 14px;
            margin-right: 5px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
           color: #000;
        }
        .item-text{
            resize:none; 
            width: 400px;
            height: 200px;
            border: 1px solid #ccc;
            outline-color: #156cc2;
            padding: 10px 10px;
            box-sizing: border-box;
        }
        }
    }
    .bohui{
        text-align: center;
        .bohui-title{
           height: 200px;
           line-height: 200px;
           font-size: 17px;
           font-family: Source Han Sans CN-Medium, Source Han Sans CN;
           box-sizing: border-box;
           color: #000;
           font-weight: 500;
        }
    }
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

.orange {
    color: #ff480e;
}

.green {
    color: #00c514;
}

.blue {
    color: #156cc2;
}

.bgBlue {
    background: #156cc2;
}

.page-container {
    width: 100%;
    height: 100%;
    // color: #fff;
    font-size: 16px;
    overflow: auto;
    padding-bottom: 40px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;

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
    }

    .search-btn {
        background: #FF480E;

    }



}

.add-form {
    margin: 40px auto;
    width: 60%;

    .el-form-item__content {
        flex: 1;
    }

    .el-input,
    .el-select,
    .el-input__inner {
        width: 100%;
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
