<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div @click="getfhsyi" class="get-search">返回上一页</div>
            <h2>指派车辆</h2>
        </div>
        <div class="search-information">
            <h3>订单信息</h3>
            <div class="dispatch-details">
                <div class="dispatch-item">
                    <span class="label">订单号:</span>
                    {{ getCarModel.orderNo }}
                </div>
                <div class="dispatch-item">
                    <span class="label">物流单号:</span>
                    {{ getCarModel.logisticsNo }}
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>商品重量:</span>
                    <el-input class="selectInput" v-model="assignCarModel.goodsHeavy" type="text">
                    </el-input>
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>物流费:</span>
                    <el-input class="selectInput" v-model="assignCarModel.logisticsFee" type="text" >
                    </el-input>
                </div>
            </div>
            <h3 class="operation-inform">车辆信息</h3>
            <div class="operation-row">
                    <el-button class="operation-btn bgOrange" type="primary" @click="showDialog()">+添加车辆</el-button>
            </div>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="orderTotal1">
                <template slot="driver_name" slot-scope="value">
                    <el-select  placeholder="名字" v-model="valueName" @change="getdriver_name(value.value.id)" class="getdriver_name">
                        <el-option  :label="value.value.getdriver_name" :value="value.value.id">
                        </el-option>
                    </el-select>
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="oright" @click="getedit(value.index)" >删除</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <div class="information-right">
            <div class="information-qx" @click="getfhsyi">取消</div>
            <div class="information-qd" @click="getfhsyi">确定</div>
        </div>
        
        <cu-dialog title="添加车辆" width="80vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose" @handleOk="handleClose">
           
            <div class="search-bar search-search">
            <div class="search-item">
                司机姓名:&nbsp;
                <el-input class="selectInput" v-model="driverName" placeholder="请输入姓名">
                </el-input>
            </div>
            <div class="search-item">
                车牌号:&nbsp;
                <el-input class="selectInput" v-model="lpn" placeholder="请输入车牌号搜索">
                </el-input>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search1">查询</el-button>
            </div>
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader1" :tableData="tableData1" @handleSizeChange="handleSizeChange" 
                @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="status" slot-scope="value">
                    {{ getstatus(value.value.status) }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" @click="getedit1(value.value)" >添加</el-button>
                </template>
            </cu-table>
            <!-- <template #footer>
                <div></div>
            </template> -->
        </cu-dialog>
    </div>
</template>
<script>

import { getDriverList , getFreeCarList } from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
    params:{
        showPagination: {
      type: Boolean,
      default: false,
    },
    },
    data() {
        return {
            tableHeader: [
                {
                    title: "序号",
                    key: "id",
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
                    key: "car_type",
                },
                {
                    title: "车辆规格",
                    slot: "specifications",
                },
                {
                    title: "车辆状态",
                    key: "status",
                },
                {
                    title: "司机姓名",
                    slot: "driver_name",
                },
                {
                    title: "操作",
                    slot: "operate",
                },
            ],
            tableHeader1: [
                {
                    title: "序号",
                    key: "id",
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
                    key: "car_type",
                },
                {
                    title: "车辆规格",
                    key: "specifications",
                },
                {
                    title: "车辆状态",
                    slot: "status",
                },
                {
                    title: "当前位置",
                    key: "location",
                },
                {
                    title: "司机姓名",
                    key: "driver_name",
                },
                {
                    title: "手机号",
                    key: "driver_phone",
                },
                {
                    title: "驾驶证",
                    key: "driver_license",
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
            tableData1: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderTotal1: null,
            orderNum: '',
            date: [],
            lpn:null,
            driverName:null,
            logisticsNo: null,// 物流编号
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            valueName:1,
            assignCarModel: {
                orderNo: '',// 订单号
                logisticsNo: '',// 物流编号
                goodsHeavy: '',// 商品重量
                logisticsFee: '',// 物流费用
                carModelList: [// 车辆列表
                    { carId: null, driverId: null }// 车辆id 司机id
                ],
            },
            driverList: [],
            carList: [],
            getCarModel:{}
        }
    },
    created() {
        this.getCarModel={}
        console.log(JSON.parse(this.$route.query.CarModel),1111);
        this.getCarModel=JSON.parse(this.$route.query.CarModel)
        this.getOrderList()
        this.getOrderList1()
    },
    mounted() {

    },
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        }
    },
   
    methods: {
        getfhsyi(){
        this.$router.go(-1)
    },
   async getdriver_name(id){
        console.log(id);
        let carId = {
            carId:id
        }
        getDriverList(carId).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.carList = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    getedit1(value){//添加
        // if(value,index)
        this.tableData=[...this.tableData,value]
        console.log(this.tableData)
        console.log(this.tableData.length);
        this.orderTotal1 = this.tableData.length
        this.handleClose()
        this.getdriver_name(value.id)

        

    },
    getedit(value){//删除
        console.log(value);
        // emp.remove('fd');
       this.tableData.splice(value,1)
    },
    handleClose1(){
        console.log(1111);
        this.$router.go(-1)
    },
    getstatus(time) {
           if(time == 0){
            return ' 空闲'
           } else {
            return ' 忙碌'
           }
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getOrderList()
        },
        search1() {
            this.getOrderList1()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getOrderList()
            this.getOrderList1()
            this.orderTotal1 = this.tableData.length
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.orderTotal1 = this.tableData.length
            this.getOrderList()
            this.getOrderList1()
        },
        async getOrderList() {
            // this.tableLoading = true;
            // if (this.date.length) {
            //     this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
            //     this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            // }
            // let params = {
            //     currPageNo: this.pageNum,
            //     pageSize: this.pageSize,
            //     orderNo: this.orderNum,
            //     beginDate: this.date && this.date[0],
            //     endDate: this.date && this.date[1],
            // }
            // console.log(params);
            // this.tableData = []
            // waitAssignOrderQuery(params).then(res => {
            //     console.log(res);
            //     if (res.code == 200) {
            //         let data = res.data;
            //         this.tableData = data.records;
            //         this.row = data.records.length;
            //         this.pageNum = data.current;
            //         this.pageSize = data.size;
            //         this.orderTotal = data.total;
            //         this.pageCount = data.pages;
            //         this.tableLoading = false;
            //         console.log(this.tableData);
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // });
        },

        async showDialog() {
            this.dialogVisible = true;
        },
        async getOrderList1() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                lpn: this.lpn || "",
                driverName: this.driverName || ""
            }
            console.log(params);
            this.tableData = []
            getFreeCarList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData1 = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.orderTotal = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData1);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async showDialog() {
            this.dialogVisible = true;
        },
        getCarList() {
            carQuery(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.carList = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        

        addCar() {

        },
        getDriverList(carId) {
            driverQuery({carId}).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.driverList = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },

        dispatchCar(id) {
            this.logisticsData = {}
            assignCar(this.assignCarModel).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success("指派成功")
                } else if (res.code == 201) {
                    this.$message.info("请勿重复操作")
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        
        handleClose() {
            this.dialogVisible = false;

        },
        exportData() {

        }

    }
}
</script>
<style lang="scss" scoped>
.oright{
        color:  #ff480e !important;
        }
        .getdriver_name{
            ::v-deep .el-input__inner {
                border: 0 !important;
                padding-left: 50px;
            }
            ::v-deep .el-input__suffix {
                right: 14px
            }
        }
.information-right{
        margin-top: 130px;
        display: flex;
        justify-content: right;
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

cu-table{
    display: none !important;
}

.search-bar {
    display: flex;
    align-items: flex-end;
    margin: 20px 40px 30px 40px;
    font-size: 14px;
    justify-content: center;
position: relative;
border-bottom: 1px solid #EEEEEE;
padding-bottom: 20px;
.get-search{
    position: absolute;
    left: 0;
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
h2{
    width: 80px;
height: 30px;
font-size: 19px;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #00023A;
line-height: 23px;
}

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
.search-search{
    justify-content: left;
border-bottom: 0px solid #EEEEEE;
margin-bottom: 0;
margin-left: 0;
}
.search-information{
    h3{
        padding-left: 40px;
                height: 24px;
        font-size: 18px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #00023A;
        line-height: 19px;
            }
           .selectInput{
            width: 330px !important;
            ::v-deep .el-input__inner {
                width: 330px !important
        }
        }
        .operation-btn{
            margin: 20px 40px;
        }
        .operation-inform{
            margin-top: 20px;
        }
}
.dispatch-details {
    display: flex;
    padding-left: 46px;
    flex-wrap: wrap;
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
