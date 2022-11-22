export function pieOptions() {
    this.title = {
        text: "text",
        subtext: "subtext",
        left: "4%",
        top: "4%",
        textStyle: {
            color: '#020552',
            fontSize: 20,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 500
        },

        subtextStyle: {
            color: '#020552',
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
            color: '#020552',
            fontSize: 12,
            fontFamily: ' Source Han Sans CN-Regular, Source Han Sans CN',
            fontWeight: 400

        }
    }
    this.tooltip = {
        trigger: "item",
    }

    this.color = ['#0E78F3', '#FF3306',"#00B712"];
    this.series = [
        {
            center: ['50%', '55%'],
            name: "series name",
            type: "pie",
            radius: "55%",
            // radius: ["40%", "50%"],// 环形
            labelLine: {
                // 图形外文字线
                length: 15,
                length2: 15,
                maxSurfaceAngle: 80,
                lineStyle: {
                    // color: "#FFFFFF",
                },
            },
            label: {
                // 线上文字的样式
                position: 'edge',
                alignTo: 'labelLine',
                minMargin: 5,
                edgeDistance: 10,
                lineHeight: 15,
                // bleedMargin: 3,
                formatter: "{b|{b}}\n{c|{c}}", // 线上文字
                // borderWidth: 10,
                // borderRadius: 4,
                lineHeight: 15,
                color: '#020552',
                padding: [0, 0],
                rich: {
                    a: {
                        color: "#020552",
                        fontSize: 12,
                    },
                    b: {
                        color: "#020552",
                        fontSize: 12,
                    },
                    c: {
                        color: "red",
                        fontSize: 12,
                    },
                    d: {
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                },
            },
            data: [
                { value: 10, name: "data1" },
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