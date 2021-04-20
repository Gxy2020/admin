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
                            <td class="column">任课班级</td>
                            <td class="column">{{className}}</td>
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
                <el-card class="box-card" style="height: 510px">
                    <div slot="header" class="clearfix">
                        <span>个人成绩</span>
                    </div>
                    <div id="main" :style="{width: '430px', height: '400px'}"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "SWelcome",
        data() {
            return {
                myChart: '',
                data: '服务时间:8:00-20:00',
                message: '五一放假,暂停服务,请提前录入部分成绩',
                tableDate: [],
                user: window.sessionStorage.getItem('user'),
                departmentName: '',
                className: '',
                scoreList: [], //成绩列表
                courseName: [] //科目列表
            }
        },
        mounted() {
            this.getUser();
            this.getScores();
        },
        methods: {
            getUser() {
                this.$axios.get('/api/student/findByUser/' + this.user).then((res) => {
                    this.tableDate = res.data.data;
                    this.className = res.data.data.sClass.name;
                    this.departmentName = res.data.data.departments.name;
                })
            },
            initChart() {
                this.myChart = echarts.init(document.getElementById("main"));
                this.myChart.setOption({
                    color: ['#409EFF'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['各科成绩']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: this.courseName,
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        },
                        axisLine: {             //坐标轴轴线相关设置。
                            lineStyle: {
                                color: '#40c9c6',
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: '#40c9c6',
                            }
                        },
                        type: 'value',
                    },
                    series: [{
                        name: '各科成绩',
                        type: 'line',
                        stack: '总量',
                        data: this.scoreList
                    }]
                })
            },
            getScores() {
                this.$axios.get('/api/score/findScoreByStuId/' + this.user).then((res) => {
                    // console.log(res)
                    var myscores = res.data.data;
                    for (let i in myscores) {
                        this.scoreList.push(myscores[i].score);
                        this.courseName.push(myscores[i].courseName)
                    }
                    this.initChart();
                    const scores = this.scoreList;
                    var sum = 0;
                    for (var i = 0; i < scores.length; i++) {
                        sum += scores[i];
                    }
                    var mean = sum / scores.length;
                    if (mean < 68) {
                            this.$notify({
                                type: "warning",
                                message: '绩点不足!'
                            });
                    }

                    // console.log(mean);
                })
            },
        },
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
