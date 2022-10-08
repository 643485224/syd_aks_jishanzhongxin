<template>
    <div class="echartPie" :ref="'echartPie' + id"></div>
</template>
<script>
import { pieOptions } from "./pieOptions.js"

export default {
    name: 'echarts-pie',
    props: {
        id: {
            type: String,
            default: function () { // 生成一个随机字符串,纯英文的,当不传入ID的时候生成实例,加i确保不会随机到一样的
                let temp = [];
                for (let i = 0; i < 6; i++) {
                    let randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 19) + i);
                    temp.push(randomChar);

                }
                return temp.reduce((pre, next) => pre + next);
            }
        },
        enableAllReplace: {// 开启参数全部替换
            type: Boolean,
            default: false
        },
        wrapRef: {
            type: String,
            default: ''
        },
        optionsData: {// 组件静态基础配置不足以支持较大改动，enableAllReplace开启状态下，使用此参数替代组件内options配置(原有的options静态基础配置 和动态数据配置 )
            type: Object,
            default: () => { }
        },
        title: {
            type: String,
            default: ''
        },
        subText: {
            type: String,
            default: ''
        },
        seriesName: {
            type: String,
            default: ''
        },
        seriesData: {
            type: Array,
            default: () => []
        },
        colors: {
            type: Array,
            default: () => []
        }

    },
    data() {
        return {
            options: {},
            echartPie: null
        }
    },
    mounted() {
        // this.$nextTick(() => {


        // })
        this.initEchart()
        window.onresize = () => {
            console.log(this.$refs['echartPie' + this.id]);
            setTimeout(() => { this.changeSize() }, 200)
        }

    },
    computed: {
        setOption() {
            return this.seriesData;
        },
        setOption2() {
            return this.optionsData

        }
    },
    watch: {
        setOption(newVal, oldVal) {
            this.options.series[0].data = newVal;
            this.echartPie && this.echartPie.setOption(this.options);
        },
        setOption2(newVal, oldVal) {
            this.options = newVal;
            console.log(this.options);
            this.echartPie && this.echartPie.setOption(this.options);
        },
    },
    methods: {
        changeSize() {
            let wrapRef = this.$parent.$refs[this.wrapRef];
            let echartRef = this.$refs['echartPie' + this.id];
            this.setEchartStyle(wrapRef, echartRef)


            this.echartPie && this.echartPie.resize()

        },
        initEchart() {
            let options = null;
            if (this.enableAllReplace) {
                options = this.optionsData;
                console.log(options);
            } else {
                options = new pieOptions();
                options.title.text = this.title;
                options.title.subtext = this.subText;
                options.color = this.colors;
                options.series[0].name = this.seriesName;
                options.series[0].data = this.seriesData;
            }
            console.log(options);
            let chartDom = this.$refs['echartPie' + this.id];
            this.echartPie = this.$echarts.init(chartDom, null, options);
            this.options = options;
            this.echartPie && this.echartPie.setOption(options);
            this.registEvents()
        },
        //自适应
        setEchartStyle(wrapDom, chartDom) {
            function getStyle(el, name) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(el, null);
                }
                else {
                    return el.currentStyle;
                }
            }
            let wi = getStyle(wrapDom, "width").width;
            let hi = getStyle(wrapDom, "height").height;
            chartDom.style.width = wi;
            chartDom.style.height = hi;
        },
        registEvents() {
            let that = this;
            console.log(that.options);
            this.echartPie.on("mouseover", function (params) {
                that.options.mouseover(params, that.echartPie)

            });
        }

    },
    beforeDestroy() {
        window.onresize = null;
    },
}
</script>
<style lang="scss" scoped>
.echartPie {
    width: 100%;
    height: 100%;
}
</style>
