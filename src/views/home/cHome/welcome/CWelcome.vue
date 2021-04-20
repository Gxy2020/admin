<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <h2>公告: <span style="color: crimson;margin-left: 30px">{{message}}</span>
                <el-divider><i class="el-icon-s-platform"></i></el-divider>
                <span style="text-align: center">
               {{data}}
           </span></h2>
        </el-card>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <table style="width: 100%" class="myTable">
                        <tr>
                            <td class="column">账号</td>
                            <td class="column">{{tableDate.user}}</td>
                        </tr>
                        <tr>
                            <td class="column">密码</td>
                            <td class="column">{{tableDate.password}}</td>
                        </tr>
                        <tr>
                            <td class="column">姓名</td>
                            <td class="column">{{tableDate.username}}</td>
                        </tr>
                        <tr>
                            <td class="column">性别</td>
                            <td class="column">{{tableDate.sex}}</td>
                        </tr>
                        <tr>
                            <td class="column">学院</td>
                            <td class="column">{{departmentName}}</td>
                        </tr>
                        <tr>
                            <td class="column">手机号</td>
                            <td class="column">{{tableDate.phone}}</td>
                        </tr>
                        <tr>
                            <td class="column">电子邮件</td>
                            <td class="column">{{tableDate.email}}</td>
                        </tr>
                    </table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" style="height: 460px">
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :icon="activity.icon"
                                    :type="activity.type"
                                    :color="activity.color"
                                    :size="activity.size"
                                    :timestamp="activity.timestamp">
                                {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "CWelcome",
        data() {
            return {
                data: '服务时间:8:00-20:00',
                message: '五一放假,暂停服务,请提前录入部分成绩',
                activities: [
                    {
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                },
                    {
                        content: '支持自定义尺寸',
                        timestamp: '2018-04-03 20:46',
                        size: 'large'
                    },
                    {
                        content: '支持自定义尺寸',
                        timestamp: '2018-04-03 20:46',
                        size: 'large'
                    },
                    {
                        content: '支持自定义尺寸',
                        timestamp: '2018-04-03 20:46',
                        size: 'large'
                    },{
                        content: '默认样式的节点',
                        timestamp: '2018-04-03 20:46'
                    }],
                tableDate: [],
                user: window.sessionStorage.getItem('user'),
                departmentName: ''
            }
        },
        mounted() {

            this.getUser();
        },
        methods: {
            getUser() {
                this.$axios.get('/api/counsellor/findByUser/' + this.user).then((res) => {
                    this.tableDate = res.data.data;
                    this.departmentName = res.data.data.department.name;
                    console.log(this.tableDate)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .el-card {
        margin: 8px;
    }

    .box-card {
        width: 500px;
    }

    .myTable {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }

    .myTable td,
    .myTable th {
        border: 1px solid #cad9ea;
        color: #666;
        height: 50px;
    }
</style>
