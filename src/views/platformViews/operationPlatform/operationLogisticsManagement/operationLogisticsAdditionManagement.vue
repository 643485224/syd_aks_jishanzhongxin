<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div @click="getfhsyi" class="get-search">返回上一页</div>
            <h2>新增车辆</h2>
        </div>
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
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :limit="6"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-lazy v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-camera avatar-uploader-icon"></i>
                            <div v-if="falg" class="el-uploadtext" >添加照片</div>
                            </el-upload>
                            
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess1"
                            :before-upload="beforeAvatarUpload">
                            <img v-lazy v-if="imageUrl1" :src="imageUrl1" class="avatar"> 
                            <i v-else class="el-icon-camera avatar-uploader-icon"></i>
                             <div  v-if="falg1" class="el-uploadtext">添加照片</div>
                            </el-upload>
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload">
                            <img v-lazy v-if="imageUrl2" :src="imageUrl2" class="avatar"> 
                            <i v-else class="el-icon-camera avatar-uploader-icon"></i>
                             <div  v-if="falg2" class="el-uploadtext">添加照片</div>
                            </el-upload> 

                            <el-upload v-if="!falg2"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess3"
                            :before-upload="beforeAvatarUpload">
                            <img v-lazy v-if="imageUrl3" :src="imageUrl3" class="avatar"> 
                            <i v-else class="el-icon-camera avatar-uploader-icon"></i>
                             <div  v-if="falg3" class="el-uploadtext">添加照片</div>
                            </el-upload> 

                            <el-upload v-if="!falg3"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess4"
                            :before-upload="beforeAvatarUpload">
                            <img v-lazy v-if="imageUrl4" :src="imageUrl4" class="avatar"> 
                            <i v-else class="el-icon-camera avatar-uploader-icon"></i>
                             <div  v-if="falg4" class="el-uploadtext">添加照片</div>
                            </el-upload> 
                         <!-- <cu-upload>
                        </cu-upload> -->
                    </div>
                </div>
                <div class="add-form-drivers">
                    <div class="label"><span class="require">*</span>主司机:</div>
                    <!-- v-model="assignCarModel.driverModelList"  -->
                    <el-select placeholder="请选择司机" v-model="oneer"    @change="getdricer">
                        <el-option v-for="val in driverList" :key="val.id" :label="val.name" :value="val.id"></el-option>
                    </el-select>
                    <!-- @click="add(value.value.id)" -->
                    <el-button type="primary" class="operation-btn bgOrange" @click="getaddtion">+添加司机</el-button>

                </div>
                <div class="add-form-bottom">
                    <div class="add-form-bottom-item">
                        <div class="item-label tem-label"><span class="require">*</span>司机姓名</div>
                        <p class="item-inputs" v-for="val in driverList" :key="val.id">{{val.name}}</p>
                 
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label tem-label"><span class="require">*</span>性别</div>
                        <p class="item-inputs" v-for="val in driverList" :key="val.id">{{val.sex}}</p>
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label tem-label"><span class="require">*</span>手机号</div>
                        <p class="item-inputs" v-for="val in driverList" :key="val.id">{{val.phone}}</p>
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label tem-label"><span class="require">*</span>驾驶证号</div>
                        
                        <p class="item-inputs" v-for="val in driverList" :key="val.id">{{val.driverLicenseNo}}</p>
                    </div>
                    <div class="add-form-bottom-item">
                        <div class="item-label tem-label"><span class="require">*</span>驾驶证有效期</div>
                        <p class="item-inputs" v-for="val in driverList" :key="val.id">{{val.licensePeriod}}</p>
                    </div>
                </div>
            </div>
            <div class="information-right">
            <div class="information-qx" @click="getfhsyi">取消</div>
            <div class="information-qd" @click="getfhser">确定</div>
        </div>
        <cu-dialog title='添加司机' width="80vw" :visible="dialogVisible1" :showClose="true"
            @handleClose="handleClose1" @handleOk="handleClose2">
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
            </div>
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false" :selection="true"
                :tableHeader="tableHeader" :tableData="tableData1" @handleSizeChange="handleSizeChange"
                @handleSelectionChange="handleSelectionChange"
                @handleCurrentChange="handleCurrentChange" :total="total">
               
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="showDialog(value.value)">添加</el-button>
                    
                </template>
            </cu-table>
        </cu-dialog>
    </div>
</template>
<script>

