<template>
  <!-- 重点参数：renderOptions，pathLinePassedStyle -->
  <!-- 仅展示驶过线 -->
  <div :id="'container'"></div>
  <!-- <div id="map" :style="{ height: '100%', width: '100%' }" ref="myEchart"></div> -->
</template>
<!-- <script type="text/javascript" src="http://webapi.amap.com/maps?v=2.0&key=16a302b5bbfb4ecd11a3738d9e6b3552"></script> -->
<!-- UI组件库 1.0 -->
<!-- <script src="http://webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script> -->
<script>
export default {
  name: "cu-map",
  data() {
    // let map = null;// 非响应式对象
    return {
      date: new Date().getMilliseconds(),
      map: null,
      pathImg: "./imgs/plane.png", // 路线图片
      speed: 1000000000, // 驶过线加载速度  值越大越快
      pathColor: "#0e78f3", // 完整线路颜色
      trackMarker: null,
      trafficLayer: null, // 实时路况图层
      paths: [],
      startData: {},
      endData: {},
      paths2: []
    };
  },
  props: {
    pathData: {
      type: [],
      default: () => [
        {
          address: '深圳',
          status: 1,// 1 出发 2途径 3结束
          path: [116.405289, 39.904987],
        },
        {
          address: '深圳2',
          status: 2,
          path: [113.964458, 40.54664],
        },
        {
          address: '深圳3',
          status: 2,
          path: [111.47836, 41.135964],
        },
        {
          address: '深圳4',
          status: 2,
          path: [108.949297, 41.670904],
        },
        {
          address: '深圳5',
          status: 2,
          path: [106.380111, 42.149509],
        },
        {
          address: '深圳6',
          status: 2,
          path: [103.774185, 42.56996],
        },
        {
          address: '深圳7',
          status: 2,
          path: [101.135432, 42.930601],
        },
        {
          address: '深圳8',
          status: 3,
          path: [98.46826, 43.229964],
        },
      ],
    },
  },

  mounted() {
    this.map = null;
    let { startData, endData, paths, paths2,middleData } = this.dealwithData()// 处理数据
    this.startData = startData;
    this.endData = endData;
    this.paths = paths;
    this.paths2 = paths2;
    this.middleData = middleData;
    // this.init();
    this.initMap(startData, endData, paths, paths2,middleData)
    // this.initLine()
  },
  beforeDestroy() {
    // 销毁地图，并清空地图容器
    console.log(this.map);
    this.map && this.map.destroy();
  },
  methods: {
    dealwithData() {
      console.log(this.pathData);
      let startData = {}
      let endData = {}
      let paths = []// 完整线路
      let paths2 = []// 已经过线路
      let middleData = [] // 除起始点和终点外的路线数据
      this.pathData.forEach(item => {
        paths.push(item.path)
        switch (item.status) {
          case 1:
            startData = item
            paths2.push(item.path)
            break;
          case 2:
            paths2.push(item.path)
            // middleData.push(item)
            break;
          case 3:
            endData = item
            break;
          default:
            break;
        }
      })
      return { startData, endData, paths, paths2,middleData }
    },
    initMap(startData, endData, paths, paths2,middleData) {// 高德地图 js-api  初运用  无动画
      //创建地图
      this.map = new AMap.Map("container", {
        zoom: 4,//设置地图显示的缩放级别
        center: [116.397428, 39.90923],//设置地图中心点坐标
        // layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
        // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
        viewMode: '2D',  //设置地图模式
        lang: 'zh_cn',  //设置地图语言类型
      });
      let map = this.map;

      // 创建两个点标记
      let startPoint = startData.path
      let arrive = paths2[paths2.length - 1]
      // let middlePointArr = paths.slice(1,paths.length - 1)
      let endPoint = endData.path;
      console.log(startData);
      console.log(endPoint);
      var startContent = `<div style="padding:6px;background:#245779;color:#fff;font-size:12px;border-radius:20px;">${startData.address || ''}</div>`

      var marker1 = new AMap.Marker({
        content: startContent,  // 自定义点标记覆盖物内容
        position: startPoint,   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
        title: startData.address,
        offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
        anchor: 'top-left', // 设置锚点方位   自定义点标记内容，无论是自定义 Icon 还是 自定义内容，都需要为定义的图片重新设置锚点位置。
      });
      console.log(endPoint);

      map.add(marker1);
      if (endPoint) {
        var endContent = `<div style="padding:6px;background:#245779;color:#fff;font-size:12px;border-radius:20px;">${endData.address || ''}</div>`
        var marker2 = new AMap.Marker({
          content: endContent,  // 自定义点标记覆盖物内容
          position: endPoint,   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
          title: endData.address,
          offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
          anchor: 'top-right', // 设置锚点方位   自定义点标记内容，无论是自定义 Icon 还是 自定义内容，都需要为定义的图片重新设置锚点位置。
        });
        map.add(marker2);
        
      }

      // 创建 AMap.Icon 实例：
      // var icon = new AMap.Icon({
      //     size: new AMap.Size(40, 50),    // 图标尺寸
      //     image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',  // Icon的图像
      //     imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
      //     imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
      // });
      //  icon:icon  or   marker.setIcon(icon);
      console.log(endPoint);

      var marker3 = new AMap.Marker({
        position: arrive,   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京',
        icon: 'https://webapi.amap.com/images/car.png',// 自定义图标标记 也可设置icon实例 更灵活

      });
      map.add(marker3);


      // middlePointArr.forEach(item =>{
      //   let marker = new AMap.Marker({
      //   position: arrive,   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
      //   title: '北京',
      //   icon: 'https://webapi.amap.com/images/car.png',// 自定义图标标记 也可设置icon实例 更灵活

      // });
      // })
      //       也可一次添加多个点标记    // 多个点实例组成的数组
      // var markerList = [marker1, marker2, marker3];
      // map.add(markerList);

      // 创建一条折线覆盖物
      var polyline = new AMap.Polyline({
        path: paths,
        borderWeight: 2, // 线条宽度，默认为 1
        lineJoin: 'round', // 折线拐点连接处样式
        showDir: true,
        strokeColor: '#cbcbcb', // 线颜色
        strokeOpacity: 1,     // 线透明度
        strokeWeight: 6,      // 线宽
        strokeStyle: "dashed",  // 线样式
        zIndex: 1,
      });
      map.add(polyline);


      // 创建一条折线覆盖物
      let polyline2 = new AMap.Polyline({
        path: paths2,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: '#073c7a', // 线条颜色
        strokeOpacity: 1,     // 线透明度
        strokeWeight: 6,      // 线宽
        strokeStyle: "solid",  // 线样式
        lineJoin: 'round', // 折线拐点连接处样式
        zIndex: 2,

      });
      map.add(polyline2);


      // 自动适配到合适视野范围
      // 无参数，默认包括所有覆盖物的情况
      map.setFitView();
      // 传入覆盖物数组，仅包括polyline和marker1的情况
      map.setFitView([polyline, marker1]);
    },
    initMap2() {
      // this.map.on('complete', function () {
      //   // 创建地图对象后，开始加载地图资源，地图加载完成后触发complete事件。
      // });
      //  var toolbar = new AMap.ToolBar();
      AMapUI.load({
        key: "16a302b5bbfb4ecd11a3738d9e6b3552", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            zoom: 4,//设置地图显示的缩放级别
            center: [116.397428, 39.90923],//设置地图中心点坐标
            layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
            mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
            viewMode: '2D',  //设置地图模式
            lang: 'zh_cn',  //设置地图语言类型
          });
          // 默认情况下，地图只显示标准底图，如需要叠加别的图层，可以通过map.add方法添加图层：
          //实时路况图层
          this.trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10
          });
          this.map.add(trafficLayer);//添加图层到地图
        })
        .catch((e) => {
          console.log(e);
        });
    },
    init(data) {
      this.map = new AMap.Map("container", {
        zoom: 4,//设置地图显示的缩放级别
        center: [116.397428, 39.90923],//设置地图中心点坐标
        // layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
        // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
        viewMode: '2D',  //设置地图模式
        lang: 'zh_cn',  //设置地图语言类型
      });
      let map = this.map;
      let that = this;
      AMapUI.load(
        ["ui/misc/PathSimplifier", "lib/$"],
        function (PathSimplifier, $) {
          if (!PathSimplifier.supportCanvas) {
            alert("当前环境不支持 Canvas！");
            return;
          }

          var emptyLineStyle = {
            lineWidth: 0,
            fillStyle: null,
            strokeStyle: null,
            borderStyle: {
              color: that.pathColor,
              width: "2px",
            },
          };
          let pathLineStyle = {
            //路线样式设置
            lineWidth: 3,
            strokeStyle: "#FFEC7A",
            borderWidth: 1,
            borderStyle: "#eeeeee",
            dirArrowStyle: false,
          },
            startPointStyle = {
              //起点
              radius: 4,
              fillStyle: "#109618",
              lineWidth: 1,
              strokeStyle: "#eeeeee",
            },
            endPointStyle = {
              //终点
              radius: 4,
              fillStyle: "#dc3912",
              lineWidth: 1,
              strokeStyle: "#eeeeee",
            };

          var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例

            getPath: function (pathData, pathIndex) {
              console.log(pathData);
              return pathData.path;
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              return null;
            },
            renderOptions: {
              //将点、线相关的style全部置emptyLineStyle
              pathLineStyle: pathLineStyle,
              pathLineSelectedStyle: emptyLineStyle,
              pathLineHoverStyle: emptyLineStyle,
              keyPointStyle: emptyLineStyle,
              startPointStyle: startPointStyle,
              endPointStyle: endPointStyle,
              keyPointHoverStyle: emptyLineStyle,
              keyPointOnSelectedPathLineStyle: emptyLineStyle,
            },
          });

          window.pathSimplifierIns = pathSimplifierIns;

          pathSimplifierIns.setData([
            {
              name: "测试",
              path: that.pathData, // 路径数据
            },
          ]);

          //initRoutesContainer(d);

          function onload() {
            pathSimplifierIns.renderLater();
          }

          function onerror(e) {
            console.log(e);
            // alert("图片加载失败！");
          }
          //对第一条线路（即索引 0）创建一个巡航器
          var navg1 = pathSimplifierIns.createPathNavigator(0, {
            loop: false,
            speed: that.speed, //巡航速度，单位千米/小时
            pathNavigatorStyle: {
              width: 24,
              height: 24,
              //使用图片
              content: PathSimplifier.Render.Canvas.getImageContent(
                that.pathImg,
                onload,
                onerror
              ),
              strokeStyle: null,
              fillStyle: null,
              //经过路径的样式
              pathLinePassedStyle: {
                lineWidth: 6,
                strokeStyle: "#06082c", //经过路径背景色
                dirArrowStyle: {
                  // 箭头样式
                  stepSpace: 15, // 箭头间距
                  strokeStyle: "#0e78f3", // 箭头颜色
                },
              },
            },
          });

          navg1.start();
        }
      );
    },
    initLine2() {
      //首先需要得到一串线路的定位点的数组，如： lineArr = [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]];

      //其次如果需要在车辆移动时展示信息框中每个点的信息，那就需要有个信息框的数据信息：如gpsLocus = [{gdLongitude:116.478935,gdLatitude:39.997761,code:'0',time:'2021-07-28 14:12'},{gdLongitude:116.478939,gdLatitude:39.997825,code:'1',time:'2021-07-28 14:13'}]等等，我就不一一写出来了，总之线路点的经纬度要与信息框的经纬度一一对应才行

      if (this.trackMarker) {
        // 1、清空之前数据
        map.remove(this.trackMarker)
        map.remove(trackPolyline)
        map.remove(passedPolyline)
        if (this.carWindow) {
          this.carWindow.close()
        }

      }

      //2、创建汽车点位点
      const position = this.pathData[0] // 线路数据的第一个点的经纬度
      this.trackMarker = new AMap.Marker({
        map: map,
        position: position,
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90,
      })

      // 3、创建信息框
      this.carWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(6, -25),
        content: ''
      })

      // 4、绘制轨迹trackPolyline，这个轨迹是相当于总览展示，如果要控制是否显示整条线路的话，可以通过线路的show()和hide()方法控制
      trackPolyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir: true,
        strokeColor: '#28F',  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
        zIndex: 99999,
      })

      // 5、绘制行驶后的颜色
      passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: '#AF5',  //线颜色
        strokeWeight: 6,      //线宽
        zIndex: 99999,
      })

      // 行驶过后改变颜色
      this.trackMarker.on('moving', (e) => {
        passedPolyline.setPath(e.passedPath)

      })
      // 6.信息框随车辆移动
      AMap.event.addListener(this.trackMarker, 'moving', (e) => {
        var lastLocation = e.passedPath[e.passedPath.length - 1]
        this.carWindow.setPosition(lastLocation)
        //调用信息框的信息，进行对比
        this.etVehicleSpeedInWidowns(lastLocation)
      })
      // 7.打开速度框
      this.carWindow.open(map, this.trackMarker.getPosition())
      // 8.地图自适应缩放
      map.setFitView(this.trackMarker)
      map.setZoom(10)
    },

    //对比信息框的经纬度与移动中经纬度是否相同，相同就把信息框里的内容展示出来
    etVehicleSpeedInWidowns(lnglat) {
      for (var i = 0; i < gpsLocus.length; i++) {
        if (lnglat.lat == gpsLocus[i].gdLatitude && lnglat.lng == gpsLocus[i].gdLongitude) {
          const info = this.trackInfo(gpsLocus[i])
          this.carWindow.setContent(info.join(''))
          return
        }
      }
    },
    //信息框里的内容自定义
    trackInfo(obj) {
      const info = []
      info.push(`<p  style='min-width:200px;'   class='input-item'>设备号 :${obj.code || '未知'}</p>`)
      info.push(`<p  style='min-width:200px;'   class='input-item'>时间:${obj.time || '未知'}</p>`)
      return info
    },


    initLine() {
      //首先需要得到一串线路的定位点的数组，如： lineArr = [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]];

      //其次如果需要在车辆移动时展示信息框中每个点的信息，那就需要有个信息框的数据信息：如gpsLocus = [{gdLongitude:116.478935,gdLatitude:39.997761,code:'0',time:'2021-07-28 14:12'},{gdLongitude:116.478939,gdLatitude:39.997825,code:'1',time:'2021-07-28 14:13'}]等等，我就不一一写出来了，总之线路点的经纬度要与信息框的经纬度一一对应才行 

      // 1、清空之前数据
      if (navg) {
        navg.destroy()

        if (this.carWindow) {
          this.carWindow.close()
        }

      }
      // 3、创建信息框
      this.carWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(6, -25),
        content: '',
      })

      //使用轨迹的组件
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }
        // 如果已存在巡航轨迹，则删除
        if (window.pathSimplifierIns && pathSimplifierIns) {
          //通过该方法清空上次传入的轨迹
          pathSimplifierIns.setData([])
        }

        //创建一个巡航轨迹路线
        pathSimplifierIns = new PathSimplifier({
          zIndex: 100,//地图层级，如果设置过高，可能会影响地图上其他覆盖物，所以需要注意
          map: map, //所属的地图实例
          //巡航路线轨迹列表
          getPath: (pathData, pathIndex) => {
            return pathData.path
          },
          //hover每一个轨迹点，展示内容
          getHoverTitle: (pathData, pathIndex, pointIndex) => {
            if (pointIndex >= 0) {
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
            }
            return pathData.name + '，点数量' + pathData.path.length
          },
          //自定义样式，可设置巡航器样式，巡航轨迹样式，巡航轨迹点击、hover等不同状态下的样式，不设置则用默认样式，详情请参考api文档

          //绘制路线节点
          renderOptions: {

          },
        })
        window.pathSimplifierIns = pathSimplifierIns
        //设置数据
        pathSimplifierIns.setData([{
          name: '路线0',
          path: lineArr,
        }])

        //对第一条线路（即索引 0）创建一个巡航器
        navg = pathSimplifierIns.createPathNavigator(0, {
          loop: false, //循环播放
          speed: 1000,//巡航速度，单位千米/小时
          pathNavigatorStyle: {
            width: 48,//图中小车宽度
            height: 24,//图中小车高度
            initRotateDegree: -90,//初始旋转角度，默认0
            autoRotate: true,
            content: PathSimplifier.Render.Canvas.getImageContent('https://webapi.amap.com/images/car.png'),//图片的引入路径是打包后的路径,也就是index.html的图片引入路径
            strokeStyle: null,
            fillStyle: null,
            //经过路径的样式
            pathLinePassedStyle: {
              lineWidth: 8,
              strokeStyle: '#AF5',
              dirArrowStyle: {
                stepSpace: 15,
                strokeStyle: 'white',
              },

            },
          },
        })

        //调用播放的方法
        this.startTrack()

        //对车辆移动进行监听，控制信息框的展示
        navg.on('move', (data, position) => {
          isCursorAtPathEnd = false
          const idx = position.dataItem.pointIndex //走到了第几个点
          // 打开信息窗体
          const content = [
            '<div style="padding: 5px;">',
            '<div>设备号: ' + gpsLocus[idx].code + '</div>',
            '<div>定位时间：' + gpsLocus[idx].time + '</div>',
            '</div>',
          ]
          this.carWindow.setContent(content.join(''))
          this.carWindow.open(map, lineArr[idx])

          // 如果到头了，回到初始状态
          if (navg.isCursorAtPathEnd()) {
            //  轨迹回放停止，要改变播放按钮状态

          }
        })
      })
    },


    // 开始播放
    startTrack() {
      navg.start()
    },
    // 继续轨迹播放
    resumeTrack() {
      //继续动画
      navg.resume()
    },
    // 暂定轨迹播放
    pauseTrack() {
      navg.pause()
    },
    // 停止播放
    stopTrack() {
      navg.stop()

    }

  },


};
</script>
<style>
#container {
  width: 100%;
  height: 100%;
  margin: 0px;
}

#loadingTip {
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  padding: 3px 10px;
  background: red;
  color: #fff;
  font-size: 14px;
}
</style>
