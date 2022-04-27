<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getdefaultMapTreeVisible">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.23/',
    css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css',
};

export default {
    name: 'MapTree',
    data() {
        return {
            data: [
                {
                    label: '暖色系图层',
                    layerid: 'layerid', //现实场景可能需要后端读取获得layerid
                    layurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '黑蓝色系图层',
                            layerid: 'layerid', //现实场景可能需要后端读取获得layerid
                            layurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                            children: [
                                {
                                    label: '三级 2-1-1',
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
                                    // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/ArcGIS/rest/services/XZQHProvince2_Project/FeatureServer',
                                    layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHProvince_WebMokatuo/FeatureServer',
                                },
                                {
                                    label: '市数据',
                                    layerid: 'layerid',
                                    // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                                    layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCity_WebMokatuo/FeatureServer',
                                },
                                {
                                    label: '县数据',
                                    layerid: 'layerid',
                                    // layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty2_WebMokatuo/FeatureServer',
                                    layurl: 'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHCounty_WebMokatuo/FeatureServer',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1',
                                },
                            ],
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1',
                                },
                            ],
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
                //如果

                const [TileLayer] = await loadModules(['esri/layers/TileLayer'], options);
                const layer = new TileLayer({ url: data.layurl, id: data.layerid });

                view.map.add(layer);
            }
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
</style>
