<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/sWelcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预警信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
        <el-timeline>
            <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in messages" :key="item.id">
                <el-card>
                    <h4>预警消息: {{item.source}}</h4>
                    <p>{{item.messages}}  <el-divider direction="vertical"></el-divider>{{item.createTime}}</p>
                </el-card>
            </el-timeline-item>


<!--            <el-timeline-item timestamp="2018/4/3" placement="top">-->
<!--                <el-card>-->
<!--                    <h4>更新 Github 模板</h4>-->
<!--                    <p>王小虎 提交于 2018/4/3 20:46</p>-->
<!--                </el-card>-->
<!--            </el-timeline-item>-->
<!--            <el-timeline-item timestamp="2018/4/2" placement="top">-->
<!--                <el-card>-->
<!--                    <h4>更新 Github 模板</h4>-->
<!--                    <p>王小虎 提交于 2018/4/2 20:46</p>-->
<!--                </el-card>-->
<!--            </el-timeline-item>-->
        </el-timeline>
    </div>
</div>
</template>

<script>
    export default {
        name: "Messages",
        data(){
            return{
                user:window.sessionStorage.getItem('user'),
                messages:''
            }
        },
        mounted(){
            this.getMessage();
        },
        methods:{
            getMessage(){
                this.$axios.get('/api/message/findByReceiverId/'+this.user).then((res)=>{
                    console.log(res.data.data)
                    this.messages=res.data.data.reverse();
                })
            }
        }
    }
</script>

<style scoped>

</style>
