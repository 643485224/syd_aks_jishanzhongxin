import {graphic} from 'echarts'
let fontColor = '#07DBFF';
let increaseOption = {
    // backgroundColor:'#11183c',
    grid: {
        left: '6%',
        right: '2%',
        top: '20%',
        bottom: '0%',
        containLabel: true
    },
    tooltip: {
        show: true,
        trigger: 'item'
    },
    // 图例
    legend: {
        show: false,
        x: 'center',
        y: '35',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#1bb4f6'
        },
        // data: ['已采纳']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: fontColor
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#397cbc'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#195384'
                }
            },
            // splitArea : {show : true},

            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '单位：万元',
            min: 0,
            // max: 1000,
            nameTextStyle: {
                align: 'center',
                fontSize: 12

            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#2ad1d2',
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#27b4c2'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#11366e',
                    type: 'dashed'// 网格虚线
                }
            }
        }
    ],
    series: [
        {
            // name: '已采纳',
            type: 'line',
            stack: '涨幅',
            // symbol:'circle',
            // symbolSize: 8,
            itemStyle: {
                normal: {
                    color: fontColor,
                    borderColor: fontColor,
                    background: fontColor,
                    lineStyle: {
                        color: fontColor,
                        width: 1
                    },
                    areaStyle: {
                        // color: fontColor// 区域颜色
                        color: graphic.LinearGradient(0, 1, 0, 0, [{
                        	offset: 0,
                        	color: 'rgba(7,44,90,0.3)'
                        }, {
                        	offset: 1,
                        	color: 'rgba(7, 219, 255,0.9)'
                        }]),
                    }
                }
            },
            markPoint: {
                itemStyle: {
                    normal: {
                        color: 'red'
                    }
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
        },

    ]
};



export {
    fontColor,
    increaseOption
};