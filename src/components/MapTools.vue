<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapToolsitemClick" id="xzqh">行政区导航</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="maptree">目录树管理</span>
        <el-dropdown trigger="click" class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">地图测量<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="distance">距离测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" command="area">面积测量</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">更多功能<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-search" command="spacequery">空间查询</el-dropdown-item>
                <el-dropdown-item icon="el-icon-film" command="morescreen">多屏对比</el-dropdown-item>
                <el-dropdown-item icon="el-icon-reading" command="swipanalyst">卷帘分析</el-dropdown-item>
                <el-dropdown-item icon="el-icon-reading" command="printmap">地图打印</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './config';
export default {
    name: 'MapTools',
    methods: {
        goMapTree() {
            const currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            console.log('getMaptree=', currentVisible);
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
        },
        goXZQH() {
            const curVisible = this.$store.getters._getDefaultXZQHVisible;
            console.log('goXZQH=', curVisible);
            this.$store.commit('_setDefaultXZQHVisible', !curVisible);
        },
        handleClearMap() {
            const view = this.$store.getters._getDefaultView;
            const resultLayer1 = view.map.findLayerById('swipeLayerTop');
            const resultLayer2 = view.map.findLayerById('swipeLayerBottom');
            const resultLayer3 = view.map.findLayerById('layerid');
            if (resultLayer1) view.map.remove(resultLayer1);
            if (resultLayer2) view.map.remove(resultLayer2);
            if (resultLayer3) view.map.remove(resultLayer3);
            if (this.swipe) this.swipe.destroy();
            if (this.measurementWidget) this.measurementWidget.destroy();
        },
        handleMapToolsitemClick(e) {
            console.log('maptools:e=', e.target.id);
            switch (e.target.id) {
                case 'xzqh':
                    // console.log('xzdh');
                    this.goXZQH();
                    break;
                case 'maptree':
                    this.goMapTree();
                    break;
                case 'clear':
                    this.handleClearMap();
                    break;
                default:
                    break;
            }
        },
        _initSwipe() {},
        handleCommand(command) {
            switch (command) {
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'spacequery':
                    this.initSpaceQuery();
                    break;
                case 'morescreen':
                    this.$router.push('/onemap/one');
                    break;
                case 'swipanalyst':
                    this._initSwipe();
                    break;
                default:
                    break;
            }
        },
        async initSpaceQuery() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            // 1.绘制面状区域
            const [SketchViewModel, Graphic, GraphicsLayer] = await loadModules(
                ['esri/widgets/Sketch/SketchViewModel', 'esri/Graphic', 'esri/layers/GraphicsLayer'],
                config.options,
            );
            const resultLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);
            //1.1定义空的graphicsLayer，储存后续画出来的图形
            const graphicsLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(graphicsLayer);
            // 1.2定义样式
            const polygonSymbol = {
                type: 'simple-fill',
                color: 'rgba(216,30,6, 0.4)',
                style: 'solid',
                outline: {
                    color: '#d81e06',
                    width: 1,
                },
            };
            // 1.3定义sketchViewModel
            //widget中的sketch组件没办法改动工具栏控件，也没办法监听绘制完成的动作（这样绘制完成后无法取得绘制图形的graphic）。
            //所以采用sketchViewModel（sketch的底层），相当于亲自写底层以自定义sketch

            var sketchViewModel = new SketchViewModel({
                updateOnGraphicClick: false,
                view,
                layer: graphicsLayer,
                polygonSymbol, //1.3将样式传入
            });
            // 1.4 sketchViewModel指定绘制图形类型
            sketchViewModel.create('polygon');

            //1.5监听
            //! create-complete方法监听到的事件中，只能调用API相关函数，无法书写自己的代码逻辑（自然无法调用自定义函数和console.log等调试代码）
            sketchViewModel.on('create-complete', function (event) {
                //1.6 graphic添加到graphicsLayer
                const graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: sketchViewModel.graphic.symbol,
                });
                graphicsLayer.add(graphic);
            });
            // ! 'create' 开发人员可以用
            sketchViewModel.on('create', function (event) {
                if (event.state === 'complete') {
                    // console.log('graphicsLayer', graphicsLayer);
                    // console.log('event', event);
                    //2、执行空间查询
                    _self.handleSpaceQuery(event.graphic);
                }
            });
        },
        handleSpaceQuery(graphic) {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            const resultLayer = view.map.findLayerById('layerid');
            //空间查询功能需要和业务图层绑定。第一步查询有没有业务图层（不是还得检查以下是不是业务图层嘛？）
            if (!resultLayer) {
                _self.$message({
                    message: '尚未添加业务图层，不能进行空间查询',
                    type: 'warning',
                });
                return;
            }
            const queryPoint = resultLayer.createQuery(); //实例化query
            /***&*/ queryPoint.geometry = graphic.geometry; //赋值操作，query与业务图层绑定
            resultLayer
                .queryFeatures(queryPoint)
                .then(function (results) {
                    let currentData = [];
                    /***&*/ if (results.features.length > 0) {
                        // 符号化渲染、实例化弹窗
                        _self.renderResultLayer(results.features);
                        // 符号化渲染的同时，对查询结果使用表格进行展示
                        // console.log('renderResultLayer之后，_self=', _self); //不是什么promise中的this指针调用问题
                        /***&*/ results.features.map((item, index) => {
                            currentData.push({
                                name: item.attributes.name,
                                type: item.attributes.sType,
                                tieluju: item.attributes.tieluju,
                                address: item.attributes.address,
                                lon: item.attributes.lon,
                                lat: item.attributes.lat,
                                key: index,
                            });
                        });
                        /***&*/
                    } else {
                        currentData.length = 0;
                    }

                    _self.$message({
                        message: `查询成功，共查到 ${results.features.length} 条数据`,
                        type: 'success',
                    });
                    _self.$store.commit('_setDefaultQueryResult', currentData);
                    /***&*/ _self.$store.commit('_setDefaultQueryResultVisible', true);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.$message.error('空间查询失败，请联系管理员');
                });
            /* 补充：考点Promise的执行顺序，当前脚本调用了Promise.then()，是当前脚本全部执行完，才执行.then中的语句
            console.log(_self);
            console.log(this.$store.getters._getDefaultQueryResultVisible);
            console.log(this.$store.getters._getDefaultQueryResult); */
        },
        async renderResultLayer(resultFeatures) {
            const view = this.$store.getters._getDefaultView;
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], config.options);
            // 好家伙，竟然是这个卡住了：loadModules(['esri/layers/FeatureLayer'], config.options);第一项参数必须加[]！！！!!!
            const resultLayer = view.map.findLayerById('initResultLayer');
            if (resultLayer) {
                console.log('有过图层');
                view.map.remove(resultLayer);
            } else {
                console.log('没有图层');
            }

            /***&*/ const resultData = this._translateLonLat(resultFeatures); //转换函数，将查询返回的数据变成自己定义的数据格式           //拼接source所需字符串
            //实例化弹窗
            let template = {
                title: '{name}-{tieluju}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'name',
                                label: '名称',
                            },
                            {
                                fieldName: 'type',
                                label: '类型',
                            },
                            {
                                fieldName: 'tieluju',
                                label: '铁路局',
                            },
                            {
                                fieldName: 'address',
                                label: '地址',
                            },
                        ],
                    },
                ],
            };
            /***&*/ const queryResultLayer = new FeatureLayer({
                source: resultData,
                id: 'initResultLayer',
                objectIdField: 'ObjectID',
                renderer: {
                    type: 'simple', //内置
                    symbol: {
                        type: 'picture-marker', //使用图片渲染
                        url: `static/icon/train.jpg`,
                        // 原来static文件夹要放在public文件夹下
                        width: '32px',
                        height: '32px',
                    },
                },
                fields: [
                    {
                        name: 'OBJECTID',
                        type: 'oid',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'type',
                        type: 'string',
                    },
                    {
                        name: 'tieluju',
                        type: 'string',
                    },
                    {
                        name: 'address',
                        type: 'string',
                    },
                ],
                popupTemplate: template,
            });
            /***&*/ view.map.add(queryResultLayer);
            /***&*/ console.log('现在在renderResultLayer最后一行');
        },

        _translateLonLat(data) {
            // console.log('_translateLonLa,data', data);
            const _self = this;
            /***&*/ if (data.length > 0) {
                _self.geoData = [];
                data.map((value, key) => {
                    _self.geoData.push({
                        geometry: {
                            type: 'point',
                            x: Number(value.attributes.lon),
                            y: Number(value.attributes.lat),
                        },
                        //geometry至少有以上三项
                        attributes: {
                            ObjectID: key + 1,
                            name: value.attributes.name,
                            type: value.attributes.sType,
                            tieluju: value.attributes.tieluju,
                            address: value.attributes.address,
                        },
                        //attributes里面数据可以扩展
                    });
                });
            }
            // console.log('trans返回的数据：', _self.geoData);
            /***&*/ return _self.geoData;
        },
    },
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    width: 370px;
    height: 30px;
    /* background-color: #67c23a45; */
    background-color: #666e75;
    top: 20px;
    right: 15px;
}
.maptools-item {
    line-height: 30px;
    margin-left: 15px;
    color: white;
    font-size: 15px;
    cursor: pointer;
}
.maptools-item:hover {
    color: #409eff;
}
.maptools-item:first-child {
    margin-left: 0;
}
</style>
