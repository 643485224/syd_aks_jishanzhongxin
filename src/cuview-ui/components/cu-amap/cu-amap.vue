
<template>
    <div class="amap-page-container">
        <!-- <div class="amap-wrapper">
            <el-amap class="amap-box" :vid="'amap-vue'">
            <el-amap-marker v-for="marker in markers" :position="marker.position"></el-amap-marker>
            </el-amap>
        </div> -->

        <div id="container"></div>

    </div>
</template>
<script>
// import { AMapManager } from "vue-amap";
// let amapManager = new AMapManager();
// import { lazyAMapApiLoaderInstance,AMapLoader } from "vue-amap";
export default {
    name: "cu-amap",
    data() {
        return {
            MapKey: "24ab134d6e1d5b2ce524d6f21358d88b",
            map: null,
            zoom: 17,
            events: {},
            msg: "vue-amap向你问好！"
        };
    },
    created() {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.initMap();
            // 未载入高德地图API，则先载入API再初始化
        }
        else {
            this.asyncInitMap()
        }
    },
    mounted() {
        // var map = new AMap.Map('container', {
        //     zoom: 11,//级别
        //     center: [116.397428, 39.90923],//中心点坐标
        //     viewMode: '3D'//使用3D视图
        // });
        // AMapLoader.load({ //首次调用 load
        //     key: '24ab134d6e1d5b2ce524d6f21358d88b',//首次load key为必填
        //     version: '2.0',
        //     AMapUI: {
        //         version: '1.1',
        //         plugins: ['overlay/SimpleMarker']
        //     }
        // }).then((AMap) => {
        //     map = new AMap.Map('container', {
        //         zoom: 4,
        //     });
        // })
        // lazyAMapApiLoaderInstance.load().then(() => {
        //     this.map = new AMap.Map("amapContainer", {
        //         center: new AMap.LngLat(121.530072, 31.24053),
        //         zoom: this.zoom,
        //     });
        //     var marker = new AMap.Marker({
        //         map: this.map,
        //         icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        //         position: [121.530072, 31.24053],
        //     });
        //     marker.setMap(this.map);
        // });
        // 创建地图
        var map = new AMap.Map("container", {
            zoom: 4
        });
        AMapUI.load(["ui/misc/PathSimplifier", "lib/$"], function (PathSimplifier, $) {
            if (!PathSimplifier.supportCanvas) {
                alert("当前环境不支持 Canvas！");
                return;
            }
            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                //autoSetFitView:false,
                map: map,
                getPath: function (pathData, pathIndex) {
                    return pathData.path;
                },
                getHoverTitle: function (pathData, pathIndex, pointIndex) {
                    if (pointIndex >= 0) {
                        //point 
                        return pathData.name + "，点：" + pointIndex + "/" + pathData.path.length;
                    }
                    return pathData.name + "，点数量" + pathData.path.length;
                },
                renderOptions: {
                    renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
                }
            });
            window.pathSimplifierIns = pathSimplifierIns;
            //设置数据
            pathSimplifierIns.setData([{
                name: "路线0",
                path: [
                    [116.405289, 39.904987],
                    [113.964458, 40.54664],
                    [111.47836, 41.135964],
                    [108.949297, 41.670904],
                    [106.380111, 42.149509],
                    [103.774185, 42.56996],
                    [101.135432, 42.930601],
                    [98.46826, 43.229964],
                    [95.777529, 43.466798],
                    [93.068486, 43.64009],
                    [90.34669, 43.749086],
                    [87.61792, 43.793308]
                ]
            }]);
            //对第一条线路（即索引 0）创建一个巡航器
            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true,
                speed: 1000000 //巡航速度，单位千米/小时
            });
            navg1.start();
        });
    },
    methods: {
        async asyncInitMap() {
            await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${this.MapKey}`);
            await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
            this.initMap();
        },
        dragMap() {

        },
        initMap() {
            // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            let AMapUI = this.AMapUI = window.AMapUI;
            let AMap = this.AMap = window.AMap;
            AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
                let mapConfig = {
                    zoom: 16,
                    cityName: MapCityName
                };
                if (this.lat && this.lng) {
                    mapConfig.center = [this.lng, this.lat];
                }
                let map = new AMap.Map("js-container", mapConfig);
                // 加载地图搜索插件
                AMap.service("AMap.PlaceSearch", () => {
                    this.placeSearch = new AMap.PlaceSearch({
                        pageSize: 5,
                        pageIndex: 1,
                        citylimit: true,
                        city: MapCityName,
                        map: map,
                        panel: "js-result"
                    });
                });
                // 启用工具条
                AMap.plugin(["AMap.ToolBar"], function () {
                    map.addControl(new AMap.ToolBar({
                        position: "RB"
                    }));
                });
                // 创建地图拖拽
                let positionPicker = new PositionPicker({
                    mode: "dragMap",
                    map: map // 依赖地图对象
                });
                // 拖拽完成发送自定义 drag 事件
                positionPicker.on("success", positionResult => {
                    // 过滤掉初始化地图后的第一次默认拖放
                    if (!this.dragStatus) {
                        this.dragStatus = true;
                    }
                    else {
                        this.$emit("drag", positionResult);
                    }
                });
                // 启动拖放
                positionPicker.start();
            });
        },
    },
};
</script>
<script>

// import { AMapManager } from "vue-amap";
// export default {
//     name: "cu-amap",
//     data() {
//     const self = this;

//         return {
//             center: [121.59996, 31.197646],
//             lng: 0,
//             lat: 0,
//             loaded: false,
//             plugin: [{
//                 enableHighAccuracy: true,//是否使用高精度定位，默认:true
//                 timeout: 100,          //超过10秒后停止定位，默认：无穷大
//                 maximumAge: 0,           //定位结果缓存0毫秒，默认：0
//                 convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//                 showButton: true,        //显示定位按钮，默认：true
//                 buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
//                 showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
//                 showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
//                 panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
//                 zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
//                 extensions: 'all',
//                 pName: 'Geolocation',
//                 events: {
//                     init(o) {
//                         // o 是高德地图定位插件实例
//                         o.getCurrentPosition((status, result) => {
//                             console.log(result)
//                             if (result && result.position) {
//                                 self.lng = result.position.lng;
//                                 self.lat = result.position.lat;
//                                 self.center = [self.lng, self.lat];
//                                 self.loaded = true;
//                                 self.$nextTick();
//                             }
//                         });
//                     }
//                 }
//             }]

//         }
//     }
// }
</script>
<style lang="less" scoped>
.amap-wrapper {
    width: 500px;
    height: 500px;
}

.amap-wrap {
    height: 100%;
}


#container {
    width: 500px;
    height: 500px;
}



.amap-page-container {
    position: relative;
}
</style>
<!-- <style>
.amap-demo {
    height: 300px;
}
</style> -->