<template>
  <div class="page-container">
    <div class="statistics-cards">
      <!-- v-for="(item,index) in statistics" :key="index" -->
      <div class="card-item logo-card">
        <div class="card-content">
          <img class="logo" :src="logo" alt="" srcset="">
          <p class="logo-title">{{overViewData.username}}</p>
          <div class="logo_body">
            信用分:&nbsp;&nbsp;
            <span style="color: red"> {{overViewData.score}} </span>
            &nbsp;&nbsp;极好
          </div>
        </div>
      </div>
      <div class="card-item echart-wrap" id="orderCountEchartWrap" ref="orderCountEchartWrap">
        <echarts-pie wrapRef="orderCountEchartWrap" :key="'orderCountEchartWrap'" id="orderCountEchartWrap"
          :enableAllReplace="true" :optionsData="orderCountData"></echarts-pie>
      </div>
      <div class="card-item trade-card">
        <div class="card-header">
          <div class="card-title">交易统计</div>
        </div>
      <div class="card-content">
          <div class="trade-amount">
            <!-- :decimals="2"  -->
            <count-to class="trade-amount-num" :decimals="2" :startVal='0' :endVal='overViewData.jyAmount'
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
        <echarts-pie wrapRef="settlementEchartWrap" :key="'settlementEchartWrap'" id="settlementEchartWrap"
          :enableAllReplace="true" :optionsData="settlementData">
        </echarts-pie>
      </div>
      <!-- 信用超期预警 -->
      <div class="card-item echart-wrap" ref="creditWarningEchartWrap">
        <!-- <div id="creditWarningEchartPie"></div> -->
        <echarts-pie wrapRef="creditWarningEchartWrap" :key="'creditWarningEchart'" id="creditWarningEchart"
          :enableAllReplace="true" :optionsData="creditWarningData">
        </echarts-pie>
      </div>
      <!-- 商品预警 -->
      <div class="card-item echart-wrap" ref="goodsWarningEchartWrap">
        <!-- <div ref="goodsWarningEchartPie"></div> -->
        <echarts-pie wrapRef="goodsWarningEchartWrap" :key="'goodsWarningEchart'" id="goodsWarningEchart"
          :enableAllReplace="true" :optionsData="goodsWarningData">
        </echarts-pie>
      </div>
    </div>
    <!-- 年度采购趋势 -->
    <div class="purcharse-trend" ref="purcharseTrendEchartWrap">
      <div ref="purcharseTrendEchartLine"></div>
    </div>
    <!-- 销售排行表格 -->
    <div class="sale-tables">
      <div class="sale-tables-header">
        <div class="sale-tables-title">近30天药品销售排行</div>
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
            <div class="table-title">本店药品销售<span class="light">TOP20</span></div>
            <div class="more">查看全部></div>

          </div>
          <cu-table class="sale-table" :height="tableHeight" :border="false" :showPagination="false" :showTitle="false"
            :tableHeader="shopDrugSalesHeader" :tableData="shopDrugSales"></cu-table>
        </div>
      </div>
    </div>
    <div class="sale-tables">
      <div class="sale-tables-header">
        <div class="sale-tables-title">近30天器械销售排行</div>
      </div>
      <div class="sale-tables-content">
        <div class="sale-tables-item left-table">
          <div class="table-details">
            <div class="table-title">器械销售<span class="light">TOP20</span></div>
            <div class="more">查看全部></div>
          </div>
          <cu-table class="sale-table" :height="tableHeight" :border="false" :showPagination="false" :showTitle="false"
            :tableHeader="instrumentSalesHeader" :tableData="instrumentSales"></cu-table>
        </div>
        <div class="sale-tables-item right-table">
          <div class="table-details">
            <div class="table-title">本店器械销售<span class="light">TOP20</span></div>
            <div class="more">查看全部></div>

          </div>
          <cu-table class="sale-table" :height="tableHeight" :border="false" :showPagination="false" :showTitle="false"
            :tableHeader="shopInstrumentSalesHeader" :tableData="shopInstrumentSales"></cu-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { pieCommonOptions, lineOptions } from './echartsOption'
import { getApparatus30Top20, getApparatus30Top20OurShop, getAnnualPurchasingTrends, getDrug30Top20, getDrug30Top20Shop, getStatistics } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import dayjs from 'dayjs'
import echartsPie from './echarts-pie.vue'

