import { graphic } from 'echarts'


// pieCommonOptions.title[0].text 标题
// pieCommonOptions.title[1].subtext 副标题
// pieCommonOptions.series[0].name  系列名
// pieCommonOptions.series[0].data 数据 => [{ value: 150, name: "待付款" }]
export function pieCommonOptions() {
    this.title = [
        {
            left: "4%",
            top: '4%',
            text: 'title[0].text',
            textStyle: {
                color: '#FFFFFF',
                fontSize: 20,
                fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
                fontWeight: 500
            },

        },
        {
            position: 'inner',
            left: "center",
            top: 'center',
            // 副标题
            subtext: 'title[1].text',
            subtextStyle: {
                color: '#FFFFFF',
                fontSize: 20,
                fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
                fontWeight: 400
            },
        },
    ]
    this.tooltip = {
        trigger: "item",
    }

    this.legend = {
        right: "4%",
        top: '4%',
        orient: "horizontal",
        height: 30,
        itemWidth: 12, //图例颜色块的宽度和高度
        itemHeight: 12,
        // icon: "circle", // 图例前的图标为圆点
        itemGap: 10, //图例之间的间距
        textStyle: {
            color: '#FFFFFF',
            fontSize: 12,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 400

        }

    }
    this.color = ['#0E78F3', '#FF3306', '#FFDC60', '#3CE500', '#FF003D']
    this.series = [
        {
            center: ['50%', '50%'],
            name: "series[0].name",
            type: "pie",
            radius: ["40%", "66%"],
            labelLine: {
                // 图形外文字线
                show: false,
                length: 26,
                // length2: 10,
                lineStyle: {
                    // color: "#FFFFFF",

                },
            },
            label: {
                // 线上文字的样式
                show: false,
                position: 'outer',
                alignTo: 'labelLine',
                bleedMargin: 5,
                formatter: "{b|{b}}:{c|{c}}", // 线上文字
                borderWidth: 10,
                borderRadius: 4,
                color: '#FFFFFF',
                padding: [0, 0],
                rich: {
                    a: {
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                    b: {
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                    c: {
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                    d: {
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                },
            },
            data: [
                { value: 150, name: "待付款" },
                { value: 50, name: "待发货" },
                { value: 50, name: "待收货" },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            }

        },
    ]
    this.mouseover = (params,echartPie) => {
        let { name } = params;
        let options = echartPie.getOption()
        options.title[1].subtext = name;
        echartPie.setOption(options);
    }
}



let fontColor = '#07DBFF';
let lineColor2 = 'rgba(163,43,177,0.6)'
let lineColor1 = 'rgba(176,89,10,0.6)'
let areaColor2 = 'rgba(163,43,177,0.6)'
let areaColor1 = 'rgba(176,89,10,0.6)'
export const lineOptions = {
    title: {
        left: "2%",
        top: "3%",
        text: '本年度采购趋势',
        textStyle: {
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 500
        },
    },
    grid: {
        left: '10%',
        right: '10%',
        top: '20%',
        bottom: '10%',
        containLabel: true
    },
    tooltip: {
        show: true,
        trigger: 'item'
    },
    // 图例
    legend: {
        show: true,
        right: '4%',
        top: '4%',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#FFFFFF'
        },
        // data: ['采购笔数']
    },
    color: [lineColor1, lineColor2],
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: '#FFFFFF'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#11366e'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#195384'
                }
            },
            // splitArea : {show : true},

            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'w',
            min: 0,
            nameTextStyle: {
                color: "#FFFFFF",
                fontSize: 14,
            },

            // max: 1000,
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#FFFFFF'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#11366e'
                }
            },
            axisTick: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#11366e',
                    // type: 'dashed'// 网格虚线
                }
            }
        }
    ],
    emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
        },
    },
    series: [{
        name: '采购笔数',
        type: 'line',
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 12,// 折线上圆点大小
        lineStyle: {
            color: lineColor1,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            // shadowOffsetY: 5,
            // shadowOffsetX: 5,
        },
        label: {
            show: false,
            position: 'top',
            textStyle: {
                color: lineColor1,
            }
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
            show: true
        },
        areaStyle: {
            color: areaColor1,
            // shadowColor: '',
            // shadowBlur: 20
        },
        data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, 502.84, 205.97, 332.79, 281.55, 398.35, 214.02]
    },
    {
        name: '采购金额',
        type: 'line',
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: {
            color: lineColor2,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            // shadowOffsetY: 5,
            // shadowOffsetX: 5,
        },
        label: {
            show: false,
            position: 'top',
            textStyle: {
                color: lineColor2,
            }
        },

        itemStyle: {
            color: lineColor2,
            borderColor: lineColor2,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            // shadowOffsetY: 2,
            // shadowOffsetX: 2,
        },
        tooltip: {
            show: true
        },
        areaStyle: {
            color: areaColor2,
            // shadowColor: 'rgba(0,202,149, 0.9)',
            // shadowBlur: 20
        },
        data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, 281.55, 398.35, 214.02, 179.55, 289.57, 356.14,],
    },
    ]
}

