<template>
    <div id="app">
        <el-container>
            <el-header class="sys-header">一张图地图</el-header>
            <el-container class="app-content-pannel">
                <el-aside width="200px" h>左键菜单</el-aside>
                <!--原： <el-aside width="200px" h> 这里h是什么意思？  -->
                <el-main>地图区域</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// import { loadModules } from 'esri-loader';
// import {loadScript, loadCss, loadModules} from 'esri-loader'
// import * as esriLoader from "esri-loader";

export default {
    name: 'App',
    components: {},
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
    line-height: 180px;
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
