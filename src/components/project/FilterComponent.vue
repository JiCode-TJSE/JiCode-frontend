<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <Card>
                我参与的工作项
                <el-table :data="participantData" border style="width: 100%" height="500px">
                    <el-table-column fixed prop="name" label="标题" width="180" />
                    <el-table-column prop="state" label="状态" />
                    <el-table-column prop="priority" label="优先级" />
                    <el-table-column prop="name" label="负责人" width="180" />
                </el-table>
            </Card>
        </el-col>
        <el-col :span="12">
            <Card>
                我负责的工作项
                <el-table :data="managerData" border style="width: 100%" height="500px">
                    <el-table-column fixed prop="name" label="标题" width="180" />
                    <el-table-column prop="state" label="状态" />
                    <el-table-column prop="priority" label="优先级" />
                    <el-table-column prop="name" label="负责人" width="180" />
                </el-table>
            </Card>
        </el-col>
    </el-row>
</template>

<script setup>
/* eslint-disable */
import Card from '@/components/CommonCard.vue'

</script>

<style></style>