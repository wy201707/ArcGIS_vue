<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemapToggle"></div>
        <div id="scalebar"></div>
        <div id="zoom"></div>
        <div class="view-change" @click="handleViewChange">
            <span>{{ viewModel }}</span>
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';
export default {
    name: 'MapView',
    data() {
        return {
            viewModel: '3D',
        };
    },
    component: {},
    mounted: function () {
        // console.log(this.$store.state._defaultView);  取值
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            // 妈的获得的是div的id，因为scaleBar中的B搞了半天
            document.getElementById('basemapToggle').innerHTML = '';
            document.getElementById('scalebar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';
            const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                ],
                config.options,
            );
            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });
            const map = new Map({
                basemap,
            });
            const mapView = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [117.81813, 24.44658],
            });
            //实例化底图并实现两张底图的切换
            this.basemapToggle = new BasemapToggle({
                view: mapView, // The view that provides access to the map's "streets-vector" basemap
                nextBasemap: 'hybrid', // Allows for toggling to the "hybrid" basemap
                container: 'basemapToggle', //id=basemapToggle的那个div
            });
            mapView.ui.add(this.basemapToggle); //与底部样式一起实现地图切换控件自定义位置
            /*             mapView.ui.add(basemapToggle, {
                position: 'bottom-right',
            }); */

            //添加比例尺
            this.scaleBar = new ScaleBar({
                view: mapView,
                unit: 'metric',
                container: 'scalebar',
            });
            mapView.ui.add(this.scaleBar);

            //添加缩放控件
            this.zoom = new Zoom({
                view: mapView,
                container: 'zoom',
            });
            mapView.ui.add(this.zoom);

            mapView.ui.components = []; //去掉左上角的缩放图标
            this.$store.commit('_setDefaultView', mapView); //设置默认地图
        },
        async _createSceneView() {
            document.getElementById('basemapToggle').innerHTML = '';
            document.getElementById('scalebar').innerHTML = '';
            document.getElementById('zoom').innerHTML = '';
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
                config.options,
            );
            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
                        // url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer', //黑蓝配色
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });

            const map = new Map({
                basemap: basemap,
                // basemap: 'topo-vector',
            });

            //_createSceneView和_createMapView的唯一区别： new SceneView(实例化三维) 和new MapView（实例化二维）
            const sceneView = new SceneView({
                container: 'mapview',
                map: map,
            });
            setTimeout(() => {
                sceneView.goTo({
                    zoom: 6,
                    center: [117.81813, 24.44658],
                });
            }, 2000);

            sceneView.ui.components = []; //去掉左上角的缩放图标
            this.$store.commit('_setDefaultView', sceneView); //设置默认地图
        },
        //二三维切换
        handleViewChange() {
            if (this.viewModel === '3D') {
                //viewModel中存着下一次的地图视角
                this._createSceneView();
                this.viewModel = '2D';
            } else {
                this._createMapView();
                this.viewModel = '3D';
            }
        },
    },
};
</script>

<style>
#mapview,
.mapview-pannel {
    position: relative;
    width: 100%;
    height: 100%;
}
#basemapToggle {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
#scalebar {
    position: absolute;
    left: 20px;
    bottom: 15px;
}
#zoom {
    position: absolute;
    right: 20px;
    bottom: 95px;
}
.view-change {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 15px;
    bottom: 180px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
}
.view-change span {
    line-height: 32px;
}
</style>
