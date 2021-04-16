<template>
    <el-container class="home_container">
        <!--左侧边栏-->
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu background-color="#304156" text-color="#fff"
                     default-active="welcome" :collapse="isCollapse"
                     :collapse-transition="false"
                     active-text-color="#409BFF" :router="true">
                <el-menu-item  index="welcome">
                        <i class="el-icon-s-home" />
                        <span slot="title">首页</span>
                </el-menu-item >
                <!--一级菜的模板区域-->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-custom"/>
                        <span>成员列表</span>
                    </template>
                    <el-menu-item index="adminList">
                        <template slot="title">
                            <span>管理员列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="counsellorList">
                        <template slot="title">
                            <span>辅导员列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="teacherList">
                        <template slot="title">
                            <span>教师列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="studentList">
                        <template slot="title">
                            <span>学生列表</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-school"></i>
                        <span>学院管理</span>
                    </template>
                    <el-menu-item index="departmentList">
                        <template slot="title">
                            <span >院系列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="majorList">
                        <template slot="title">
                            <span>专业列表</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-operation"></i>
                        <span>班级管理</span>
                    </template>
                    <el-menu-item index="classList">
                        <template slot="title">
                            <span >班级列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="addClass">
                        <template slot="title">
                            <span>添加班级</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="addStudent">
                        <template slot="title">
                            <span>添加学生</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-s-grid"></i>
                        <span>科目管理</span>
                    </template>
                    <el-menu-item index="">
                        <template slot="title">
                            <span >科目列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="">
                        <template slot="title">
                            <span>添加科目</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
           <!--     <el-submenu index="1-4">
                    <template slot="title">
                        <icon class="el-icon-camera"/>
                    <span>选项4</span>
                    </template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>-->
                <el-menu-item index="scores">
                        <i class="el-icon-s-marketing"></i>
                        <span slot="title">成绩管理</span>
<!--                    <el-menu-item index="classList">-->
<!--                        <template slot="title">-->
<!--                            <span >科目列表</span>-->
<!--                        </template>-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item index="addClass">-->
<!--                        <template slot="title">-->
<!--                            <span>添加科目</span>-->
<!--                        </template>-->
<!--                    </el-menu-item>-->
                </el-menu-item>
                <el-menu-item index="log">
                        <i class="el-icon-coin" />
                        <span slot="title">日志信息</span>
                </el-menu-item>
                <el-menu-item index="text">
                        <i class="el-icon-folder-opened" />
                        <span slot="title">项目文档</span>
                </el-menu-item>
            </el-menu>

        </el-aside>

        <el-container>
            <!--右侧头部-->
            <el-header height="50px">
                <div class="user-logout">

                <span  class="user">学生: {{ user}}</span><el-button type="info" plain @click="logout" style="font-size: 15px">退出</el-button>
                </div>
            </el-header>
            <!--            <el-></el->-->
            <!--右侧主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
            <template>
                <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
            </template>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name:'Home',
    data(){
      return{
          isCollapse:false,
          user:''
      }
    },
      mounted() {
          this.user=window.sessionStorage.getItem('user')
          // console.log(window.sessionStorage.getItem('user'))
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
