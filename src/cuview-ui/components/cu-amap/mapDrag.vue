<template>
  <div class="container">
    <!-- <div class="search-box">
      <input v-model="searchKey" type="search" id="search" />
      <button @click="searchByHand">搜索</button>
      <div class="tip-box" id="searchTip"></div>
    </div> -->
    <!--
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
        -->
    <el-amap class="amap-box" ref="amap" :amap-manager="amapManager" :vid="'amap-vue'" :zoom="zoom" :plugin="plugin"
      :center="center" :events="events">
      <!-- 标记 点
        :offset="[-10,-26]" // 点的偏移量
        :events="{ // 事件监听
          init(m) {
            // 事件监听
            m.on('mouseover', () => dosomething )
            m.on('mouseout', () => dosomething )
          }
        }" 
        :position="[lng, lat]" // 点的位置
        animation="AMAP_ANIMATION_BOUNCE" // 点的动画
        icon="图片路径" // 图标
      -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      <!-- 划线
      :path="[[lng, lat], [lng, lat], ...]" // 设置线坐标集
      -->
      <el-amap-polyline :path="polyline.path" strokeColor="red" strokeStyle="solid" strokeWeight="2"></el-amap-polyline>

      <!-- el-amap-text 加载文本
        textAlign 文本对齐方式 
         :position="[lng, lat]" // 文本坐标
          :events="{init(o) { o.setStyle({'color': 'red', 'font-size' : '12px'}) }}" // 设置文本样式，与css标准一致
        -->
      <!-- <el-amap-text
          :text="文本内容"
          :events="{init(o) { o.setStyle({'color': 'red', 'font-size' : '12px'}) }}" 
          textAlign="left" 
          verticalAlign="top"
          :position="[lng, lat]" 
      /> -->
      <!-- 加载信息弹窗 -->
      <!-- <el-amap-info-window closeWhenClickMap :offset="[-6, -34]" :events="{
        init(m) {
          m.on('open', () => isShow = true)
          m.on('close', () => isShow = false)
        }
      }" :position="[lng, lat]" :visible="isShow">
        <div style="width: 300px;padding: 20px 0;">
          我是个弹窗
        </div>
      </el-amap-info-window> -->
    </el-amap>
  </div>
</template>

<script>
// AMapManager 用于获取地图实例，以及获得地图内组件的实例
/**
 * AMapManager
 *    getMap()  return =>  AMap.Map    返回地图实例，注入该管理实例的组件的地图实例
 *    getChildInstance(vid)    return => instance	  返回 vid 对应的组件实例
 */
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();// 生成地图实例 画布
export default {
  name: "cu-gaudMap",
  props: {
    pathData: {
      type: Array,
      default: () => [
        {
          "path": [
            114.057939,
            22.543527
          ],
          "keyword": "1"
        },
        {
          "path": [
            113.264499,
            23.130061
          ],
          "keyword": "2"
        }
      ]
    }
  },

  data() {
    let self = this;
    const that = this;
    return {
      // 地图 静态属性
      amapManager,// 地图管理对象
      // vid: '',// 地图容器节点的ID。
      zoom: 17,// 设置初始化级别
      dragEnable: true,// 地图是否可通过鼠标拖拽平移，默认为true。
      zoomEnable: true,// 地图是否可缩放，默认值为true。
      scrollWheel: true,// 地图是否可通过鼠标滚轮缩放浏览，默认为true。
      touchZoom: true,// 	地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。
      keyboardEnable: true,// 地图是否可通过键盘控制，方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转，默认为true。
      resizeEnable: true,//是否监控地图容器尺寸变化


      // 地图 动态属性
      zooms: [3, 18],// 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      center: [121.329402, 31.228667],// 地图中心点坐标值
      mapStyle: 'amap://styles/33ac9bd25289b5229362e1f52b481f49', // 使用的自定义地图样式，可以根据需求显示/隐藏内容，改变主题颜色等，具体的使用下面会写
      // labelzIndex:1,	地图标注显示顺序
      lang: 'zh_cn',//	地图语言类型 默认：zh_cn，可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照




      address: null,
      searchKey: "",
      markers: [],
      searchOption: {
        city: "全国",
        citylimit: true,
      },
      lng: 0,
      lat: 0,
      loaded: false,
      polyline: {
        path: [
          [114.057939, 22.543527], //具体地址坐标
          [113.264499, 23.130061], //具体地址坐标
        ],
      },
      events: {// 事件监听
        complete() {// 地图加载完成后触发
          /*
            这个地方要注意this指向的问题，在这里this指向的是AMap这个实力，而并非Vue实例。
            所以要更改this的指向，即：const that = this
        */
       
        // ... 地图渲染完成后的一些操作
      //  amapManager.getMap().setFitView();
      console.log(that.polyline);
          that.getDriving();
          
        },
        init() {// ... 初始化地图的一些操作
          // lazyAMapApiLoaderInstance.load().then(() => {
          //   self.initSearch();
          // });
          // 传入的数据 初始化 折线
          that.polyline.path = that.pathData.map(item => {return item.path});
          console.log(that.polyline);
        },
        // 点击获取地址的数据
        click(e) {
          console.log(e);
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result.regeocode.formattedAddress);
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        },
      },
      

      // 一些工具插件
      plugin: [
        // {
        //   pName: 'Geocoder',
        //   events: {
        //     init (o) {
        //       console.log(o.getAddress())
        //     }
        //   }
        // },
        {// 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            },
          },
        },
        {// 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
        {// 鹰眼
          pName: "OverView",
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
        {// 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
        {// 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
      ],
    };
  },
  mounted() {
    console.log(this.pathData)
  },
  methods: {
    getDriving() {
      const map = this.amapManager.getMap();
      const driving = new AMap.Driving({ map });  
      const path = [{ keyword: "广州" }, { keyword: "深圳" }]; //具体地址名
      driving.search(path, function (status, result) {  
        console.log(status, "---", result);
      });
    },
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function (PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10,
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip",
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function (poiResult) {
          // console.log(poiResult)
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    },
  },
};
</script>
<style>
.container {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}

.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box input {
  float: left;
  width: 80%;
  height: 100%;
  border: 1px solid #30ccc1;
  padding: 0 8px;
  outline: none;
}

.search-box button {
  float: left;
  width: 20%;
  height: 100%;
  background: #30ccc1;
  border: 1px solid #30ccc1;
  color: #fff;
  outline: none;
}

.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