import { orderLogisticsList, addCar, getDriverList, driverQuery } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { upload } from "@/api/aksApi/platformApi/commonApi.js"
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
            tableData: [],
            pageNum: 1,
            oneer:null,
            pageSize: 10,
            pageCount: 1,
            total: 1,
            falg:true,
            falg1:true,
            falg2:true,
            falg3:true,
            falg4:true,
            one:null,
            driverName: '',// 司机姓名
            lpn: '',// 车牌号
            logisticsNo: null,// 物流编号
            row: 10,
            tableData1:null,
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
            name:null,
            phone: null,
            imageUrl: '',
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            imageUrl4: '',
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
            driverList:[],
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
        // this.driverListid = ''
        // console.log(JSON.parse(this.$route.query.bleData),1111);
        // this.driverListid = ''
        // this.driverListid = JSON.parse(this.$route.query.bleData);
        // console.log(this.driverListid,2222);
        this.getCarList()
        this.getDrivers()
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
        handleAvatarSuccess(res, file) {
            console.log(file);
            upload(file.raw).then(res => {
                console.log(res);
                this.falg = false
                if(res.code ==200){
                    this.falg = false
                    this.$message.success('上传图片成功!')
                } else{
                    that.falg = ture
                    this.$message.error('上传图片失败!')
                }
            })
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess1(res, file) {
            console.log(file);
            upload(file.raw).then(res => {
                console.log(res);
                this.falg1 = false
                if(res.code ==200){
                    this.falg1 = false
                    this.$message.success('上传图片成功!')
                } else{
                    this.$message.error('上传图片失败!')
                    that.falg = ture

                }
            })
        this.imageUrl1 = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess2(res, file) {
            console.log(file);
            upload(file.raw).then(res => {
                console.log(res);
                
                if(res.code ==200){
                this.falg2 = false

                    this.$message.success('上传图片成功!')
                } else{
                    this.$message.error('上传图片失败!')
                }
            })
        this.imageUrl2 = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess3(res, file) {
            console.log(file);
            upload(file.raw).then(res => {
                console.log(res);
                
                if(res.code ==200){
                this.falg3 = false

                    this.$message.success('上传图片成功!')
                } else{
                    this.$message.error('上传图片失败!')
                }
            })
        this.imageUrl3 = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess4(res, file) {
            console.log(file);
            upload(file.raw).then(res => {
                console.log(res);
                if(res.code ==200){
                this.falg4 = false
                    this.$message.success('上传图片成功!')
                } else{
                    this.$message.error('上传图片失败!')
                }
            })
        this.imageUrl4 = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      showDialog(value){
        this.driverList=[...this.driverList,value]
        this.one = null
        this.oneer= null
        this.one = this.driverList[0]
        this.oneer = this.one.id
            this.dialogVisible1 = false
      },
        getfhsyi(){
        this.$router.go(-1)
    },
    handleSizeChange(val){
        this.pageSize = val;
        this.getDrivers()
    },
    handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getDrivers()
        },
    getfhser(){
        this.addCarData()
        // 
    },
    handleClose1(){
            this.dialogVisible1 = false
            this.handleSelectionChange()
        },
        handleClose2(){
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
            this.oneer= null
            let num = null
             num = this.driverList.filter(val=>val.id == id);
            console.log(num[0]);
          this.one = num[0]
          this.oneer = this.one.id
          this.editCarModel.logisticsCarDriverList.name = this.one.name
            this.editCarModel.logisticsCarDriverList.phone=this.one.phone
            this.editCarModel.logisticsCarDriverList.sex=this.one.sex
            this.editCarModel.logisticsCarDriverList.driverLicenseNo=this.one.driverLicenseNo
            this.editCarModel.logisticsCarDriverList.licensePeriod=this.one.licensePeriod
        },
        handleSelectionChange(val){
            console.log(val);
            if(val == null){
                return
            } else {
                 this.driverList=val
        this.one = this.driverList[0]
        console.log(this.one);
        this.oneer= null
        this.oneer = this.one.id
        this.editCarModel.logisticsCarDriverList.name = this.one.name
            this.editCarModel.logisticsCarDriverList.phone=this.one.phone
            this.editCarModel.logisticsCarDriverList.sex=this.one.sex
            this.editCarModel.logisticsCarDriverList.driverLicenseNo=this.one.driverLicenseNo
            this.editCarModel.logisticsCarDriverList.licensePeriod=this.one.licensePeriod
            }
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : ''
        },
       async getCarList() {
           
        },
        // 获取司机数据
        search(){
            this.getDrivers()
        },
       async getDrivers() {
        let params = {
            currPageNo:this.pageNum,
            name: this.name || '',
            pageSize: this.pageSize,
            phone:this.phone || '',
        }
        driverQuery(params).then(res => {
            console.log(res);
            if (res.code == 200) {
                    let data = res.data;
                    this.tableData1 = data.records;
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
        addCarData(){
            let params = this.editCarModel
            params.logisticsCarDriverList[0].name = this.one.name
            params.logisticsCarDriverList[0].phone=this.one.phone
            params.logisticsCarDriverList[0].sex=this.one.sex
            params.logisticsCarDriverList[0].driverLicenseNo=this.one.driverLicenseNo
            params.logisticsCarDriverList[0].licensePeriod=this.one.licensePeriod
            console.log();
            addCar(params).then(res=>{
                console.log(res);
                if (res.code == 200) {
                    console.log(res.code);
                    this.dialogAddVisible = false;
                    this.tableLoading = false;
                    this.$message.success(res.message+'!')
                    this.$router.go(-1)
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
        operation(){
            
        }

    }
}
</script>
<style lang="scss" scoped>
    .item-inputs{
       height: 41px;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 41px;
        border-bottom: 1px solid #999999;
        box-sizing: border-box;
        margin-bottom: -1px;
        overflow: hidden;
    }
    .images{
        position: relative;
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
.avatar-uploader ::v-deep .el-upload {
    margin-top: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 10px;
  }
  .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409EFF;

  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .el-uploadtext{
    position: absolute;
    top: 74%;
    left: 32px;
    transform: translateY(-74%);
    color: #CBCBCB;
    font-size: 12px;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
// 按钮背景色
.bgOrange {
  background: #ff480e;
}
.get-search{
    position: absolute;
    left: 35px;
    top: 0;
    width: 110px;
        height: 32px;
            background: #156CC2;
        border-radius: 2px 2px 2px 2px;
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        color: #fff;
        line-height: 32px;

}

.bgGreen {
  background: #00c514;
}
h2{
    width: 100%;
    text-align: center;
height: 30px;
font-size: 19px;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #00023A;
line-height: 23px;
}
.information-right{
        margin-top: 30px;
        display: flex;
        justify-content: center;
       .information-qd, .information-qx{
            width: 120px;
height: 32px;
            border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #999999;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 31px;
        text-align: center;
        }
        .information-qd{
            margin: 0 20px;
            background: #156CC2;
            color: #FFFFFF;
        }
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
    position: relative;


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
    padding: 20px 37px 37px 37px;
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
            .tem-label{
                margin-bottom: -1px;
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
