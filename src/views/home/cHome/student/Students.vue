<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成员员列表</el-breadcrumb-item>
            <el-breadcrumb-item>学生列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-select v-model="classId" placeholder="请选择班级">
                        <el-option
                                v-for="item in classList"
                                :key="item.classId"
                                :label="item.name"
                                :value="item.classId">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="8">
                    <el-input placeholder="请输入学号" v-model="stuId">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" @click="query(classId)"  >搜索</el-button>
                    <el-button type="primary" @click="exportExcel">导出Excel表格</el-button>
                </el-col>

            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border > <!--TODO:default-sort = "{prop: 'user', order: 'ascending'}"-->
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="user" sortable width="100px" label="学号"></el-table-column>
                    <el-table-column prop="password" width="100px" label="密码">
                    </el-table-column>
                    <el-table-column prop="username" width="80px" label="姓名">
                    </el-table-column>
                    <el-table-column prop="sex" width="60px" label="性别">
                    </el-table-column>
                    <el-table-column prop="sClass.name" width="120px" sortable label="班级">
                    </el-table-column>
                    <el-table-column prop="majors.name" width="120px"   label="专业">
                    </el-table-column>
<!--                    <el-table-column prop="departments.name" width="150px" sortable label="院系">-->
<!--                    </el-table-column>-->
                    <el-table-column prop="phone" width="150px" label="手机号">
                    </el-table-column>
                    <el-table-column prop="email" width="160px" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="createTime" width="150px" label="创建时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="150px">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="edit(scope.row),dialogFormVisible=true">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="del(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-sizes="pageSizees"
                        :page-size="pageSize"
                        layout="total,sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "Students",
        data(){
            return{
                stuId:'',
                departmentId:window.sessionStorage.getItem('departmentId'),
                classId:'',
                classList:[],
                departments:[],
                classes:[],
                tableData:[],
                pageSize:5,
                pageSizees:[5,10,20],
                total:10,
                currentPage1: 0,
            }
        },

        mounted(){
            this.findClassList();
            this.getStudentPage();
        },
        methods:{
            getStudentPage(){
                this.$axios.get('/api/student/findDepartmentStudentPage?pageSize='+this.pageSize+"&departmentId="+this.departmentId).then((res)=>
                {
                    this.total=res.data.data.total;
                    this.tableData=res.data.data.content
                    console.log(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            },
            handleSizeChange(val) {
                this.$axios.get('/api/student/findDepartmentStudentPage?pageSize='+val+"&departmentId="+this.departmentId).then((res)=>{
                    this.tableData=res.data.data.content
                })
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(e) {
                const pageNum=e
                this.$axios.get('/api/student/findDepartmentStudentPage?pageSize='+this.pageSize+"&pageNum="+pageNum+"&departmentId="+this.departmentId).then((res)=>{
                    this.tableData=res.data.data.content
                    // console.log(res);
                })
                console.log(`当前页: ${e}`);
            },
            getclassList(e){
                this.$axios.get('/api/class/findClassList/'+e).then((res)=>{
                    this.classes=res.data.data;
                    // console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
                // console.log(e)
                // console.log('选择了:',e)
            },
            exportExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/assets/excel/Export2Excel');
                    const tHeader = [ '学号', '密码','姓名','性别','院系','专业','班级','手机号','电子邮件'];
                    // 上面设置Excel的表格第一行的标题
                    // const departmenName=this.tableData.name;
                    // const num=this.tableData.length;
                    // console.log(num)
                    const filterVal = ['user','password', 'username','sex','departmentName','majorName','className','phone','email'];
                    // 上面的user、password、username是tableData里对象的属性
                    // const list = this.tableData;  //把data里的tableData存到list
                    const list=[]
                    for (var i=0;i<this.tableData.length;i++){
                        console.log(i)
                        // console.log(this.tableData.length)
                        list.push({user:this.tableData[i].user,password:this.tableData[i].password,
                            username:this.tableData[i].username,sex:this.tableData[i].sex,departmentName:this.tableData[i].departments.name,
                            className:this.tableData[i].sClass.name,majorName:this.tableData[i].majors.name,
                            phone:this.tableData[i].phone,email:this.tableData[i].email})
                    }
                    // console.log(this.tableData)
                    const data = this.formatJson(filterVal, list);
                    console.log(data)
                    // console.log(tHeader)
                    // console.log(export_json_to_excel())
                    export_json_to_excel(tHeader, data, '学生信息列表excel');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            getListToable(){
                const list=[]
                for (var i=0;i<this.tableData.length;i++){
                    console.log(i)
                    // console.log(this.tableData.length)
                    list.push({user:this.tableData[i].user,password:this.tableData[i].password,
                        username:this.tableData[i].username,departmentName:this.tableData[i].departments.name,
                        className:this.tableData[i].sClass.name,majorName:this.tableData[i].majors.name,
                        phone:this.tableData[i].phone,email:this.tableData[i].email})
                }
                // console.log(list)
            },
            del(e){
                const those = this
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(e.id)
                    those.$axios.delete('/api/student/delStudent/' + e.id).then((res) => {
                        // console.log(res)
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            })
                            window.location.reload()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除异常'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(e);
            },
            edit(e){
                console.log(e)
            },
            query(classId){
                const data=qs.stringify({'classId':classId});
                this.$axios.post('/api/student/findByDepartmentIdOrClassId',data).then((res)=>{
                    this.tableData=res.data.data;
                })
                // console.log(classId)
            },
            findClassList() {
                this.$axios.get('/api/class/findClassList/'+this.departmentId).then((res)=>{
                    this.classList=res.data.data;
                    // console.log(res)
                })
            },
        }
    }
</script>

<style scoped>

</style>
