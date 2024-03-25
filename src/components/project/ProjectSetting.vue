<template>
    <el-row class="row">

        <Card class="basicinfo">
            基本信息
            <el-row>
                所属:&nbsp;&nbsp;&nbsp;{{ $route.params.name }}
            </el-row>
            <br>

            <el-row>
                <el-form :model="ProjectForm" :rules="rules">
                    <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="ProjectForm.name" />
                    </el-form-item>
                    <el-form-item label="项目描述" :label-width="formLabelWidth" prop="desc">
                        <el-input v-model="ProjectForm.desc" autocomplete="off" />
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="button-container">
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-row>
        </Card>
    </el-row>
    <el-row class="row">
        <Card class="member">
            项目成员
            <!--项目成员列表-->
            <el-table ref="multipleTableRef" :data="allrequireData" @selection-change="handleSelectionChange"
                @row-click="handleRowClick">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" sortable>
                </el-table-column>
                <el-table-column prop="position" label="职位">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete"></el-button>
                        <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </Card>

    </el-row>
</template>

<script setup>
import Card from '@/components/CommonCard.vue';
import { reactive } from 'vue';
const ProjectForm = reactive({
    name: '',
    desc: '',
});
</script>

<style>
.basicinfo {
    width: 80%;
    align-items: center;
}

.member {
    width: 80%;
    align-items: center;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.row {
    margin-top: 20px;
    display: felx;
    justify-content: center;
    align-items: center;
}
</style>