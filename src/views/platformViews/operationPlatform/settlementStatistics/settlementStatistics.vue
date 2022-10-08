<template>
    <div class="page-container">
        <div class="settlement-top">
            <div class="settlement-top-item">
                <count-to class="num" :decimals="2" :startVal='0' :endVal='settleData.amount' :duration=4000></count-to>
                <div class="text">余额(元)</div>
            </div>
            <div class="settlement-top-item">
                <count-to class="num" :decimals="2" :startVal='0' :endVal='settleData.todaySettleAmount' :duration=4000>
                </count-to>
                <div class="text">今日结算金额(元)</div>
            </div>
        </div>
        <div class="settlement-bottom">
            <!-- 结算统计 -->
            <div class="settlement-item" id="settlementEchartPieWrap">
                <div id="settlementEchartPie"></div>
            </div>
            <!-- 交易统计 -->
            <div class="settlement-item" id="tradeEchartPieWrap">
                <div id="tradeEchartPie"></div>
            </div>
            <!-- 付款预警 -->
            <div class="settlement-item" id="payEchartPieWrap">
                <div id="payEchartPie"></div>
            </div>
        </div>
    </div>
</template> 
<script>
import { pieCommonOptions } from './echartsOption'
import { getSettleStatData } from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
    data() {
        return {
            settlementEchartPie: null,
            tradeEchartPie: null,
            payEchartPie: null,
            settleData: {
                amount: 0,// 余额
                todaySettleAmount: 0,// 今日结算金额
                yjsAmount: 0,// 已结算金额
                wjsAmount: 0,// 未结算金额
                orderAmount: 0,// 交易金额
                yzfAmount: 0,// 已支付金额
                dzffpAmount: 0,// 待支付发票
                dkpAmount: 0,// 待开票金额
                dspAmount: 0,// 待收票金额
                ycqfkCount: 0,// 预超期付款
                cqfkCount: 0,// 超期付款数
            }

        }
    },
    created() {
        this.getSettlementData()
    },
    mounted() {
        this.setSettlementEchartPie();
        this.setTradeEchartPie();
        this.setPayEchartPie();
    },
    watch: {
        settleData() {
            this.setSettlementEchartPie();
            this.setTradeEchartPie();
            this.setPayEchartPie();
        }
    },
    methods: {
        getSettlementData() {
            getSettleStatData().then(res => {
                if (res.code == 200) {
                    let data = res.data;
                    this.settleData = data;
                }
            }).catch(err => {
                console.log(err);
            })

        },
        setEchartStyle(wrapDom, chartDom) {
            function getStyle(el, name) {
                // console.log(el,el.currentStyle);
                if (window.getComputedStyle) {
                    return window.getComputedStyle(el, null);
                }
                else {
                    return el.currentStyle;
                }
            }
            var wi = getStyle(wrapDom, "width").width;
            var hi = getStyle(wrapDom, "height").height;
            chartDom.style.width = wi;
            chartDom.style.height = hi;
            // // 3. 把配置项给实例对象
            // this.draw3Echart.setOption(option);
            // // 4. 让图表跟随屏幕自动的去适应
            // window.addEventListener("resize", function () {
            //   if (this.draw3Echart != null && this.draw3Echart != "" && this.draw3Echart != undefined) {
            //     this.draw3Echart.resize();
            //   }
            // });
        },
        async setSettlementEchartPie() {
            let settlementEchartPie = this.settlementEchartPie;
            let wrapDom = document.querySelector("#settlementEchartPieWrap");
            let chartDom = document.querySelector("#settlementEchartPie");
            this.setEchartStyle(wrapDom, chartDom);
            settlementEchartPie = this.$echarts.init(chartDom, null, {
                // height: 365,
                // width: 452,
            });
            let options = new pieCommonOptions();
            options.title[0].text = "结算统计(元)";
            options.title[1].subtext = "结算统计";
            options.series[0].name = "结算统计";
            options.series[0].data = [
                { value: this.settleData.yjsAmount, name: "已结算金额" },
                { value: this.settleData.wjsAmount, name: "未结算金额" },
            ];
            settlementEchartPie.setOption(options);
            settlementEchartPie.on("mousemove", function (params) {
                let { name } = params;
                // options = settlementEchartPie.getOptions()
                options.title[1].subtext = name;
                settlementEchartPie.setOption(options);
            });
             settlementEchartPie.on("mouseout", function (params) {
                // options = settlementEchartPie.getOptions()
                options.title[1].subtext = "交易统计";
                settlementEchartPie.setOption(options);
            });
        },
        setTradeEchartPie() {
            let tradeEchartPie = this.tradeEchartPie;
            let wrapDom = document.querySelector("#tradeEchartPieWrap");
            let chartDom = document.querySelector("#tradeEchartPie");
            this.setEchartStyle(wrapDom, chartDom);
            tradeEchartPie = this.$echarts.init(chartDom, null, {
                // height: 365,
                // width: 452,
            });
            let options = new pieCommonOptions();
            options.title[0].text = "交易统计(元)";
            options.title[1].subtext = "交易统计";
            // options.title[1].left = "45%";
            options.series[0].name = "交易统计";
            options.series[0].data = [
                { value: 150, name: "交易金额" },
                { value: 50, name: "已支付金额" },
                { value: 50, name: "待支付金额" },
                { value: 50, name: "待开票金额" },
                { value: 50, name: "代收票金额" },
            ];
            options.legend['orient'] = 'vertical';
            options.legend['right'] = 'auto';
            options.legend['top'] = '16%';
            options.legend['left'] = '2%';
            options.legend['height'] = 'auto';
            options.legend['itemGap'] = 14;
            options.color = ['#0E78F3', '#FF3306', '#FFDC60', '#3CE500', '#FF003D']
            // options.series[0].center= ['50%', '50%']
            // options.series[0].radius= [""]
            tradeEchartPie.setOption(options);
            tradeEchartPie.on("mousemove", function (params) {
                let { name } = params;
                options.title[1].subtext = name;
                tradeEchartPie.setOption(options);
            });
             tradeEchartPie.on("mouseout", function (params) {
                options.title[1].subtext = "交易统计";
                tradeEchartPie.setOption(options);
            });
        },
        setPayEchartPie() {
            let payEchartPie = this.payEchartPie;
            let wrapDom = document.querySelector("#payEchartPieWrap");
            let chartDom = document.querySelector("#payEchartPie");
            this.setEchartStyle(wrapDom, chartDom);
            payEchartPie = this.$echarts.init(chartDom, null, {
                // height: 365,
                // width: 452,
            });
            let options = new pieCommonOptions();
            options.title[0].text = "付款预警";
            options.title[1].subtext = "付款预警";
            options.series[0].name = "付款预警";
            options.series[0].data = [
                { value: 150, name: "预超期付款" },
                { value: 50, name: "已超期付款" },
            ];
            payEchartPie.setOption(options);
            payEchartPie.on("mousemove", function (params) {
                let { name } = params;
                options.title[1].subtext = name;
                payEchartPie.setOption(options);
            });
             payEchartPie.on("mouseout", function (params) {
                options.title[1].subtext = "付款预警";
                payEchartPie.setOption(options);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.page-container {
    width: 100%;
    min-width: calc(1200px - 220px - 40px);
    height: 100%;
    overflow: auto;
    padding-bottom: 40px;

    &::-webkit-scrollbar {
        width: 0px;
    }
}
::-webkit-scrollbar {
  width: 0px;
}

.settlement-top {
    display: flex;
    align-items: center;
    width: 100%;
    height: 212px;
    padding: 20px;
    margin-bottom: 37px;
    border: 1px solid #206ED4;

    &-item {
        flex: 1;
        text-align: center;

        .num {
            font-size: 44px;
            font-weight: bold;
            color: #FF480E;
        }

        .text {
            font-size: 20px;

        }
    }
}

.settlement-bottom {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    .settlement-item {
        width: calc((100% - 100px)/3);
        height: 349px;
        margin-bottom: 35px;
        padding: 20px;
        border: 1px solid #206ED4;

        &:not(:nth-child(3n+3)) {
            margin-right: 50px;
        }



    }
}
</style>
