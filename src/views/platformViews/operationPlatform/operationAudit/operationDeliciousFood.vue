<template>
    <div class="page-container table-page" ref="contentBox">
        <div class="search-bar">
            <div class="search-item">
                美食名称:&nbsp;
                <el-input class="selectInput" v-model="foodName" placeholder="请输入美食名称搜索">
                </el-input>
            </div>
            <div class="search-item">
                供应商名称:&nbsp;
                <el-input class="selectInput" v-model="supplierName" placeholder="请输入供应商名称搜索">
                </el-input>
            </div>
            <div class="search-item">
                分类名称:&nbsp;
                <!-- <el-cascader
                class="selectInput"
    ></el-cascader> -->
    <el-cascader
        class="tzhiggg"
    v-model="categoryId"
    :options="options"
    ref="cascaderArr"
    clearable
    :props="{ checkStrictly: true }"
    @change="handleChan"
    ></el-cascader>
                <!-- <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="date" range-separator="-"
                    placeholder="请输入申报时间">
                </el-date-picker> -->
            </div>
            <el-button class="operation-btn bgGreen" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgBlue" type="primary" @click="pltg">批量通过</el-button>
            <el-button class="operation-btn search-btn" type="primary" @click="pljj">批量拒绝</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :selection="true"
                :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                @handleSelectionChange="handleSelectionChange" :total="total">
                <!-- <template slot="ypqxType" slot-scope="value">
                    {{ ypqxTypes[value.value.ypqxType] }}
                </template> -->
                <!-- <template slot="declareTime" slot-scope="value">
                    {{ formatDate(value.value.declareTime, "yyyy-MM-dd") }}
                </template> -->
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="pass(value.value.id)">通过</el-button>
                    <el-button type="text" class="orange" @click="refuse(value.value.id)">拒绝</el-button>
                    <el-button type="text" class="blue" @click="details(value.value.id)">详情</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="美食详情" width="70vw" :visible="dialogVisible"
            :showClose="true" @handleClose="handleClose">
            <div class="product-details">
                <!-- <div class="header-title">{{ ypqxTypes[productDetails.ypqxType] }}详情</div> -->
                <div class="content">
                    <div class="title">
                        基本信息
                    </div>
                    <div class="details-section">
                        <div class="details-item">
                            <span class="label">商品名称:</span>
                            <span class="info">{{ productDetails.mallName}}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">商城价格:</span>
                            <span class="info">{{ productDetails.price}}</span>

                        </div>
                        <div class="details-item">
                            <span class="label">商品单位:</span>
                            <span class="info">{{ productDetails.unit}}</span>

                        </div>
                        <div class="details-item">
                            <span class="label">商品类型:</span>
                            <span class="info">{{ goodsType[productDetails.goodsType] }}</span>

                        </div>

                        <div class="details-item">
                            <span class="label">商城索引图:</span>
                            <div class="imgs">
                                <img :src="productDetails.mallPicture" alt="">
                            </div>


                        </div>
                    </div>
                    <div class="title">
                        审核信息
                    </div>
                    <div class="details-section sale-info ">
                        <div class="details-item">
                            <span class="label">商城状态:</span>
                            <span class="info">{{ auditStatus[productDetails.auditStatus]}}</span>

                        </div>
                        <div class="details-item">
                            <span class="label">是否上架:</span>
                            <span class="info">{{ upload[productDetails.upload] }}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">申报时间:</span>
                            <span class="info">{{ productDetails.declareTime }}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">创建时间:</span>
                            <span class="info">{{ productDetails.createTime }}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">审核人:</span>
                            <span class="info">{{ productDetails.auditBy }}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">审核时间:</span>
                            <span class="info">{{ productDetails.auditTime }}</span>

                        </div>
                        <div class="details-item">
                            <span class="label">审核说明:</span>
                            <span class="info">{{ productDetails.auditRemark }}</span>

                        </div>
                        </div>
                    <div class="title">
                        运费
                    </div>
                    <div class="details-section sale-info ">
                        <div class="details-item">
                            <span class="label">运费金额:</span>
                            <span class="info">{{ productDetails.freightFee }}</span>
                        </div>
                        <div class="details-item">
                            <span class="label">免邮费金额:</span>
                            <span class="info">{{ productDetails.decreaseAmount }}</span>
                        </div>
                    </div>


                    <div class="title">
                        商品参数
                    </div>
                    <div class="details-section sale-info ">
                        <!-- <div class="details-item">
                            <span class="label">常见参数:</span>
                            <input type="text">
                            <span class="info">{{ productDetails.pack }}</span>
                            <el-button   class="operation-btn bgBlue" type="primary">新增</el-button>
                        </div> -->
                        <div class="details-item quantity" >
                            <div class="info">
                                <div class="price-pack">
                                <div class="price-pack-item">参数名称</div>
                                <div class="price-pack-item">参数值</div>
                                <div class="price-pack-item">商品id</div>
                            </div>
                            <div class="price-pack"  v-for="val in productDetails.supplierFyyGoodsParameterList" :key="val.id">
                                <div class="price-pack-item">{{ val.paraKey }}</div>
                                <div class="price-pack-item">{{ val.paraValue }}</div>
                                <div class="price-pack-item">{{ val.goodsId }}</div>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div class="title">
                        图片描述
                    </div>
                    <div class="details-section desc">
                        <div class="details-item">
                            <span class="label">主图:</span>
                            <div class="imgs">

                            <img :src="productDetails.mainPicture" alt="">
                            <span class="info">{{ productDetails.mainPicture }}</span>
                            </div>
                        </div>
                        <div class="details-item">
                        </div>
                        <div class="details-item">
                            <span class="label">商品详情:</span>
                            <cu-editor :height="height" v-model="detail"  model-events="change keydown blur focus paste"></cu-editor>
                        </div>
                    </div>
                    <div class="data-botton">
                        <div class="bottjj" @click="juj(productDetails.id)">拒绝</div>
                        <div class="botttg" @click="xhtg(productDetails.id)">审核通过</div>
                    </div>
                </div>

            </div>
            <template #footer>
                <div></div>
            </template>
        </cu-dialog>
    </div>
