<template>
  <!-- 饼图组件 -->
  <!-- <div id="idEchartPie"></div> -->
  <div :id="idEchartPie" style="height: 100%; width: 100%"></div>
</template>
<script>
export default {
  name: "cu-echart-pie",
  props: {
    idEchartPie: {
      type: String,
      default: "idEchartPie",
    },
    // 标题
    text: {
      type: String,
      default: "交易统计",
    },
    textFontSize: {
      type: String,
      default: "18",
    },
    // 子标题
    subtext: {
      type: String,
      default: "sfasdfasdf",
    },
    // 标题定位：上 右 下 左 [null,null,null,center]
    titleLocation: {
      type: Array,
      default: function () {
        return ["center", "center", null, null];
      },
    },
    // 具体数值
    valueData: {
      type: Array,
      default: function () {
        return [
          {
            name: "用例1",
            value: 30,
          },
          {
            name: "用例2",
            value: 10,
          },
          {
            name: "用例3",
            value: 20,
          },
          {
            name: "用例4",
            value: 30,
          },
          {
            name: "用例5",
            value: 10,
          },
        ];
      },
    },
    // 颜色
    colors: {
      type: Array,
      default: function () {
        return ["#1DD19B", "#FFA728", "#109AF9", "#2400FF", "#F05C27"];
      },
    },
    // 单位（人、位、个、箱......）
    labelFormatter: {
      type: String,
      default: "{b|{b}}:{c|{c}} 人\n\n",
    },
    // 宽度
    width: {
      type: Number,
      default: 100,
    },
    // 高度
    height: {
      type: Number,
      default: 100,
    },
  },
  mounted() {
    this.echartsPie();
  },

  methods: {
    echartsPie() {
      var chartDom = document.getElementById(this.idEchartPie);
      var myChart = this.$echarts.init(chartDom, null, {
        width: document.getElementById(this.idEchartPie).clientWidth, //获取父级的宽//初始化默认的宽
        height: document.getElementById(this.idEchartPie).clientHeight, //获取父级的高//初始化默认的高
      });
      var option = {
        title: [
          {
            text: this.text,
            top: this.titleLocation[0],
            right: this.titleLocation[1],
            bottom: this.titleLocation[2],
            left: this.titleLocation[3],
            // 主标题文本样式设置
            textStyle: {
              fontSize: this.textFontSize,
              fontWeight: 400,
              color: "#ffffff",
            },
          },
          {
            top: -10,
            left: 0,
            // 副标题
            subtext: "交易统计(元)",
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 24,
              color: "#ffffff",
            },
          },
        ],
        tooltip: {
          trigger: "item",
          confine: true, //将此限制打开后tooltip将不再溢出
          formatter: function (data) {
            return `${data.name} : ${data.value} 笔 `;
            //data.name名称   data.value数值
          },
        },

        legend: {
          orient: "horizontal",
          left: "right",
          height: 30,
          itemWidth: 12, //图例颜色块的宽度和高度
          itemHeight: 12,
          // icon: "circle", // 图例前的图标为圆点
          itemGap: 30, //图例之间的间距
          textStyle: {
            fontSize: 12,
            fontFamily: "Source Han Sans CN-Regular, Source Han Sans CN",
            fontWeight: 400,
            color: "#FFFFFF",
          },
          // formatter: function (name) {
          //   let data = option.series[0].data;
          //   // console.log(data, 'data')
          //   let total = 0;
          //   let tarValue;
          //   for (let i = 0; i < data.length; i++) {
          //     total += data[i].value;
          //     if (data[i].name == name) {
          //       tarValue = data[i].value;
          //     }
          //   }
          //   let v = tarValue + "人";
          //   //计算出百分比
          //   let p = Math.round((tarValue / total) * 100) + "%";
          //   // ${p}
          //   return `${name}  ${v}  `;
          //   //name是名称，v是数值
          // },
        },
        color: this.colors,
        series: [
          {
            center: ["50%", "50%"],
            type: "pie",
            radius: ["50%", "70%"],
            // // 鼠标移上去的item不会凸出了
            // hoverAnimation: false,
            label: {
              // 线上文字的样式
              show: true,
              textStyle: {
                fontSize: 12,
                fontFamily: "Source Han Sans CN-Regular, Source Han Sans CN",
                fontWeight: 400,
                color: "#FFFFFF",
              },
              formatter: function (data) {
                return `${data.name} : ${data.value} 元 `;
                //data.name名称   data.value数值
              },
            },
            labelLine: {
              normal: {
                length: 20,
              },
            },
            data: this.valueData,
            itemStyle: {
              emphasis: {
                shadowBlur: 1, //触摸放大
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
