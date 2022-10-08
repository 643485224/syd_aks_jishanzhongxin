<template>
    <div class="page-container">
        <div class="page-content">
            <div class="page-left">
                <div class="page-left-section" id="storeOverViewEchartPieWrap" ref="storeOverViewEchartPieWrap">
                    <div id="storeOverViewEchartPie" ref="storeOverViewEchartPie"></div>
                </div>
                <div class="page-left-section" id="productCountEchartPieWrap" ref="productCountEchartPieWrap">
                    <div id="productCountEchartPie" ref="productCountEchartPie"></div>
                </div>
            </div>
            <div class="page-right">
                <div class="storehouse-list">
                    <div class="storehouse-item" v-for="item in storelist" :key="item.id">
                        <span>{{ item.unitName }}</span>
                        <span>仓库号:&nbsp;{{ item.ckbh }}</span>
                    </div>
                </div>
                <div class="page-footer">
            <el-pagination background layout="total, prev, pager, next, jumper" :total="storeTotal"
                :page-size="pageSize" :current-page="pageNum" @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
            </div>
        </div>
        <!-- <div class="page-footer">
            <el-pagination background layout="total, prev, pager, next, jumper" :total="storeTotal"
                :page-size="pageSize" :current-page="pageNum" @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div> -->
    </div>

</template>
<script>
import {
    wareHouseGetGoodsCount, wareHouseGetOverView, wareHouseList
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { pieOptions } from "./pieOptions.js"

export default {
    data() {
        return {
            storelist: [],
            pageNum: 1,
            pageSize: 20,
            pageCount: 1,
            storeTotal: 1,
            row: 10,
            productCountEchart: null,
            storeOverViewEchart: null,
            productCountEchartWrap: null,
            goodsCountData: {// 商品数量数据
                goodsCount: 0,// 商品数量
                drugCount: 2,// 药品数量
                apparatusCount: 2,// 器械数量
            },
            storeOverViewData: {// 仓库概览数据
                warehouseSumCount: 0,
                warehouseFreeCount: 0,
                warehouseUseCount: 0,
                warehouseUseRate: '0.00%',
            },
            colors: ['#0E78F3', '#FF3306']

        }
    },
    created() {
        this.getProductCountData()
        this.getStoreOverViewData()
        this.getStoreListData()
        
    },
    computed:{
    },
    mounted() {
        
        this.storeOverViewEchartsPie()
        this.productCountEchartPie()
        window.onresize = () => {
            this.changeSize()
        }
    },
    methods: {
        changeSize() {
            let storeWrap = this.$refs.storeOverViewEchartPieWrap;
            let storeEchart = this.$refs.storeOverViewEchartPie;
            let productWrap = this.$refs.productCountEchartPieWrap;
            let productEchart = this.$refs.productCountEchartPie;
            this.setEchartStyle(storeWrap, storeEchart)
            this.setEchartStyle(productWrap, productEchart)
            this.storeOverViewEchart.resize()
            this.productCountEchart.resize()
        },
        // 获取商品数量数据
        getProductCountData() {
            wareHouseGetGoodsCount().then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.goodsCountData = res.data;
                    this.setGoodsCountEchartOptions()
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // 获取仓库概览数据
        getStoreOverViewData() {
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize
            }
            wareHouseGetOverView(params).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.storeOverViewData = res.data;
                    this.setStoreOverViewEchartOptions()
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // 获取仓库列表数据
        getStoreListData() {
            let params = { currPageNo: this.pageNum, pageSize: this.pageSize }
            wareHouseList(params).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.storelist = res.data.records;
                    this.pageCount = res.data.pages;
                    this.storeTotal = res.data.total;
                    this.row = res.data.length
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getStoreListData()
            this.getStoreOverViewData()
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getStoreListData()
            this.getStoreOverViewData()
        },
        setEchartStyle(wrapDom, chartDom) {
            function getStyle(el, name) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(el, null);
                }
                else {
                    return el.currentStyle;
                }
            }
            let width = getStyle(wrapDom, "width").width;
            let height = getStyle(wrapDom, "height").height;
            chartDom.style.width = width;
            chartDom.style.height = height;
        },
        storeOverViewEchartsPie() {
            let wrapDom = this.$refs.storeOverViewEchartPieWrap;
            let chartDom = this.$refs.storeOverViewEchartPie;
            this.setEchartStyle(wrapDom, chartDom)
            this.storeOverViewEchart = this.$echarts.init(chartDom);
            this.setStoreOverViewEchartOptions()
        },
        productCountEchartPie() {
            let wrapDom = this.$refs.productCountEchartPieWrap;
            let chartDom = this.$refs.productCountEchartPie;
            this.setEchartStyle(wrapDom, chartDom)
            this.productCountEchart = this.$echarts.init(chartDom);
            this.setGoodsCountEchartOptions()
        },
        setGoodsCountEchartOptions() {
            let options = new pieOptions();
            let { goodsCount, drugCount, apparatusCount } = this.goodsCountData;
            options.title.text = "商品总数";
            options.title.subtext = "商品总数:" + goodsCount;
            options.color = this.colors;
            options.series[0].name = "商品数量";
            options.series[0].data = [
                { value: drugCount, name: "药品" },
                { value: apparatusCount, name: "药械" },
            ];
            console.log(options);
            this.productCountEchart && this.productCountEchart.setOption(options);
        },
        setStoreOverViewEchartOptions() {
            let options = new pieOptions();
            let { warehouseSumCount, warehouseFreeCount, warehouseUseCount, warehouseUseRate } = this.storeOverViewData;
            options.title.text = "仓库概览";
            options.title.subtext = `库房总数: ${warehouseSumCount} 使用率 ${warehouseUseRate}`;
            options.color = this.colors;
            options.series[0].name = "仓库概览";
            options.series[0].data = [
                { value: warehouseFreeCount, name: "已入住" },
                { value: warehouseUseCount, name: "空库房" },
            ];
            console.log(options);
            this.storeOverViewEchart && this.storeOverViewEchart.setOption(options);

        }
    },
}
</script>
<style lang="scss" scoped>
$legendBule: #0E78F3;
$legendOrange: #FF3306;

