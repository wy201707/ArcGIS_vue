<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapToolsitemClick" id="xzdh">行政区导航</span>
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
            const currentVisible = this.$store.getters._getdefaultMapTreeVisible;
            console.log('cur v=', currentVisible);
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
        },
        goXZQH() {
            const curVisible = this.$store.getters._getDefaultXZQHVisible;
            console.log('cur v=', curVisible);
            this.$store.commit('_setDefaultXZQHVisible', !curVisible);
        },
        handleMapToolsitemClick(e) {
            console.log('maptools', e.target.id);
            switch (e.target.id) {
                case 'xzdh':
                    // console.log('xzdh');
                    this.goXZQH();
                    break;
                case 'maptree':
                    this.goMapTree();
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
        },
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
                    break;
                case 'swipanalyst':
                    break;
                default:
                    break;
            }
        },
        async initSpaceQuery() {
            const _self = this;
            const view = _self.$store.getters._getDefaultView;
            // 1.绘制面状区域
            const [] = await loadModules(
                ['esri/widgets/Sketch/SketchViewModel', 'esri/Graphic', 'esri/layers/GraphicLayer'],
                config.options,
            );
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
