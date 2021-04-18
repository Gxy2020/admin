<template>
<div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>班级管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加班级</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col style="text-align: center;font-size: 20px;margin-bottom: 10px">
                <span>添加班级</span>
            </el-col>
        </el-row>
        <el-row>
                    <el-form  :model="classForm" label-width="80px">
                        <el-form-item prop="departmentId" label="请选择学院" label-width="300px" >
                            <el-select v-model="classForm.departmentId" @change="findMajor(classForm.departmentId)">
                                <el-option
                                        v-for="item in options"
                                        :key="item.departmentId"
                                        :label="item.name"
                                        :value="item.departmentId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="majorId" label="请选择专业" label-width="300px">
                            <el-select v-model="classForm.majorId" placeholder="请选择专业">
                                <el-option
                                        v-for="item in majorList"
                                        :key="item.majorId"
                                        :label="item.name"
                                        :value="item.majorId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="name" label="班级名称" label-width="300px">
                            <el-input v-model="classForm.name" label="请输入班级名称"></el-input>
                        </el-form-item>
                    </el-form>
        </el-row>
        <el-row style="text-align: center;margin-bottom: 20px">
            <el-button @click="remake">重置</el-button>
            <el-button type="primary" @click="addClass(classForm)">创建</el-button>
        </el-row>
    </el-card>
</div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "AddClass",
        data() {
            return {
                options: [],
                // departmentId:'',
                // majorId: '',
                name:'',
                majorList: [],
                classForm:{
                    departmentId:'',
                    majorId:'',
                    name:'',
                },
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
            remake(){
                   this.addForm={
                       departmentId:'',
                       majorId:'',
                       name:'',
                   }
            },
            addClass(e){
                this.$axios.post('/api/class/saveClass',qs.stringify(e)).then((res)=>{
                    if (res.data.code==200){
                        this.$notify({
                            title:'成功',
                            type:'success',
                            message:'添加成功'
                        });
                        window.location.reload();
                    }else {
                        this.$notify({
                            title:'失败',
                            type:'error',
                            message:'添加失败'
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .el-select,.el-input{
        width: 400px;
    }
</style>
