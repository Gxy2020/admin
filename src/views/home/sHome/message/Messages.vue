<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/sWelcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预警信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
        <el-row>

            <el-col :span="12">
                <h4 style="color: #1989fa">预约记录:</h4>
                <el-timeline>
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in sendMessages" :key="item.id">
                        <el-card>
                            <h4>预约时间: {{item.source==''?'待确认':'已确认'}}</h4>
                            <p>{{item.messages}}  <el-divider direction="vertical"></el-divider><span style="font-size: 8px;float: right">发起时间 : {{item.createTime}}</span></p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
            <el-col :span="12">
                <h4 style="color: chocolate">预警消息:</h4>
                <el-timeline>
                    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in messages" :key="item.id">
                        <el-card>
                            <h4>预警消息: {{item.source}}</h4>
                            <p>{{item.messages}}  <el-divider direction="vertical"></el-divider>{{item.createTime}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
<!--        <el-timeline>-->
<!--            <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in messages" :key="item.id">-->
<!--                <el-card>-->
<!--                    <h4>预警消息: {{item.source}}</h4>-->
<!--                    <p>{{item.messages}}  <el-divider direction="vertical"></el-divider>{{item.createTime}}</p>-->
<!--                </el-card>-->
<!--            </el-timeline-item>-->
<!--        </el-timeline>-->
    </div>
</div>
</template>

<script>
    export default {
        name: "Messages",
        data(){
            return{
                user:window.sessionStorage.getItem('user'),
                messages:'',
                sendMessages:'',
                stats:''
            }
        },
        mounted(){
            this.getMessage();
        },
        methods:{
            getMessage(){
                this.$axios.get('/api/message/findByReceiverId/'+this.user).then((res)=>{
                    // console.log(res.data.data);
                    this.messages=res.data.data.reverse();
                });
                this.$axios.get('/api/message/findBySendId/'+this.user).then((res)=>{
                    console.log(res.data.data);
                    this.sendMessages=res.data.data.reverse();
                })
            }
        }
    }
</script>

<style scoped>

</style>
