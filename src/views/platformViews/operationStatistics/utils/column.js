
// ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'


// let populatData = [// [费用类型[月]]
// [223, 254, 304, 321, 330, 360, 384],
// [223, 254, 274, 321, 338, 340, 364],
// [251, 254, 264, 281, 298, 300, 304],
// [223, 254, 304, 321, 330, 360, 384]
// ];

// let color = [
//     "#9489fa",
//     "#f06464",
//     "#f7af59",
//     "#f0da49",
//     "#71c16f",
//     "#2aaaef",
//     "#5690dd",
//     "#bd88f5",
//     "#009db2",
//     "#024b51",
//     "#0780cf",
//     "#765005",
// ]
// let columns = ['水费', '电费', '物业费', '房屋租赁']
// let populatData = [// [费用类型[月]]
//     [223, 254, 304, 321, 330, 360, 384],
//     [223, 254, 274, 321, 338, 340, 364],
//     [251, 254, 264, 281, 298, 300, 304],
//     [223, 254, 304, 321, 330, 360, 384]
// ]
// let dataAxis = ['2022-01', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06']
function getBarOptions(
    columns,
    populatData,
    dataAxis
) {
    let color = [
        "#FF3600",
        "#02CDFF",
        "#00B811",
        "#FFD800",
    ];
    let fontColor = '#07DBFF';
    let borderColor = '#034E90'

    let legend = {
        // type: "scroll",
        data: columns,
        itemWidth: 10,// 图例标记宽度
        itemHeight: 10,// 图例标记高度
        top: '10%',
        right: '4%',
        textStyle: {
            color: fontColor,
            fontSize: 12,
        },
    };
    let grid = {
        containLabel: true,
        left: '0%',
        bottom: '6%',
        top: '20%',
        right: '0%',
    }



    let xAxis = {
        data: dataAxis,
        axisLabel: {
            inside: false,
            color: fontColor,
            fontSize: 10
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,// 显示坐标轴轴线
            lineStyle: {
                color: borderColor
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: borderColor
            }
        },
        z: 10,

    }
    let yAxis = {
        type: 'value',
        name: '单位：万元',
        min: 0,
        // max: 1000,
        axisLine: {
            show: true,
            lineStyle: {
                color: borderColor
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: fontColor
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: borderColor
            }
        },
    }
    let dataZoom = [
        {
            type: 'inside'
        }
    ]
    let tooltip = {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    }
    let series = []

    columns.map((item, index) => {
        series.push({
            // value: item,
            name: item,// 图例文字
            type: 'bar',// 图表类型
            barWidth: 6, // 柱子宽度
            barGap: '60%',// 柱子间距 柱子宽度的百分百
            distance: 4, // 距离图形元素的距离
            showBackground: false,
            itemStyle: {
                color: color[index],
                borderColor: color[index],
                shadowColor: color[index],
                barBorderRadius: [2, 2, 0, 0], // 圆角（左上、右上、右下、左下）
            },
            emphasis: {
                itemStyle: {
                    color: color[index],
                    borderColor: color[index],
                    shadowColor: color[index]
                }
            },
            data: populatData[index]
        })
    });


    let columnOptions = {
        legend,
        grid,
        xAxis,
        yAxis,
        dataZoom,
        tooltip,
        series
    }

    return columnOptions
}



export {
    getBarOptions
} 