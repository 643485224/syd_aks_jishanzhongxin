<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div class="search-item">
                姓名:&nbsp;
                <el-input class="selectInput" v-model="name" placeholder="请输入姓名">
                </el-input>
            </div>
            <div class="search-item">
                电话号码:&nbsp;
                <el-input class="selectInput" v-model="phone" placeholder="请输入电话号码">
                </el-input>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgGreen" type="primary" @click="showDialog('add')">新增</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="total">
                <template slot="licensePeriod" slot-scope="value">
                    {{ value.value.licensePeriod }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="showDialog('edit', value.value.id)">编辑</el-button>
                    <el-button type="text" class="orange" @click="del(value.value.id)">删除</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog :title="logisticsDriver.id ? '编辑司机' : '新增司机'" width="50vw" :visible="dialogVisible" :showClose="true"
            @handleClose="handleClose" @handleOk="editDriverData">
            <el-form class="add-form" :model="logisticsDriver" ref="editForm" :rules="rules" label-width="110px">
                <el-form-item class="form-item" label="姓名:" prop="name">
                    <el-input class="selectInput" v-model="logisticsDriver.name" placeholder="请输入姓名">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="性别:" prop="sex">
                    <el-select v-model="logisticsDriver.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="手机号:" prop="phone">
                    <el-input class="selectInput" type="tel" maxlength="11" v-model="logisticsDriver.phone"
                        placeholder="请输入手机号">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="驾驶证号:" prop="driverLicenseNo">
                    <el-input class="selectInput" v-model="logisticsDriver.driverLicenseNo" placeholder="请输入驾驶证号">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="驾驶证有效期:" prop="licensePeriod">
                    <el-date-picker v-model="logisticsDriver.licensePeriod" @change="pickDate" format="yyyy-MM-dd"
                        type="date" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template #footer>
            </template>
        </cu-dialog>
    </div>
</template>
<script>

import { driverQuery, addDriver, editDriver, deleteDriver } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import test from '@/cuview-ui/function/test.js';
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
            tableHeader: [
                {
                    title: "序号",
                    key: "index",
                },
                {
                    title: "姓名",
                    key: "name",
                },
                {
                    title: "性别",
                    key: "sex",
                },
                {
                    title: "手机号",
                    key: "phone",
                },
                {
                    title: "驾驶证号",
                    key: "driverLicenseNo",
                },
                {
                    title: "驾驶证有效期",
                    slot: "licensePeriod",
                },
                {
                    title: "操作",
                    slot: "operate",
                },
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
            name: "",
            phone: "",
            logisticsNo: null,
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            editVisible: false,
            logisticsDriver: {
                createBy: "",
                createTime: "",
                driverLicenseNo: "",
                // id: null,// 司机id
                licensePeriod: "",
                name: "",
                phone: "",
                sex: "", // 司机性别
            },

            rules: {
                name: [
                    { required: true, message: '请输入司机姓名', trigger: 'change' },
                    { min: 2, max: 20, message: '姓名长度不得少于2个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur', validator: checkMobile }
                ],
                // licensePeriod: [
                //     { required: true, message: '请输入驾驶证号', trigger: 'blur', validator: '' },
                //     { min: 3, max: 20, message: '请输入正确的驾驶证号', trigger: 'blur' }
                // ],
            }
        };
    },
    created() {
        this.getDriverList();
    },
    mounted() {
    },
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        },
        ...mapState(["vuex_user"])
    },
    methods: {
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getDriverList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getDriverList();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getDriverList();
        },
        async getDriverList() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                name: this.name,
                phone: this.phone,
            };
            console.log(params);
            this.tableData = [];
            driverQuery(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data.records;
                    this.row = data.records.length;
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
        async showDialog(type, id) {
            this.logisticsDriver = {}
            console.log(type, id);
            if (type == 'edit') {
                this.logisticsDriver = this.tableData.filter(item => item.id == id)[0];
            }
            console.log('dialog');
            console.log(this.logisticsDriver);
            this.dialogVisible = true;
        },
        del(id) {
            console.log(id);
            let params = { id }

            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDriver(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getDriverList();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                });

            }).catch(() => {
                
            });

        },
        handleClose() {
            this.$refs['editForm'].resetFields();
            this.dialogVisible = false;
        },
        editDriverData() {
            console.log(this.$refs['editForm']);
            this.$refs['editForm'].validate((valid) => {
                console.log(valid);
                if (valid) {
                    let params = this.logisticsDriver;
                    console.log(this.vuex_user);
                    params.createBy = this.vuex_user.id + '';
                    params.licensePeriod = this.formatDate(params.licensePeriod, 'yyyy-MM-dd');
                    params.driverLicenseNo = params.driverLicenseNo || ''
                    params.sex = params.sex || ''
                    params.phone = params.phone || ''
                    params.name = params.name || ''
                    params.licensePeriod = params.licensePeriod || ''
                    params.createTime = ''
                    console.log(params);
                    if (params.id) {// 编辑司机
                        editDriver(params).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.$message.success("操作成功")
                                this.getDriverList()
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    } else {
                        addDriver(params).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.$message.success("操作成功")
                                this.getDriverList()
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    this.$refs['editForm'].resetFields();
                    this.dialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }

            });



        },
        exportData() {
        }
    },

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

.orange {
    color: #ff480e;
}

.green {
    color: #00c514;
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
