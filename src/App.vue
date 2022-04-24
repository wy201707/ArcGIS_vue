<template>
    <div id="app">
        <el-container>
            <el-header class="sys-header">一张图地图</el-header>
            <el-container class="app-content-pannel">
                <el-aside width="200px" h>左键菜单</el-aside>
                <!--原： <el-aside width="200px" h> 这里h是什么意思？  -->
                <el-main class="sys-content">
                    <MapView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import MapView from './components/MapView';

export default {
    name: 'App',
    components: { MapView },
    methods: {},
};
</script>

<!-- <style>

</style> -->

<style>
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
}
.el-header {
    background-color: #5f9ddb;
    color: #fff;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #7bb8ed;
    color: #fff;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 180px; */
}

body > .el-container {
    margin-bottom: 40px;
}
.el-container {
    height: 100%;
}
.app-content-pannel {
    height: 100%;
}

.sys-content {
    padding: 5px !important;
    /* ! important提高权重值。不然的话，权重干不过el-main（padding=20px太宽了不好看），会导致配置无效*/
}
/* .OutPannel,
.ContentPannel {
    height: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
} */
</style>
