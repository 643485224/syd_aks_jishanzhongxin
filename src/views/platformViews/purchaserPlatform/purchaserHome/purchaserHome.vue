<template>
  <div class="page-container" id="card_logo">
    <div class="cards_list">
      <div class="card card_logo">
        <img class="logo_img" src="./image/logo.png" alt="" srcset="" />
        <div class="logo_title">阿克苏药品集散中心</div>
        <div class="logo_body">
          信用分:&nbsp;&nbsp;
          <span style="color: red"> 98 </span>
          &nbsp;&nbsp;极好
        </div>
      </div>
      <!-- <div>
        <el-button type="primary" @click="enterfullscreen">全屏</el-button>
        <el-button type="primary" @click="exitfullscreen">退出全屏</el-button>
      </div> -->
      <div class="card card_pie" ref="transactionStatistics">
        <cu-echart-pie
          v-if="istrue"
          :idEchartPie="'transactionStatistics'"
          :valueData="transactionStatisticsData"
        ></cu-echart-pie>
      </div>
    </div>
    <div class="card card_line" ref="transactionStatisticss">
      <cu-echart-line
        v-if="istrue"
        :idEchartLine="'transactionStatisticss'"
        :orderAmountArr="trendData.orderAmountArr"
        :orderCountArr="trendData.orderCountArr"
        :yfArr="trendData.yfArr"
      ></cu-echart-line>
    </div>

    <!-- 销售排行表格 -->
    <div class="card sale-tables">
      <div class="sale-tables-header">
        <div class="sale-tables-title">近30天销售排行</div>
      </div>
      <div class="sale-tables-content">
        <div class="sale-tables-item left-table">
          <div class="table-details">
            <div class="table-title">
              药品销售<span class="light">TOP20</span>
            </div>
            <div class="more">查看全部></div>
          </div>
          <cu-table
            class="sale-table"
            :height="tableHeight"
            :showPagination="false"
            :showTitle="false"
            :tableHeader="drugSalesHeader"
            :tableData="drugSales"
          ></cu-table>
        </div>
        <div class="sale-tables-item right-table">
          <div class="table-details">
            <div class="table-title">
              器械销售<span class="light">TOP20</span>
            </div>
            <div class="more">查看全部></div>
          </div>
          <cu-table
            class="sale-table"
            :height="tableHeight"
            :showPagination="false"
            :showTitle="false"
            :tableHeader="instrumentSalesHeader"
            :tableData="instrumentSales"
          ></cu-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  buyerBuyerHomePageGetAnnualPurTrend,
  buyerBuyerHomePageGetApparatus30Top20,
  buyerBuyerHomePageGetDrug30Top20,
  buyerBuyerHomePageGetStats,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";