export default {
  components: {
    echartsPie
  },
  data() {
    return {
      logo: require('@/assets/images/Logo.png'),
      orderCountEchartPie: null,
      settlementEchartPie: null,
      creditWarningEchartPie: null,
      goodsWarningEchartPie: null,
      purcharseTrendEchartLine: null,
      tableHeight: 295,
      overViewData: {
        username: '',// 用户名称
        score: null,// 信用分
        dfkCount: 0,// 待付款订单数
        dfhCount: 0,// 待发货订单数
        dshCount: 0,// 待收货订单数
        orderCount: 0,// 交易笔数
        jyAmount: 0,// 交易金额
        yjsAmount: 0,// 已结算金额
        wjsAmount: 0,// 未结算金额
        fhcqCount: 0,// 订单发货超期数
        yjdddxyCount: 0,// 议价订单待响应数
        htdxyCount: 0,// 合同待响应数
        dsjspCount: 0,// 待上架商品数
        yjkcspCount: 0,// 预警库存商品数
        dshspCount: 0,// 待审核商品数
      },
      orderCountData: {},
      settlementData: {},
      creditWarningData: {},
      goodsWarningData: {},
      trendData: [
        {
          orderAmount: 0, // 采购金额
          orderCount: 0,// 采购笔数
          yf: ''// 月份
        }
      ],
      drugSales: [],
      shopDrugSales: [],
      drugSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "drugName", width: 120 },
        { title: "规格", key: "specification", },
        { title: "交易金额（元）", key: "orderAmount", width: 120 },
        { title: "交易笔数", key: "orderCount", },
      ],
      shopDrugSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "drugName", width: 120 },
        { title: "规格", key: "specification", },
        { title: "交易金额（元）", key: "orderAmount", width: 120 },
        { title: "交易笔数", key: "orderCount", },
      ],
      instrumentSales: [],
      shopInstrumentSales: [],
      instrumentSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "apparatusName", width: 120, },
        { title: "规格", key: "specification" },
        { title: "交易金额（元）", key: "orderAmount", width: 120, },
        { title: "交易笔数", key: "orderCount" },
      ],
      shopInstrumentSalesHeader: [
        { title: "类别", key: "categoryName", },
        { title: "商品名称", key: "apparatusName", width: 120, },
        { title: "规格", key: "specification" },
        { title: "交易金额（元）", key: "orderAmount", width: 120, },
        { title: "交易笔数", key: "orderCount" },
      ],
      colors: ['#0E78F3', '#FF3306', '#FFDC60', '#3CE500', '#FF003D'],
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
      this.initOrderCountData()
      this.initSettlementData()
      this.initCreditWarningData()
      this.initGoodsWarningEchartPie();

    },
    trendData(val) {
      console.log(val);
      this.setTrendEchartsLine();
    }
  },
  mounted() {
    this.tableHeight = 210
    // this.setTrendEchartsLine();
    // window.addEventListener('resize', this.changeSize())
  },

  methods: {
    changeSize() {
      setTimeout(() => {
        let trendWrap = this.$refs.purcharseTrendEchartWrap;
        let trendEchart = this.$refs.purcharseTrendEchartLine;
        this.setEchartStyle(trendWrap, trendEchart)
        this.purcharseTrendEchartLine && this.purcharseTrendEchartLine.resize()
      }, 500)
    },
    //自适应
    setEchartStyle(wrapDom, chartDom) {
      function getStyle(el, name) {
        console.log(el, el.currentStyle);
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
      getStatistics().then(res => {
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
      getAnnualPurchasingTrends({ beginMonth, endMonth }).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.trendData = data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    async getDrugSales() {
      let res = await getDrug30Top20()
      let shopRes = await getDrug30Top20Shop()
      console.log(res, shopRes);
      if (res.code == 200) {
        let data = res.data;
        this.drugSales = data;
      } else {
        this.$message.warning(res.message)
      }
      if (shopRes.code == 200) {
        let data = shopRes.data;
        this.shopDrugSales = data;
      } else {
        this.$message.warning(shopRes.message)
      }
    },
    async getInstrumentSales() {
      let res = await getApparatus30Top20()
      let shopRes = await getApparatus30Top20OurShop()
      console.log(res, shopRes);
      if (res.code == 200) {
        let data = res.data;
        this.instrumentSales = data;
      } else {
        this.$message.warning(res.message)
      }
      if (shopRes.code == 200) {
        let data = shopRes.data;
        this.shopInstrumentSales = data;
      } else {
        this.$message.warning(shopRes.message)
      }

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
    initSettlementData() {
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
    initCreditWarningData() {
      let options = new pieCommonOptions();
      options.title[0].text = "信用超期预警";
      options.title[1].subtext = "信用超期预警";
      options.series[0].name = "信用超期预警";
      options.legend.orient = "vertical";
      options.legend.right = "0%";
      options.series[0].data = [
        { value: this.overViewData.fhcqCount || 0, name: "订单发货超期数" },
        { value: this.overViewData.yjdddxyCount || 0, name: "议价订单待响应数" },
        { value: this.overViewData.htdxyCount || 0, name: "合同待响应数" },
      ];
      this.creditWarningData = options;

    },
    initGoodsWarningEchartPie() {
      let options = new pieCommonOptions();
      options.title[0].text = "商品预警";
      options.title[1].subtext = "商品预警";
      options.series[0].name = "商品预警";
      // options.legend.orient = "vertical";
      // options.legend.right = "0%";
      options.series[0].data = [
        { value: this.overViewData.dsjspCount, name: "待上架" },
        { value: this.overViewData.yjkcspCount, name: "预警库存" },
        { value: this.overViewData.dshspCount, name: "待审核" },
      ];
      this.goodsWarningData = options;
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

  },
  beforeDestroy() {
    // window.onresize = null;
    window.removeEventListener('resize', this.changeSize, false)
  },
}
</script>
<style lang="scss" src="./supplierHome.scss" scoped>

</style>
<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
