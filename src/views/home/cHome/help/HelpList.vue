<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/cwelcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>线下预约</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-table :data="tableData" style="width: 100%;margin-top: 8px" border > <!--TODO:default-sort = "{prop: 'user', order: 'ascending'}"-->
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column type="" prop="sendId" label="预约学号"></el-table-column>
                    <el-table-column type="" prop="messages" label="预约时间"></el-table-column>
                    <el-table-column type="" prop="createTime" label="发起时间"></el-table-column>
                    <el-table-column type="" prop="source" label="状态">
                        <template slot-scope="scope">
                            {{scope.row.source==''?'待确认':'已确认'}}
                        </template>
                        </el-table-column>
                    <el-table-column label="操作" fixed="right" width="150px">
                        <template slot-scope="scope">
                            <el-button
                                    round
                                    type="primary"
                                    size="mini"
                                    :disabled="scope.row.source==''?false:true"
                                    @click="update(scope.row)">确认
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "HelpList",
        data(){
            return{
                user:window.sessionStorage.getItem('user'),
                tableData:[]
            }
        },
        mounted(){
          this.getMessage();
        },
        methods:{
            getMessage(){
                this.$axios.get('/api/message/findByReceiverId/'+this.user).then((res)=>{
                    this.tableData=res.data.data.reverse();
                    console.log(this.tableData)
                })
            },
            update(e){
                const data=qs.stringify({'source':'确认','id':e.id})
                this.$axios.post('/api/message/updateMessages',data).then((res)=>{
                    if (res.data.code==200)this.$notify({type:"success",message:'已确认'}) ;
                    else this.$notify({type:"error",message:'失败'});
                    this.getMessage();
                })
               // console.log(e)
            }
        }
    }
</script>

<style scoped>

</style>
