<template>
    <div>
            <div id="chartLineBox" :style="{width: '95%', height: '70vh'}"></div>
    </div>
</template>

<script>
    // 引入柱状图组件
    import echarts from 'echarts'
    export default {
        name: "ScoreECharts",
        data() {
            return {
                name:[],
                value:[],
                chartLine: {}
            }
        },
        mounted() {
            this.creatECharts();
        },
        methods: {
            creatECharts() {
                this.chartLine =echarts.init(document.getElementById("chartLineBox"));
                this.$axios.get('/api/score/findCodToAverage').then((res)=>{
                    for (var i=0;i<res.data.data.length;i++){
                        this.name.push(res.data.data[i].name);
                        this.value.push(res.data.data[i].value);
                    }
                    // console.log(this.name,this.value);
                    let option = {
                        tooltip: {              //设置tip提示
                            trigger: 'axis'
                        },
                        legend: {               //设置区分（哪条线属于什么）
                            data:['平均成绩','学生成绩']
                        },
                        color: ['#409EFF'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
                        xAxis: {                //设置x轴
                            type: 'category',
                            boundaryGap: true,     //坐标轴两边不留白
                            data:this.name,
                            name: '科目名称',           //X轴 name
                            nameTextStyle: {        //坐标轴名称的文字样式
                                color: '#40c9c6',
                                fontSize: 16,
                                padding: [0, 0, 0, 5]
                            },
                            axisLine: {             //坐标轴轴线相关设置。
                                lineStyle: {
                                    color: '#40c9c6',
                                }
                            },
                            axisLabel: {
                                interval:0,
                                rotate:40
                            }
                        },
                        yAxis: {
                            name: '分数',
                            nameTextStyle: {
                                color: '#40c9c6',
                                fontSize: 16,
                                padding: [0, 0, 10, 0]
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#40c9c6',
                                }
                            },
                            type: 'value'
                        },
                        series: [
                            {
                                name: '平均成绩',
                                data:  this.value,
                                type: 'line',               // 类型为折线图
                                lineStyle: {                // 线条样式 => 必须使用normal属性
                                    normal: {
                                        color: '#36a3f7',
                                    }
                                },
                            },
                        ]
                    };
                    this.chartLine.setOption(option);
                });

                // 使用刚指定的配置项和数据显示图表。

            }
        }
    }
</script>

<style scoped>

</style>
