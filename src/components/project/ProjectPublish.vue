<template>
    <el-container class="container">


        <el-header class="header">
            <h1 class="title" style="color: black;">全部发布</h1>
            <div class="buttons-container">
                <el-button class="addrequire" type="primary" @click="showDialog"><el-icon>
                        <Plus />
                    </el-icon>&nbsp;&nbsp;新建发布</el-button>
            </div>

        </el-header>
        <el-main class="main">
            <el-table ref="multipleTableRef" :data="releaseData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="topic" label="发布名称" sortable>
                </el-table-column>
                <el-table-column prop="status" label="阶段">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="managerName" label="负责人">
                </el-table-column>
                <el-table-column prop="start_time" label="开始时间">
                </el-table-column>
                <el-table-column prop="end_time" label="发布时间">
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
    <!-- 新建发布\修改发布 -->
    <el-dialog v-model="dialogTableVisible" title="新建发布" @close="handleClose" width="60%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.topic"></el-input>
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
                        <el-date-picker v-model="form.start_time" type="date" placeholder="Pick a date" class='date-picker'
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500"><br>-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="结束时间">
                        <el-date-picker v-model="form.end_time" type="date" placeholder="Pick a date" class='date-picker'
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="button-container">
            <el-button type="primary" @click="addPublish">提交</el-button>
        </el-row>
    </el-dialog>
</template>

<script setup>

import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue';
import { getAllRelease, addRelease } from '@/api/release';
import { getUserInfo, getUserName } from '@/api/user';
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
    getReleaseList();
})

const releaseData = ref([
    // {
    //     topic: 'Tom',
    //     status: '未开始',
    //     type: '正常迭代',
    //     supervisorName: '王琳',
    //     start_time: '2016-05-03',
    //     end_time: '2016-05-03',
    // },
]);

const managerIdList = ref([])


const form = reactive({
    topic: '',
    supervisorId: '', //负责人
    sourceEnum: '', //需求来源
    type: '',
    belongProjectId: '',
    start_time: '2016-05-03',
    end_time: '2016-05-03',
});
const type_options = [
    {
        value: '普通发布',
        label: '普通发布',
    },
    {
        value: '修复发布',
        label: '修复发布',
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

//to check userinfo
const getReleaseList = () => {
    getAllRelease({
        organizationId: localStorage.getItem("organizationId"),
    })
        .then(resp => {
            releaseData.value = resp.data;
            for (let i = 0; i < resp.data.length; i++) {
                managerIdList.value.push(resp.data[i].managerId);
            }
            getUserName({
                accountIdArr: managerIdList.value
            })
                .then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        releaseData.value[i] = {
                            ...releaseData.value[i],
                            "managerName": resp.data[i].userName
                        };
                    }
                })
                .catch(resp => {
                    console.log(resp);
                })
        })
        .catch(resp => {
            console.error(resp);
        })
}

//新建发布 to check resp的格式
const route = useRoute();
const addPublish = () => {
    addRelease({
        startTime: form.start_time,
        endTime: form.end_time,
        type: form.type,
        projectId: route.params.id,
        managerId: form.supervisorId,
        topic: form.topic,
        stageId: '未开始',
        organizationId: localStorage.getItem("organizationId"),
    })
        .then(resp => {
            ElMessage.success('新建发布成功！');
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