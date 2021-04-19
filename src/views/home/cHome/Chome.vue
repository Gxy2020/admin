<template>
        <el-container class="home_container">
            <!--左侧边栏-->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#304156" text-color="#fff"
                         default-active="welcome" :collapse="isCollapse"
                         :collapse-transition="false"
                         active-text-color="#409BFF" :router="true">
                    <el-menu-item  index="cwelcome">
                        <i class="el-icon-s-home" />
                        <span slot="title">首页</span>
                    </el-menu-item >
                    <!--一级菜的模板区域-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-custom"/>
                            <span>学生管理</span>
                        </template>
                        <el-menu-item index="students">
                            <template slot="title">
                                <span>学生列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="saveStudent">
                            <template slot="title">
                                <span>添加学生</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="cclass">
                            <i class="el-icon-s-operation"></i>
                            <span slot="title">班级管理</span>
                    </el-menu-item>
                    <el-menu-item index="studentScores">
                        <i class="el-icon-s-marketing"></i>
                        <span slot="title">成绩管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <!--右侧头部-->
                <el-header height="50px">
                    <div class="user-logout">
                        <span  class="user">辅导员: {{ user}}</span><el-button type="info" plain @click="logout" style="font-size: 15px">退出</el-button>
                    </div>
                </el-header>
                <!--            <el-></el->-->
                <!--右侧主体-->
                <el-main>
                    <router-view></router-view>
                </el-main>

            </el-container>
        </el-container>
</template>

<script>
    export default {
        name: "Chome",
        data(){
            return{
                isCollapse:false,
                user:''
            }
        },
        mounted() {
            this.user=window.sessionStorage.getItem('user')
            // console.log(this.user);
            console.log(window.sessionStorage.getItem('departmentId'))
        },
        methods:{
            logout(){
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            //切换按钮的展开
            toggleCollapse(){
                this.isCollapse=!this.isCollapse;
            },

        }
    }
</script>

<style scoped lang="less">
    .toggle-button{
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.4em;
        cursor: pointer;
    }
    .home_container{
        height: 100%;
    }
    .el-header{
        background-color: #B3C0D1;
    .user-logout{
        float: right;
        margin-top: 5px;
    .user{
        margin-right: 20px;
        font-size: 15px;
        color: #4A5064;
    }
    }

    }
    .el-aside {
        background-color: #304156;
    .el-menu{
        border-right:none ;
    }


    }
    .el-main {
        background-color: #E9EEF3;

    }
</style>
