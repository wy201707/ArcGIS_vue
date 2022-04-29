<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemapToggle"></div>
        <div id="scalebar"></div>
        <div id="zoom"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.23/',
    css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css',
};
export default {
    name: 'MapView',
    component: {},
    mounted: function () {
        // console.log(this.$store.state._defaultView);  取值
        this.__createSceneView();
    },
    methods: {
        async __createSceneView() {
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
                options,
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

            const mapView = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [117.81813, 24.44658],
            });

            //实例化底图并实现两张底图的切换
            const basemapToggle = new BasemapToggle({
                view: mapView, // The view that provides access to the map's "streets-vector" basemap
                nextBasemap: 'hybrid', // Allows for toggling to the "hybrid" basemap
                container: 'basemapToggle', //id=basemapToggle的那个div
            });
            mapView.ui.add(basemapToggle); //与底部样式一起实现地图切换控件自定义位置
            /*             mapView.ui.add(basemapToggle, {
                position: 'bottom-right',
            }); */

            //添加比例尺
            const scaleBar = new ScaleBar({
                view: mapView,
                unit: 'metric',
                container: 'scalebar',
            });
            mapView.ui.add(scaleBar);

            //添加缩放控件
            const zoom = new Zoom({
                view: mapView,
                container: 'zoom',
            });
            mapView.ui.add(zoom);

            mapView.ui.components = []; //去掉左上角的缩放图标
            this.$store.commit('_setDefaultView', mapView); //设置默认地图
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
</style>
