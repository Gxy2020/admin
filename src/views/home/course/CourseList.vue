<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>科目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border > <!--TODO:default-sort = "{prop: 'user', order: 'ascending'}"-->
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="code" sortable label="课程代码"></el-table-column>
                    <el-table-column prop="name" label="课程名">
                    </el-table-column>
                    <el-table-column prop="tableData.createTime"  label="创建时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 5px">{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="150px">
                        <template slot-scope="scope">
                            <el-button round
                                    size="mini"
                                    type="danger"
                                    @click="del(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-col :span="18">

                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-sizes="pageSizees"
                        :page-size="pageSize"
                        layout="total,sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
                </el-col>
                <el-col :span="5">
                    <el-button  round type="primary" style="float: right;margin-top: 5px"  @click="dialog = true" >添加</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-drawer
                title="添加课程"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="rtl"
                custom-class="demo-drawer"
                ref="drawer">
            <div>
                <el-form :model="form">
                    <el-form-item label="课程代码" :label-width="formLabelWidth">
                        <el-input v-model="form.code" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "CourseList",
        data(){
            return{
                tableData:[],
                pageSize:5,
                pageSizees:[5,10,20],
                total:10,
                currentPage1: 0,
                dialog: false,
                form: {
                    name: '',
                    code: '',
                },
                loading: false,
                formLabelWidth: '80px',
                timer: null,
            }
        },
        mounted(){
          this.getCoursePage();
        },

        methods:{
            getCoursePage(){
                this.$axios.get('/api/counsellor/findCoursePage?pageSize='+this.pageSize).then((res)=>{
                    this.total=res.data.data.totalElements;
                    this.tableData=res.data.data.content
                    // console.log(res)
                })
            },
            handleSizeChange(val) {
                this.$axios.get('/api/counsellor/findCoursePage?pageSize='+val).then((res)=>{
                    this.tableData=res.data.data.content
                })
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(e) {
                const pageNum=e-1
                this.$axios.get('/api/counsellor/findCoursePage?pageSize='+this.pageSize+"&pageNum="+pageNum).then((res)=>{
                    this.tableData=res.data.data.content
                    // console.log(res);
                })
                console.log(`当前页: ${e}`);
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(res=> {
                        console.log(res)
                        console.log(this.form)
                        this.$axios.post('/api/counsellor/saveCourse',qs.stringify(this.form)).then((res)=>{
                            if (res.data.code==200){
                                this.$notify({
                                    type:'success',
                                    message:'添加成功'
                                })
                                this.getCoursePage();
                            }else {
                                this.$notify({
                                    type:'error',
                                    message:'添加失败'
                                })
                            }
                            console.log(res)
                        });
                        this.loading = true;
                        this.timer = setTimeout(() => {
                            done();
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 2000);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                this.form= {
                    name: '',
                    code: '',
                },
                clearTimeout(this.timer);
            },
            del(e){
                this.$confirm('此操作将永久删除该院系, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(res)
                    this.$axios.delete('/api/counsellor/delCourse/' + e.id).then((res) => {
                        if (res.data.code==200){
                            this.$notify({
                                type:'success',
                                message:'删除成功'
                            })
                            this.getCoursePage();
                        }else {
                            this.$notify({
                                type:'error',
                                message:'删除失败'
                            })
                        }
                    });
                }).catch(err=>{
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>