.bgBlue {
    background-color: $legendBule;
}

.bgOrange {
    background-color: $legendOrange;
}

.page-container {

    width: 100%;
    min-width: calc(1200px - 40px);
    height: 100%;
    padding: 40px 30px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0px;
    }
}

.page-content {
    display: flex;
    width: 100%;
    height: 100%;
}

.page-left {
    width: 30%;
    height: 100%;
    margin-right: 40px;

    &-section {
        width: 100%;
        // width: 571px;
        // height: 405px;
        height: calc((100% - 35px)/2);
        // padding: 20px;
        border: 1px solid #3f5090;
        border-radius: 4px;
        background: rgba(32, 110, 212, .1);

        &:first-child {
            margin-bottom: 35px;
        }
    }


}

.page-right {
    flex: 1;
    padding: 20px;
    border: 1px solid #3f5090;
    border-radius: 4px;
    background: rgba(32, 110, 212, .1);

    .storehouse-list {
        display: flex;
        flex-wrap: wrap;
    }

    .storehouse-item {
        // flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc((100% - 200px)/5);
        // width: 192px;
        height: 60px;
        margin: 20px 20px;
        text-align: center;
        background-color: #2395FF;
        font-size: 12px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      
        // box-shadow: 0 0px 15px 2px  #2395FF;
        box-shadow:  4px 5px 5px #409EFF; //
        text-shadow: 2px 2px 4px #000000;//字体
    }
}


.page-footer {
    margin:20px 10px 10px 10px;
    text-align: right;

    ::v-deep .el-pagination {

        .is-background .btn-prev,
        .is-background .btn-next,
        .is-background .el-pager li:not(.active):not(.disabled) {
            background-color: transparent !important; //修改默认的背景色
            // color: #3f5090;
            // border: 1px solid #3f5090;
        }
    }
}
</style>
