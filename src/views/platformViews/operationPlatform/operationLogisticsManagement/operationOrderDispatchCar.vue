<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div class="search-item">
                订单编号：
                <el-input class="selectInput" v-model="orderNum" placeholder="请输入订单编号">
                </el-input>
            </div>
            <div class="search-item">
                下单时间：
                <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="orderTime" slot-scope="value">
                    {{ formatDate(value.value.orderTime, "yyyy-MM-dd") }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" @click="showDialog(value.value.orderNo)">指派车辆</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="指派车辆" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose">
            <div class="dispatch-details">
                <div class="dispatch-item">
                    <span class="label">订单号:</span>
                    {{ assignCarModel.orderNo }}
                </div>
                <div class="dispatch-item">
                    <span class="label">物流单号:</span>
                    {{ assignCarModel.logisticsNo }}
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>商品重量:</span>
                    <el-input class="selectInput" v-model="assignCarModel.goodsHeavy" type="number" placeholder="请输入司机姓名">
                    </el-input>
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>物流费:</span>
                    <el-input class="selectInput" v-model="assignCarModel.logisticsFee" type="number" placeholder="请输入司机姓名">
                    </el-input>
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>车辆:</span>
                    <el-select v-model="assignCarModel.carModelList" placeholder="请选择车辆">
                        <el-option v-for="item in carList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="dispatch-item">
                    <span class="label"><span class="require">*</span>司机:</span>
                    <el-select v-model="assignCarModel.driverModelList" placeholder="请选择司机">
                        <el-option v-for="item in driverList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="operation-row">
                    <el-button class="operation-btn" type="primary" @click="addCar">添加</el-button>
                </div>
            </div>
            <!-- <template #footer>
                <div></div>
            </template> -->
        </cu-dialog>
    </div>
</template>
<script>

import { waitAssignOrderQuery,getLogisticsNo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { catchAwait } from "@/utils/catchAwait.js";
import dayjs from 'dayjs';
export default {
    
    data() {
        return {
            tableHeader: [
                {
                    title: "订单编号",
                    key: "orderNo",
                },
                {
                    title: "客户名称（供应商）",
                    key: "supplierName",
                },

                {
                    title: "商品数量",
                    key: "goodsCount",
                },
                {
                    title: "收货人名称",
                    key: "consignee",
                },
                {
                    title: "下单时间",
                    slot: "orderTime",
                },
                {
                    title: "目的地",
                    key: "consigneeAddress",
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
            orderTotal: 1,
            orderNum: '',
            date: [],
            logisticsNo: null,// 物流编号
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            assignCarModel: {
                orderNo: '',// 订单号
                logisticsNo: '',// 物流编号
                goodsHeavy: 0,// 商品重量
                logisticsFee: 0,// 物流费用
                carModelList: [// 车辆列表
                    { carId: null, driverId: null }// 车辆id 司机id
                ],
            },
            driverList: [],
            carList: []

        }
    },
    created() {
        this.getOrderList()
    },
    mounted() {

    },
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        }
    },
    methods: {
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : ''
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getOrderList()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getOrderList()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getOrderList()
        },
        async getOrderList() {
            this.tableLoading = true;
            if (this.date.length) {
                this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
                this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
            }
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                orderNo: this.orderNum,
                beginDate: this.date && this.date[0],
                endDate: this.date && this.date[1],
            }
            console.log(params);
            this.tableData = []
            waitAssignOrderQuery(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
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
        async showDialog(orderNo) {
            console.log(orderNo);
            // this.$message.info("点击详情按钮")
            // await this.getCarList();
            // await this.getDriverList()
            let [err,data] = await catchAwait(getLogisticsNo())
            console.log(data);
            if(err){
                this.$message.warning("获取物流号错误")
            }
            this.assignCarModel = {}
            let order = this.tableData.filter(item => item.orderNo == orderNo)[0];
            console.log(order);
            this.assignCarModel.orderNo = order.orderNo;
            this.assignCarModel.logisticsNo = order.logisticsNo;
            console.log(this.assignCarModel,1111);
            // this.dialogVisible = true;?CarModel='+this.assignCarModel+'
            this.$router.push({path:'/main/operationManage/operationLogisticsVehicleManagement',query:{
                CarModel: JSON.stringify(this.assignCarModel)
            }})
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
            this.$router.push('/main/operationManage/operationLogisticsVehicleManagement')
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
