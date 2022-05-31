<template>
    <div id="app">
        <el-container>
            <el-header class="sys-header">
                <span>一张图项目系统</span>
                <div class="user-info">
                    <i class="el-icon-user-solid"></i>
                    <span>当前用户:</span>
                    <span @click="handleLogin">{{ username }}</span>
                </div>
            </el-header>
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
        <el-dialog title="用户登录、注册页面" :visible.sync="loginVisible" width="30%">
            <div class="login-content">
                <el-input placeholder="请输入内容" v-model="userNameInput" clearable> </el-input>
                <el-input placeholder="请输入密码" v-model="userPwdInput" show-password></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginVisible = false">取 消</el-button>
                <el-button type="primary" @click="userLogin">登录</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
//或者在main.js中引用+vue.use()即可全局使用axios
export default {
    name: 'App',
    components: {},
    data() {
        return {
            username: '未登录',
            loginVisible: false,
            userNameInput: '',
            userPwdInput: '',
        };
    },
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
        //弹出用户登录页面
        handleLogin() {
            this.loginVisible = true;
        },
        //用户登录——传到后台
        userLogin() {
            const _self = this;
            const name = this.userNameInput;
            const psd = this.userPwdInput;
            // console.log(name, psd);
            axios
                .get('http://localhost:3001/user/get', {
                    params: {
                        name: name,
                        password: psd,
                    },
                })
                .then(function (response) {
                    if (response.data.status === 'success') {
                        const password = response.data.data[0].password;
                        // console.log(password, psd);
                        if (password === psd) {
                            // console.log('login ok');
                            _self.$message({
                                message: '登录成功啦',
                                type: 'success',
                            });
                            _self.loginVisible = false;
                            _self.username = response.data.data[0].username;
                        } else {
                            _self.$message.error('登录失败，用户名或密码错误');
                            // console.log('fail');
                        }
                    }

                    // console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.loginVisible = false;
                });
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
/* 这（.morescreen-view）也没用上呀？ */
.morescreen-view {
    width: 100%;
    height: 820px;
}
.user-info {
    font-size: 15px;
}
.user-info > span:last-child:hover {
    color: #409eff;
    cursor: pointer;
}
.login-content {
    color: #32373e;
}
</style>
