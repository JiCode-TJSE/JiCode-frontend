<template>
    <el-container class="container" id="allrequire">
        <el-header class="header">
            <h1 class="title" style="color: black;">全部需求</h1>
            <div class="buttons-container">
                <el-button class="addrequire" type="primary" @click="showDialog"><el-icon>
                        <Plus />
                    </el-icon>&nbsp;&nbsp;新建需求</el-button>
            </div>
        </el-header>
        <el-main class="main">
            <!--全部需求列表-->
            <el-table ref="multipleTableRef" :data="allrequireData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="id" label="编号" sortable>
                    <template #default="{ row }">
                        <span @click="goToSpecificRequirement(row)">{{ row.id }}</span>
                    </template>
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
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>
        <div class="page">
            <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="total"
                @current-change="handlePageChange"></el-pagination>
        </div>
    </el-container>

    <!-- 新建需求 -->
    <el-dialog v-model="dialogTableVisible" title="新建需求" @close="handleClose" width="80%">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="标题">
                        <el-input v-model="form.topic"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="form.description" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
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
                        <span>{{ form.project_topic }}</span>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select v-model="form.priority" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(form.priority)">{{ form.priority }}</el-tag>
                            </template>
                            <el-option v-for="item in priority_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-select v-model="form.manager_name" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="需求类型">
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
                    <el-form-item label="需求来源">
                        <el-select v-model="form.source" class="hidden-text" placeholder="Select" popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(form.source)">{{ form.source }}</el-tag>
                            </template>
                            <el-option v-for="item in source_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="form.startTime" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" class="text-center">
                            <span class="text-gray-500"><br><br>-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="form.endTime" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="button-container">
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-row>
    </el-dialog>
    <!--需求详情弹出框-->
    <el-dialog v-model="detailDialogVisible" title="需求详情" @close="handleClose" width="80%">
        <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
                <el-form :model="selectedRow" label-width="80px">
                    <el-form-item label="标题">
                        <el-input v-model="selectedRow.topic"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="selectedRow.description" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                            placeholder="Please input" />
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-select v-model="selectedRow.priority" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(selectedRow.priority)">{{ selectedRow.priority }}</el-tag>
                            </template>
                            <el-option v-for="item in priority_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="selectedRow.status" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(selectedRow.status)">{{ selectedRow.status }}</el-tag>
                            </template>
                            <el-option v-for="item in state_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-select v-model="selectedRow.manager_name" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="需求类型">
                        <!-- <template #default="scope"> -->
                        <el-select v-model="selectedRow.type" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(selectedRow.type)">{{ selectedRow.type }}</el-tag>
                            </template>
                            <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                        <!-- </template> -->
                    </el-form-item>
                    <el-form-item label="需求来源">
                        <el-select v-model="selectedRow.source" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(selectedRow.source)">{{ selectedRow.source }}</el-tag>
                            </template>
                            <el-option v-for="item in source_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="selectedRow.start_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" class="text-center">
                            <span class="text-gray-500"><br><br>-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="selectedRow.end_time" type="date" placeholder="Pick a date"
                                    class='date-picker' style="width: 100%" />
                            </el-form-item>
                        </el-col>

                    </el-row>


                    <el-button type="primary" :icon="Check" @click="saveDetails">保存</el-button>

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="关联">
                <el-button class="itemheader" type="primary" @click="showRelatedDialog"><el-icon>
                        <Plus />
                    </el-icon>&nbsp;&nbsp;添加工作项</el-button>
                <el-table :data="allRelatedData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="id" label="编号" sortable>
                        <template #default="{ row }">
                            <span @click="goToSpecificRequirement(row)">{{ row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="topic" label="标题">
                        <template #default="{ row }">
                            <span @click="goToSpecificRequirement(row)">{{ row.topic }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column label="关系">
                        关联
                    </el-table-column>
                    <el-table-column prop="priority" label="优先级">
                    </el-table-column>
                    <el-table-column prop="supervisorName" label="负责人">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="{ row }">
                            <el-button type="danger" @click="deleteRelatedForRow(row)">解除关联</el-button>
                        </template>
                    </el-table-column>

                </el-table>

            </el-tab-pane>

        </el-tabs>
    </el-dialog>

    <!--添加关联工作项弹出框-->
    <el-dialog v-model="relatedDialogVisible">

        <el-table ref="multipleTableRef" :data="allrequireData" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" sortable>
                <template #default="{ row }">
                    <span @click="goToSpecificRequirement(row)">{{ row.id }}</span>
                </template>
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

    <!--创建新版本弹出框-->
    <el-dialog v-model="versionDialogVisible">
        <el-form :model="VersionForm" :rules="rules">
            <el-form-item label="当前版本" :label-width="formLabelWidth" prop="owner">
                王琳的公司
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="ProjectForm.name" />
            </el-form-item>
            <el-form-item label="项目描述" :label-width="formLabelWidth" prop="desc">
                <el-input v-model="ProjectForm.desc" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleclose">Cancel</el-button>
                <el-button type="primary" @click="submit">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { Plus, Delete } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import {
    getAllBacklogItems, deleteRequirement, deleteRelatedItem
} from '@/api/backlogItem';
import {
    getProjectInfo,
} from '@/api/project';
import {
    addRequire,
} from '@/api/require';

import { getUserName } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

// 用于储存被选中的行的数据
const multipleSelection = ref([]);
// 选择改变时更新被选中的行
const handleSelectionChange = (val) => {
    multipleSelection.value = val;
}

// 分页查询获取需求列表
const allrequireData = ref([]);
const route = useRoute();
let total = ref(0);
const getPageDataFromServer = () => {
    getAllBacklogItems({
        organizationId: route.params.id,
    })
        .then(resp => {
            // 添加需求数据到 allrequireData 数组 
            // TODO 这边等 wh 接口改好
            allrequireData.value = resp.data;
            total.value = resp.data.length;
            ElMessage.success('拉取需求成功');
        })
        .catch(err => {
            console.log(err);
            ElMessage.error('拉取需求失败');
        })
}

const allRelatedData = ref([]);
// 初始调用
onMounted(() => {
    getPageDataFromServer();
})

//新建需求时的表单信息
const form = reactive({
    topic: '', //标题（需求名字）
    manager_name: '', //负责人
    type: '', //需求类型
    description: '', //描述
    belongProjectId: '',
    priority: '',
    source: '',
    startTime: '',
    endTime: '',
    project_topic: '',
    manager_id: '',

});


const type_options = [
    {
        value: '功能需求',
        label: '功能需求',
    },
    {
        value: '体验优化',
        label: '体验优化',
    },
    {
        value: '安全需求',
        label: '安全需求',
    },
    {
        value: '技术需求',
        label: '技术需求',
    },
]

const source_options = [
    {
        value: '产品规划',
        label: '产品规划',
    },
    {
        value: '用户反馈',
        label: '用户反馈',
    },
    {
        value: '竞品调研',
        label: '竞品调研',
    },
    {
        value: '内部需求',
        label: '内部需求',
    },
]

const state_options = [
    {
        value: '未开始',
        label: '未开始',
    },
    {
        value: '进行中',
        label: '进行中',
    },
    {
        value: '已完成',
        label: '已完成',
    },
]
const priority_options = [
    {
        value: '高',
        label: '高',
    },
    {
        value: '中',
        label: '中',
    },
    {
        value: '低',
        label: '低',
    },
]


const getTypeColor = (type) => {
    switch (type) {
        case '功能需求':
            return 'warning';
        case '体验优化':
            return 'info';
        case '安全需求':
            return 'primary';
        case '技术需求':
            return 'success';
        case '产品规划':
            return 'warning';
        case '用户反馈':
            return 'info';
        case '竞品调研':
            return 'primary';
        case '内部需求':
            return 'success';
        case '高':
            return 'warning';
        case '中':
            return 'primary';
        case '低':
            return 'success';
        case '未打开':
            return 'primary';
        case '进行中':
            return 'warning';
        case '已完成':
            return 'success';
        default:
            return '';
    }
};

//删除需求/工作项
const deleteRequireForRow = (row) => {
    deleteRequirement({ id: row.id })
        .then((resp) => {
            if (resp.code === 200) {
                console.log(row.id);
                allrequireData.value = allrequireData.value.filter(requirement => requirement.id !== row.id);
                ElMessage.success('需求删除成功');
            }
            else {
                ElMessage.error(resp.message);
            }
        })
        .catch(resp => {
            console.log(resp);
            //ElMessage.error('项目删除失败，请重试！');
        })
}

const deleteRelatedForRow = (row) => {
    deleteRelatedItem({
        backlogitemId1: row.id,
        backlogitemId2: '',

    })
        .then((resp) => {
            if (resp.code === 200) {
                console.log(row.id);
                allrequireData.value = allrequireData.value.filter(requirement => requirement.id !== row.id);
                ElMessage.success('关联工作项删除成功');
            }
            else {
                ElMessage.error(resp.message);
            }
        })
        .catch(resp => {
            console.log(resp);
            //ElMessage.error('项目删除失败，请重试！');
        })

}

const memberList = ref([]);
const getMemberList = () => {
    getProjectInfo({
        projectId: route.params.id,
    })
        .then(resp => {
            memberList.value = resp.MemeberList;

        })
        .catch(resp => {
            console.log('获取成员列表：' + resp);
        })
}

//获取负责人列表
const getfromback = ref([]);
const getManageName = () => {

    getUserName({
        accountIdArr: memberList.value,
    })
        .then(resp => {
            getfromback.value = resp.userNameArr;

        })
        .catch(resp => {
            console.log('获取成员name:' + resp);
        })
}

/**
 * 新建需求部分逻辑
 */
const dialogTableVisible = ref(false);
const showDialog = () => {
    dialogTableVisible.value = true;
    // getMemberList();
    // getManageName();
};
const handleClose = () => {
    dialogTableVisible.value = false;
};

const submitForm = () => {
    const submitData = {
        priority: form.priority,
        startTime: `${form.startTime.getFullYear()}-${(form.startTime.getMonth() + 1).toString().padStart(2, '0')}-${form.startTime.getDate().toString().padStart(2, '0')}`,
        endTime: `${form.endTime.getFullYear()}-${(form.endTime.getMonth() + 1).toString().padStart(2, '0')}-${form.endTime.getDate().toString().padStart(2, '0')}`,
        source: form.source,
        type: form.type,
        description: form.description,
        projectId: route.params.id,
        organizationId: "2",
        topic: form.topic,
        status: "status"
    };
    // const submitData = {
    //     priority: "最低级",
    //     startTime:"2024-01-02",
    //     endTime: "2024-01-02",
    //     source: "sorce",
    //     type: "type",
    //     description: "test",
    //     projectId: "2",
    //     organizationId: "1",
    //     topic: "test",
    //     status: "status"
    // };
    console.log(submitData);
    addRequire(submitData)
        .then(resp => {
            ElMessage({
                message: '添加需求成功',
                type: 'success',
            })
            // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
            getPageDataFromServer();
            handleClose();
        })
        .catch(err => {
            console.log(err);
            ElMessage.error('添加需求失败');
        })

}

/**
 * 需求详情部分逻辑：获取、修改
 */
/**
 * 需求详情部分逻辑：获取、修改
 */
const selectedRow = ref({
    topic: '',
    description: '',
    source: '',
    type: '',
    manager_name: '',
    priority: '',
    clientArr: [],
    status: '',
});
const detailDialogVisible = ref(false);

const relatedDialogVisible = ref(false);
const showRelatedDialog = () => {
    relatedDialogVisible.value = true;
}
const goToSpecificRequirement = (row) => {
    row.start_time = new Date(row.startTime);
    row.end_time = new Date(row.endTime);
    selectedRow.value = row;
    console.log(selectedRow.value);
    detailDialogVisible.value = true;
};




</script>
<style scoped>
#allrequire {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: rgb(255, 255, 255);
}

.itemheader {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    background-color: rgb(255, 255, 255);
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: rgb(255, 255, 255);
    flex: 1;
}

.page {
    margin-bottom: 10%;
}

.buttons-container {
    margin-left: auto;
}

.hidden-text::v-deep .el-input__inner {
    color: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.hidden-text {
    width: 50%;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>