export function setEchartStyle(wrapDom, chartDom) {
  function getStyle(el, name) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, null);
    }
    else {
      return el.currentStyle;
    }
  }
  let width = getStyle(wrapDom, "width").width;
  let height = getStyle(wrapDom, "height").height;
  chartDom.style.width = width;
  chartDom.style.height = height;
  // chartDom.resize();
  // // 3. 把配置项给实例对象
  // this.draw3Echart.setOption(option);
  // // 4. 让图表跟随屏幕自动的去适应
  // window.addEventListener("resize", function () {
  //   if (this.draw3Echart != null && this.draw3Echart != "" && this.draw3Echart != undefined) {
  //     this.draw3Echart.resize();
  //   }
  // });
}


