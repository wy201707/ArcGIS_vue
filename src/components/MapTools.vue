<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapToolsitemClick" id="xzdh">行政区导航</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="maptree">目录树管理</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="distance">距离测量</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="area">面积测量</span>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="clear">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    methods: {
        handleMapToolsitemClick(e) {
            console.log('maptools', e.target.id);
            const currentVisible = this.$store.getters._getdefaultMapTreeVisible;
            console.log('cur v=', currentVisible);
            switch (e.target.id) {
                case 'xzdh':
                    console.log('xzdh');
                    break;
                case 'maptree':
                    this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
                    break;
                case 'distance':
                    break;
                case 'area':
                    break;
                case 'clear':
                    break;
            }
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
.maptools-item:first-child {
    margin-left: 0;
}
</style>
