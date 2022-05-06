<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<!-- <template>
    <div class="maptree-pannel" v-show="this.$store.getters._getdefaultMapTreeVisible">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template> -->

<script>
import { loadModules } from 'esri-loader';
import config from './config';
// const options = {
//     url: 'https://js.arcgis.com/4.23/',
//     css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css',
// };

export default {
    name: 'MapTree',
    data() {
        return {
            data: [
                {
                    label: '可选图层',
                    children: [
                        {
                            label: '暖色系图层',
                            layerid: 'layerid', //现实场景可能需要后端读取获得layerid
                            layurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            label: '黑蓝色系图层',
                            layerid: 'layerid', //现实场景可能需要后端读取获得layerid
                            layurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        },
                    ],
                },
                {
                    label: '行政区划',
                    children: [
                        {
                            label: '省数据',
                            layerid: 'layerid',
                            // 我的数据：第一份编码格式有问题不是按照省级号码进行编码，第二份缺少县级数据
                            // 妈的，纠结这么久。直接用老师发布的服务不就好了
                            // 他的失效了。。。
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/ArcGIS/rest/services/XZQHProvince2_Project/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHProvince_WebMokatuo/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/2XZQH_Province_WebMokatuo/FeatureServer',
                            layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Province_2020/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layerid: 'layerid',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/2XZQH_City_WebMokatuo/FeatureServer',
                            layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/City_2020/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layerid: 'layerid',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty2_WebMokatuo/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty_WebMokatuo/FeatureServer',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty4_WebMokatuo/FeatureServer',
                            layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/4XZQH_County/FeatureServer',
                        },
                    ],
                },
                {
                    label: '业务数据',
                    children: [
                        {
                            label: '火车站数据',
                            layerid: 'layerid',
                            // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/diandianGIS/FeatureServer',
                            layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/StationPoint/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    /*     computed: {
        IsShow() {
            return this.$store.getters._getdefaultMapTreeVisible;
        },
    }, */
    methods: {
        async handleNodeClick(data) {
            // console.log(data);
            if (data.layurl) {
                const view = this.$store.getters._getDefaultView;
                // console.log(view.map);
                // const currentLayer = view.map.findLayerById(data.layerid);
                const currentLayer = view.map.findLayerById('layerid');

                if (currentLayer) {
                    // console.log(currentLayer);
                    view.map.remove(currentLayer);
                }

                /* const [TileLayer] = await loadModules(['esri/layers/TileLayer'], options);
                const layer = new TileLayer({ url: data.layurl, id: data.layerid }); */
                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    config.options,
                );
                const c = data.layurl.split('/');
                const serverType = c[c.length - 1];
                // console.log(serverType);
                let layer = '';
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layurl, id: data.layerid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layurl, id: data.layerid });
                        break;
                    default:
                        break;
                }

                view.map.add(layer);

                /*                 // 以下只是为了调整缩放大小
                console.log(config.centerPoints[2]['HanZhong']);                
                view.center = config.centerPoints[2]['HanZhong']; //[107.03194, 33.06784];
                view.zoom = 4; */
                // console.log(typeof config);
                // console.log(typeof config.centerPoints);
                // console.log(typeof config.centerPoints[2]);
                /*                 centerPoint = config.centerPoints.forEach((element) => {
                    console.log(element);
                    if (element.addrName == 'Wuhan') {
                        return element.address;
                    }
                }); */
                // console.log(centerPoint);

                // view.scale = 200;
                // console.log(view.spatialReference);
                /*                 let pt = new Point({
                    x: config.centerPoint.longitude,
                    y: config.centerPoint.longitude,
                    spatialReference: {
                        wkid: view.spatialReference,
                    },
                });
                console.log(pt); */

                /*  view.goTo({
                    center: [
                        featuresResult.geometry.extent.center.longitude,
                        featuresResult.geometry.extent.center.latitude,
                    ],
                    zoom: 8, //缩放程度设为8级
                }); */
            }
        },
        closeMapTreePannel() {
            const currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);

            //恢复大小  不行的，怎么按需裁撤图层？？？这种API加载进来的
            // if (data.layer) {
            //     const view = this.$store.getters._getDefaultView;
            //     const currentLayer = view.map.findLayerById('layerid');

            //     if (currentLayer) {
            //         // console.log(currentLayer);
            //         view.map.remove(currentLayer);
            //         view.center = config.centerPoints[0]['LongHai']; //[117.81813, 24.44658]
            //         view.zoom = 10;
            //     }
            // }
        },
    },
    components: {},
    mounted: function () {},
};
</script>

<style>
.maptree-pannel {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 200px;
    height: 300px;
    background-color: white;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>
