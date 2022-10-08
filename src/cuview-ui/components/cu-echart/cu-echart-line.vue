<template>
  <!-- 饼图组件 -->
  <!-- <div id="idEchartLine"></div> -->
  <div :id="idEchartLine" style="height: 100%; width: 100%"></div>
</template>
<script>
export default {
  name: "cu-echart-line",
  props: {
    // 折线图id
    idEchartLine: {
      type: String,
      default: "idEchartLine",
    },
    // 标题
    text: {
      type: String,
      default: "本年度采购趋势",
    },
    // 标题文字大小
    textFontSize: {
      type: String,
      default: "24",
    },
    // 采购金额
    orderAmountArr: {
      type: Array,
      default: function () {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      },
    },
    // 采购笔数
    orderCountArr: {
      type: Array,
      default: function () {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      },
    },
    // 采购月份
    yfArr: {
      type: Array,
      default: function () {
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      },
    },
  },
  mounted() {
    this.echartsPie();
  },

  methods: {
    echartsPie() {
      let lineColor2 = "rgba(163,43,177,0.6)";
      let lineColor1 = "rgba(176,89,10,0.6)";
      let areaColor2 = "rgba(163,43,177,0.6)";
      let areaColor1 = "rgba(176,89,10,0.6)";
      var chartDom = document.getElementById(this.idEchartLine);
      var myChart = this.$echarts.init(chartDom, null, {
        width: document.getElementById(this.idEchartLine).clientWidth, //获取父级的宽//初始化默认的宽
        height: document.getElementById(this.idEchartLine).clientHeight, //获取父级的高//初始化默认的高
      });
      var option = {
        title: {
          left: "0",
          top: "0",
          text: this.text,
          textStyle: {
            fontSize: this.textFontSize,
            fontWeight: 400,
            color: "#ffffff",
          },
        },
        grid: {
          left: "4%",
          right: "4%",
          top: "20%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        // 图例
        legend: {
          show: true,
          orient: "horizontal",
          left: "right",
          icon: "stack",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30, //图例之间的间距
          textStyle: {
            fontSize: 12,
            fontFamily: "Source Han Sans CN-Regular, Source Han Sans CN",
            fontWeight: 400,
            color: "#FFFFFF",
          },
        },
        color: [lineColor1, lineColor2],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#FFFFFF",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#11366e",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#195384",
              },
            },
            data: this.yfArr,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            nameTextStyle: {
              color: "#FFFFFF",
              fontSize: 14,
            },

            // max: 1000,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#FFFFFF",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#11366e",
              },
            },
            axisTick: {
              show: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#11366e",
                // type: 'dashed'// 网格虚线
              },
            },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        series: [
          {
            name: "采购笔数",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 14, // 折线上圆点大小
            lineStyle: {
              color: lineColor1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              // shadowOffsetY: 5,
              // shadowOffsetX: 5,
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: lineColor1,
              },
            },
            itemStyle: {
              color: lineColor1,
              borderColor: lineColor1,
              borderWidth: 0,
              // shadowColor: 'rgba(0, 0, 0, .3)',
              // shadowBlur: 0,
              // shadowOffsetY: 2,
              // shadowOffsetX: 2,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              color: areaColor1,
              // shadowColor: '',
              // shadowBlur: 20
            },
            data: this.orderCountArr,
          },
          {
            name: "采购金额",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 12,
            lineStyle: {
              color: lineColor2,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              // shadowOffsetY: 5,
              // shadowOffsetX: 5,
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: lineColor2,
              },
            },

            itemStyle: {
              color: lineColor2,
              borderColor: lineColor2,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              // shadowOffsetY: 2,
              // shadowOffsetX: 2,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              color: areaColor2,
              // shadowColor: 'rgba(0,202,149, 0.9)',
              // shadowBlur: 20
            },
            data: this.orderAmountArr,
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
