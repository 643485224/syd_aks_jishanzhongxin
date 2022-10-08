<template>
  <div class="page-container">
    <div class="statistics-cards">
      <!-- v-for="(item,index) in statistics" :key="index" -->
      <div class="card-item logo-card">
        <div class="card-content">
          <img class="logo" :src="logo" alt="" srcset="">
          <p class="logo-title">阿克苏药品集散中心</p>
        </div>
      </div>
      <div class="card-item echart-wrap" id="orderCountEchartWrap" ref="orderCountEchartWrap">
        <!-- <div id="orderCountEchartPie"></div> :defaultOptions="pieDefaultOptions" title="订单统计" subText="订单统计" seriesName="订单统计" :colors="colors" -->
        <echarts-pie wrapRef="orderCountEchartWrap" :key="'orderCountEchartWrap'" :enableAllReplace="true" :optionsData="orderCountData"></echarts-pie>
      </div>
      <div class="card-item trade-card">
        <div class="card-header">
          <div class="card-title">交易统计</div>
        </div>
        <div class="card-content">
          <div class="trade-amount">
            <!-- :decimals="2"  -->
            <count-to class="trade-amount-num" :decimals="2" :startVal='0' :endVal='overViewData.orderAmount'
              :duration=4000></count-to>
            <div class="trade-amount-text">交易金额(万元)</div>
          </div>
          <div class="trade-count">
            <count-to class="trade-count-num" :startVal='0' :endVal='overViewData.orderCount' :duration=4000></count-to>
            <div class="trade-count-text">交易笔数</div>
          </div>
        </div>
      </div>
      <!-- 结算统计  -->
      <div class="card-item echart-wrap" ref="settlementEchartWrap">
        <!-- <div id="settlementEchartPie"></div> -->
        <echarts-pie wrapRef="settlementEchartWrap" :key="'settlementEchartWrap'" :enableAllReplace="true" :optionsData="settlementData">
        </echarts-pie>
      </div>
      <!-- 信用超期预警 -->
      <div class="card-item echart-wrap" ref="creditWarningEchartWrap">
        <!-- <div id="creditWarningEchartPie"></div> -->
        <echarts-pie wrapRef="creditWarningEchartWrap" :key="'creditWarningEchart'" :enableAllReplace="true" :optionsData="creditWarningData">
        </echarts-pie>
      </div>
      <!-- 商品预警 -->
      <div class="card-item echart-wrap" id="goodsWarningEchartWrap">
        <div id="goodsWarningEchartPie"></div>
      </div>
    </div>
    <!-- 年度采购趋势 -->
    <div class="purcharse-trend" ref="purcharseTrendEchartWrap">
      <div  ref="purcharseTrendEchartLine"></div>
    </div>
    <!-- 销售排行表格 -->
    <div class="sale-tables">
      <div class="sale-tables-header">
        <div class="sale-tables-title">近30天销售排行</div>
      </div>
      <div class="sale-tables-content">
        <div class="sale-tables-item left-table">
          <div class="table-details">
            <div class="table-title">药品销售<span class="light">TOP20</span></div>
            <div class="more">查看全部></div>
          </div>
          <cu-table class="sale-table" :height="tableHeight" :border="false" :showPagination="false" :showTitle="false"
            :tableHeader="drugSalesHeader" :tableData="drugSales"></cu-table>
        </div>
        <div class="sale-tables-item right-table">
          <div class="table-details">
            <div class="table-title">器械销售<span class="light">TOP20</span></div>
            <div class="more">查看全部></div>

          </div>
          <cu-table class="sale-table" :height="tableHeight" :border="false" :showPagination="false" :showTitle="false"
            :tableHeader="instrumentSalesHeader" :tableData="instrumentSales"></cu-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { pieCommonOptions, lineOptions } from './echartsOption'
import { getGltjData, getCgqsList, getDrug30Top20, getApparatus30Top20 } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import dayjs from 'dayjs'
import echartsPie from './echarts-pie.vue'

