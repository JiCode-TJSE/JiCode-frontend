<template>
    <el-container class="container">

        <el-header>
            <SprintTopBar />

        </el-header>
        <el-main class="main">
            <el-table :data="tableData" border class="table">
                <el-table-column prop="name" label="迭代名称" width="200" />
                <el-table-column prop="status" label="状态" width="150" />
                <el-table-column prop="type" label="类别" width="150" />
                <el-table-column prop="manager" label="负责人" width="150" />
                <el-table-column prop="start_time" label="开始时间" width="120" />
                <el-table-column prop="end_time" label="结束时间" width="120" />
                <el-table-column label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                        <el-button link type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup>
/* eslint-disable */
import { Operation, SetUp } from '@element-plus/icons-vue'
import SprintTopBar from '@/components/project/SprintTopBar.vue'
const handleClick = () => {
    console.log('click')
}

const tableData = [
    {
        name: 'Tom',
        status: '未开始',
        type: '正常迭代',
        manager: '王琳',
        start_time: '2016-05-03',
        end_time: '2016-05-03',
    },
]
</script>




<style scoped>
.container {
    flex: 1;
    height: 100%;
    width: 100%;
    position: absolute;

}


.main {
    width: 100%;
    height: 100%;
    /* background-color: white; */
    /* position: absolute; */
    margin-top: 20px;
    /* margin-right: 0vw; */
    padding-left: 0px;
}


.table {
    width: 80%;
    /* height: 100%; */
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 0;
}
</style>
