<template>
    <div id="app">
        <el-container>
            <el-header class="sys-header">一张图项目系统</el-header>
            <el-container class="app-content-pannel">
                <el-aside class="sys-menu">
                    <!--原： <el-aside width="200px" h> 这里h是什么意思？  -->
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @select="handleMenuSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :collapse="true"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-monitor"></i>
                            <span slot="title">首页大屏</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">一张图</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main class="sys-content">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    methods: {
        handleMenuSelect(index) {
            if (index === '1') {
                //跳转到首页大屏
                this.$router.push('/');
            } else if (index === '2') {
                //跳转到一张图
                this.$router.push('/onemap');
            }
        },
    },
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

/* 这里导致router-view+router+导航栏指向的onemap的mapTools文字错位（其实/指向的首页大屏中文字也会偏离，向下偏离40px）
body > .el-container {
    margin-bottom: 40px;
} */
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

.sys-header {
    color: #fff;
    text-align: center;
    line-height: 60px;
    background-color: #32373e;
    font-size: 20px;
    /* font-weight: 600; */
    display: flex;
    justify-content: space-between;
}
.sys-menu {
    background-color: #545c64;
    width: 64px !important;
    overflow: hidden !important;
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
