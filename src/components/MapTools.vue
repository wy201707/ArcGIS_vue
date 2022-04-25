<template>
    <div class="maptools-view">
        <span class="maptools-item">行政区导航</span>
        <span class="maptools-item">距离测量</span>
        <span class="maptools-item">面积测量</span>
        <span class="maptools-item">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    width: 400px;
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