export default {
  data() {
    return {
      istrue: true,
      tableHeight: 295,
      drugTableHeight: 0,

      trendData: {
        orderAmountArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 采购金额
        orderCountArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 采购笔数
        yfArr: [
          "2022-01",
          "2022-02",
          "2022-03",
          "2022-04",
          "2022-05",
          "2022-06",
          "2022-07",
          "2022-08",
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
        ], // 月份
      },
      trendShuju: [],
      drugSales: [],
      drugSalesHeader: [
        { title: "类别", key: "categoryName" },
        { title: "商品名称", key: "drugName" },
        { title: "规格", key: "specification" },
        { title: "交易金额（元）", key: "orderAmount" },
        { title: "交易笔数", key: "orderCount" },
      ],
      instrumentSales: [],
      instrumentSalesHeader: [
        { title: "类别", key: "categoryName" },
        { title: "商品名称", key: "apparatusName" },
        { title: "规格", key: "specification" },
        { title: "交易金额（元）", key: "orderAmount" },
        { title: "交易笔数", key: "orderCount" },
      ],
      transactionStatisticsData: [
        {
          name: "交易金额",
          value: 0,
        },
        {
          name: "已支付金额",
          value: 0,
        },
        {
          name: "待支付发票金额",
          value: 0,
        },
        {
          name: "待开票金额",
          value: 0,
        },
        {
          name: "代收票金额",
          value: 0,
        },
      ],
    };
  },
  created() {
    this.buyerBuyerHomePageGetStatsApi(); // 获取采购商统计信息-接口
    this.buyerBuyerHomePageGetAnnualPurTrendApi(); // 获取年度采购趋势信息-接口
    this.buyerBuyerHomePageGetApparatus30Top20Api(); // 获取平台近30天器械排行前20-接口
    this.buyerBuyerHomePageGetDrug30Top20Api(); // 获取平台近30天药品排行前20-接口
  },
  watch: {},
  mounted() {
    this.tableHeight = 210;
    this.handleHeight();
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算echarts
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 获取采购商统计信息-接口
    buyerBuyerHomePageGetStatsApi() {
      buyerBuyerHomePageGetStats()
        .then((res) => {
          if (res.code == 200) {
            this.transactionStatisticsData[0].value =
              res.data.orderAmount == null ? 0 : res.data.orderAmount; //交易金额
            this.transactionStatisticsData[1].value =
              res.data.yzfAmount == null ? 0 : res.data.yzfAmount; //已支付金额
            this.transactionStatisticsData[2].value =
              res.data.dzfAmount == null ? 0 : res.data.dzfAmount; //待支付发票金额
            this.transactionStatisticsData[3].value =
              res.data.dkpAmount == null ? 0 : res.data.dkpAmount; //待开票金额
            this.transactionStatisticsData[4].value =
              res.data.dspAmount == null ? 0 : res.data.dspAmount; //代收票金额
            this.handleHeight(); // 根据浏览器大小计算echarts,通过v-if保证每次变化能将宽高重新渲染
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取年度采购趋势信息-接口
    buyerBuyerHomePageGetAnnualPurTrendApi() {
      let valueData = {
        startMonth: 1,
        endMonth: 12,
      };
      buyerBuyerHomePageGetAnnualPurTrend(valueData)
        .then((res) => {
          if (res.code == 200) {
            for (let i = 1; i < 13; i++) {
              let now = new Date();
              let mm = i < 10 ? "0" + i : i;
              let time = now.Format("yyyy") + "-" + mm;
              let object = {
                month: time,
                count: 0,
                amount: 0,
              };
              this.trendShuju.push(object);
            }
            res.data.forEach((element) => {
              this.trendShuju.forEach((elemen) => {
                if (element.month == elemen.month) {
                  elemen.count = element.count;
                  elemen.amount = element.amount;
                }
              });
            });
            this.trendData.orderAmountArr = this.trendShuju.map(
              (item) => item.amount
            );
            this.trendData.orderCountArr = this.trendShuju.map(
              (item) => item.count
            );
            this.trendData.yfArr = this.trendShuju.map((item) => item.month);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取平台近30天器械排行前20-接口
    buyerBuyerHomePageGetApparatus30Top20Api() {
      buyerBuyerHomePageGetApparatus30Top20()
        .then((res) => {
          if (res.code == 200) {
            this.instrumentSales = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取平台近30天药品排行前20-接口
    buyerBuyerHomePageGetDrug30Top20Api() {
      buyerBuyerHomePageGetDrug30Top20()
        .then((res) => {
          if (res.code == 200) {
            this.drugSales = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据浏览器大小计算echarts,通过v-if保证每次变化能将宽高重新渲染
    handleHeight() {
      this.istrue = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.istrue = true;
        }, 600);
      });
    },
    //控制全屏
    enterfullscreen() {
      //进入全屏
      var docElm = document.getElementById("card_logo"); // 指定容器id
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    //退出全屏
    exitfullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },

    //自适应
    setEchartStyle(wrapDom, chartDom) {
      function getStyle(el, name) {
        // console.log(el,el.currentStyle);
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
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
  },
};
</script>
<style lang="scss" scoped>
@import "./purchaserHome.scss";
</style>
