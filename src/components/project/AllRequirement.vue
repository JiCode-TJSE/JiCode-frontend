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
                        <el-input v-model="form.detail" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
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
                        <el-select v-model="form.typeEnum" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(form.typeEnum)">{{ form.typeEnum }}</el-tag>
                            </template>
                            <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                            </el-option>
                        </el-select>
                        <!-- </template> -->
                    </el-form-item>
                    <el-form-item label="需求来源">
                        <el-select v-model="form.sourceEnum" class="hidden-text" placeholder="Select"
                            popper-class="no-border">
                            <template #prefix>
                                <el-tag :type="getTypeColor(form.sourceEnum)">{{ form.sourceEnum }}</el-tag>
                            </template>
                            <el-option v-for="item in source_options" :key="item.value" :value="item.value">
                                <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
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
            </el-col>
        </el-row>
        <el-row class="button-container">
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-row>
    </el-dialog>
    <!--需求详情弹出框-->
    <el-dialog v-model="detailDialogVisible" title="需求详情" @close="handleClose" width="80%">

    </el-dialog>
</template>

<script setup>
import { Plus, Delete } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import {
    getAllBacklogItems, deleteRequirement
} from '@/api/backlogItem';
import {
    getProjectInfo,
} from '@/api/project';
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
const currentPage = ref(1);//当前页数,默认为第一页
const pageSize = 10; //每页放10条需求
const total = ref(1); //总共需求条数
const route = useRoute();
const getPageDataFromServer = () => {
    getAllBacklogItems({
        id: route.params.id,
        currentPage: currentPage.value,
        pageSize: pageSize,

    })
        .then(resp => {
            console.log('getRequireInPage', resp);

            // 添加需求数据到 allrequireData 数组
            allrequireData.value = resp.data.backlogList;
            total.value = resp.data.total;
            ElMessage.success('拉取需求成功');
        })
        .catch(err => {
            console.log(err);
            ElMessage.error('拉取需求失败');
        })
}

// 分页请求
const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    getPageDataFromServer();
};

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
    start_time: '',
    end_time: '',
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

// const state_options = [
//     {
//         value: 'normal',
//         label: '正常',
//     },
//     {
//         value: 'warning',
//         label: '预警',
//     },
//     {
//         value: 'postpone',
//         label: '延期',
//     },
// ]
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
        default:
            return '';
    }
};

//删除需求/工作项
const deleteRequireForRow = (row) => {
    deleteRequirement(row.id)
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

const memberList = ref([]);
const getMemberList = () => {
    getProjectInfo({
        id: route.params.id,
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
            console.log('获取成员name：' + resp);
        })
}


/**
 * 新建需求部分逻辑
 */
const dialogTableVisible = ref(false);
const showDialog = () => {
    dialogTableVisible.value = true;
    getMemberList();
    getManageName();
};
const handleClose = () => {
    dialogTableVisible.value = false;
};

// const submitForm = () => {
//     const submitData = {
//         name: form.name,
//         supervisorId: form.supervisorId,
//         moduleEnum: form.moduleEnum,
//         sourceEnum: form.sourceEnum,
//         typeEnum: form.typeEnum,
//         detail: form.detail,
//         belongProductId: form.belongProductId,
//     };
//     addRequire(submitData)
//         .then(resp => {
//             console.log(resp);
//             ElMessage({
//                 message: '添加需求成功',
//                 type: 'success',
//             })
//             // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
//             getPageDataFromServer();
//             handleClose();
//         })
//         .catch(err => {
//             console.log(err);
//             ElMessage.error('添加需求失败');
//         })

// }

/**
 * 需求详情部分逻辑：获取、修改
 */
const selectedRow = ref(null);
const detailDialogVisible = ref(false);

const goToSpecificRequirement = (row) => {
    selectedRow.value = row;
    detailDialogVisible.value = true;
};


// const router = useRouter();
// const goToSpecificRequirement = (row) => {

// }
// const detailform = {
//   name: "示例需求",
//   detail: "这是一个示例需求的描述。",
//   moduleEnum: "模块A",
//   sourceEnum: "用户反馈",
//   typeEnum: "功能需求",
//   supervisorName: "负责人A",
//   belongProductId: "产品ID",
//   clientArr: [
//     {
//       clientId: "clientID1",
//       name: "客户A",
//     },
//     {
//       clientId: "clientID2",
//       name: "客户B",
//     },
//   ],
//   supervisor: [
//     {
//       supervisorId: "string",
//       supervisorName: "string"
//     },
//   ],
//   backlogItemArr: [
//     {
//       backlogItemId: "backlogItemID1",
//       name: "工作项A",
//     },
//     {
//       backlogItemId: "backlogItemID2",
//       name: "工作项B",
//     },
//   ],
//   versionArr: [
//     {
//       id: "versionID1",
//       name: "版本A",
//       detail: "版本A详情",
//       createTime: "创建时间"
//     },
//     {
//       id: "versionID2",
//       name: "版本B",
//       detail: "版本B详情",
//       createTime: "创建时间"
//     },
//   ],
// };



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