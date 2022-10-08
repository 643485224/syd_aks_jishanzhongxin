<template>
    <div class="echart-3d-pie">
        <div class="chart-wrap">
            <div id="trade-amount-pie3d" ref="tradeAmountPie3d"></div>
            <div class="bg"></div>
        </div>
    </div>
</template>
<script>
import 'echarts-gl'
import { setEchartStyle } from '@/utils/setEchartStyle';

import { graphic } from 'echarts'
export default {
    props: {
        amounts: {
            type: Array,
            default: () => [2, 8, 20, 40]
        },
        wrapRef: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            option: [],
            chartDom: null,
            optionsData: [{
                name: "日交易额",
                value: 0.48,
                itemStyle: {
                    color: '#E83F46',
                    // color: graphic.LinearGradient(0, 1, 0, 0, [{
                    //     offset: 0,
                    //     color: 'rgba(0,0,0,0.3)'
                    // }, {  
                    //     offset: 1,
                    //     color: 'rgba(232, 63, 70,0.9)'
                    // }]),
                    opacity: .9// 不透明度
                }
            }, {
                name: "月交易额",
                value: 1.26,
                itemStyle: {
                    color: '#FAB200',
                    opacity: .9
                }
            }, {
                name: "年交易额",
                value: 12.6,
                itemStyle: {
                    color: '#209FED',
                    opacity: .9
                }
            }, {
                name: "总交易额",
                value: 48.9,
                itemStyle: {
                    color: '#808EC7',
                    opacity: .9
                }
            }],
        }
    },
    created() {
    },
    mounted() {
        this.echartsPie3D();
        window.onresize = () => {
            this.changeSize()

        }
    },
    computed: {
    },
    watch: {
        amounts(val) {
            console.log(val, this.optionsData);
            if (val) {
                this.optionsData.forEach((item, index) => {
                    this.optionsData[index].value = val[index]
                })
                console.log(this.optionsData);
                this.setOptions()
                this.bindListen();
            }
        }
    },
    methods: {
        changeSize() {
            console.log(this.wrapRef,this.$refs, echart3dPieWrap);
            let echart3dPie = this.$refs.tradeAmountPie3d;
            let echart3dPieWrap = this.$refs[this.wrapRef];
            setEchartStyle(echart3dPieWrap, echart3dPie)
            this.chartDom.resize()
        },
        echartsPie3D() {
            //构建3d饼状图
            let chartDom = this.$refs.tradeAmountPie3d;
            this.chartDom = this.$echarts.init(chartDom);
            this.setOptions()
            this.bindListen();
        },
        setOptions() {
            console.log('setOptions');
            let myChart = this.chartDom;
            // 传入数据生成 option
            this.option = this.getPie3D(this.optionsData, 0.8);
            console.log(this.option);
            myChart.setOption(this.option);
            //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
            // this.setLabel(option)
            // myChart.setOption(this.option);
        },
        setLabel(option) {
            option.series.push({
                name: "交易额",
                type: "pie",
                labelLine: {
                    show: true,
                    length: 10,
                    length2: 10
                },
                label: {
                    show: true
                },
                startAngle: -20,
                clockwise: true,
                radius: ["40%", "90%"],
                center: ["50%", "50%"],
                data: this.option,
                itemStyle: {
                    opacity: 0
                }
            });
        },
        // 生成模拟 3D 饼图的配置项
        getPie3D(pieData, internalDiameterRatio) {

            let series = [];
            let sumValue = 0;
            let startValue = 0;
            let endValue = 0;
            let legendData = [];
            let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

            // 为每一个饼图数据，生成一个 series-surface 配置
            for (let i = 0; i < pieData.length; i++) {

                sumValue += pieData[i].value;

                let seriesItem = {
                    name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                    type: 'surface',
                    parametric: true,
                    wireframe: {
                        show: false
                    },
                    pieData: pieData[i],
                    pieStatus: {
                        selected: false,
                        hovered: false,
                        k: k
                    },
                    label: {
                        show: true
                    }
                };

                if (typeof pieData[i].itemStyle != 'undefined') {

                    let itemStyle = {};

                    typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
                    typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

                    seriesItem.itemStyle = itemStyle;
                }
                series.push(seriesItem);
            }

            // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
            // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
            for (let i = 0; i < series.length; i++) {
                endValue = startValue + series[i].pieData.value;
                series[i].pieData.startRatio = startValue / sumValue;
                series[i].pieData.endRatio = endValue / sumValue;
                series[i].parametricEquation = this.getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value);
                startValue = endValue;
                legendData.push({
                    name: series[i].name,
                    value: series[i].pieData.value
                });
            }

            let boxHeight = this.getHeight3D(series, 26); //通过传参设定3d饼/环的高度，26代表26px
            // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
            series.push({
                name: 'mouseoutSeries',
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false
                },
                itemStyle: {
                    opacity: 0
                },
                parametricEquation: {
                    u: {
                        min: 0,
                        max: Math.PI * 2,
                        step: Math.PI / 20
                    },
                    v: {
                        min: 0,
                        max: Math.PI,
                        step: Math.PI / 20
                    },
                    x: function (u, v) {
                        return Math.sin(v) * Math.sin(u) + Math.sin(u);
                    },
                    y: function (u, v) {
                        return Math.sin(v) * Math.cos(u) + Math.cos(u);
                    },
                    z: function (u, v) {
                        return Math.cos(v) > 0 ? 0.1 : -0.1;
                    }
                }
            });

            // 准备待返回的配置项，把准备好的 legendData、series 传入。
            let option = {
                //animation: false,
                title: {
                    show: true,
                    text: "单位（亿）",
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#FFFFFF",
                    },
                },
                legend: {
                    data: legendData,
                    orient: "vertical",
                    left: "center",
                    top: 16,
                    itemGap: 10,
                    textStyle: {
                        color: "#A1E2FF",
                    },
                    show: true,
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    formatter: function (param) {
                        console.log(param);
                        let item = legendData.filter(item => item.name == param)[0];
                        return `${item.name}  ${item.value}`;
                    }
                },
                tooltip: {
                    formatter: params => {
                        if (params.seriesName !== 'mouseoutSeries') {
                            return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
                        }
                    }
                },
                xAxis3D: {
                    min: -1,
                    max: 1
                },
                yAxis3D: {
                    min: -1,
                    max: 1
                },
                zAxis3D: {
                    min: -1,
                    max: 1
                },
                grid3D: {
                    show: false,
                    boxHeight: 12,// boxHeight 动态设置  数据值为0时不显示图表 待解决
                    viewControl: {//3d效果可以放大、旋转等，请自己去查看官方配置
                        alpha: 60,// 上下旋转角度
                        beta: 40,// 左右旋转角度
                        // distance: 260,// 视图距离 调整大小
                        rotateSensitivity: 0,// 旋转灵敏度 0-1  值越大越灵敏  设置为0无法缩放
                        zoomSensitivity: 0,// 缩放灵敏度 0-1  值越大越灵敏  设置为0无法缩放
                        panSensitivity: 0,// 平移灵敏度 0-1  值越大越灵敏  设置为0无法缩放
                        autoRotate: true //自动旋转
                        // autoRotateDirection: 'ccw'// 自转方向 默认 cw  顺时针旋转
                    },
                    top: 34,
                    bottom: 10,
                    left: 10,
                    right: 10,
                    //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
                    // postEffect: {//配置这项会出现锯齿，请自己去查看官方配置有办法解决 
                    //     enable: true,
                    //     bloom: {
                    //         enable: true,
                    //         bloomIntensity: 0.1
                    //     },
                    //     SSAO: {
                    //         enable: true,
                    //         quality: 'medium',
                    //         radius: 2
                    //     }
                    // },
                    // light: {
                    //     main: {// 主光源
                    //         color: '#FFFFFF',
                    //         intensity: 1,// 光源强度 
                    //         shadow: true,// 是否投射阴影
                    //         alpha: 40,// 上下旋转角度
                    //         beta: 40,// 左右旋转角度
                    //     }
                    // }
                },
                series: series
            };

            return option;
        },

        fomatFloat(num, n) {
            var f = parseFloat(num);
            if (isNaN(f)) {
                return false;
            }
            f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂   
            var s = f.toString();
            var rs = s.indexOf(".");
            //判定如果是整数，增加小数点再补0
            if (rs < 0) {
                rs = s.length;
                s += ".";
            }
            while (s.length <= rs + n) {
                s += "0";
            }
            return s;
        },
        bindListen() {
            let myChart = this.chartDom;
            // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
            let that = this;
            let selectedIndex = "";
            let hoveredIndex = "";
            // 监听点击事件，实现选中效果（单选）
            myChart.on("click", function (params) {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
                let isSelected = !that.option.series[params.seriesIndex].pieStatus.selected;
                let isHovered = that.option.series[params.seriesIndex].pieStatus.hovered;
                let k = that.option.series[params.seriesIndex].pieStatus.k;
                let startRatio = that.option.series[params.seriesIndex].pieData.startRatio;
                let endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
                // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
                if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
                    that.option.series[selectedIndex].parametricEquation = that.getParametricEquation(that.option.series[selectedIndex].pieData
                        .startRatio, that.option.series[selectedIndex].pieData.endRatio, false, false, k, that.option.series[selectedIndex].pieData
                        .value);
                    that.option.series[selectedIndex].pieStatus.selected = false;
                }
                // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
                that.option.series[params.seriesIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, that.option.series[params.seriesIndex].pieData.value);
                that.option.series[params.seriesIndex].pieStatus.selected = isSelected;
                // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
                isSelected ? selectedIndex = params.seriesIndex : null;
                // 使用更新后的 option，渲染图表
                myChart.setOption(that.option);
            });
            // 监听 mouseover，近似实现高亮（放大）效果
            myChart.on("mouseover", function (params) {
                // 准备重新渲染扇形所需的参数
                let isSelected;
                let isHovered;
                let startRatio;
                let endRatio;
                let k;
                // 如果触发 mouseover 的扇形当前已高亮，则不做操作
                if (hoveredIndex === params.seriesIndex) {
                    return;
                    // 否则进行高亮及必要的取消高亮操作
                }
                else {
                    // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
                    if (hoveredIndex !== "") {
                        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                        isSelected = that.option.series[hoveredIndex].pieStatus.selected;
                        isHovered = false;
                        startRatio = that.option.series[hoveredIndex].pieData.startRatio;
                        endRatio = that.option.series[hoveredIndex].pieData.endRatio;
                        k = that.option.series[hoveredIndex].pieStatus.k;
                        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                        that.option.series[hoveredIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, that.option.series[hoveredIndex].pieData.value);
                        that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
                        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                        hoveredIndex = "";
                    }
                    // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
                    if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "交易额") {
                        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                        isSelected = that.option.series[params.seriesIndex].pieStatus.selected;
                        isHovered = true;
                        startRatio = that.option.series[params.seriesIndex].pieData.startRatio;
                        endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
                        k = that.option.series[params.seriesIndex].pieStatus.k;
                        // 对当前点击的扇形，执行高亮操作（对 option 更新）
                        that.option.series[params.seriesIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, that.option.series[params.seriesIndex].pieData.value + 5);
                        that.option.series[params.seriesIndex].pieStatus.hovered = isHovered;
                        // 记录上次高亮的扇形对应的系列号 seriesIndex
                        hoveredIndex = params.seriesIndex;
                    }
                    // 使用更新后的 option，渲染图表
                    myChart.setOption(that.option);
                }
            });
            // 修正取消高亮失败的 bug
            myChart.on("globalout", function () {
                // 准备重新渲染扇形所需的参数
                let isSelected;
                let isHovered;
                let startRatio;
                let endRatio;
                let k;
                if (hoveredIndex !== "") {
                    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                    isSelected = that.option.series[hoveredIndex].pieStatus.selected;
                    isHovered = false;
                    k = that.option.series[hoveredIndex].pieStatus.k;
                    startRatio = that.option.series[hoveredIndex].pieData.startRatio;
                    endRatio = that.option.series[hoveredIndex].pieData.endRatio;
                    // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                    that.option.series[hoveredIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, that.option.series[hoveredIndex].pieData.value);
                    that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
                    // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                    hoveredIndex = "";
                }
                // 使用更新后的 option，渲染图表
                myChart.setOption(that.option);
            });
        },
        //获取3d丙图的最高扇区的高度
        getHeight3D(series, height) {
            series.sort((a, b) => {
                return (b.pieData.value - a.pieData.value);
            });
            return height * 25 / series[0].pieData.value;
        },
        // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
        getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
            // 计算
            let midRatio = (startRatio + endRatio) / 2;
            let startRadian = startRatio * Math.PI * 2;
            let endRadian = endRatio * Math.PI * 2;
            let midRadian = midRatio * Math.PI * 2;
            // 如果只有一个扇形，则不实现选中效果。
            if (startRatio === 0 && endRatio === 1) {
                isSelected = false;
            }
            // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
            k = typeof k !== "undefined" ? k : 1 / 3;
            // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
            let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
            let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
            // 计算高亮效果的放大比例（未高亮，则比例为 1）
            let hoverRate = isHovered ? 1.05 : 1;
            // 返回曲面参数方程
            return {
                u: {
                    min: -Math.PI,
                    max: Math.PI * 3,
                    step: Math.PI / 32
                },
                v: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20
                },
                x: function (u, v) {
                    if (u < startRadian) {
                        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
                },
                y: function (u, v) {
                    if (u < startRadian) {
                        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
                },
                z: function (u, v) {
                    if (u < -Math.PI * 0.5) {
                        return Math.sin(u);
                    }
                    if (u > Math.PI * 2.5) {
                        return Math.sin(u) * h * 0.1;
                    }
                    return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
                }
            };
        },
    },
}
</script>
<style lang="scss" scoped>
.echart-3d-pie {
    width: 100%;
    height: 100%;
    position: relative;
}

