<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            <el-breadcrumb-item>班级列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-select v-model="departmentId" placeholder="请选择院系">
                        <el-option
                                v-for="item in options"
                                :key="item.departmentId"
                                :label="item.name"
                                :value="item.departmentId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button round disabled>RO</el-button>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="majorId" placeholder="请选择专业">
                        <el-option
                                v-for="item in majorList"
                                :key="item.majorId"
                                :label="item.name"
                                :value="item.majorId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="9" style="float: right">
                    <el-button round @click="remake">重置</el-button>
                    <el-button type="success" @click="findTable" round>搜索</el-button>
                    <!--              <el-button type="primary" round>添加</el-button>-->
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border>
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="name" label="班级名"></el-table-column>
                    <el-table-column prop="majorName" label="所属专业"></el-table-column>
                    <el-table-column prop="departmentName" label="学院名"></el-table-column>
                    <el-table-column prop="studentNum" label="班级人数"></el-table-column>
                    <el-table-column prop="createName" label="创建时间"></el-table-column>
                    <!--              <el-table-column prop="department.name"  label="学院名"></el-table-column>-->
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "classList",
        data() {
            return {
                departmentId: '',
                majorId: '',
                options: [],
                majorList: [],
                tableData: []
            }
        },
        mounted() {
            this.findDepartments();
            this.findMajors();
            this.findClassVO();
        },
        methods: {
            findDepartments() {
                this.$axios.get('/api/department/findAllDepartments').then((res) => {
                    // console.log(res.data.data);
                    this.options = res.data.data
                })
            },
            findMajors() {
                this.$axios.get('/api/major/findMajors').then((res) => {
                    // console.log(res.data.data);
                    this.majorList = res.data.data;
                })
            },
            findClassVO() {
                this.$axios.get('/api/class/findClassVO').then((res) => {
                    // console.log(res)
                    this.tableData = res.data.data;
                })
            },
            findTable() {
                const data = qs.stringify({'departmentId': this.departmentId, 'majorId': this.majorId});
                console.log(data)
                this.$axios.post('/api/class/findByDepartmentIdOrMajorId', data).then((res) => {
                    this.tableData = res.data.data;
                    // console.log(res)
                })
                // console.log(this.departmentId,this.majorId)
            },
            remake() {
                this.departmentId = '',
                    this.majorId = ''
                this.findClassVO();
            }
        }
    }
</script>

<style scoped>

</style>
