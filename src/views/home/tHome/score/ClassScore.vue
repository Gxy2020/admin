<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/twelcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-select v-model="code" placeholder="请选择科目">
                        <el-option
                                v-for="item in courseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入学号" v-model="stuId" ></el-input>
                </el-col>
                <el-col :span="12" style="float: right">
                    <el-button round @click="remake" >重置</el-button>
                    <el-button type="primary"  @click="dialogFormVisible=true" round>添加</el-button>
                    <el-button type="success" @click="query(stuId)" round>搜索</el-button>
                    <el-button type="primary" @click="exportExcel">导出Excel表格</el-button>
                    <!--              <el-button type="primary" round>添加</el-button>-->
                </el-col>
            </el-row>
            <el-row>
                <el-table  border :data="table" style="width: 100%;margin-top: 8px" @selection-change="handleSelectionChange"
                           :row-class-name="tableRowClassName">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="stuId" sortable width="120px" label="学号"></el-table-column>
                    <el-table-column prop="courseName" width="140px" label="课程名"></el-table-column>
                    <el-table-column prop="score" width="80px" sortable label="分数"></el-table-column>
                    <el-table-column prop="studentName" sortable label="学生名" width="100px"></el-table-column>
                    <!--                    <el-table-column prop="departmentName" width="140px" label="学院名"></el-table-column>-->
                    <el-table-column prop="className" width="140px" label="班级"></el-table-column>
                    <el-table-column prop="time"  sortable label="学年"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="250px">
                        <template slot-scope="scope">
                            <el-button round size="mini" @click="editClick(scope.row),dialogForm=true">编辑</el-button>
                            <el-button type="primary" plain round size="mini" @click="dialog = true,edit(scope.row)">发送</el-button>
                            <el-button type="danger" plain round size="mini" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-backtop target=".el-main"> <div
                    style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >
                UP
            </div></el-backtop>
        </el-card>
        <el-drawer
                :title="title"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="rtl"
                ref="drawer">
            <div>
                <el-form :model="form">
                    <el-form-item label="预警内容" :label-width="formLabelWidth">
                        <el-input   type="textarea" style="height: 50px;" v-model="form.messages" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;margin-top: 100px">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="添加分数" :visible.sync="dialogFormVisible" width="550px">
            <el-form :model="addForm" ref="formRef" :rules="formRule">
                <el-form-item label="请选择科目" label-width="120px" prop="code">
                    <el-select v-model="addForm.code" placeholder="请选择科目">
                        <el-option
                                v-for="item in courseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请输入学号" label-width="120px" prop="stuId">
                    <el-input v-model="addForm.stuId"></el-input>
                </el-form-item>
                <el-form-item label="请输入分数"  label-width="120px" prop="score">
                    <el-input-number v-model="addForm.score"  :min="0" :max="100"></el-input-number>
                    <!--                    <el-input v-model="addForm.score" ></el-input>-->
                </el-form-item>
                <el-form-item label="请输入学期" label-width="120px" prop="time">
                    <el-input v-model="addForm.time"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false ,addScore(addForm)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog style="text-align: center" title="修改分数" :visible.sync="dialogForm" width="550px">
            <el-form :model="update" >
                <el-form-item label="科目" label-width="120px" prop="code">
                    <el-input v-model="update.courseName"  disabled placeholder="请选择科目">
                    </el-input>
                </el-form-item>
                <el-form-item label="学号" label-width="120px" prop="stuId">
                    <el-input v-model="update.stuId" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="120px" prop="stuId">
                    <el-input v-model="update.studentName" disabled></el-input>
                </el-form-item>
                <el-form-item label="分数"  label-width="120px" prop="score">
                    <el-input-number v-model="update.score"  :min="0" :max="100"></el-input-number>
                    <!--                    <el-input v-model="addForm.score" ></el-input>-->
                </el-form-item>
                <el-form-item label="学期" label-width="120px" prop="time">
                    <el-input v-model="update.time" disabled ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm = false ,updateScore(update)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "ClassScore",
        data(){
            return{
                dialogFormVisible:false,
                disabledVable:true,
                dialogForm:false,
                dialog: false,
                score:'',
                classId:window.sessionStorage.getItem('classId'),
                user:window.sessionStorage.getItem('user'),
                table: [],
                courseList:[],
                code:'',
                classList:[],
                formLabelWidth: '80px',
                form:{},
                loading:false,
                stuId:'',
                title:'',
                update:{},
                formRule:{
                    code: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 1, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
                    stuId: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
                    time: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
                },
                addForm:{
                    code:'',
                    score:'',
                    stuId:'',
                    time:''
                },
            }
        },
        mounted(){
            this.getScores();
            this.findCourse();
        },
        methods:{
            getScores(){
                this.$axios.get('/api/score/findByClassId/'+this.classId).then((res)=>{
                    this.table=res.data.data;
                    // console.log(res);
                })
            },
            findCourse(){
                this.$axios.get('/api/counsellor/findAll').then((res)=>{
                    this.courseList=res.data.data;
                    // console.log(res)
                })
            },
            query(e){
                // console.log(e);
                // const data=qs.stringify({'classId':this.classId,'code':this.code,'stuId':this.stuId});
                // console.log(data);
                // this.$axios.post('/api/score/findByStuIdAndCodeAndClassId',data).then((res)=>{
                //     console.log(res);
                // })
                console.log(this.code.trim().length==0)
                console.log(e.trim().length==0);
                if (this.code.trim().length==0&e.trim().length==0)return;
                // if (this.code.trim())
                if (this.code.trim().length!=0&e.trim().length==0){
                    const data=qs.stringify({'departmentId':this.departmentId,'code':this.code,'classId':this.classId});
                    this.$axios.post('/api/score/findByDepartmentIdCodeOrClassId',data).then((res)=>{
                        this.table=res.data.data;
                        // console.log(data)
                    })
                }if (this.code.trim().length==0&e.trim().length!=0){
                    this.$axios.get('/api/score/findScoreByStuId/'+e).then((res)=>{
                        this.table=res.data.data;
                        // console.log(res.data.data)
                    })
                } else {
                    const data=qs.stringify({'classId':this.classId,'code':this.code,'stuId':this.stuId});
                    // console.log(data);
                    this.$axios.post('/api/score/findByStuIdAndCodeAndClassId',data).then((res)=>{
                        this.table=res.data.data;
                        // console.log(res);
                    })
                }
                // console.log(this.code)
                // console.log(this.classId)
            },
            addScore(e){
                this.$refs.formRef.validate(async valid => {
                    if (!valid) return;
                    this.$axios.post('/api/score/saveScore',qs.stringify(e)).then((res)=>{
                        if (res.data.code==200){
                            this.$notify({
                                type:'success',
                                message:'添加成功'
                            });
                            this.getScores();
                        }else {
                            this.$notify({
                                type:'error',
                                message:'添加失败'
                            });
                        }
                        // console.log(res)
                    }).catch(err=>{
                        console.log(err);
                    })
                    // console.log(e)
                });

            },
            editClick(e){
                this.update=e;
                // console.log(e);
            },
            edit(e){
                this.title='发送预警学号 : '+e.stuId;
                this.form.sendId=this.user;
                this.form.receiverId=e.stuId;
                this.form.source=e.courseName;
                // console.log(e)
                // console.log(this.form)
            },
            updateScore(e){
                const data=qs.stringify({'id':e.id,'score':e.score});
                this.$axios.post('/api/score/updateScore',data).then((res)=>{
                    if (res.data.code==200){
                        this.$notify({
                            type:"success",
                            message:'修改成功',
                        });
                        this.getScores();
                    }else {
                        this.$notify({
                            type:"error",
                            message:'修改失败',
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            remake(){
                this.classId=window.sessionStorage.getItem('classId'),
                    this.code='',
                    this.getScores();
            },
            exportExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/assets/excel/Export2Excel');
                    const tHeader = [ '学号', '课程','分数','姓名','院系','班级','学年'];
                    // 上面设置Excel的表格第一行的标题
                    // const departmenName=this.tableData.name;
                    // const num=this.tableData.length;
                    // console.log(num)
                    const filterVal = ['stuId','courseName', 'score','studentName','departmentName','className','time'];
                    // 上面的user、password、username是tableData里对象的属性
                    const list = this.table;  //把data里的tableData存到list
                    // const list=[]
                    // console.log(this.tableData)
                    const data = this.formatJson(filterVal, list);
                    // console.log(data)
                    // console.log(tHeader)
                    // console.log(export_json_to_excel())
                    export_json_to_excel(tHeader, data, '学生成绩表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            handleSelectionChange() {
                this.disabledVable=!this.disabledVable;
                // console.log(val)
            },
            tableRowClassName({row}) {
                // console.log(row.score,rowIndex);
                // console.log(row.score<60,rowIndex);
                // console.log(rowIndex)
                if (row.score<60) {
                    return 'warning-row';
                } else {
                    return '';
                }
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要发送吗?')
                    .then(() => {
                        this.loading = true;
                        console.log(this.form);
                        this.$axios.post('/api/message/sendMessage',qs.stringify(this.form)).then((res)=>{
                            if (res.data.code==200){
                                this.$notify({
                                    type:"success",
                                    message:"发出成功"
                                })
                            }else {
                                this.$notify({
                                    type:"success",
                                    message:"发出失败"
                                })
                            }
                            // console.log(res)
                        })
                        this.timer = setTimeout(() => {
                            done();
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 2000);
                    })
                    .catch(() => {});
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
            del(e){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('/api/score/delScore/'+e.id).then((res)=>{
                        if (res.data.code==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getScores();
                        }else {
                            this.$message({
                                type: 'danger',
                                message: '删除失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                // console.log(e)
            }
        }
    }
</script>

<style lang="less">
    .el-select,.el-input-number{
        width: 100%;
    }
    .el-table .warning-row {
        background: rgba(255, 140, 0, 1);
    }
</style>
