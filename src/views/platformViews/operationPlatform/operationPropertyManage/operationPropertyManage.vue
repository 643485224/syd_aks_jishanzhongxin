<template>
    <div class="page-container table-page" ref="contentBox">
        <div class="psge-ul">
            <ul>
                <li v-for="val in prooert" :key="val.id" :class="clas==val.id?'active':''"  @click="getseech(val.id)">{{val.title}}</li>
            </ul>
        </div>
        <div class="search-bar">
            <div class="search-item">
                关键字：
                <el-input v-model="orderNum" placeholder="请输入关键字搜索">
                </el-input>
            </div>
            <!-- <div class="search-item">
                关键字：
                <el-input v-model="logisticsNo" placeholder="请输入物流单号">
                </el-input>
            </div>
            <div class="search-item">
                下单时间：
                <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div> -->
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgGreen" type="primary" @click="showDetails('add')">新增</el-button>
            <el-button class="operation-btn export-btn" type="primary" @click="exportXls">批量导出</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :selection="true" :loading="tableLoading" :height="handleHeight" @handleSelectionChange="handleSelectionChange"
                :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="orderTotal" >
                <template slot="feeType" slot-scope="value">
                    {{ statusType(value.value.feeType) }}
                </template>
                <template slot="status" slot-scope="value">
                    {{ getstatus(value.value.status) }}
                </template>
                <template slot="createTime" slot-scope="value">
                    {{ formatDate(value.value.createTime, "yyyy-MM") }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="showDetails('edit',value.value)">编辑</el-button>
                    <el-button type="text" class="orange" @click="getdelete(value.value.id)">删除</el-button>
                    <el-button type="text" class="blue" @click="getinfos(value.value.id)">详情</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="详情" width="70vw" :visible="dialogVisible1" :showClose="true" @handleClose="handleClose" @handleOk="handleClose">
            <div class="info-time">
                <div class="info-title" >
                    <span class="info-icon1">联系方式:</span>
                    <span class="info-icon2">{{info.contactPhone}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">创建人:</span>
                    <span class="info-icon2">{{info.createBy}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">创建时间:</span>
                    <span class="info-icon2">{{info.createTime}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">月份:</span>
                    <span class="info-icon2">{{info.feeMonth}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">费用类型:</span>
                    <span class="info-icon2">{{statusType(info.feeType)}}</span>
                </div>

                <div class="info-title" >
                    <span class="info-icon1">费用id:</span>
                    <span class="info-icon2">{{info.id}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">应收费用:</span>
                    <span class="info-icon2">{{info.receivableFee}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">已收费用:</span>
                    <span class="info-icon2">{{info.receivedFee}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">状态:</span>
                    <span class="info-icon2">{{getstatus(info.status)}}</span>
                </div>

                <div class="info-title" >
                    <span class="info-icon1">企业id:</span>
                    <span class="info-icon2">{{info.unitId}}</span>
                </div>
                <div class="info-title" >
                    <span class="info-icon1">企业名称:</span>
                    <span class="info-icon2">{{info.unitName}}</span>
                </div>
            </div>
        </cu-dialog>
        <cu-dialog :title="titel" width="70vw" :visible="dialogVisible2" :showClose="true" @handleClose="handleClose2" @handleOk="handleOk1">
            <div class="search-bar addeit">
                <div class="search-item">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月份 :&nbsp;
                     <el-date-picker
                         v-model="propertyFee.feeMonth"
                         type="month"
                         @change="propertm"
                         placeholder="选择月">
                        </el-date-picker>
                </div>
               
                <div class="search-item">
                    费用类型 : 
                        <el-select  placeholder="请选择关键字" v-model="propertyFee.feeType" @change="pptype">
                        <el-option v-for="val in prooert" :key="val.id" :label="val.title" :value="val.id"></el-option>
                    </el-select>
                </div>
                <div class="search-item">
                    应收费用 :
                    <el-input v-model="propertyFee.receivableFee"  placeholder="请输入 应收费用">
                </el-input>
                </div>
                <div class="search-item">
                    已收费用 :
                    <el-input v-model="propertyFee.receivedFee"  placeholder="请输入已收费用"> 
                </el-input>
                </div>
              
                <div class="search-item">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态 :&nbsp;
                    <el-select  placeholder="请选择关键字" v-model="propertyFee.status" @change="pertyFee">
                        <el-option  label="未缴费" value="0"></el-option>
                        <el-option  label="已缴费" value="1"></el-option>
                    </el-select>
                </div>
                <div class="search-item" v-if="flaglist">
                    联系方式 :
                    <el-input v-model="propertyFee.contactPhone"  placeholder="请输入联系方式">
                </el-input> 
                </div>
                <!-- <div class="search-item">
                    &nbsp; &nbsp;&nbsp;企业id:
                    <el-input v-model="propertyFee.unitId"  placeholder="请输入企业id">
                </el-input> 
                </div>-->
                <div class="search-item" v-if="flaglist">
                   企业名称 :
                    <el-input v-model="propertyFee.unitName"  placeholder="搜索企业名称"  suffix-icon="el-icon-search" @focus="getholse">
                </el-input>
                <!-- <el-select  placeholder="请选择企业名称" v-model="propertyFee.unitName">
                        <el-option  v-for="val in properlist2" :key="val.id" :label="val.unitName" :value="val.unitName"></el-option>
                    </el-select> -->
                    <!-- <el-button type="text" class="bgOrange blue" 
                    >添加企业</el-button> -->
                </div>
            </div>
        </cu-dialog>
        <cu-dialog title="企业选择" width="70vw" :visible="dialogVisible3" :showClose="true" @handleClose="handleClose3" @handleOk="handleOk2">
            <div class="search-bar  bar-bar">
            <div class="search-item">
                账号编号：
                <el-input class="selectInput" v-model="porpte.supplierCode" placeholder="请输入账号搜索">
                </el-input>
            </div>
            <div class="search-item">
                单位名称：
                <el-input class="selectInput" v-model="porpte.unitNam" placeholder="请输入单位名称搜索">
                </el-input>
            </div>
                <!-- 状态：
                <el-input class="selectInput" v-model="orderNum" placeholder="全部">
                </el-input> -->
            <div class="search-item">
                状态:
                    <el-select v-model="porpte.orderNum" placeholder="请选择状态" class="tzhigg">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审核通过" value="2"></el-option>
                        <el-option label="审核中" value="1"></el-option>
                        <el-option label="审核未通过" value="3"></el-option>
                    </el-select>
                </div>
            <el-button class="operation-btn search-btn" type="primary" @click="searchr">查询</el-button>
            <!-- <el-button class="operation-btn bgBlue" type="primary" @click="porestsearchr">批量添加</el-button> -->
                    </div>
                    <cu-table class="sale-table stas " :selection="false" :loading="tableLoading" :height="handleHeights" @handleSelectionChange="handleSelectionChange1"
                :showTitle="false" :tableHeader="tableHeader2" :tableData="properlist"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="orderTotal1" 
                  ref="1ts"  stripe="true" >
                <template slot="supplierType" slot-scope="value">
                    {{ getformatDate(value.value.supplierType) }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="showDetait(value.value)">添加</el-button>
                    
                </template>
            </cu-table>
        </cu-dialog>
    </div>
</template>
<script>

import { supplierQuery, getpropertyquery, getpropertydelete, getpropertyinfo, getpropertyedit,getpropertyadd, propertyFeeExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
import { mapState } from "vuex";
export default {
   
    data() {
        return {
            prooert:[
                {
                    id: 1 ,
                    title:'水费'
                },
                {
                    id: 2 ,
                    title:'电费'
                },
                {
                    id: 3,
                    title:'物业费'
                },
                {
                    id: 4,
                    title:'房租费'
                },
                {
                    id: 5 ,
                    title:'取暖费'
                },

            ],
            // 1 水费 2 电费 3 物业费 4 房租费 5 取暖费
            tableHeader: [
                {
                    title: "企业名称",
                    key: "unitName",
                },
                {
                    title: "时间段",
                    key: "feeMonth",
                },
                {
                    title: "费用",
                    slot: "feeType",
                },
                {
                    title: "应收费用",
                    key: "receivableFee",
                },
                {
                    title: "已收费用",
                    key: "receivedFee",
                },
                {
                    title: "联系方式",
                    key: "contactPhone",
                },
                {
                    title: "创建时间",
                    slot: "createTime",
                },
                {
                    title: "状态",
                    slot: "status",
                },
                {
                    title: "操作",
                    slot: "operate",
                },
            ],
            tableHeader2: [
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
            clas:1,
            titel:'物业编辑',
            tableData: [],
            tableHeight: 0,
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderTotal1: 1,
            orderNum: '',
            date: [],
            row: 10,
            rows: 10,
            tableLoading: false,
            info:[],
            properlist:[],
            properlist1: '',
            properlist2:'',
            flaglist:false,
            porpte:{
                orderNum:null,
                unitNam:'',
                supplierCode:''
            },
            dialogVisible3:false,
            dialogVisible1:false,
            dialogVisible2: false,
            propt: null,
            propertyFee:{
                contactPhone:'',//联系方式
                createBy:'',//创建人
                createTime:'',//创建时间
                feeMonth:'',//月份
                feeType:null,//费用类型
                id:null,//费用id
                receivableFee:'',//应收费用
                receivedFee:'',//已收费用
                status:null,//状态
                unitId:null,//企业id
                unitName:'',//企业名称
            }
        };
    },
    created() {
        this.getpropertyquery()
        this.getsupplierQuery()
    },
    mounted() {
          
    },
    beforeDestroy() {
    },
    computed: {
        handleHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        },
        handleHeights() {
            return this.rows ? ((this.rows + 1) * 42) + 1 : (11 * 42);
        },
        ...mapState(["vuex_user"])
    },
    methods: {
        async getsupplierQuery() {
            
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                auditStatus:this.porpte.orderNum || '',
                supplierCode:this.porpte.supplierCode || '',
                unitName:this.porpte.unitNam || ''
                  }
            console.log(params);
            this.tableData = []
            supplierQuery(params).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    let data = res.data.data;
                    this.properlist = data.records;
                    this.rows = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.orderTotal1 = data.total;
                    this.pageCount = data.pages;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getformatDate(times) {
           if(times==1){
                return '药企 '
            } else{
                return '药械 '
            }
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        searchr(){
            this.getsupplierQuery()
        },
        showDetait(value){
            console.log(value);
            this.propertyFee.unitName=value.unitName
            this.propertyFee.unitId = value.id
            this.dialogVisible3= false;
        },
        pertyFee(value){
            console.log(value);
        },
        pptype(value){
            console.log(value);
        },
        propertm(time){
            console.log(time);
         let times =  time ? new Date(time).Format('yyyy-MM-dd') : ''
      times = times.substr(0,7)
        this.propertyFee.feeMonth = times
        },
        showDetails(value,id){
            this.dialogVisible2 = true
            console.log(value,id);
            if(value == 'edit') {
                this.titel = '物业编辑'
                this.propertyFee = id
                this.flaglist = false
            } else {
                this.titel = '物业新增'
                this.flaglist = true
            }
        },
        getholse(){
            this.dialogVisible3 = true
        },
        handleOk1(){
            console.log(this.propertyFee.unitId);
            let params =  this.propertyFee
            params.createTime ="" 
            params.createBy = this.vuex_user.id + '';
            if(this.titel == '物业编辑'){
                getpropertyedit(params).then(res => {
                    console.log(res);
                    if(res.data.code == 200){
                        this.$message.success("物业编辑成功")
                    this.getpropertyquery()
                    }
                }).catch((err) => {
                            console.log(err);
                        });
            } else {
                getpropertyadd(params).then(res => {
                    console.log(res);
                    if(res.data.code == 200){
                        this.$message.success("物业新增成功")
                    this.getpropertyquery()
                    }
                }).catch((err) => {
                            console.log(err);
                        });
            }
            this.dialogVisible2 = false
        },
        handleClose2(){
            this.dialogVisible2 = false
            setTimeout(()=>{
            this.getpropertyquery()
            console.log(111);
            },1)
            this.propertyFee.contactPhone =''
            this.propertyFee.createBy =''
            this.propertyFee.createTime =''
            this.propertyFee.feeMonth =''
            this.propertyFee.feeType =null
            this.propertyFee.id =null
            this.propertyFee.receivableFee =''
            this.propertyFee.receivedFee =''
            this.propertyFee.status =null
            this.propertyFee.unitId = null
            this.propertyFee.unitName =''
            
        },
        getseech(id){
            console.log(id);
            this.clas = ''
            this.clas = id
            this.getpropertyquery()
        },
        getceng(value){
            console.log(value);
            this.orderNum = value
        },
        getdelete(id){ //删除
            let params={
                id: id
        }
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getpropertydelete(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getpropertyquery()
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
        getinfos(id){//详情
            this.info = []
            let params={
                id: id
        }
            getpropertyinfo(params).then(res => {
                console.log(res);
                if(res.data.code == 200){
                    this.info = res.data.data
                    console.log(this.info);
                    this.dialogVisible1 = true
                }
            })
      },
       async getpropertyquery(){
        let params={
            feeType:this.clas,
            pageSize:this.pageSize,
            keyword:this.orderNum || ''
        }
        
        getpropertyquery(params).then(res => {
            console.log(res);
            if(res.data.code ==200){
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
        })
        },
        statusType(value){
             // 1 水费 2 电费 3 物业费 4 房租费 5 取暖费
            if(value == 1){
                return "水费"
            } else if(value == 2){
                return "电费"
            }else if(value == 3){
                return "物业费"
            }else if(value == 4){
                return "房租费"
            }else if(value == 5){
                return "取暖费"
            }
        },
        getstatus(value){
            if(value == 0){
                return "未缴费"
            } else {
                return "已缴费"
            }
        },
        
        dragMap() {
        },
        
        pickDate(val) {
            console.log(val);
        },
        search() {
            console.log(111);
            this.tableData = []
            this.getpropertyquery()
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getpropertyquery()
        this.getsupplierQuery()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getpropertyquery()
        this.getsupplierQuery()
        },
        handleOk2(){
            this.properlis1 = [...new Set(this.properlis1)]
            console.log(this.properlis1);
            this.properlist2 = this.properlis1
            this.dialogVisible3 = false

        },
        handleClose3(){
            this.dialogVisible3 = false
        },
        handleClose() {
            this.dialogVisible = false;
            this.dialogVisible1 = false
        },
        handleSelectionChange(value){
            console.log(value);
        },
        porestsearchr(){
            console.log(  this.properlis1)
            this.properlist2 = this.properlis1
            this.dialogVisible3 = false
        },
        handleSelectionChange1(value){
            console.log(value);
            this.properlist1 = ''
            this.properlis1 = [...new Set(value)]
        },
        exportXls(){
            let params = {
                feeType:this.clas,
                currPageNo: 1,
                pageSize: 10000,

            }
            console.log(params);
            propertyFeeExportXls(params).then(res => {
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
    },
}
</script>
<style lang="scss" scoped>

.success-row {
    background: #f0f9eb;
  }
  .stas[data-v-15955d54] ::v-deep .el-table tr:hover{
    background: #f0f9eb !important;
  }
    .addeit{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center !important;
        .search-item{
            margin-bottom: 15px;
            ::v-deep .el-input__suffix{
            right: 15px;
        }
        }
    }
    .info-time{
        margin:40px 0 0 0;
        .info-title{
            display: flex;
            padding-left: 340px;
            box-sizing: border-box;
            .info-icon1{
                width: 100px;
                text-align: right;
                margin-right: 20px;
                height: 30px;
                font-size: 14px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #999999;
                line-height: 30px;
            }
            .info-icon2{
                height: 30px;
                font-size: 14px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #00023A;
                line-height: 30px;
            }
        }
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

.blue {
    position: absolute;
    top: 0px;
    right: -103px;
    color: #ffffff;
    padding: 8px 10px;
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
.psge-ul{
    margin: 0 0 15px;
    ul{
        display: flex;
        li{
            list-style: none;
            line-height: 40px;
            height: 40px;
            box-sizing: border-box;
            font-size: 15px;
            font-weight: 500;
            color: #303133;
            padding: 0 20px;
        }
    }
    li:hover{
        color: #156cc2;
    }
    .active{
        color: #156cc2;
    }
}

.search-bar {
    display: flex;
    align-items: flex-end;
    margin: 20px 0 30px;
    font-size: 14px;
    .search-item {
        margin-right: 18px;
        position: relative;

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
        
        ::v-deep .el-input__inner{
            height: 31px !important;
            width: 230px;
        }
        ::v-deep .el-input__icon {
            line-height: 1;
        }
    }
   
    .operation-btn {
        height: 32px;
        border: none;
        border-radius: 4px 4px 4px 4px;
    }

    .search-btn {
        background: #FF480E;

    }


}
.bar-bar{
    .search-item {
        margin-right: 18px;
        position: relative;

        .el-input {
            width: 180px;

            ::v-deep .el-input__inner {
                height: 31px;
            }
        }

        ::v-deep .el-range-editor.el-input__inner {
            width: 180px;
            height: 31px !important;
        }
        
        ::v-deep .el-input__inner{
            height: 31px !important;
            width: 180px;
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

    .map {
        flex: 1;
    }
}
</style>
