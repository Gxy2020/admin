<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/swelcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col :span="7" style="float: right">
                    <el-button type="success" @click="dialog=true">线下预约</el-button>
                    <el-button type="primary" @click="exportExcelScore">导出Excel表格</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table  border :data="table" style="width: 100%;margin-top: 8px"
                           :row-class-name="tableRowClassStyle">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="stuId" sortable  label="学号"></el-table-column>
                    <el-table-column prop="studentName" sortable label="姓名" width="100px"></el-table-column>
                    <el-table-column prop="courseName" width="140px" label="课程名"></el-table-column>
                    <el-table-column prop="score" width="80px" sortable label="分数"></el-table-column>
                    <!--                    <el-table-column prop="departmentName" width="140px" label="学院名"></el-table-column>-->
                    <el-table-column prop="className" width="140px" label="班级"></el-table-column>
                    <el-table-column prop="time"  sortable label="学年"></el-table-column>
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
                    <el-form-item label="辅导员" :label-width="formLabelWidth">
                        <el-select v-model="form.receiverId" placeholder="请选择">
                            <el-option
                                    v-for="item in counsellorList"
                                    :key="item.receiverId"
                                    :label="item.username"
                                    :value="item.receiverId">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="预约时间" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="form.messages"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;margin-top: 100px">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import qs from "qs";

    export default {
        name: "MyScore",
        data(){
            return{
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                departmentId:window.sessionStorage.getItem('departmentId'),
                user:window.sessionStorage.getItem('user'),
                table: [],
                courseList:[],
                code:'',
                classList:[],
                formLabelWidth: '80px',
                form:{},
                loading:false,
                stuId:'',
                dialog: false,
                title:'预约辅导员',
                counsellorList:[],
            }
        },
        mounted(){
            this.getScores();
            this.getCounsellors();
        },
        methods:{
            getScores(){
                this.$axios.get('/api/score/findScoreByStuId/'+this.user).then((res)=>{
                    this.table=res.data.data;
                    // console.log(res);
                })
            },
            getCounsellors(){
              this.$axios.get('/api/counsellor/findByDepartmentId/'+this.departmentId).then((res)=>{
                  for (let i in res.data.data){
                  this.counsellorList.push({'receiverId':res.data.data[i].user,'username':res.data.data[i].username});
                  }
                  // console.log(this.counsellorList);
              })
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要发送吗?')
                    .then(() => {
                        this.loading = true;
                        this.form.sendId=this.user;
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
                        });
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
            tableRowClassStyle({row}) {
                // console.log(row.score,rowIndex);
                // console.log(row.score<60,rowIndex);
                // console.log(rowIndex)
                if (row.score<60) {
                    return 'warning-row';
                } else {
                    return '';
                }
            },
            exportExcelScore(){
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
                    export_json_to_excel(tHeader, data, '个人成绩单');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
        }
    }
</script>

<style scoped>

</style>
