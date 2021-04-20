<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/cwelcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-select v-model="majorId" placeholder="请选择专业">
                        <el-option
                                v-for="item in majorList"
                                :key="item.majorId"
                                :label="item.name"
                                :value="item.majorId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-button round @click="remake">重置</el-button>
                    <el-button type="success" @click="findTable" round>搜索</el-button>
                    <el-button type="primary"  round>添加</el-button>
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
    import qs from "qs";

    export default {
        name: "CClass",
        data() {
            return {
                departmentId: window.sessionStorage.getItem('departmentId'),
                majorId: '',
                options: [],
                majorList: [],
                tableData: []
            }
        },
        mounted() {
            this.findMajors();
            this.findClassVO();
        },
        methods: {
            findMajors() {
                this.$axios.get('/api/major/findByDepartmentId/'+this.departmentId).then((res) => {
                    // console.log(res.data.data);
                    this.majorList = res.data.data;
                })
            },
            findClassVO() {
                const data = qs.stringify({'departmentId': this.departmentId});
                this.$axios.post('/api/class/findByDepartmentIdOrMajorId',data).then((res) => {
                    // console.log(res)
                    this.tableData = res.data.data;
                })
            },
            findTable() {
                const data = qs.stringify({ 'majorId': this.majorId});
                console.log(data)
                this.$axios.post('/api/class/findByDepartmentIdOrMajorId', data).then((res) => {
                    this.tableData = res.data.data;
                    // console.log(res)
                })
                // console.log(this.departmentId,this.majorId)
            },
            remake() {
                    this.majorId = ''
                    this.findClassVO();
            }
        }
    }
</script>

<style scoped>

</style>