</template>
<script>

import { waitAuditList, auditselect, fooDbatchAuditPass , fooDbatchAuditRefuse, fooDauditPass ,fooDauditRefuse,fooDinfo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { catchAwait } from "@/utils/catchAwait.js";
import dayjs from 'dayjs';
import { mapState } from "vuex";
export default {
    props: {
        height: {
            type: Number,
            default: 300
        },
    },
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
            auditStatus: {
                1: '待申报',
                2: '待审核',
                3:'审核通过'
            },
            goodsType:{
                1: '美食',
                2: '温宿好礼',
                3:'二手车'
            },
            upload:{
                0:'否',
                1:'是'
            },
            tableHeader: [
                {
                    title: "编号", // 药品器械分类@ 1 药品  2  器械
                    slot: "id",
                },
                {
                    title: "美食名称",
                    key: "mallName",
                },
                {
                    title: "单位",
                    key: "unit",
                },
                {
                    title: "价格",
                    key: "price",
                },
                {
                    title: "分类名称",
                    key: "categoryName",
                },
                {
                    title: "供应商名称",
                    key: "supplierName",
                },
                {
                    title: "申报时间",
                    key: "declar1eTime",
                },
                {
                    title: "操作",
                    slot: "operate",
                    fixed: "right"
                },

            ],
            selectdrus:[],
            detail:null,
            options:[],
            categoryId:null,
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
            supplierName: "",// 供应商名称
            foodName:'',//美食名称
            articleNo: "",// 货号
            date: "",
            idList: [],// 批量删除id列表
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            productDetails: {},
            tableHeight: 0,
            idList: []
        };
    },
    created() {
        this.getSettledList();
        this.selectdrugClass()
    },
    mounted() {
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
        async selectdrugClass(){
     let res = await auditselect()
        console.log(res);
        // this.selectdrug = ''
        if (res.code ==200) {
          console.log(res);
      let datas = res.data

      let datens = datas => datas.map(({id,name,childList})=> childList.length>0 ?{
        value:id,
        label: name,
        children:datens(childList)
      } :{
        value :id,
        label: name,
      })
      this.options= datens(datas)
      console.log(this.options,1221);
        }
    },
        handleSelectionChange(arr) {
            console.log(arr);
            if (arr.length) {
                this.idList = arr.map(item => item.id)
                console.log( this.idList);
            }
        },
        pltg(){
         let idList = this.idList
         console.log(this.idList.length);
         if (this.idList.length ==0) {
            this.$message({
            type: 'info',
            message: '请选择多个或者一个'
          });
          return
         }
         this.$confirm('确认批量审核通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            fooDbatchAuditPass(idList).then(res => {
                console.log(res);
                if (res.code ==200) {
                    this.$message({
            type: 'success',
            message: '批量审核成功!'
          });
                }
                this.getSettledList()
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量审核'
          });
        });
        },//批量通过
        pljj(){
            let idList = this.idList
            // batchAuditRefuse(idList).then(res => {
            //     console.log(res);
            // })
            if (this.idList.length ==0) {
            this.$message({
            type: 'info',
            message: '请选择多个或者一个'
          });
          return
         }
            this.$confirm('确认批量拒绝, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            fooDbatchAuditRefuse(idList).then(res => {
                console.log(res);
                if (res.code ==200) {
                    this.$message({
            type: 'success',
            message: '批量拒绝成功!'
          });
                }
                this.getSettledList()
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量拒绝'
          });
        });
        },//批量拒绝
        handleHeight() {
            this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        pickDate(val) {
            console.log(val);
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
        handleChan(row){
      console.log(row);
      if(row.length==1){
        this.categoryId = row[0]

      } else{
        this.categoryId =row[row.length-1]
      }
      console.log(this.categoryId);
    },
        getSettledList() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                // beginDate: this.date,
                // endDate: this.date,
                // declareTime: this.date,
                categoryId:this.categoryId,
                supplierName: this.supplierName,
                foodName: this.foodName,
            };
            console.log(params);
            this.tableData = [];
            waitAuditList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tableData = data.records;
                    // this.pageNum = data.current;
                    // this.pageSize = data.size;
                    this.total = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        xhtg(id){
            console.log(id);
            this.pass(id)
        },
        pass(id) {
            this.$prompt('确认审核通过? ', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                console.log(value);
                let params = {
                    id,
                    auditRemark: value || ''
                }
                fooDauditPass(params).then(res => {
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

            }).catch(() => {

            });
        },
        juj(id){
            console.log(id);
            this.refuse(id)
        },
        refuse(id) {
            console.log(id);
            this.$prompt('确认审核驳回? 填写驳回原因:', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                console.log(value);
                let params = {
                    id,
                    auditRemark: value || ''
                }
                fooDauditRefuse(params).then(res => {

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

            }).catch(() => {

            });
        },
        details(id) {
            let data = this.tableData.filter(item => item.id == id)[0];
            fooDinfo({ id }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    if(data.mainPicture){
                        data.mainPicture = data.mainPicture.split(',')
                    }
                    this.productDetails = data;
                    this.dialogVisible = true;
                    console.log(this.productDetails);
                    this.detail = this.productDetails.detail
                }
            }).catch((err) => {
                console.log(err);

            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
    },

    // components: { CuForm }
}
</script>
<style lang="scss" scoped>
.tzhiggg{
  line-height: 25px;
::v-deep .el-input__inner{
    height: 31px !important;
line-height: 31px !important;
}
}
    .data-botton{
        display: flex;
        justify-content: center;
        .bottjj{
            margin-right: 45px;
            width: 120px;
            line-height: 40px;
            background: #eeeeee;
            text-align: center;
            border-radius: 4px 4px 4px 4px;
            font-size: 15px;
            color: #000000;
        }
        .botttg{
            margin-left: 45px;
            width: 120px;
            line-height: 40px;
            background: #409EFF;
            text-align: center;
            color: #fff;
            font-size: 15px;
            border-radius: 4px 4px 4px 4px;
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
    color: #fff;
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


.product-details {
    color: #00023A;

    .header-title {
        font-size: 20px;
        font-weight: bold;
        line-height: 23px;
    }

    .content {
        padding: 26px 40px;
        .quantity {
            width: 100%;
            .info {
                margin: 10px 60px;
            }
        }

        .title {
            padding: 26px 0;
            font-size: 16px;
            font-weight: bold;
        }

        .details-section {
            display: flex;
            flex-wrap: wrap;
        }

        .description {
            display: block;
            img {
                width: 150px;
                height: 150px;
                margin: 10px;
            }
        }

        .price-pack {
            display: flex;
            width: 600px;

            &-item {
                flex: 1;
                height: 40px;
                padding: 10px;
                margin: -0.5px; // 边框重叠
                text-align: center;
                border: 1px solid #999999;
            }
        }

        .details-item {
            min-width: 50%;
            padding: 13px 0;
            font-size: 14px;
            display: flex;
            .label {
                display: inline-block;
                width: 90px;
                text-align: right;
                margin-right: 6px;
            }
            .imgs{
                width: 150px;
                height: 150px;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
}
</style>
