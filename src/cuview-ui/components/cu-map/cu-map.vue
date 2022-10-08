<template>
  <div id="map" :style="{ height: '100%', width: '100%' }" ref="myEchart"></div>
</template>

<script>
import * as echarts from "echarts";
const akesudiquJson = require("../../../assets/mapData/akesudiqu.json");
export default {
  name: "cu-map",
  data() {
    return {};
  },
  props: {
    list: {
      type: [],
      default: () => [
        {
          name: "温宿县",
          value: 6312312,
          medicalIns: 1,
          pharmacyBuyer: 1,
        },
        {
          name: "沙雅县",
          value: 631112,
          medicalIns: 2,
          pharmacyBuyer: 3,
        },
        {
          name: "阿瓦提县",
          value: 6322,
          medicalIns: 3,
          pharmacyBuyer: 3,
        },
      ],
    },
  },

  mounted() {
    var timer = setInterval(() => {
      if (this.list) {
        this.init(this.list);
        clearInterval(timer); //关闭循环
      }
    }, 1000);
  },
  methods: {
    init(data) {
      let that = this;
      let myChart = echarts.init(document.getElementById("map"));
      echarts.registerMap("henan", akesudiquJson);
      let option = {
        title: {
          text: "阿克苏地区",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (!params.value) {
              return "该地区暂无数据";
            }
            let elements;
            that.list.forEach((element) => {
              if (element.name == params.name) {
                elements = element;
              }
            });
            return (
              elements.name +
              "<br />" +
              "医疗机构数：" +
              elements.medicalIns +
              "家<br />" +
              "药店采购商：" +
              elements.pharmacyBuyer +
              "家<br />" +
              "交易订单" +
              elements.value +
              "笔"
            );
          },
          confine: true,
        },
        visualMap: {
          show: false,
          inRange: {
            color: ["yellow"], //地图背景色
          },
        },
        series: [
          {
            name: "",
            type: "map",
            zoom: 1.2,
            mapType: "henan", // 自定义扩展图表类型
            itemStyle: {
              // normal: {label: {show: true}},
              emphasis: { label: { show: true } },
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: "#444", //字体颜色
                  },
                },
              },
            },
            data: data,
          },
        ],
      };
      myChart.on("click", function (params) {
        console.log(params);
        //逻辑控制
      });
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>
