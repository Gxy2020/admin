<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cwelcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预警记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row  style="margin-bottom: 10px">
            <el-col :span="4" style="float: right">
                <el-button  type="primary" @click="exportExcel">导出Excel表格</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData" style="width: 100%;margin-top: 8px" border > <!--TODO:default-sort = "{prop: 'user', order: 'ascending'}"-->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column type="" prop="receiverId" label="预警学号"></el-table-column>
                <el-table-column type="" prop="messages" label="内容"></el-table-column>
                <el-table-column type="" prop="createTime" label="时间"></el-table-column>
                <el-table-column type="" prop="source" label="科目"></el-table-column>
            </el-table>
        </el-row>
    </el-card>
</div>
</template>

<script>
    export default {
        name: "HelpList",
        data(){
            return{
                tableData:[],
                user:window.sessionStorage.getItem('user')
            }
        },
        mounted(){
          this.getMessage();
        },
        methods:{
            getMessage(){
                this.$axios.get('/api/message/findBySendId/'+this.user).then((res)=>{
                    this.tableData=res.data.data.reverse();
                    console.log(res)
                })
            },
            exportExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/assets/excel/Export2Excel');
                    const tHeader = [ '学号', '内容','时间','科目'];
                    // 上面设置Excel的表格第一行的标题
                    // const departmenName=this.tableData.name;
                    // const num=this.tableData.length;
                    // console.log(num)
                    const filterVal = ['receiverId','messages', 'createTime','source'];
                    // 上面的是tableData里对象的属性
                    const list = this.tableData;  //把data里的tableData存到list
                    // const list=[]
                    // console.log(this.tableData)
                    const data = this.formatJson(filterVal, list);
                    // console.log(data)
                    // console.log(tHeader)
                    // console.log(export_json_to_excel())
                    export_json_to_excel(tHeader, data, '预警记录');
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
