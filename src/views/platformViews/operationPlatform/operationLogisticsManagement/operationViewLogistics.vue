<template>
    <div class="page-container table-page" ref="contentBox">
        <div class="search-bar">
            <div class="search-item">
                订单编号：
                <el-input v-model="orderNum" placeholder="请输入订单编号">
                </el-input>
            </div>
            <div class="search-item">
                物流单号：
                <el-input v-model="logisticsNo" placeholder="请输入物流单号">
                </el-input>
            </div>
            <div class="search-item">
                下单时间：
                <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn export-btn" type="primary" @click="exportXls">导出</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :selection="true" :loading="tableLoading" :height="tableHeight"
                :showTitle="false" :tableHeader="tableHeader" :tableData="tableData"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="status" slot-scope="value">
                    {{ statusType[value.value.status] }}
                </template>
                <template slot="orderTime" slot-scope="value">
                    {{ formatDate(value.value.orderTime, "yyyy-MM-dd") }}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" @click="showDetails(value.value.id)">查看物流</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog title="查看物流" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose"
            :destroy-on-close="true">
            <div class="logistics-details">
                <div class="info">
                    <div class="info-top">
                        <p> 物流单号: {{ logisticsData.logisticsNo }}</p>
                        <p>快递员: {{ logisticsData.courier }}&emsp;{{ logisticsData.courierPhone }}</p>
                    </div>
                    <div class="stage">
                        <div class="stage-item" v-for="(item, index) in logisticsData.logisticsHistoryList"
                            :key="index">
                            <div class="time">{{ formatDate(item.createTime, "yyyy-MM-dd hh:mm:ss") }}</div>
                            <div class="address">[{{ logisticsTypes[item.type] }}]:{{ item.address }}</div>
                        </div>
                    </div>
                </div>
                <div class="map">
                    <!-- :pathData='mapPathData' -->
                    <!-- <cu-gaud-map :pathData='mapPathData' v-if="mapPathData.length"></cu-gaud-map> -->
                    <!-- <MapDrag ></MapDrag> -->
                    <Map :pathData='mapPathData'></Map>
                </div>

            </div>
            <template #footer>
                <div></div>
            </template>
        </cu-dialog>
    </div>
</template>
<script>

