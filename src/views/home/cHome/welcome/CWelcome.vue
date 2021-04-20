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
                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible=true,edit(tableDate)" >修改信息</el-button>
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
                <el-card class="box-card" style="height: 510px">
                    <div slot="header" class="clearfix">
                        <span>挂科人数占比</span>
                    </div>
                    <div id="main" :style="{width: '430px', height: '400px'}"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号"  :label-width="formLabelWidth">
                    <el-input v-model="form.user" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码"  :label-width="formLabelWidth">
                    <el-input v-model="form.password"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名"  :label-width="formLabelWidth">
                    <el-input v-model="form.username"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别"  :label-width="formLabelWidth">
                    <el-select placeholder="请选择性别" v-model="form.sex" >
                        <el-option
                                v-for="item in sex"
                                :key="item.id"
                                :label="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学院"  :label-width="formLabelWidth">
                    <el-input  disabled v-model="departmentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号"  :label-width="formLabelWidth">
                    <el-input v-model="form.phone"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  :label-width="formLabelWidth">
                    <el-input v-model="form.email"  autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser(form),dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import qs from 'qs'
    export default {
        name: "CWelcome",
        data() {
            return {
                sex: [{id: 1, value: '男'}, {id: 2, value: '女'}],
                dialogFormVisible:false,
                data: '服务时间:8:00-20:00',
                message: '五一放假,暂停服务,请提前录入部分成绩',
                tableDate: [],
                user: window.sessionStorage.getItem('user'),
                departmentName: '',
                form:[],
                formLabelWidth: '100px'
            }
        },
        mounted() {
            this.initChart();
            this.getUser();
        },
        methods: {
            getUser() {
                this.$axios.get('/api/counsellor/findByUser/' + this.user).then((res) => {
                    this.tableDate = res.data.data;
                    this.departmentName = res.data.data.department.name;
                    // console.log(this.tableDate)
                })
            },
            edit(e){
              // console.log(e)
                this.form=e
                // console.log(this.form)
            },
            updateUser(e){
               const data=qs.stringify({'password':e.password,'username':e.username,
                   'sex':e.sex,'phone':e.phone,'email':e.email,'id':e.id});
               this.$axios.post('/api/counsellor/updateCounsellor',data).then((res)=>{
                   if (res.data.code==200){
                       this.$notify({
                           type:"success",
                           message:'修改成功'
                       })
                       this.getUser();
                   }else {
                       this.$notify({
                           type:"error",
                           message:'修改失败'
                       })
                   }
                   // console.log(res.data)
               })
                console.log(data)
            },
            initChart() {
                let  myChart = echarts.init(document.getElementById("main"));

                this.$axios.get('/api/score/findCodeFailed').then((res)=>{
                    // console.log(res);

                    myChart.setOption({
                        roseType: 'angle',
                        tooltip: {},
                        legend: {
                            left: 'center',
                            bottom: '10',
                            data: res.data.data.name,
                        },
                        series: [
                            {
                                name: '挂科人数',
                                type: 'pie',
                                radius: '55%',
                                data:res.data.data,
                                animationEasing: 'cubicInOut',
                            }
                        ]
                    });
                })

            }
        }
    }
</script>

<style lang="less">
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
        height: 57.5px;
    }
    .el-dialog{
      width: 500px;
    }
    /*.el-form{*/
    /*    width: 500px;*/
    /*}*/
</style>
