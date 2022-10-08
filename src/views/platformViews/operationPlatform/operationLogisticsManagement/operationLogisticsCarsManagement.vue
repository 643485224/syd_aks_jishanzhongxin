<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div class="search-item">
                车牌号：
                <el-input class="selectInput" v-model="lpn" placeholder="请输入订单编号">
                </el-input>
            </div>
            <div class="search-item">
                司机姓名：
                <el-input class="selectInput" v-model="driverName" placeholder="请输入司机姓名">
                </el-input>
            </div>

            <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgGreen" type="primary" @click="showAddDialog">新增</el-button>
            <el-button class="operation-btn bgBlue" type="primary"  @click="exportXls">导出</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="total">
                <template slot="orderTime" slot-scope="value">
                    {{ formatDate(value.value.orderTime, "yyyy-MM-dd") }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" @click="operation(value.value.id)">详情</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="查看物流" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose">
            <div class="logistics-details">

            </div>
            <template #footer>
                <div></div>
            </template>
        </cu-dialog>
        <cu-dialog title="车辆新增" width="70vw" :visible="dialogAddVisible" :showClose="true"
            @handleClose="dialogAddVisible = false" @handleOk="addCarData">
            <div class="add-form">
                <div class="add-form-top">
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>车牌号</div>
                        <input type="text" v-model="editCarModel.lpn" class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>行驶证号</div>
                        <input type="text" v-model="editCarModel.driverLicenseNo" class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>车型</div>
                        <input type="text" v-model="editCarModel.carType" class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>车辆规格</div>
                        <input type="text" v-model="editCarModel.specifications" class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>车牌年限</div>
                        <input type="number" v-model="editCarModel.years" class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-top-item">
                        <div class="item-label"><span class="require">*</span>车牌品牌</div>
                        <input type="text" v-model="editCarModel.brand" class="item-input" placeholder="请输入">
                    </div>
                </div>
                <div class="add-form-images">
                    <div class="label"><span class="require">*</span>车辆照片:</div>
                    <div class="images">
                        <cu-upload>
                        </cu-upload>
                        <cu-upload>
                        </cu-upload>
                        <cu-upload>
                        </cu-upload>
                    </div>
                </div>
                <div class="add-form-drivers">
                    <div class="label"><span class="require">*</span>主司机:</div>
                    <!-- v-model="assignCarModel.driverModelList"  -->
                    <el-select placeholder="请选择司机" v-model="driverListid" @change="getdricer(driverListid)">
                        <el-option v-for="item in driverList" :key="item.value" :label="item.driverName" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- @click="add(value.value.id)" -->
                    <el-button type="primary" class="operation-btn bgOrange" @click="getaddtion">+添加司机</el-button>

                </div>
                <div class="add-form-bottom">
                    <div class="add-form-bottom-item">
                        <div class="item-label"><span class="require">*</span>司机姓名</div>
                        <input type="text" v-model="editCarModel.logisticsCarDriverList.name" class="item-input"
                            placeholder="请输入">
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label"><span class="require">*</span>性别</div>
                        <input type="text" v-model="editCarModel.logisticsCarDriverList.sex" class="item-input"
                            placeholder="请输入">
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label"><span class="require">*</span>手机号</div>
                        <input type="text" v-model="editCarModel.logisticsCarDriverList.phone" class="item-input"
                            placeholder="请输入">
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label"><span class="require">*</span>驾驶证号</div>
                        <input type="text" v-model="editCarModel.logisticsCarDriverList.driverLicenseNo"
                            class="item-input" placeholder="请输入">
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label"><span class="require">*</span>驾驶证有效期</div>
                        <input type="text" v-model="editCarModel.logisticsCarDriverList.licensePeriod"
                            class="item-input" placeholder="请输入">
                    </div>
                </div>
            </div>
            <template #footer>
            </template>
        </cu-dialog>
        <cu-dialog title='新增司机' width="50vw" :visible="dialogVisible1" :showClose="true"
            @handleClose="handleClose1" @handleOk="editDriverData1">
            <el-form class="add-form dialogVis" :model="logisticsDriver" ref="editForm" :rules="rules" label-width="110px">
                <el-form-item class="form-item selectInput" label="姓名:" prop="names">
                    <el-input class="selectInput" v-model="logisticsDriver.name" placeholder="请输入姓名">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item selectInput" label="性别:" prop="sex">
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
                <el-form-item class="form-item selectInput" label="驾驶证有效期:" prop="licensePeriod">
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

import { carQuery, orderLogisticsList, addCar,carExportXls, getDriverList, addDriver } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
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
                    title: "车牌号",
                    key: "lpn",
                },
                {
                    title: "行驶证号",
                    key: "dln",
                },

                {
                    title: "车型",
                    key: "carType",
                },
                {
                    title: "车辆规格",
                    key: "specifications",
                },
                {
                    title: "车辆状态",
                    slot: "status",// 0  空闲  1  忙碌
                },
                {
                    title: "当前位置",
                    key: "location",
                },
                {
                    title: "司机姓名",
                    key: "driverName",
                },
                {
                    title: "手机号",
                    key: "driverPhone",
                },
                {
                    title: "驾驶证",
                    key: "driverLicense",
                },
                {
                    title: "已载次数",
                    key: "yzcs",
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
            driverName: '',// 司机姓名
            lpn: '',// 车牌号
            logisticsNo: null,// 物流编号
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            dialogVisible1:false,
            dialogAddVisible: false,
            editCarRequired: {
                lpn: true,
                dln: true,
                carType: true,
                specifications: true,
                years: true,
                brand: true,
                pictureList: true,
                isMain: true,// 主司机
                logisticsCarDriverList: {
                    sex: true,
                    phone: true,
                    driverLicenseNo: true,
                    licensePeriod: true,
                }
            },
            editCarModel: {// 车辆编辑信息
                brand: "",// 车辆品牌
                carType: "",// 车型
                createBy: "",// 创建人
                createTime: "",// 创建时间
                dln: "",// 行驶证号
                driverLicense: "",// 驾驶证
                driverName: "",// 主司机姓名
                driverPhone: "",// 主司机手机号
                id: 0,
                location: "",// 当前位置
                lpn: "",// 车牌号
                specifications: "",// 车辆规格
                status: 0,// 车辆状态@ 0  空闲  1  忙碌
                years: 0,// 车辆年限
                yzcs: 0,// 已载次数
                pictureList: [],// 车辆照片
                logisticsCarDriverList: [// 司机列表
                    {
                        carId: 0,// 车辆id
                        createBy: "",// 创建人
                        createTime: "",// 创建时间
                        driverLicenseNo: "",// 驾驶证号
                        id: 0,// 司机id
                        isMain: 0,// 是否主司机@ 0 否  1  是
                        licensePeriod: "",// 驾驶证有效期
                        name: "",// 司机姓名
                        phone: "",// 手机号
                        sex: ""// 司机性别
                    }
                ],
            },
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
            driverList:null,
            driverListid:null,
            rules: {
                names: [
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
        }
    },
    created() {
        this.getCarList()
        
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
        geteditDriverData(){
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

                    addDriver(params).then(res => {
                            console.log(res);
                            if (res.code == 200) {
                                this.$message.success("操作成功")

                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                        // this.dialogVisible1 = false;
        },
        handleClose1(){

            this.dialogVisible1 = false
        },
        editDriverData1(){
            console.log(111);
            this.geteditDriverData()
            this.dialogVisible1 = false
        },
        getaddtion(){
            // 添加司机
            this.dialogVisible1 = true
        },
        pickDate(val) {
            console.log(val);
        },
       async getdriverList(id){
        let params = {
            carId: id
            }
            getDriverList(params).then(res=>{
                console.log(res);
                if (res.code == 200) {
                    console.log(res.code);
                    // this.dialogAddVisible = false;
                    this.tableLoading = false;
                    // this.$message.success(res.message+'!')
                    // this.getCarList()
                }
            })
        },
        getdricer(id){
            console.log(id);
            this.getdriverList(id)
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : ''
        },
        search() {
            this.getCarList()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getCarList()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getCarList()
        },
        getCarList() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                lpn: this.lpn,
                driverName: this.driverName,
            }
            console.log(params);
            this.tableData = []
            carQuery(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    console.log(data);
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.total = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                    let arr = []
                    this.driverList= []
                    this.tableData.forEach(val => {
                        arr.push(val)
                    })
                    this.driverList = arr
                    console.log( this.driverList[0].id);
                    this.driverListid = this.driverList[0].id
                }
            }).catch((err) => {
                console.log(err);
            });
        },
         showAddDialog() {
            Datalet=''
            let Datalet = this.tableData
            // this.dialogAddVisible = true;
            this.$router.push('/main/operationManage/operationLogisticsAdditionManagement')
            // this.$router.push('/main/operationManage/operationLogisticsAdditionManagement')

        },
        // 获取司机数据
        getDrivers() {

        },
        addCarData(){
            
            addCar(this.editCarModel).then(res=>{
                console.log(res);
                if (res.code == 200) {
                    console.log(res.code);
                    this.dialogAddVisible = false;
                    this.tableLoading = false;
                    this.$message.success(res.message+'!')
                    this.getCarList()
                }
            })
        },
        getLogisticsData(id) {
            let params = {
                id
            }
            console.log(params);
            this.logisticsData = {}
            orderLogisticsList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.logisticsData = res.data;
                    console.log(this.logisticsData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        handleClose() {
            this.dialogVisible = false;

        },
        exportXls() {
            let params = {
                currPageNo: 1,
                pageSize: 10000,

            }
            console.log(params);
            carExportXls(params).then(res => {
                console.log(res, res.headers);
                if (res.status == 200) {
                    this.$message.success("获取数据成功，等待导出...")
                    // var value = new FormData()
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
        },
        operation(){
            
        }

    }
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
.selectInput{
    ::v-deep .el-input__inner {
            width: 250px;
            height: 31px !important;
        }
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
        margin-right: 46px;

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




}

.logistics-details {
    display: flex;
    padding: 50px;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;

    .info {
        height: 50vh;
        margin-right: 62px;
        overflow: auto;

        .info-top {
            color: #00023A;
            padding-bottom: 40px;

        }

        .stage {
            .stage-item:not(:last-child) {
                padding-bottom: 40px;
            }
        }

    }
}


.add-form {
    width: 100%;
    padding: 37px;
    font-size: 14px;
    font-weight: 400;
    color: #00023A;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;

    &-top,
    &-bottom {
        display: flex;
        width: 100%;

        &-item {
            flex: 1;
            margin: -0.5px; // 边框重叠
            text-align: center;
            border: 1px solid #999999;

            .item-label {
                height: 40px;
                padding: 10px;
                border-bottom: 1px solid #999999;
            }

            input {
                width: 100%;
                padding: 10px;
                border: none;
                outline: none;
                text-align: center;
            }
        }

    }

    &-images {
        margin-top: 20px;

        .images {
            display: flex;
            margin-left: 60px;

        }
    }

    &-drivers {
        display: flex;
        align-items: center;

        .el-select {
            margin: 20px;
        }
    }
}
.dialogVis{
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
</style>
