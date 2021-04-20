<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/twelcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row  style="float: right;margin-bottom: 20px">
                <el-col  style="float: right">
                    <el-button type="primary" @click="exportExcel">导出Excel表格</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table  border :data="table" style="width: 100%;margin-top: 8px"
                           :row-class-name="tableRowClassName">
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
    </div>
</template>

<script>
    export default {
        name: "MyScore",
        data(){
            return{
                user:window.sessionStorage.getItem('user'),
                table: [],
                courseList:[],
                code:'',
                classList:[],
                formLabelWidth: '80px',
                form:{},
                stuId:'',
            }
        },
        mounted(){
            this.getScores();
        },
        methods:{
            getScores(){
                this.$axios.get('/api/score/findScoreByStuId/'+this.user).then((res)=>{
                    this.table=res.data.data;
                    console.log(res);
                })
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
        }
    }
</script>

<style scoped>

</style>