.chart-wrap {
    position: relative;
    width: 100%;
    height: 100%;

    // height: calc(100% - 124px);

    #trade-amount-pie3d {
        width: 100%;
        height: 100%;
    }

    .bg {
        position: absolute;
        bottom: 10px;
        left: 50%;
        width: 100%;
        height: 40px;
        z-index: 99;
        background: no-repeat center;
        background-size: 100% 100%;
        transform: translateX(-50%);
        // background-image:url('~../image/headerBg.png');
    }
}

.pie3d-text {
    height: 124px;

    .tips {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FEFEFF;
        opacity: .9;
    }
}

.legends {
    // position: absolute;
    // top: 0;
    // left: 50%;
    // transform: translateX(-50%);
    width: 100%;
    // padding: 20px 0;
    text-align: center;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FEFEFF;

    .legends-item {
        margin: 4px 0;
    }

    .sign {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        border-radius: 50%;
    }

    .text {
        vertical-align: text-bottom;

    }

    // .legend-text:before {
    //     content: '.';
    //     color: #E83F46;
    // }

    .num {
        font-size: 14px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #0CD2EA;
    }

    .sign1 {
        background: #E83F46;
    }

    .sign2 {
        background: #FAB200;
    }

    .sign3 {
        background: #209FED;
    }

    .sign4 {
        background: #7088e9;
    }
}
</style>
