<template>
    <el-row class="row">
        <el-col :span="7" class="basicinfo">
            <Card>
                基本信息
                <el-form :model="form" label-position="top">
                    <el-form-item label="负责人" class="hidden-text" popper-class="no-border">
                        <el-select v-model="form.owner" :options="manager_options">

                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status" class="hidden-text" popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getStateColor(form.type)">{{ form.label }}</el-tag>
                            </template>
                            <el-option v-for="item in state_options" :key="item.label" :value="item.label">
                                <el-tag :type="getStateColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="form.start_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" class="text-center">
                            <span class="text-gray-500"><br><br>-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="form.end_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>

                    </el-row>

                </el-form>
                <el-row>
                    <span style="float: left;">进度&nbsp;&nbsp;&nbsp;&nbsp;<br><br></span>
                    <el-tooltip class="box-item" effect="dark" content="已完成状态类型的工作项/所有工作项（不包含状态类型为已关闭的工作项）"
                        placement="right">

                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-row>

                <el-progress :percentage="50" :stroke-width="15" striped />
            </Card>
        </el-col>
        <el-col :span="17" class="chart">
            <Card>
                <div class="box" ref="chartDom"></div>
            </Card>
        </el-col>
    </el-row>
</template>

<script setup>
/* eslint-disable */
import Card from '@/components/CommonCard.vue'
import { reactive, ref, onMounted } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import * as echarts from "echarts";
let chartDom = ref(null); //注意变量名 和 ref名字要对应
onMounted(() => {
    initChart();
});

const initChart = () => {
    var myChart = echarts.init(chartDom.value);
    var option = {
        tooltip: {
            // 鼠标悬浮提示数据
            trigger: "axis",
            backgroundColor: "rgba(32, 33, 36,.7)",
            borderColor: "rgba(32, 33, 36,0.20)",
            borderWidth: 15,
            textStyle: {
                // 文字提示样式
                color: "#fff",
                fontSize: "12",
            },
            axisPointer: {
                // 坐标轴虚线
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        grid: {
            // 控制图表的位置
            left: "5%",
            right: "5%",
            top: "18%",
            bottom: "5%",
            containLabel: true,
        },
        xAxis: {
            axisLabel: {
                // X轴线 标签修改
                textStyle: {
                    color: "black", //坐标值得具体的颜色
                    fontSize: "10",
                },
            },
            data: ["已完成", "进行中", "未开始"],
        },
        yAxis: {
            axisLabel: {
                // y轴线 标签修改
                textStyle: {
                    color: "black", //坐标值得具体的颜色
                },
            },
        },
        series: [
            {
                name: "用户故事",
                data: [2, 18, 5],
                type: "bar",
                barWidth: "25%", //调整柱状图宽度
                itemStyle: {
                    normal: {
                        /*--------设置柱形图圆角 [左上角，右上角，右下角，左下角]-------------*/
                        borderRadius: [12, 12, 0, 0],
                        /*--------设置柱形图渐变色 -------------*/
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "rgba(0,244,255,1)",
                            },
                            {
                                offset: 1,
                                color: "rgba(0,77,167,1)",
                            },
                        ]),
                    },
                },
            },
            {
                name: "任务",
                data: [6, 10, 23],
                type: "bar",
                barWidth: "25%", //调整柱状图宽度
                itemStyle: {
                    normal: {
                        /*--------设置柱形图圆角 [左上角，右上角，右下角，左下角]-------------*/
                        borderRadius: [12, 12, 0, 0],
                        /*--------设置柱形图渐变色 -------------*/
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "rgba(255,204,0,1)",
                            },
                            {
                                offset: 1,
                                color: "rgba(255,102,0,1)",
                            },
                        ]),
                    },
                },
            },
        ],
        legend: {
            // 图例配置
            orient: "vertical",
            right: "2%",
            top: "5%",
            textStyle: {
                color: "#333",
            },
            data: ["用户故事", "任务"], // 图例项名称
        },
    };
    option && myChart.setOption(option);
};

//initChart();

const form = reactive({
    owner: '王琳',
    status: '正常',
    start_time: '',
    end_time: '',
});

const state_options = [
    {
        value: 'normal',
        label: '正常',
    },
    {
        value: 'warning',
        label: '预警',
    },
    {
        value: 'postpone',
        label: '延期',
    },
]
const manager_options = []

const getStateColor = (state) => {
    switch (state) {
        case 'warning':
            return 'warning';
        case 'normal':
            return 'primary';
        case 'postpone':
            return 'danger';
        default:
            return '';
    }
}

</script>

<style>
.row {
    margin-top: 20px;
}

.hidden-text::v-deep .el-input__inner {
    color: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.hidden-text {
    width: 50%;
}

.date-picker {
    margin-top: 10px;
}

.box {

    width: 58vw;
    height: 43.5vh;
    background-color: #f3f5f8;
}
</style>