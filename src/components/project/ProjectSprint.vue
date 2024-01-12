<template>
    <el-container class="container">


        <el-header class="header">
            <h1 class="title" style="color: black;">全部迭代</h1>
            <div class="buttons-container">
                <el-button class="addrequire" type="primary" @click="showDialog"><el-icon>
                        <Plus />
                    </el-icon>&nbsp;&nbsp;新建迭代</el-button>
            </div>

        </el-header>
        <el-main class="main">
            <el-table ref="multipleTableRef" :data="sprintData" style="width: 100%"
                @selection-change="handleSelectionChange" @row-click="handleRowClick">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="topic" label="迭代名称" sortable>
                </el-table-column>
                <!-- <el-table-column prop="status" label="状态">
                </el-table-column> -->
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="supervisorName" label="负责人">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete"></el-button>
                        <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>
    </el-container>
    <!-- 新建迭代\修改迭代 -->
    <el-dialog v-model="dialogTableVisible" title="新建迭代" @close="handleClose" width="80%">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.topic"></el-input>
                    </el-form-item>
                    <el-form-item label="迭代目标">
                        <el-input v-model="form.goal" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                            placeholder="Please input" />
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 分割线 -->
            <el-col :span="1">
                <el-divider direction="vertical" style="height: 90%;"></el-divider>
            </el-col>

            <el-col :span="15">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="所属项目">
                        <el-select v-model="form.belongProjectId" :options="getfromback">
                        </el-select>
                    </el-form-item>

                    <el-form-item label="负责人">
                        <el-select v-model="form.supervisorId" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">
                        <!-- <template #default="scope"> -->
                        <el-select v-model="form.type" class="hidden-text" placeholder="Select" popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(form.type)">{{ form.type }}</el-tag>
                            </template>
                            <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                        <!-- </template> -->
                    </el-form-item>

                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="form.start_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" class="text-center">
                            <span class="text-gray-500"><br>-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="form.end_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="button-container">
            <el-button type="primary" @click="add">提交</el-button>
        </el-row>
    </el-dialog>
</template>

<script setup>

import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue';
import { getAllSprint, addSprint } from '@/api/sprint';
import { getUserName } from '@/api/user';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const dialogTableVisible = ref(false);
const showDialog = () => {
    dialogTableVisible.value = true;
};
const handleClose = () => {
    dialogTableVisible.value = false;
};
onMounted(() => {
    getSprint();
})


const sprintData = ref([]);

const form = reactive({
    topic: '',
    managerId: '',
    goal: '',
    type: '',
    belongProjectId: '',
    start_time: '',
    end_time: ' ',
});
const type_options = [
    {
        value: '正常迭代',
        label: '正常迭代',
    },
    {
        value: '临时迭代',
        label: '临时迭代',
    },

]
const getTypeColor = (type) => {
    switch (type) {
        case '正常迭代':
            return 'success';
        case '临时迭代':
            return 'info';
        default:
            return '';
    }
};

//获取所有迭代列表
const getSprint = () => {
    getAllSprint({
        organizationId: localStorage.getItem("organizationId"),
    })
        .then(resp => {
            console.log(resp);
            sprintData.value = resp.data;
            getUserName({

            })
                .then(resp => {

                })
                .catch(resp => {

                })
            // ElMessage.success('拉取迭代成功！')
        })
        .catch(resp => {
            ElMessage.error('拉取全部迭代失败！')
        })
}

const route = useRoute();
//新建迭代
const add = () => {
    addSprint(
        {
            startTime: form.start_time,
            endTime: form.end_time,
            goal: form.goal,
            type: form.type,
            projectId: route.params.id,
            managerId: "1",
            organizationId: localStorage.getItem("organizationId"),
            topic: form.topic,
        })
        .then(resp => {
            dialogTableVisible.value = false;
            console.log(resp);
            getSprint();
        })
        .catch(resp => {
            console.error(resp);
        })
}




</script>




<style scoped>
.container {
    flex: 1;
    height: 100%;
    width: 100%;
    position: absolute;

}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: rgb(255, 255, 255);
}

.hidden-text::v-deep .el-input__inner {
    color: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.hidden-text {
    width: 20%;
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

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
