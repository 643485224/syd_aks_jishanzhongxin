<template>
    <div class="page-container table-page">
        <div class="search-bar">
            <div class="search-item">
                账号编号：
                <el-input class="selectInput" v-model="supplierCode" placeholder="请输入账号搜索">
                </el-input>
            </div>
            <div class="search-item">
                单位名称：
                <el-input class="selectInput" v-model="unitNam" placeholder="请输入单位名称搜索">
                </el-input>
            </div>
                <!-- 状态：
                <el-input class="selectInput" v-model="orderNum" placeholder="全部">
                </el-input> -->
            <div class="search-item">
                状态:
                    <el-select v-model="orderNum" placeholder="请选择状态" class="tzhigg">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审核通过" value="2"></el-option>
                        <el-option label="审核中" value="1"></el-option>
                        <el-option label="审核未通过" value="3"></el-option>
                    </el-select>
                </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn" type="primary" @click="exportXls">导出</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="supplierType" slot-scope="value">
                    {{ getformatDate(value.value.supplierType) }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" @click="showDialog(value.value.id)">详情</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="供应商详情" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose">
            <template #footer>
                <div class="Supplier">
                    <h3>企业信息</h3>
                <div class="supplier-tab">
                    <div class="supplier-left">
                        <div class="supplier-left-text">
                            <span class="left-text">单位名称 :</span><span class="left-tex">{{ getSupplier.unitName }}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">登录账号 :</span><span class="left-tex">{{ getSupplier.username}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">供应类型 :</span><span class="left-tex">{{getclass(getSupplier.supplierType)}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text"> 营业执照 :</span>
                            <div class="left-img">
                                <div class="left-text-img">
                                <img :src="getSupplier.businessLicenseUrl" alt="">
                               <p>营业执照图片</p>
                            </div>
                            <div class="left-text-img">
                                <img :src="getSupplier.licenceUrl" alt="">
                               <p>许可证图片</p>
                            </div>
                            </div>
                            
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text img-text">法人身份证 :</span>
                             <div class="left-img">
                                <div class="left-text-img">
                                <img :src="getSupplier.legalIdFrontUrl" alt="">
                               <p>身份证正面图片</p>
                            </div>
                            <div class="left-text-img">
                                <img :src="getSupplier.legalIdBackUrl" alt="">
                               <p>身份证背面图片</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="supplier-rihgt">
                        
                        <div class="supplier-left-text">
                            <span class="left-text">状态 :</span><span class="left-tex">{{ getstatus(getSupplier.status) }}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">对公账户 :</span><span class="left-tex">{{getSupplier.corporateAccount}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">企业电话 :</span><span class="left-tex">{{getSupplier.businessPhone}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">企业logo :</span><div class="supplier-left-text">
                            <span class="left-text img-text">法人身份证 :</span>
                             <div class="left-img">
                                <div class="left-text-img">
                                <img :src="getSupplier.logoUrl" class="logoUrl">
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <h3>企业联系人</h3>
                <div class="supplier-tab">
                    <div class="supplier-left">
                        <div class="supplier-left-text">
                            <span class="left-text">姓名 :</span><span class="left-tex">
                                {{getSupplierconta(getSupplier.contactUser) }}
                            </span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">职务 :</span><span class="left-tex"> {{getSupplier.post}}</span>
                        </div>
                    </div>
                    <div class="supplier-rihgt">
                        <div class="supplier-left-text">
                            <span class="left-text">手机 :</span><span class="left-tex">
                                {{getphoneS(getSupplier.phone) }}</span>
                        </div>
                    </div>
                </div>
                <h3>财务信息</h3>
                <div class="supplier-tab">
                    <div class="supplier-left">
                        <div class="supplier-left-text">
                            <span class="left-text">发票抬头 :</span><span class="left-tex">{{getSupplier.invoiceHeader}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">开户名称 :</span><span class="left-tex"> {{getSupplier.bankAccountName}}</span>
                        </div>
                    </div>
                    <div class="supplier-rihgt">
                        <div class="supplier-left-text">
                            <span class="left-text">纳税人识别号 :</span><span class="left-tex">{{getSupplier.taxpayerIdNumber}}</span>
                        </div>
                        <div class="supplier-left-text">
                            <span class="left-text">银行账号 :</span><span class="left-tex">{{getSupplier.bankAccountNo}}</span>
                        </div>
                    </div>
                </div>
                <h3>仓库信息</h3>
                <div class="supplier-tab">
                    <div class="supplier-left">
                        <div class="supplier-left-text">
                            <span class="left-text">仓库号 :</span><span class="left-tex">{{getckbh(getSupplier.warehouseList)}}</span>
                        </div>
                    </div>
                </div>
                </div>
            </template>
        </cu-dialog>
    </div>
</template>
<script>

import { supplierQuery, getSupplierInfo, supplierQueryExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
export default {
    data() {
        return {
            tableHeader: [
                {
                    title: "商户编号",
                    key: "username",
                },
                {
                    title: "单位名称",
                    key: "unitName",
                },

                {
                    title: "账号",
                    key: "supplierCode",
                },
                {
                    title: "信用分",
                    key: "score",
                },
                {
                    title: "类型",
                    slot: "supplierType",
                },
                {
                    title: "分类",
                    key: "categoryId",
                },
                {
                    title: "状态",
                    key: "auditStatusName",
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
            auditStatus:null,
            unitNam:'',
            tableLoading: false,
            dialogVisible: false,
            supplierCode:null,
            driverList: [],
            carList: [],
            getSupplier:{},

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
        getSupplierconta(value){
            if(value){
                return value.split('').fill('*',1,3).join('') 
            }
        },
        getphoneS(value){
            if(value){
                return value.split('').fill('*',5,12).join('') 
            }
        },
        getclass(times){
            if(times==1){
                return '药企 '
            } else{
                return '药械 '
            }
        },
        getstatus(times){
            if(times==0){
                return '禁用 '
            } else{
                return '可用 '
            }
        },
        getckbh(id){
            // console.log(id.ckbh);
            // return id.warehouseList[0].ckbh
        },
        getformatDate(times) {
           if(times==1){
                return '药企 '
            } else{
                return '药械 '
            }
        },
        pickDate(val) {
            console.log(val);
        },
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
                auditStatus:this.orderNum || '',
                supplierCode:this.supplierCode || '',
                unitName:this.unitNam || ''
                  }
            console.log(params);
            this.tableData = []
            supplierQuery(params).then(res => {
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
        async showDialog(id) {
            this.getSupplier={}
            getSupplierInfo({id:id}).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data;
                   this.getSupplier=data
                   console.log(data.id);
                   console.log(this.getSupplier);
                }
            }).catch((err) => {
                console.log(err);
            })
            this.dialogVisible = true;
        },
        exportXls() {
            let params = {
                currPageNo: 1,
                pageSize: 10000,
                auditStatus:this.auditStatus,
                supplierCode:this.supplierCode,
                unitName:this.unitNam
            }
            console.log(params);
            supplierQueryExportXls(params).then(res => {
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
    .logoUrl{
        margin-left: 95px;
    }
    .Supplier{
        text-align: left;
        padding-left: 200px;
        box-sizing: border-box;
        width: 100%;
        h3{
            color: #00023A;
            font-size: 20px;
            font-weight: 500;
            color: #00023A;
            line-height: 23px;
            margin-bottom: 13px;
        }
        .left-img{
            border-top: 10px solid transparent;
            display: flex;
        }
        .left-text-img{
            display: flex;
            flex-direction: column;
            justify-content: center;
            &:last-child{
                    margin-left: 20px;
                }
                p{
                    font-size: 12px;
                    text-align: center;
                    margin-bottom: 15px;
font-weight: 400;
color: #999999;
line-height: 22px;
                }
            img{
                width: 153px;
                height: 107px;
                display: block;
            }
        }
        .supplier-tab{
            width: 100%;
            display: flex;
            .supplier-rihgt{
                vertical-align: middle;
                    .left-text{
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                        font-size: 14px;
                        font-weight: 400;
                    color: #999999;
                        line-height: 16px;
                        margin-right: 16px;
                    }
                    .left-tex{
                        display: inline-block;
                        font-size: 14px;
                        font-weight: 400;
                        color: #00023A;
                        line-height: 16px;
                    }
                }
            .supplier-left{
                width: 60%;
                box-sizing: border-box;
                padding-left: 4px;
                .supplier-left-text{
                    display: flex;

.img-text{
padding-top: 16px;
box-sizing: border-box;
}                    .left-text{
                        width: 100px;
                        text-align: right;
                        font-size: 14px;
                        font-weight: 400;
                    color: #999999;
                        line-height: 22px;
                        margin-right: 16px;
                    }
                    .left-tex{
                        font-size: 14px;
                        font-weight: 400;
                        color: #00023A;
                        line-height: 24px;
                    }
                }
            }
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
.tzhigg{
    height: 31px !important;
    line-height: 31px !important;
    ::v-deep .el-input__inner{
        height: 31px !important;
    line-height: 31px !important;
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
