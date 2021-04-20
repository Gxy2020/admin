<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加学生</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row slot="header" style="text-align: center">
                添加学生
            </el-row>
            <el-row>
                <el-form  :model="studentForm" label-width="80px">
                    <el-form-item prop="departmentId" label="请选择学院" label-width="300px" >
                        <el-select v-model="studentForm.departmentId" @change="findMajor(studentForm.departmentId)">
                            <el-option
                                    v-for="item in options"
                                    :key="item.departmentId"
                                    :label="item.name"
                                    :value="item.departmentId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="majorId" label="请选择专业" label-width="300px">
                        <el-select v-model="studentForm.majorId" placeholder="请选择专业" @change="findClass(studentForm.majorId)">
                            <el-option
                                    v-for="item in majorList"
                                    :key="item.majorId"
                                    :label="item.name"
                                    :value="item.majorId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="name" label="请选择班级" label-width="300px">
                        <el-select v-model="studentForm.classId">
                            <el-option
                                    v-for="item in classList"
                                    :key="item.class_id"
                                    :label="item.class_name"
                                    :value="item.class_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入学号" label-width="300px">
                        <el-input v-model="studentForm.user" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入密码" label-width="300px">
                        <el-input v-model="studentForm.password"  placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入姓名" label-width="300px">
                        <el-input v-model="studentForm.username" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item label="性别"  prop="sex" label-width="300px">
                        <el-select placeholder="请选择性别" v-model="studentForm.sex" >
                            <el-option
                                    v-for="item in sex"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入级别" label-width="300px">
                        <el-input v-model="studentForm.year" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入手机号" label-width="300px">
                        <el-input v-model="studentForm.phone" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="请输入邮箱" label-width="300px">
                        <el-input v-model="studentForm.email" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row style="text-align: center;margin-bottom: 20px">
                <el-button @click="remake" round >重置</el-button>
                <el-button type="primary" round @click="saveStudent(studentForm)">创建</el-button>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "SaveStudent",
        data(){
            return{
                sex: [{id: 1, value: '男'}, {id: 2, value: '女'}],
                options: [],
                // departmentId:'',
                // majorId: '',
                name:'',
                majorList: [],
                classList:[],
                studentForm:{
                }
            }
        },
        mounted(){
            this.findDepartments();
        },
        methods:{
            findDepartments() {
                this.$axios.get('/api/department/findAllDepartments').then((res) => {
                    // console.log(res.data.data)
                    this.options = res.data.data
                })
            },
            findMajor(e) {
                this.$axios.get('/api/major/findByDepartmentId/' + e).then((res) => {
                    this.majorList = res.data.data;
                    // console.log(res);
                }).catch(err=>{
                    console.log(err)
                })
            },
            findClass(e){
                this.$axios.get('/api/class/findByMajorId/'+e).then((res)=>{
                    this.classList=res.data.data;
                    console.log(res)
                })
                console.log(e)
            },
            addStudent(e){
                this.$axios.post('/api/student/saveStudent',qs.stringify(e)).then((res)=>{
                    if (res.data.code==200){
                        this.$notify({
                            type:"success",
                            message:"添加成功"
                        })
                    }else {
                        this.$notify({
                            type:"error",
                            message:"添加失败"
                        });
                    }
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                    this.$notify({
                        type:"error",
                        message:"添加失败"
                    });
                });
                console.log(e)
            },
            remake(){

            }
        },
    }

</script>

<style scoped lang="less">
    .el-select,.el-input{
        width: 400px;
    }
</style>
