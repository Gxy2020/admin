<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成员员列表</el-breadcrumb-item>
            <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区-->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo">
                        <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogFormVisible=true,addUser">添加用户</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border>
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="user" label="用户名">
                    </el-table-column>
                    <el-table-column prop="password"  label="密码">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit"
                                       @click="dialogFormVisible=true,edit(scope.row)" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)"
                                       circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
        <el-dialog title="用户信息" center :visible.sync="dialogFormVisible" width="500px" @close="clear" >
            <el-form :model="form" ref="formRef">
                <el-form-item label="用户名" prop="user" :label-width="formLabelWidth">
                    <el-input v-model="form.user" :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password"></el-input>
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

    export default {
        name: "adminList",
        data() {
            return {
                dialogFormVisible: false,
                // disabledValue: true,
                queryInfo: '',
                tableData: [],
                form: {
                    user: '',
                    password: '',
                    phone: '',
                    email: '',
                },
                formLabelWidth: '100px'
            }
        },
        mounted() {
            this.getAdminList()
        },
        methods: {
            query() {
                console.log(this.queryInfo)
            },
            getAdminList() {
                this.$axios.get('/api/admin/findAdminList').then((res) => {
                    this.tableData = res.data.data
                    // console.log(res.data.data)
                })
            },
            addUser() {
            },
            edit(e) {
                this.form=e
            },
            del(e) {
                console.log(e)
            },
            clear(){
                this.form= {
                    user: '',
                    password: '',
                    phone: '',
                    email: '',
                }
            }
        }
    }
</script>

<style scoped>

</style>
