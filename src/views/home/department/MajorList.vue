<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学院管理</el-breadcrumb-item>
            <el-breadcrumb-item>专业列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-select v-model="departmentId" placeholder="请选择院系">
                        <el-option
                                v-for="item in options"
                                :key="item.departmentId"
                                :label="item.name"
                                :value="item.departmentId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-button round @click="clearFind">重置</el-button>
                    <el-button type="success" @click="findMajor(departmentId)" round>搜索</el-button>
                    <el-button type="primary" round>添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border>
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="name"  label="专业名"></el-table-column>
                    <el-table-column prop="department.name"  label="学院名"></el-table-column>
                    <el-table-column prop="createTime"  label="创建时间"></el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "MajorList",
        data() {
            return {
                options: [],
                departmentId:'',
                tableData:[]
            }
        },
        mounted() {
            this.findDepartments();
            this.getMajors();
        },
        methods: {
            findDepartments() {
                this.$axios.get('/api/department/findAllDepartments').then((res) => {
                    // console.log(res.data.data)
                    this.options = res.data.data
                })
            },
            getMajors(){
                this.$axios.get('/api/major/findMajors').then((res)=>{
                    this.tableData=res.data.data;
                    // console.log(res)
                })
            },
            findMajor(e){
                this.$axios.get('/api/major/findByDepartmentId/'+e).then((res)=>{
                    this.tableData=res.data.data;
                    // console.log(res);
                })
                // console.log(e)
            },
            clearFind(){
                this.departmentId=''
                this.getMajors();
            }
        }
    }
</script>

<style scoped>

</style>
