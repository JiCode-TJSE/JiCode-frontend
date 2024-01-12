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
                <el-table-column prop="topic" label="迭代名称">
                    <template #default="{ row }">
                        <span @click="goToSpecificSprint(row)">{{ row.topic }}</span>
                    </template>
                </el-table-column>

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
                        <el-button type="danger" @click="deleteSprintForRow(row)" :icon="Delete"></el-button>
                        <!-- <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit"></el-button> -->
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
                        <span>{{ route.params.name }}</span>
                    </el-form-item>

                    <el-form-item label="负责人">
                        <el-select v-model="form.managerId">
                            <el-option v-for="item in manager_options" :key="item.value" :value="item.label">
                                <el-tag>{{ item.label }}</el-tag>
                            </el-option>
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

    <!--迭代详情/修改迭代-->
    <el-dialog v-model="detailDialogVisible" title="迭代详情" @close="handleClose" width="80%">
        <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
                <el-row :gutter="20">
                    <el-col :span="15">
                        <el-form :model="selectedRow" label-width="80px">
                            <el-form-item label="标题">
                                <el-input v-model="selectedRow.topic"></el-input>
                            </el-form-item>
                            <el-form-item label="目标">
                                <el-input v-model="selectedRow.goal" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                                    placeholder="Please input" />
                            </el-form-item>
                            <el-form-item label="负责人">
                                <el-select v-model="selectedRow.supervisorName">
                                    <el-option v-for="item in manager_options" :key="item.value" :value="item.value">
                                        <el-tag>{{ item.label }}</el-tag>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类型">

                                <el-select v-model="selectedRow.type" class="hidden-text" placeholder="Select"
                                    popper-class="no-border">
                                    <template #prefix>
                                        <el-tag :type="getTypeColor(selectedRow.type)">{{ selectedRow.type }}</el-tag>
                                    </template>
                                    <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                        <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="开始时间">
                                        <el-date-picker v-model="selectedRow.startTime" type="date"
                                            placeholder="Pick a date" class='date-picker' style="width: 100%" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2" class="text-center">
                                    <span class="text-gray-500"><br><br>-</span>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="结束时间">
                                        <el-date-picker v-model="selectedRow.endTime" type="date" placeholder="Pick a date"
                                            class='date-picker' style="width: 100%" />
                                    </el-form-item>
                                </el-col>

                            </el-row>


                            <el-button type="primary" :icon="Check" @click="saveDetails">保存</el-button>

                        </el-form>
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical" style="height:100%"></el-divider>
                    </el-col>
                    <el-col :span="8">
                        <el-row>
                            <span>所属发布: </span>
                            <br><br>
                            <el-table :data="releaseData" border style="width: 100%">
                                <el-table-column prop="topic" label="标题" width="180" />
                                <!-- <el-table-column prop="stageStatus" label="阶段" width="180" /> -->
                                <el-table-column prop="type" label="类型" />
                            </el-table>
                        </el-row>
                    </el-col>
                </el-row>

            </el-tab-pane>
            <el-tab-pane label="工作项">
                <el-button class="itemheader" type="primary" @click="showRelatedDialog"><el-icon>
                        <Plus />
                    </el-icon>&nbsp;&nbsp;添加工作项</el-button>
                <el-table :data="backlogItem" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="id" label="编号" sortable>
                    </el-table-column>
                    <el-table-column prop="topic" label="标题">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column prop="priority" label="优先级">
                    </el-table-column>
                    <el-table-column prop="supervisorName" label="负责人">
                    </el-table-column>
                    <!-- <el-table-column label="操作">
                        <template v-slot="{ row }">
                            <el-button type="danger" @click="deleteRelatedForRow(row)">解除关联</el-button>
                        </template>
                    </el-table-column> -->

                </el-table>

            </el-tab-pane>

        </el-tabs>
    </el-dialog>


    <!--添加工作项弹出框-->
    <el-dialog v-model="relatedDialogVisible">
        <el-table ref="multipleTableRef" :data="allrequireData" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" sortable>
            </el-table-column>
            <el-table-column prop="topic" label="标题">
                <template #default="{ row }">
                    <span @click="goToSpecificRequirement(row)">{{ row.topic }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="priority" label="优先级">
            </el-table-column>
            <el-table-column prop="supervisorName" label="负责人">
            </el-table-column>
        </el-table>
        <br>
        <br>
        <el-button type="primary" :icon="Check" @click="saveRelated">确定</el-button>
    </el-dialog>
</template>

<script setup>

import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue';
import { getAllSprint, addSprint, deleteSprint, updateSprintInfo } from '@/api/sprint';
import { getUserName, getUserInfo } from '@/api/user';
import { getProjectInfo } from '@/api/project';
import { getRelatedItemById, getAllBacklogItems, updateBacklogItem } from '@/api/backlogItem';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getReleaseInfo } from '@/api/release';

const dialogTableVisible = ref(false);
const showDialog = () => {
    dialogTableVisible.value = true;
};

