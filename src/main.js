import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入wow.js;
import wow from "wowjs";
//引入animated动画库
import animated from "animate.css";
// 引入axios插件
import axios from "axios";
// 引入全局uView 自定义组件，方法
import cuView from './cuview-ui'
import './style.scss'
import './margin_padding.scss' //各种margin 与 padding
import store from './store'
import * as echarts from 'echarts'
import VueDragResize from 'vue-drag-resize'
import countTo from 'vue-count-to'
import VueAMap from 'vue-amap'
import uploader from 'vue-simple-uploader'
import '@/utils/directive'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '16a302b5bbfb4ecd11a3738d9e6b3552', //申请的key码需要填写的地方，格式为长串字符数字
  plugin: [ //按照你的需要，引入地图的哪些功能，不需要下面这么多
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.ControlBar",
    'AMap.ToolBar',
    'AMap.Driving',
    'AMap.Geocoder'
  ],
  v: '1.4.4', // 默认高德 sdk 版本为 1.4.4
  uiVersion: '1.0'
})

// Vue.config.productionTip = false //productionTip设置为 false ，可以阻止 vue 在启动时生成生产提示
Vue.component('vue-drag-resize', VueDragResize)
Vue.component('countTo', countTo)
Vue.use(cuView)
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(animated);
Vue.use(VueAMap);
Vue.use(uploader)
Vue.config.productionTip = false;

//高德的安全密钥
// window._AMapSecurityConfig = {
//   // serviceHost:'您的代理服务器域名或地址/_AMapService',  
// 	securityJsCode:"2c14906619e151fd00294569914d0626" // "安全密钥",
// }
Vue.prototype.$echarts = echarts //挂载到Vue实例上面
Vue.prototype.$axios = axios;
// 日期格式化
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$wow = wow;
  },
}).$mount("#app");
