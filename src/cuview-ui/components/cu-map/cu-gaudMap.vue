<template>
  <div class="container">
    <div class="search-box">
      <input v-model="searchKey" type="search" id="search" />
      <button @click="searchByHand">搜索</button>
      <div class="tip-box" id="searchTip"></div>
    </div>
    <!--
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
        -->
    <el-amap
      class="amap-box"
      :amap-manager="amapManager"
      :vid="'amap-vue'"
      :zoom="zoom"
      :plugin="plugin"
      :center="center"
      :events="events"
    >
      <!-- 标记 -->
      <el-amap-marker
        v-for="(item, index) in markers"
        :position="item.path"
        :key="index"
      ></el-amap-marker>
      <!-- 划线-->
      <el-amap-polyline
        :path="polyline.path"
        strokeColor="red"
        strokeStyle="solid"
        strokeWeight="2"
      ></el-amap-polyline>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();
export default {
  name: "cu-gaudMap",
  props: {
    //地图中心位置
    center: {
      type: Array,
      default: () => [80.250101, 41.241784], //[lng,lat]新疆维吾尔自治区阿克苏地区温宿县温宿镇温宿县人民医院
    },
    //地图标点位置 [
    //              {path:[lng,lat]},
    //              {path:[lng,lat]},
    //              {path:[lng,lat]},
    //            ]
    markers: {
      type: Array,
      default: () => [
        { path: [80.250101, 41.241784] }, //具体地址坐标
        { path: [80.231798, 41.238963] }, //具体地址坐标
        { path: [80.217408, 41.23118] }, //具体地址坐标
      ],
    },
    //地图画线位置 [
    //              {path:[lng,lat]},
    //              {path:[lng,lat]},
    //              {path:[lng,lat]},
    //            ]
    pathData: {
      type: Array,
      default: () => [
        { path: [80.250101, 41.241784] }, //具体地址坐标
        { path: [80.231798, 41.238963] }, //具体地址坐标
        { path: [80.217408, 41.23118] }, //具体地址坐标
      ],
    },
  },
  watch: {
    pathData(v1, v2) {
      console.log("1:", v1, v2);
      // this.events.complete()
    },
  },
  data() {
    let self = this;
    const that = this;
    return {
      address: null,
      searchKey: "",
      amapManager,
      searchOption: {
        city: "全国",
        citylimit: true,
      },

      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        complete() {
          /*
            这个地方要注意this指向的问题，在这里this指向的是AMap这个实力，而并非Vue实例。
            所以要更改this的指向，即：const that = this
        */
          that.getDriving();
          that.initSearch();
        },
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch();
          });
        },
        // 点击获取地址的数据
        click(e) {
          console.log("2:", e);
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
                console.log("3:", result.regeocode.formattedAddress);
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        },
      },
      // 画线
      polyline: {
        path: self.pathData.map((item) => item.path), //具体地址坐标
      },

      // 一些工具插件
      plugin: [
        {
          pName: "Geocoder",
          events: {
            init(o) {
              console.log("4:", o.getAddress());
            },
          },
        },
        {
          // 定位
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
                  // 设置标点
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
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log("5:", instance);
            },
          },
        },
        {
          // 鹰眼
          pName: "OverView",
          events: {
            init(instance) {
              console.log("6:", instance);
            },
          },
        },
        {
          // 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              console.log("7:", instance);
            },
          },
        },
        {
          // 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {
              console.log("8:", instance);
            },
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getDriving() {
      const map = this.amapManager.getMap();
      const driving = new AMap.Driving({ map: map });
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(80.250101, 41.241784),
        new AMap.LngLat(80.217408, 41.23118),
        {
          waypoints: [new AMap.LngLat(80.231798, 41.238963)],
        },
        function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            console.log("绘制驾车路线完成");
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        }
      );
      // const path = [{ keyword: "广州" }, { keyword: "深圳" }]; //具体地址名
      console.log("10:", this.pathData);
      // const path = [
      //   {
      //     keyword:
      //       "广州广东省广州市增城区永宁街道广州新塘碧桂园凤凰城别墅碧桂园凤凰城凤雅苑",
      //   },
      //   { keyword: "广东省广州市增城区中新镇英花农民专业合作社" },
      // ];

      const path = [];
      this.pathData.forEach((item) => {
        console.log("11:", item, item.keyword);
        let obj = { keyword: item.keyword };
        console.log("12:", obj);
        path.push(obj);
        return obj;
      }); //具体地址名
      console.log("13:", path);

      // driving.search(path, function (status, result) {
      //   console.log("14:", status, "---", result);
      // });
      // 根据起终点经纬度规划驾车导航路线
      // driving.search(
      //   [
      //     new AMap.LngLat(116.379028, 39.865042),
      //     new AMap.LngLat(116.427281, 39.903719),
      //   ],

      //   function (status, result) {
      //     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //     if (status === "complete") {
      //       console.log("绘制驾车路线完成");
      //     } else {
      //       console.log("获取驾车数据失败：" + result);
      //     }
      //   }
      // );
    },
    initSearch() {
      const map = this.amapManager.getMap();
      AMapUI.load(
        ["ui/misc/PathSimplifier", "lib/$"],
        function (PathSimplifier, $) {
          if (!PathSimplifier.supportCanvas) {
            alert("当前环境不支持 Canvas！");
            return;
          }

          var pathSimplifierIns = new PathSimplifier({
            zIndex: 1000,
            //autoSetFitView:false,
            map: map, //所属的地图实例

            getPath: function (pathData, pathIndex) {
              return pathData.path;
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                //point
                return (
                  pathData.name +
                  "，点：" +
                  pointIndex +
                  "/" +
                  pathData.path.length
                );
              }

              return pathData.name + "，点数量" + pathData.path.length;
            },
            renderOptions: {
              renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
            },
          });

          window.pathSimplifierIns = pathSimplifierIns;

          //设置数据
          pathSimplifierIns.setData([
            {
              name: "路线0",
              path: [
                [80.250101, 41.241784], //具体地址坐标
                [80.231798, 41.238963], //具体地址坐标
                // [80.217408, 41.23118], //具体地址坐标
              ],
            },
          ]);
          //对第一条线路（即索引 0）创建一个巡航器
          var navg1 = pathSimplifierIns.createPathNavigator(0, {
            loop: false, //循环播放
            speed: 1000, //巡航速度，单位千米/小时
          });

          navg1.start();
        }
      );
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
  width: 100%;
  height: 100%;
  /* width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0); */
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
