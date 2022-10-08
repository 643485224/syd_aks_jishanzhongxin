export function pieOptions() {
    this.title = {
        text: "text",
        subtext: "subtext",
        left: "4%",
        top: "4%",
        textStyle: {
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 500
        },

        subtextStyle: {
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 400

        },

    }
    this.legend = {
        top: "4%", //控制图例出现的距离  默认左上角
        orient: "vertical",
        right: "4%",
        height: 100,
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
    this.tooltip = {
        trigger: "item",
    }

    this.color = ['#0E78F3', '#FF3306'];
    this.series = [
        {
            center: ['50%', '60%'],
            name: "series name",
            type: "pie",
            radius: "70%",
            // radius: ["40%", "50%"],// 环形
            labelLine: {
                // 图形外文字线
                length: 14,
                length2: 40,
                lineStyle: {
                    // color: "#FFFFFF",
                },
            },
            label: {
                // 线上文字的样式
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
                { value: 30, name: "data1" },
                { value: 20, name: "data2" },
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
    ]


}