export default {
  components: {
    echartsPie
  },
  data() {
    return {
      logo: require('./image/logo.png'),
      orderCountEchartPie: null,
      settlementEchartPie: null,
      creditWarningEchartPie: null,
      goodsWarningEchartPie: null,
      purcharseTrendEchartLine: null,
      tableHeight: 295,
      drugTableHeight: 0,
      overViewData: {
        dfkCount: 0,// 待付款订单数
        dfhCount: 0,// 待发货订单数
        dshCount: 0,// 待收货订单数
        orderCount: 0,// 交易笔数
        orderAmount: 0,// 交易金额
        yjsAmount: 0,// 已结算金额
        wjsAmount: 0,// 未结算金额
        fhcqCount: 0,// 订单发货超期数
        cqfkCount: 0,// 订单付款超期数
        dxyCount: 0,// 合同待响应数
        yjkcCount: 0,// 预警库存商品数
        dsjspCount: 0,// 待上架商品数
        dshspCount: 0,// 待审核商品数
      },
      orderCountData: {},
      settlementData: {},
      creditWarningData: {},
      trendData: [
        {
          orderAmount: 0, // 采购金额 
          orderCount: 0,// 采购笔数
          yf: ''// 月份
        }
      ],
      drugSales: [],
      drugSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "drugName",width:120 },
        { title: "规格", key: "specification", },
        { title: "交易金额（元）", key: "orderAmount",width:120 },
        { title: "交易笔数", key: "orderCount",},
      ],
      instrumentSales: [],
      instrumentSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "apparatusName",width:120, },
        { title: "规格", key: "specification" },
        { title: "交易金额（元）", key: "orderAmount",width:120, },
        { title: "交易笔数", key: "orderCount" },
      ],
      colors: ['#0E78F3', '#FF3306', '#FFDC60', '#3CE500', '#FF003D'],
      pieDefaultOptions: null,
    };
  },
  created() {
    this.getOverViewData()
    this.getTrendData() // 年度采购趋势数据
    this.getDrugSales()// 药品销售排行 top 20
    this.getInstrumentSales()// 器械销售排行 top 20
  },
  watch: {
    overViewData() {
      // this.setOrderCountEchartPie();
      // this.setSettlementEchartPie();
      // this.setCreditWarningEchartPie();
      this.setGoodsWarningEchartPie();
      this.initOrderCountData()
      this.initSettlementData()
      this.initCreditWarningData()
    },
    trendData() {
      this.setTrendEchartsLine();

    }
  },
  mounted() {
    this.tableHeight = 210
    // this.setOrderCountEchartPie();
    // this.setSettlementEchartPie();
    // this.setCreditWarningEchartPie();
    this.setGoodsWarningEchartPie();
    this.setTrendEchartsLine();
    window.onresize = () => {
      setTimeout(()=> {this.changeSize()},500)
    }
  },

  methods: {
    changeSize() {
      let trendWrap = this.$refs.purcharseTrendEchartWrap;
      let trendEchart = this.$refs.purcharseTrendEchartLine;
      this.setEchartStyle(trendWrap, trendEchart)
      this.purcharseTrendEchartLine && this.purcharseTrendEchartLine.resize()
    },
    //自适应
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
    getOverViewData() {
      getGltjData().then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.overViewData = data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getTrendData() {
      let time = dayjs(new Date());
      let beginMonth = time.format("YYYY") + '-01';
      let endMonth = time.format("YYYY-MM");
      console.log('time', beginMonth, endMonth);
      getCgqsList({ beginMonth, endMonth }).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.trendData = data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getDrugSales() {
      getDrug30Top20().then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.drugSales = data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getInstrumentSales() {
      getApparatus30Top20().then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.instrumentSales = data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    initOrderCountData() {
      let options = new pieCommonOptions()
      options.title[0].text = "订单统计";
      options.title[1].subtext = "订单统计";
      options.series[0].name = "订单统计";
      options.series[0].data = [
        { value: this.overViewData.dfkCount, name: "待付款" },
        { value: this.overViewData.dfhCount, name: "待发货" },
        { value: this.overViewData.dshCount, name: "待收货" },
      ];
      this.orderCountData = options;
      console.log(this.orderCountData);
    },
    initSettlementData(){
      let options = new pieCommonOptions();
      options.title[0].text = "结算统计";
      options.title[1].subtext = "结算统计";
      options.series[0].name = "结算统计";
      options.series[0].data = [
        { value: this.overViewData.yjsAmount, name: "已结算金额" },
        { value: this.overViewData.wjsAmount, name: "未结算金额" },
      ];
      console.log(options);
      this.settlementData = options;

    },
    initCreditWarningData(){
      let options = new pieCommonOptions();
      options.title[0].text = "信用超期预警";
      options.title[1].subtext = "信用超期预警";
      options.series[0].name = "信用超期预警";
      options.series[0].data = [
        { value: this.overViewData.fhcqCount, name: "订单发货超期数" },
        { value: this.overViewData.fhcqCount, name: "订单付款超期数" },
      ];
      this.creditWarningData = options;

    },
    setOrderCountEchartPie() {
      let orderCountEchartPie = this.orderCountEchartPie;
      let wrapDom = document.querySelector("#orderCountEchartWrap");
      let chartDom = document.querySelector("#orderCountEchartPie");
      this.setEchartStyle(wrapDom, chartDom);
      orderCountEchartPie = this.$echarts.init(chartDom, null, {
        // height: 365,
        // width: 452,
      });

      console.log(options);
      orderCountEchartPie.setOption(options);
      orderCountEchartPie.on("mouseover", function (params) {
        let { name } = params;
        options.title[1].subtext = name;
        orderCountEchartPie.setOption(options);
      });
    },
    setSettlementEchartPie() {
      let settlementEchartPie = this.settlementEchartPie;
      let wrapDom = document.querySelector("#settlementEchartWrap");
      let chartDom = document.getElementById("settlementEchartPie");
      this.setEchartStyle(wrapDom, chartDom);
      settlementEchartPie = this.$echarts.init(chartDom, null, {
        // height: 365,
        // width: 452,
      });
      
      settlementEchartPie.setOption(options);
      settlementEchartPie.on("mouseover", function (params) {
        let { name } = params;
        options.title[1].subtext = name;
        settlementEchartPie.setOption(options);
      });
    },
    setCreditWarningEchartPie() {
      let creditWarningEchartPie = this.creditWarningEchartPie;
      let wrapDom = document.querySelector("#creditWarningEchartWrap");
      let chartDom = document.querySelector("#creditWarningEchartPie");
      this.setEchartStyle(wrapDom, chartDom);
      creditWarningEchartPie = this.$echarts.init(chartDom, null, {
        // height: 365,
        // width: 452,
      });
      
      creditWarningEchartPie.setOption(options);
      creditWarningEchartPie.on("mouseover", function (params) {
        let { name } = params;
        options.title[1].subtext = name;
        creditWarningEchartPie.setOption(options);
      });
    },
    setGoodsWarningEchartPie() {
      let goodsWarningEchartPie = this.goodsWarningEchartPie;
      let wrapDom = document.querySelector("#goodsWarningEchartWrap");
      let chartDom = document.getElementById("goodsWarningEchartPie");
      this.setEchartStyle(wrapDom, chartDom);
      goodsWarningEchartPie = this.$echarts.init(chartDom, null, {
        // height: 365,
        // width: 452,
      });
      let options = new pieCommonOptions();
      options.title[0].text = "商品预警";
      options.title[1].subtext = "商品预警";
      options.series[0].name = "商品预警";
      options.series[0].data = [
        { value: this.overViewData.dsjspCount, name: "待上架" },
        { value: this.overViewData.yjkcCount, name: "预警库存" },
        { value: this.overViewData.dshspCount, name: "待审核" },
      ];
      goodsWarningEchartPie.setOption(options);
      goodsWarningEchartPie.on("mouseover", function (params) {
        let { name } = params;
        options.title[1].subtext = name;
        goodsWarningEchartPie.setOption(options);
      });
    },
    setTrendEchartsLine() {
      let wrapDom = this.$refs.purcharseTrendEchartWrap;
      let chartDom = this.$refs.purcharseTrendEchartLine;
      this.setEchartStyle(wrapDom, chartDom);
      this.purcharseTrendEchartLine = this.$echarts.init(chartDom);
      let options = lineOptions;
      console.log(options);
      let amountArr = this.trendData.map(item => item.orderAmount)
      let countArr = this.trendData.map(item => item.orderCount)
      options.series[0].data = amountArr;
      options.series[1].data = countArr;
      this.purcharseTrendEchartLine && this.purcharseTrendEchartLine.setOption(options);
    },
    mouseover() {
      let { name } = params;
      options.title[1].subtext = name;
      settlementEchartPie.setOption(options);
    }
  },
  beforeDestroy() {
        window.onresize = null;
  },
}
</script>
<style lang="scss" src="./operationHome.scss" scoped>
</style>
<style scoped>
  ::-webkit-scrollbar {
  width: 0px;
}
</style>