//关闭所有弹窗
const handleClose = () => {
    dialogTableVisible.value = false;
    resetForm();
    backlogItem.value = [];
    releaseData.value = [];

};
onMounted(() => {
    getSprint();
    getMemberList();
})




const form = reactive({
    topic: '',
    managerId: '',
    goal: '',
    type: '',
    start_time: '',
    end_time: ' ',
});
const resetForm = () => {
    form.topic = '';
    form.managerId = '';
    form.goal = '';
    form.type = '';
    form.start_time = '';
    form.end_time = '';
}
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

//获取所有迭代列表 ok
const sprintData = ref([]);
const getSprint = () => {
    getAllSprint({
        organizationId: localStorage.getItem("organizationId"),
    })
        .then(resp => {
            console.log(resp);
            sprintData.value = resp.data;
            let managerList = ref([]);
            for (let i = 0; i < sprintData.value.length; i++) {
                managerList.value.push(sprintData.value[i].managerId);
                const start = new Date(resp.data[i].startTime);
                const end = new Date(resp.data[i].endTime);

                // 获取年、月、日部分
                const startYear = start.getFullYear();
                const startMonth = String(start.getMonth() + 1).padStart(2, '0');
                const startDay = String(start.getDate()).padStart(2, '0');

                const endYear = end.getFullYear();
                const endMonth = String(end.getMonth() + 1).padStart(2, '0');
                const endDay = String(end.getDate()).padStart(2, '0');

                // 格式化为日期字符串（YYYY-MM-DD）
                sprintData.value[i].startTime = `${startYear}-${startMonth}-${startDay}`;
                sprintData.value[i].endTime = `${endYear}-${endMonth}-${endDay}`;
            }

            getUserName({
                accountIdArr: managerList.value,
            })
                .then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        sprintData.value[i] = {
                            ...sprintData.value[i],
                            "supervisorName": resp.data[i].userName
                        };
                    }
                })
                .catch(resp => {
                    console.log('error:', resp)
                })
            // ElMessage.success('拉取迭代成功！')
            console.log('所有迭代信息', sprintData.value);
        })
        .catch(resp => {
            ElMessage.error('拉取全部迭代失败！')
        })
}

//获取成员列表名字
const manager_options = ref([]);
const getMemberList = () => {

    getProjectInfo({
        projectId: route.params.id,
    })
        .then(async resp => {
            // 负责人选项列表
            for (let i = 0; i < resp.data.projectAggregation.member.length; i++) {

                manager_options.value.push({
                    value: 'init',
                    label: 'init'
                })

                let response = await getUserInfo({
                    account_id: resp.data.projectAggregation.member[i]
                })

                let userName = response.data.userName;

                manager_options.value[i].value = resp.data.projectAggregation.member[i];
                manager_options.value[i].label = userName;
                console.log(manager_options.value)
            }


            // memberList.value = resp.data.projectAggregation.member;
            // getManageName();

        })
        .catch(resp => {
            console.log('获取成员列表错误：' + resp);
        })
}
const route = useRoute();
//新建迭代 ok
const add = () => {
    addSprint(
        {
            startTime: `${form.start_time.getFullYear()}-${(form.start_time.getMonth() + 1).toString().padStart(2, '0')}-${form.start_time.getDate().toString().padStart(2, '0')}`,
            endTime: `${form.end_time.getFullYear()}-${(form.end_time.getMonth() + 1).toString().padStart(2, '0')}-${form.end_time.getDate().toString().padStart(2, '0')}`,
            goal: form.goal,
            type: form.type,
            projectId: route.params.id,
            managerId: (manager_options.value.find(item => item.label === form.managerId)).value,
            organizationId: localStorage.getItem("organizationId"),
            topic: form.topic,
        })
        .then(resp => {
            console.log('传参：', `${form.start_time.getFullYear()}-${(form.start_time.getMonth() + 1).toString().padStart(2, '0')}-${form.start_time.getDate().toString().padStart(2, '0')}`, `${form.end_time.getFullYear()}-${(form.end_time.getMonth() + 1).toString().padStart(2, '0')}-${form.end_time.getDate().toString().padStart(2, '0')}`, form.goal, form.type, route.params.id, form.managerId, localStorage.getItem("organizationId"), form.topic)
            dialogTableVisible.value = false;
            console.log(resp);
            getSprint();
        })
        .catch(resp => {
            console.error(resp);
        })
}

//删除迭代 ok
const deleteRequireForRow = (row) => {
    //console.log('id:', row.id);
    deleteSprint({
        sprintId: row.id,
    })
        .then(resp => {
            console.log(resp);
            getSprint();
        })
        .catch(resp => {
            console.log(resp);
        })
}

const selectedRow = ref({});
const detailDialogVisible = ref(false);
// const editRequireForRow = (row) => {
//     dialogTableVisible.value = true;
//     let data = sprintData.value.find(item => item.id === row.id);
//     //console.log('start_time:', data.start_time)
//     form.topic = data.topic;
//     form.managerId = (manager_options.value.find(item => item.value === data.managerId)).label;
//     form.goal = data.goal;
//     form.type = data.type;
//     form.start_time = data.startTime;
//     form.end_time = data.endTime;
//     updateSprintInfo({
//         id: row.id,
//         startTime: form.start_time,
//         endTime: form.end_time,