import { logisticsQuery, orderLogisticsList, logisticsExportXls } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
import dayjs from 'dayjs';
import Map from "../../../../cuview-ui/components/cu-amap/map.vue";
export default {
    components: {
        // MapDrag,

        Map
    },

    data() {
        return {
            statusType: {
                1: "未出库",
                2: "已出库",
                3: "已签收"
            },
            logisticsTypes: {
                1: "出发",
                2: "途径",
                3: "到达",
            },
            tableHeader: [
                {
                    title: "订单编号",
                    key: "orderNo",
                },
                {
                    title: "供应商名称",
                    key: "supplierName",
                },
                {
                    title: "物流单号",
                    key: "logisticsNo",
                },
                {
                    title: "采购商名称",
                    key: "buyerName",
                },
                {
                    title: "收货人姓名",
                    key: "consigneeName",
                },
                {
                    title: "物流量",
                    key: "goodsCount",
                },
                {
                    title: "下单时间",
                    slot: "orderTime",
                },
                {
                    title: "目的地",
                    key: "destination",
                },
                {
                    title: "状态",
                    slot: "status", //  1  未出库  2  已出库  3  已签收
                },
                {
                    title: "车辆",
                    key: "lpn",
                },
                {
                    title: "司机",
                    key: "driverName",
                },
                {
                    title: "操作",
                    slot: "operate",
                },
            ],
            tableData: [],
            tableHeight: 0,
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            orderTotal: 1,
            orderNum: "",
            date: [],
            logisticsNo: null,
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            logisticsData: {
                courier: "",
                courierPhone: "",
                logisticsHistoryList: [
                    {
                        address: "",
                        id: "",
                        logisticsId: "",
                        type: "",
                        lng: "",
                        lat: "",
                        createdTime: "" // 流转时间
                    }
                ],
                logisticsNo: "" // 物流单号
            },
            mapPathData: []
        };
    },
    created() {
        this.getOrderList();
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
    beforeDestroy() {
        //在组件生命周期结束的时候销毁。
        window.onresize = null;
    },
    computed: {

    },
    methods: {
        handleHeight() {
            this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
        },
        dragMap() {
        },
        formatDate(time, format) {
            return time ? new Date(time).Format(format) : "";
        },
        pickDate(val) {
            console.log(val);
        },
        search() {
            this.getOrderList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getOrderList();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getOrderList();
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
                logisticsNo: this.logisticsNo,
            };
            console.log(params);
            this.tableData = [];
            logisticsQuery(params).then(res => {
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
        showDetails(id) {
            console.log(id);
            // this.$message.info("点击详情按钮")
            this.getLogisticsData(id);
            this.mapPathData = [
                {
                    address: '深圳',
                    status: 1,// 1 出发 2途径 3结束
                    path: [116.405289, 39.904987],
                },
                {
                    address: '深圳2',
                    status: 2,
                    path: [113.964458, 40.54664],
                },
                {
                    address: '深圳3',
                    status: 2,
                    path: [111.47836, 41.135964],
                },
                {
                    address: '深圳4',
                    status: 2,
                    path: [108.949297, 41.670904],
                },
                {
                    address: '深圳5',
                    status: 2,
                    path: [106.380111, 42.149509],
                },
                {
                    address: '深圳6',
                    status: 2,
                    path: [103.774185, 42.56996],
                },
                {
                    address: '深圳7',
                    status: 2,
                    path: [101.135432, 42.930601],
                },
                {
                    address: '深圳8',
                    status: 3,
                    path: [98.46826, 43.229964],
                },
            ]
            console.log(Math.ceil(Math.random()*100));
            this.mapPathData.length = (Math.ceil(Math.random()*100 % 10 + 4))
            console.log(this.mapPathData);

            this.dialogVisible = true;
        },
        getLogisticsData(id) {
            let params = {
                id
            };
            console.log(params);
            this.logisticsData = {};
            orderLogisticsList(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.logisticsData = data;
                    let historyList = data.logisticsHistoryList;
                    this.mapPathData = historyList.map(item => { return { path: [item.lng, item.lat], address: item.address, status: item.status }; });
                    console.log(this.mapPathData);

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
            };
            console.log(params);
            logisticsExportXls(params).then(res => {
                console.log(res, res.headers);
                if (res.status == 200) {
                    this.$message.success("获取数据成功，等待导出...");
                    // var value = new FormData()
                    if (!res.data) {
                        this.$message.warning("文件下载失败");
                    }
                    console.log(res);
                    downloadXls(res.headers, res.data);
                }
                else {
                    this.$message.error(res.message);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        //      handleExportXls(fileName){
        //   if(!fileName || typeof fileName != "string"){
        //     fileName = "导出文件"
        //   }
        //   let param = this.getQueryParams();
        //   if(this.selectedRowKeys && this.selectedRowKeys.length>0){
        //     param['selections'] = this.selectedRowKeys.join(",")
        //   }
        //   console.log("导出参数",param)
        //   downFile(this.url.exportXlsUrl,param).then((data)=>{
        //     if (!data) {
        //       this.$message.warning("文件下载失败")
        //       return
        //     }
        //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
        //       window.navigator.msSaveBlob(new Blob([data],{type: 'application/vnd.ms-excel'}), fileName+'.xls')
        //     }else{
        //       let url = window.URL.createObjectURL(new Blob([data],{type: 'application/vnd.ms-excel'}))
        //       let link = document.createElement('a')
        //       link.style.display = 'none'
        //       link.href = url
        //       link.setAttribute('download', fileName+'.xls')
        //       document.body.appendChild(link)
        //       link.click()
        //       document.body.removeChild(link); //下载完成移除元素
        //       window.URL.revokeObjectURL(url); //释放掉blob对象
        //     }
        //   })
        // },
    },
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

    .operation-btn {
        height: 32px;
        border: none;
        border-radius: 4px 4px 4px 4px;
    }

    .search-btn {
        background: #FF480E;

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
