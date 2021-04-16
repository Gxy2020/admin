<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成员员列表</el-breadcrumb-item>
            <el-breadcrumb-item>班主任列表</el-breadcrumb-item>
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
                <el-col :span="6">
                    <el-input placeholder="请输入专业">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入姓名">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="success">搜索</el-button>
                    <el-button type="primary" @click="dialogFormVisibleSave=true">添加</el-button>
                </el-col>

            </el-row>
            <el-row>
            <el-table :data="tableData" style="width: 100%;margin-top: 8px" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="user" width="100px" label="用户名"></el-table-column>
                <el-table-column prop="password" width="100px" label="密码">
                </el-table-column>
                <el-table-column prop="username" width="80px" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" width="60px" label="性别">
                </el-table-column>
                <el-table-column prop="tdepartment.name" width="150px" label="院系">
                </el-table-column>
                <el-table-column prop="sclass.name" width="120px" label="班级">
                </el-table-column>
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
        </el-card>
        <el-dialog title="添加用户" center :visible.sync="dialogFormVisibleSave" width="500px" @close="clearSave">
            <el-form :model="addForm" ref="formRef" :rules="formRule">
                <el-form-item label="账号" prop="user" :label-width="formLabelWidth">
                    <el-input v-model="addForm.user" :disabled="false" @change="checkUser(addForm.user)"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="院系" prop="departmentId" :label-width="formLabelWidth">
                    <el-select v-model="addForm.departmentId" placeholder="请选择院系" @change="getdepartmentId(addForm.departmentId)">
                        <el-option
                                v-for="item in options"
                                :key="item.departmentId"
                                :label="item.name"
                                :value="item.departmentId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级"  prop="class" :label-width="formLabelWidth">
                    <el-select placeholder="请选择班级" v-model="addForm.classId">
                        <el-option
                                v-for="item in sclass "
                                :key="item.classId"
                                :label="item.name"
                                :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别"  prop="sex" :label-width="formLabelWidth">
                    <el-select placeholder="请选择性别" v-model="addForm.sex">
                        <el-option
                                v-for="item in sex"
                                :key="item.id"
                                :label="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleSave = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisibleSave = false ,save(addForm)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" center :visible.sync="dialogFormVisible" width="500px" @close="clear">
            <el-form :model="form" ref="formRef" :rules="formRule">
                <el-form-item label="账号" prop="user" :label-width="formLabelWidth">
                    <el-input v-model="form.user" :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="院系" prop="department" :label-width="formLabelWidth">
                    <el-select v-model="form.department.departmentId" placeholder="请选择院系">
                        <el-option
                                v-for="item in options"
                                :key="item.departmentId"
                                :label="item.name"
                                :value="item.departmentId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select placeholder="请选择院系" v-model="form.sex">
                        <el-option
                                v-for="item in sex"
                                :key="item.id"
                                :label="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false ,update(form)">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "TeacherList",
        data(){
            return{
                sex: [{id: 1, value: '男'}, {id: 2, value: '女'}],
                sclass:[],
                dialogFormVisibleSave: false,
                dialogFormVisible: false,
                departmentId:'',
                tableData: [
                    // {
                    // user: '',
                    // password: '',
                    // username: '',
                    // sex: '',
                    // sclass:{
                    // },
                    // tdepartment: {},
                    // phone: '',
                    // email: '',
                    // createTime: ''}
                    ],
                form: {
                    user: '',
                    password: '',
                    username: '',
                    sex: '',
                    department: {},
                    phone: '',
                    email: '',
                },
                addForm: {
                    user: '',
                    password: '',
                    username: '',
                    sex: '',
                    departmentId: '',
                    classId:'',
                    phone: '',
                    email: '',
                },
                formRule: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '100px',
                options:[]
            }
        },
        mounted(){
            this.findDepartments();
            this.getUser();
        },
        methods:{
            findDepartments() {
                this.$axios.get('/api/department/findAllDepartments').then((res) => {
                    // console.log(res.data.data)
                    this.options = res.data.data
                })
            },
            getUser(){
                this.$axios.get('/api/teacher/findTeacherList').then((res)=>{
                    console.log(res.data.data);
                    this.tableData=res.data.data
                })
            },
            checkUser(e){
                this.$axios.get('/api/teacher/findByUser/'+e).then((res)=>{
                    // const  those=this
                    if (res.data.code==500){
                        this.$message.warning("用户名已存在")
                        console.log('用户名已存在')
                    }
                    console.log(res.data.code)
                })
                // console.log(e)
            },
            save(e){
                this.$refs.formRef.validate(async valid => {
                    if (!valid) return
                    this.$axios.post('/api/teacher/saveTeacher',qs.stringify(e)).then((res)=>{
                        console.log(res)
                        if (res.data.code== 200) {
                            this.$message.success("添加成功")
                            this.getUser();
                        } else {
                            this.$message.error("添加失败")
                        }
                    }).catch(err => {
                        this.$message.error("添加失败")
                        console.log(err)
                    })
                })
              console.log(e)
            },
            getdepartmentId(e){
                this.$axios.get('/api/class/findByDepartmentId/'+e).then((res)=>{
                    // this.sclass.classId=res.data.data.classId;
                    // this.sclass.name=res.data.data.name;
                    this.sclass=res.data.data;
                    console.log(res.data.data)
                })
                // console.log('选择了:',e)
            },
            del(e){
                const those = this
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(e.id)
                    those.$axios.delete('/api/teacher/delTeacher/' + e.id).then((res) => {
                        console.log(res)
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
                // console.log(index)
                // console.log(e.id)
            },
            clearSave(){
                this.addForm = {
                    user: '',
                    password: '',
                    username: '',
                    sex: '',
                    departmentId: '',
                    phone: '',
                    email: '',
                }
            },
            clear() {
                this.form = {
                    user: '',
                    password: '',
                    username: '',
                    sex: '',
                    department: {},
                    phone: '',
                    email: '',
                }
            },
        }

    }
</script>

<style scoped lang="less">
    .el-select {
        width: 100%;
    }
</style>
