<template>
    <div id="mapview"></div>
</template>

<script>
import { loadModules } from 'esri-loader';

/* const options = {
    url: 'https://js.arcgis.com/4.20/init.js',
    css: 'https://js.arcgis.com/4.20/esri/themes/light/main.css',
};
 */
const options = {
    url: 'https://js.arcgis.com/4.23/',
    css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css',
};
export default {
    name: 'MapView',
    component: {},
    mounted: function () {
        this.__createSceneView();
    },
    methods: {
        async __createSceneView() {
            /*          旧写法：存在逻辑嵌套问题（？我也不知道是啥）
            //通过loadModules来做衔接
            loadModules([], option)
                .then(([]) => {
                    //业务代码在此处编写
                })
                .catch((err) => {
                    _self.$message('地图创建失败，' + err);
                }); */
            //改进后（使用await）
            const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], options);

            const map = new Map({
                basemap: 'osm',
                // basemap: 'topo-vector',
            });

            const view = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [117.81813, 24.44658],
            });
            // console.log(view);
            view.ui.components = []; //去掉左上角的缩放图标
        },
    },
};
</script>

<style>
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
