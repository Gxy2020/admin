<template>
<div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学院管理</el-breadcrumb-item>
        <el-breadcrumb-item>学院列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-table :data="tableData" style="width: 100%;margin-top: 8px" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name"  label="学院名称"></el-table-column>
                <el-table-column prop="majorNum" label="专业数">
                </el-table-column>
                <el-table-column prop="classNum"  label="班级数">
                </el-table-column>
                <el-table-column prop="createTime"  label="创建时间">
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
        <el-row >
            <el-button style="float: right;margin-top: 8px" type="primary" @click="dialogFormVisibleSave=true">添加学院</el-button>
        </el-row>
    </el-card>
    <el-dialog title="添加学院" center :visible.sync="dialogFormVisibleSave" width="500px" @close="clear">
        <el-form :model="addForm" >
            <el-form-item label="学院名称" prop="user" label-width="100px">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleSave = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisibleSave = false ,save(addForm)">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="更改学院名" center :visible.sync="dialogFormVisible" width="500px" @close="clear">
        <el-form :model="updateForm" >
            <el-form-item label="学院名称" prop="user" label-width="100px">
                <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false ,update(updateForm)">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: "DepartmentList",
        data(){
            return{
                dialogFormVisible:false,
                dialogFormVisibleSave:false,
                tableData:[],
                addForm:{
                    name:''
                },
                updateForm:{
                    departmentId:'',
                    name:''
                }
            }
        },
        mounted(){
          this.getTableData();
        },
        methods:{
            getTableData(){
                this.$axios.get('/api/department/findDepartments').then((res)=>{
                    // console.log(res)
                    this.tableData=res.data.data
                }).catch(err=>{
                    console.log(err)
                })
            },
            save(e){
                this.$axios.post('/api/department/saveDepartment',qs.stringify(e)).then((res)=>{
                    if (res.data.code==200){
                        this.$message.success('添加成功');
                        window.location.reload();
                    }else {
                        this.$message.error('添加失败');
                    }
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
              // console.log(qs.stringify(e))
            },
            edit(e){
                this.updateForm.departmentId=e.departmentId;
                this.updateForm.name=e.name
            },
            update(e){
                this.$axios.post('/api/department/updateDepartment',qs.stringify(e)).then((res)=>{
                    console.log(res.data.code)
                    if (res.data.code==200){
                        this.$message.success("修改成功")
                        window.location.reload();
                    }else {
                        this.$message.warning("修改失败")
                    }
                }).catch(err=>{
                    console.log(err)
                })
              // console.log(e)
            },
            del(e){
                if (e.majorNum!=0){
                    this.$notify({
                        title:'错误',
                        message: '无法删除存在专业的院系',
                        type: 'error'
                    });
                    console.log('无法删除')
                }else {
                    this.$confirm('此操作将永久删除该院系, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(e.departmentId)
                        this.$axios.delete('/api/department/delDepartment/' + e.departmentId).then((res) => {
                            console.log(res);
                            if (res.data.code == 200) {
                                // this.$message({
                                //     type: 'success',
                                //     message: '删除成功!',
                                // });
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getTableData();
                            } else {
                                this.$notify({
                                    message: '删除异常',
                                    type: 'error'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
                // console.log(e)
            },
            clear(){
                this.addForm={
                    name:''
                }
            }
        }
    }
</script>

<style scoped>

</style>
