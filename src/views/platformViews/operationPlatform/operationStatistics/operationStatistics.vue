<template>
    <div class="page-container">
        <div class="page-header">
            <div class="header-item" v-for="(item, index) in statistics" :key="index">
                <img v-lazy class="icon" :src="item.icon" alt="" srcset="">
                <div class="text">
                    <div class="tip" v-if="item.showTip">
                        <span>{{ item.tiptext }}</span>
                        <img v-lazy :src="datatip" alt="">
                        <span>{{ item.percent }}</span>
                    </div>
                    <count-to class="num" :decimals="item.key == 'orderAmount' ? 1 : 0" :startVal='0'
                        :endVal='+item.num' :duration=4000></count-to>
                    <div class="desc">{{ item.desc }}</div>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="flex row row1">
                <!-- 交易额数据 -->
                <div class="trade-amount card aside-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>交易额数据</span>
                            <img v-lazy :src="titleLight" alt="">
                        </div>

                    </div>
                    <div class="card-content" >
                        <Echart3DPie :amounts="pie3dOptions" wrapRef="echart3dPieWrap" />
                    </div>
                </div>
                <!-- 行政政策 -->
                <div class="policy card center-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>行政政策</span>
                            <img v-lazy :src="titleLight" alt="">
                            <span class="more">查看更多</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="policy" v-for="(item, index) in policyList" :key="item.id">{{ index +
                                1
                        }}.&nbsp;{{ item.title }}</p>
                        <!-- <p>1. 最新政策：国家药监局药审中心发布《罕见疾病药物临床研究统计学指导原则（试行）》</p>
                        <p>2. 国家药监局发布政策速览第37期，持续推进仿制药一致性评价。</p>
                        <p>3. 2021年我国化学药品制剂制造行业相关……</p>
                        <p>4. 医药健康行业政策大梳理(2022)：拨云见日。</p>
                        <p>5. 《药品管理法实施条例》迎来修订！</p>
                        <p>6. 政策盘点：各省医保政策如何为中医药发展注入……</p>
                        <p>7. 多地发布中医药发展规划，推进中药创新成主要任务。</p>
                        <p>8. 最新政策：国家药监局药审中心发布《罕见疾病药物临床研究统计学指导原则（试行）》</p>
                        <p>9 最新政策：国家药监局药审中心发布《罕见疾病药物临床研究统计学指导原则（试行）》</p>
                        <p>10. 最新政策：国家药监局药审中心发布《罕见疾病药物临床研究统计学指导原则（试行）》</p> -->
                    </div>
                </div>
                <!-- 企业销量分析 -->
                <div class="sales card aside-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>企业销量分析</span>
                            <img v-lazy :src="titleLight" alt="">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="sales-list">
                            <div class="sales-item" v-for="(item, index) in salesData" :key="index">
                                <div class="sales-text">
                                    <div class="text-comp" :style="{ color: index> (colors.length - 1)?colors[index%colors.length]:colors[index]  }"><span class="legend-sign"
                                            :style="{ 'border-color': colors[index] }"></span>{{ item.unitName }}</div>
                                    <div class="text-count">{{ item.orderCount }}</div>
                                </div>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="18"
                                    :color="colors[index]" :percentage="item.rate * 100">
                                </el-progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex row row2">
                <!-- 药品器械批发数据 -->
                <div class="whole-sales card aside-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>药品器械批发数据</span>
                            <img v-lazy :src="titleLight" alt="">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="tips">单位&nbsp;(万)</div>
                        <div class="sales-grid">
                            <div class="grid-row">
                                <div class="grid-item">
                                    <img v-lazy src="./image/Stocks.png" alt="" srcset="">
                                    <div class="item-right">
                                        <span class="text">批发总量</span>
                                        <span class="count">{{ wholeSalesData.sumCount }}</span>
                                    </div>
                                </div>
                                <div class="grid-light"></div>
                                <div class="grid-item">
                                    <img v-lazy src="./image/SystemTask.png" alt="" srcset="">
                                    <div class="item-right">
                                        <span class="text">日批总量</span>
                                        <span class="count">{{ wholeSalesData.dayCount }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-light" style="width: 100%; height: 1px;"></div>
                            <div class="grid-row">
                                <div class="grid-item">
                                    <img v-lazy src="./image/Inspection.png" alt="" srcset="">
                                    <div class="item-right">
                                        <span class="text">周批发量</span>
                                        <span class="count">{{ wholeSalesData.weekCount }}</span>
                                    </div>

                                </div>
                                <div class="grid-light"></div>

                                <div class="grid-item">
                                    <img v-lazy src="./image/Cheap.png" alt="" srcset="">
                                    <div class="item-right">
                                        <span class="text">年批发量</span>
                                        <span class="count">{{ wholeSalesData.yearCount }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 年度涨幅趋势 -->
                <div class="increase-trend card center-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>年度涨幅趋势</span>
                            <img v-lazy :src="titleLight" alt="">
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="trend-left">
                            <div class="top">
                                <div class="percentage"><span class="num">{{ yearTradeRiseData.jyeSsbl }}</span>%</div>
                                <div class="text">2022年度交易额上升</div>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="11" color="#2EA1F8"
                                    :percentage="yearTradeRiseData.jyeSsbl">
                                </el-progress>
                            </div>
                            <div class="bottom">
                                <div class="percentage"><span class="num">{{ yearTradeRiseData.qysSsbl }}</span> %</div>
                                <div class="text">2022年度企业数额上升</div>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="11" color="#F8CF5D"
                                    :percentage="yearTradeRiseData.qysSsbl">
                                </el-progress>
                            </div>
                        </div>
                        <div class="trend-right" id="increaseTrendLineWrap" ref="increaseTrendLineWrap">
                            <div id="increaseTrendLine" ref="increaseTrendLine"></div>
                        </div>
                    </div>
                </div>
                <!-- 便捷服务 -->
                <div class="convenient-service card aside-card">
                    <div class="card-header">
                        <div class="card-title">
                            <span>便捷服务</span>
                            <img v-lazy :src="titleLight" alt="">
                        </div>
                    </div>
                    <div class="card-content" id="serviceColumnWrap" ref="serviceColumnWrap">
                        <div id="serviceColumn" ref="serviceColumn"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { increaseOption } from './utils/line';
import { getBarOptions } from './utils/column';
import { setEchartStyle } from '@/utils/setEchartStyle';
import dayjs from 'dayjs';

import {
    policyList, getPtjytjsj, getQyxlfx, getJyesj, getYpqxpfsj, getJyeYearZfqs, getJyQysSsbl, getBjfwList
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import Echart3DPie from "./components/echart3DPie.vue";
export default {
    data() {
        return {
            stcTradeMap: {
            },
            titleLight: require("./image/titleLight.png"),
            datatip: require("./image/datatip.png"),
            // 交易数据
            tradeInfo: {
                comPanyCount: 0,// 企业数量
                orderAmount: 0,// 交易总金额
                orderCount: 0,// 交易总量
                dayTotal: 0,// 日交易量
                weekTotal: 0,// 周交易量
                monthTotal: 0,// 月交易量
                quarterTotal: 0,// 季度交易量
                yearTotal: 0 // 年交易量
            },
            // 头部交易数据
            statistics: [
                { icon: require("./image/statisticsIcon1.png"), key: 'comPanyCount', num: '0', desc: "企业数量" },
                { icon: require("./image/statisticsIcon2.png"), key: 'orderCount', num: "0", desc: "交易总量(万)" },
                { icon: require("./image/statisticsIcon3.png"), key: 'dayTotal', num: "0", desc: "日交易量(笔)", showTip: true, tiptext: "日比", ratekey: 'dayRate', percent: "0%" },
                { icon: require("./image/statisticsIcon4.png"), key: 'weekTotal', num: "0", desc: "周交易量(笔)", showTip: true, tiptext: "周比", ratekey: 'weekRate', percent: "0%" },
                { icon: require("./image/statisticsIcon5.png"), key: 'monthTotal', num: "0", desc: "月交易量(笔)", showTip: true, tiptext: "月比", ratekey: 'monthRate', percent: "0%" },
                { icon: require("./image/statisticsIcon6.png"), key: 'yearTotal', num: "0", desc: "年交易量(笔)", showTip: true, tiptext: "年比", ratekey: 'yearRate', percent: "0%" },
                { icon: require("./image/statisticsIcon7.png"), key: 'orderAmount', num: "0", desc: "交易总额(亿)" },
            ],
            // 交易额数据 3d环形图数据
            pie3dOptions: [],
            // 企业销量分析
            salesData: [
                { unitName: "公司1", orderCount: 332, rate: 70 },
                { unitName: "公司2", orderCount: 252, rate: 60 },
                { unitName: "公司3", orderCount: 149, rate: 50 },
                { unitName: "公司4", orderCount: 98, rate: 30 },
                { unitName: "公司5", orderCount: 58, rate: 30 },
                { unitName: "公司6", orderCount: 58, rate: 30 },
            ],
            oldcolors: [
                "linear-gradient(0deg, #1991EB 0%, #2EA1F8 100%)",
                "linear-gradient(0deg, #7F5BE6 1%, #9D8FE3 100%)",
                "linear-gradient(0deg, #24B00D 0%, #59DA44 100%)",
                "linear-gradient(0deg, #FDBA00 0%, #F8CF5D 100%);",
                "linear-gradient(0deg, #FB3572 0%, #FC759E 100%)",
                "linear-gradient(0deg, #FB7635 0%, #FB7635 100%);"
            ],
            colors: [
                "#2EA1F8",
                "#9D8FE3",
                "#59DA44",
                "#F8CF5D",
                "#FC759E",
                "#FB7635"
            ],
            policyList: [],// 政策信息
            // 药品器械批发数据
            wholeSalesData: {
                sumCount: 0,// 批发总量
                dayCount: 0,// 日批发量
                weekCount: 0,// 周批发量
                yearCount: 0// 年批发量
            },
            // 年度涨幅趋势
            yearTrendData: [{
                yf: '',// 月份
                amount: 0 // 交易金额
            }],
            // 交易和企业数上升比
            yearTradeRiseData: {
                jyeSsbl: 0,// 交易额上升比
                qysSsbl: 0 // 企业数上升比
            },
            // 便捷服务
            convenientServiceData: [
                {
                    yf: '',// 月份
                    electricFee: 0,// 电费
                    propertyFee: 0,// 物业费
                    rentFee: 0,// 房屋租赁
                    waterFee: 0,// 水费
                }
            ],
            increaseTrendEchart: null,
            serviceColumnEchart: null

        };
    },
    created() {
        this.getPolicyArticle()
        this.getTradeData()
        this.getSalesData()
        this.getPie3dData()
        this.getWholeSalesData()
        this.getYearTrendData()
        this.getYearTradeRiseData()
        this.getConvenientServiceData()
    },
    mounted() {
        this.echartsLine();
        this.echartsColumn();
        window.onresize = () => {
            this.changeSize()
        }
    },
    watch: {
        convenientServiceData() {
            this.echartsColumn();
        }
    },
    methods: {
        changeSize() {
            let increaseTrendWrap = this.$refs.increaseTrendLineWrap;
            let increaseTrend = this.$refs.increaseTrendLine;
            let serviceColumnWrap = this.$refs.serviceColumnWrap;
            let serviceColumn = this.$refs.serviceColumn;
            this.setEchartStyle(increaseTrendWrap, increaseTrend)
            this.setEchartStyle(serviceColumnWrap, serviceColumn)
            this.increaseTrendEchart.resize()
            this.serviceColumnEchart.resize()
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
        getPolicyArticle() {
            policyList().then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.policyList = res.data?.list
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getTradeData() {
            getPtjytjsj().then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    this.tradeInfo = data;
                    this.statistics = this.statistics.map(item => {
                        item.num = data[item.key];
                        item.percent = data[item.ratekey] + '%'
                        return item
                    })



                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getPie3dData() {
            getJyesj().then(res => {
                console.log(res);
                if (res.code == 200) {
                    let { dayAmount, monthAmount, yearAmount, sumAmount } = res.data;
                    let arr = [dayAmount, monthAmount, yearAmount, sumAmount]
                    this.pie3dOptions = arr;
                    console.log(this.pie3dOptions);
                    // this.$refs.echart3dPie.setOptions()
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getSalesData() {
            getQyxlfx().then(res => {
                console.log(res);
                if (res.code == 200) {
                    // this.salesData = res.data;
                    this.salesData = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getWholeSalesData() {
            getYpqxpfsj().then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.wholeSalesData = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getYearTrendData() {
            let year = new Date().getFullYear() + '';
            getJyeYearZfqs({ year }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.yearTrendData = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getYearTradeRiseData() {
            let year = new Date().getFullYear() + '';
            console.log(year);
            getJyQysSsbl({ year }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    let data = res.data;
                    data.jyeSsbl = +data.jyeSsbl.replace(/%/, '')
                    data.qysSsbl = +data.qysSsbl.replace(/%/, '')
                    console.log(data);
                    this.yearTradeRiseData = data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getConvenientServiceData() {
            let time = dayjs(new Date());
            let beginMonth = time.format("YYYY") + '-01';
            let endMonth = time.format("YYYY-MM");
            getBjfwList({ beginMonth, endMonth }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.convenientServiceData = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getColors() {
            // colors
        },
        echartsLine() {
            let wrapDom = this.$refs.increaseTrendLineWrap;
            let chartDom = this.$refs.increaseTrendLine;
            this.setEchartStyle(wrapDom, chartDom);
            this.increaseTrendEchart = this.$echarts.init(chartDom);
            let amountArr = this.yearTrendData.map(item => item.orderAmount)
            increaseOption.series[0].data = amountArr;
            this.increaseTrendEchart.setOption(increaseOption);
        },
        echartsColumn() {
            let wrapDom = this.$refs.serviceColumnWrap;
            let chartDom = this.$refs.serviceColumn;
            setEchartStyle(wrapDom, chartDom);
            this.serviceColumnEchart = this.$echarts.init(chartDom);
            console.log(this.convenientServiceData, this.convenientServiceData.map(item => item.yf));
            let electricFeeArr = this.convenientServiceData.map(item => item.electricFee)
            let propertyFeeArr = this.convenientServiceData.map(item => item.propertyFee)
            let rentFeeArr = this.convenientServiceData.map(item => item.rentFee)
            let waterFeeArr = this.convenientServiceData.map(item => item.waterFee)
            let seriesDataArr = [electricFeeArr, propertyFeeArr, rentFeeArr, waterFeeArr]
            let monthArr = this.convenientServiceData.map(item => item.yf)
            let columns = ['水费', '电费', '物业费', '房屋租赁']
            let columnOptions = getBarOptions(columns, seriesDataArr, monthArr)
            console.log(columnOptions);
            columnOptions && this.serviceColumnEchart.setOption(columnOptions);
        },

    },
    components: {
        Echart3DPie,
    }
}
</script>
<style lang="scss" src="./operationStatistics.scss" scoped>
// ::v-deep .el-progress__text {
// margin-top: -40px;
// margin-left: -32px;
// color: #fff;
// font-size: 12px !important;
// }

</style>
