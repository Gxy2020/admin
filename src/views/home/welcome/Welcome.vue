<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <cards></cards>
        <div>
            <el-card>
                <ScoreECharts></ScoreECharts>
            </el-card>
            <el-row>
                <el-col :span="12">
                    <el-card>
                        <h4>挂科人数占比</h4>
                        <div id="main" :style="{width: '550px', height: '500px'}">
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12" >
                    <el-card>
                        <el-calendar class="time-table">
                            <template slot="dateCell" slot-scope="{date, data}">
                                <p :class="data.isSelected ? 'is-selected' : ''">
                                    {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                                </p>
                            </template>
                        </el-calendar>
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import ScoreECharts from "@/views/home/echars/ScoreECharts";
    import Cards from "./cards/Cards";
    import echarts from 'echarts'
    export default {
        name: "Welcome",
        components: {
            Cards,
            ScoreECharts
        },
        data(){
            return{
                name:['java','高数','计算机']
            }
        },
        mounted(){
          this.initChart();
        },
        methods:{
            initChart() {
              let  myChart = echarts.init(document.getElementById("main"));

              this.$axios.get('/api/score/findCodeFailed').then((res)=>{
                  console.log(res);

                  myChart.setOption({
                      roseType: 'angle',
                      tooltip: {},
                      legend: {
                          left: 'center',
                          bottom: '10',
                          data: res.data.data.name,
                      },
                      series: [
                          {
                              name: '挂科人数',
                              type: 'pie',
                              radius: '55%',
                              data:res.data.data,
                              animationEasing: 'cubicInOut',
                          }
                      ]
                  });
              })

            }
        }
    }
</script>

<style scoped>
    .time-table {
        width: 100%;
        height: 562px;
        font-size: 10px;

    }
    .el-card{
        margin: 6px;
    }
</style>