//     })
//         .then({

//         })
//         .catch({

//         })

// }

//迭代详情 ok
const releaseData = ref([]);
const backlogItem = ref([]);
const goToSpecificSprint = (row) => {
    row.startTime = new Date(row.startTime);
    row.endTime = new Date(row.endTime);
    row.startTime = `${row.startTime.getFullYear()}-${(row.startTime.getMonth() + 1).toString().padStart(2, '0')}-${row.startTime.getDate().toString().padStart(2, '0')}`;
    row.endTime = `${row.endTime.getFullYear()}-${(row.endTime.getMonth() + 1).toString().padStart(2, '0')}-${row.endTime.getDate().toString().padStart(2, '0')}`;
    selectedRow.value = row;
    getMemberList();
    //console.log('backlogItem_length:', row.backlogItemIds.length);
    //todo
    getRelatedItem(row);
    console.log('backlogItem:', backlogItem.value);
    getReleaseInfo({
        releaseId: selectedRow.value.releaseId,
    })
        .then(resp => {
            releaseData.value.push(resp.data);
            //console.log('releaseData1:    ', sprintData.value)
        })
        .catch(err => {
            console.log(err);
        })


    detailDialogVisible.value = true;
};
const showRelatedDialog = () => {
    getPageDataFromServer();
    relatedDialogVisible.value = true;
}
const allrequireData = ref([]);
const relatedDialogVisible = ref(false);
const getPageDataFromServer = () => {

    getAllBacklogItems({
        organizationId: localStorage.getItem("organizationId"),
        projectId: route.params.id,
    })
        .then(resp => {
            // 添加需求数据到 allrequireData 数组 
            allrequireData.value = resp.data;
            console.log('data:', allrequireData.value)
            for (let i = 0; i < allrequireData.value.length; i++) {
                if (allrequireData.value[i].managerId != null) {
                    getUserInfo({
                        account_id: resp.data[i].managerId,
                    })
                        .then(resp => {
                            allrequireData.value[i] = {
                                ...allrequireData.value[i],
                                "supervisorName": resp.data.userName,
                            }

                        })
                        .catch(resp => {
                            console.log(resp);
                        })
                }
            }

            //total.value = resp.data.length;
            //ElMessage.success('拉取需求成功');
            console.log('全部需求数据:', allrequireData)
        })
        .catch(resp => {
            console.log('拉取需求error:', resp);
        })

}
const getRelatedItem = (row) => {
    backlogItem.value = [];
    for (let i = 0; i < row.backlogItemIds.length; i++) {
        getRelatedItemById({ id: row.backlogItemIds[i] })
            .then(resp => {

                backlogItem.value.push(resp.data)

                if (backlogItem.value[i].managerId != null) {
                    getUserInfo({
                        account_id: resp.data.managerId,
                    })
                        .then(resp => {
                            backlogItem.value[i] = {
                                ...backlogItem.value[i],
                                "supervisorName": resp.data.userName,
                            }

                        })
                        .catch(resp => {
                            console.log(resp);
                        })

                }
            })
            .catch(resp => {
                console.log('error:', resp);

            })
    }
}
// 用于储存被选中的行的数据
const multipleSelection = ref([]);
// 选择改变时更新被选中的行
const handleSelectionChange = (selectedRows) => {
    multipleSelection.value = selectedRows.map(row => row.id);
    // 在这里添加你的代码，这些代码会使用 multipleSelection.value
}
//添加所属的工作项  ok
const saveRelated = () => {
    const sprint = ref([]);
    sprint.value = selectedRow.value.backlogItemIds;
    for (let i = 0; i < multipleSelection.value.length; i++) {
        sprint.value.push(multipleSelection.value[i]);
        console.log('看一下value：', sprint.value)
        updateSprintInfo({
            id: selectedRow.value.id,
            backlogItemIds: sprint.value,
        })
            .then((resp) => {
                if (resp.code === 200) {
                    relatedDialogVisible.value = false;
                    getRelatedItem(selectedRow.value);  //重新获取工作项 
                    console.log(resp)
                }
                else {
                    console.log('error', resp)
                }
            })
            .catch(resp => {
                console.log(resp);
            })
    }
}


//修改迭代信息 ok
const saveDetails = () => {
    let data = { ...selectedRow.value };
    console.log('data:', data)
    const manager = manager_options.value.find(option => option.label === data.supervisorName);
    data.managerId = manager.value;
    delete data.supervisorName;
    updateSprintInfo(
        data
    )
        .then(resp => {
            console.log(resp);
            ElMessage.success('更新成功');
            //date_time.value = [];
        })
        .catch(err => {
            //ElMessage.error('更新失败');
            console.log(err);
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

.itemheader {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    background-color: rgb(255, 255, 255);
}
</style>
