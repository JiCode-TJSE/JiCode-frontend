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
                @selection-change="handleSelectionChange" @row-click="handleRowClick">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="topic" label="发布名称" sortable>
                </el-table-column>
                <el-table-column prop="stageStatus" label="阶段">
                    <template v-slot="{ row }">
                        {{ row.stageStatus ? row.stageStatus : '暂无' }}
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template v-slot="{ row }">
                        <el-tag v-if="row.type" :type="getTypeColor(row.type)">{{ row.type }}</el-tag>
                        <span v-else>暂无</span>
                    </template>
                    </el-table-column>
                <el-table-column prop="managerName" label="负责人">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="发布时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleteReleaseForRow(row)" :icon="Delete"></el-button>
                        <!-- <el-button type="primary" :icon="Edit"></el-button> -->
                    </template>
                </el-table-column>

            </el-table>
        </el-main>
    </el-container>
    <!-- 新建发布\修改发布 -->
    <el-dialog v-model="dialogTableVisible" :title="formOperate" @close="handleClose" width="60%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.topic"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
                <el-select v-model="form.supervisorId">
                    <el-option
                    v-for="member in memberList"
                    :key="member.accountId"
                    :label="member.userName"
                    :value="member.accountId"
                    ></el-option>
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

    <!--发布详情弹出框-->
    <el-dialog v-model="detailDialogVisible" title="发布详情" @close="handleClose" width="80%">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-form :model="selectedRow" label-width="80px">
                                <el-form-item label="标题">
                                    <el-input v-model="selectedRow.topic"></el-input>
                                </el-form-item>
                                 <el-form-item label="类型">
                    <!-- <template #default="scope"> -->
                    <el-select v-model="selectedRow.type" class="hidden-text" placeholder="Select" popper-class="no-border">
                        <template #prefix>
                            <el-tag :type="getTypeColor(selectedRow.type)">{{ selectedRow.type }}</el-tag>
                        </template>
                        <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                            <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                        </el-option>
                    </el-select>
                    <!-- </template> -->
                </el-form-item>
                    <el-form-item label="负责人">
                                    <el-select v-model="selectedRow.managerName">
                                        <el-option v-for="item in manager_options" :key="item.value" :value="item.value">
                                            <el-tag>{{ item.label }}</el-tag>
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
                            </el-form>
                        </el-col>
                        <el-col :span="1">
                            <el-divider direction="vertical" style="height:100%"></el-divider>
                        </el-col>
                        <el-col :span="8">
                      <el-row>
                            <el-col :span="5" style="display: flex; align-items: center; justify-content: flex-end;">
                                <span>关联迭代</span>
                            </el-col>
                            <el-col :span="2"></el-col> <!-- 添加这一行来创建间隔 -->
                            <el-col :span="16">
                                <el-select v-model="selectedSprint" placeholder="请选择">
                                <el-option
                                    v-for="item in sprintData"
                                    :key="item.id"
                                    :label="item.topic"
                                    :value="item">
                                </el-option>
                                </el-select>
                            </el-col>
                         </el-row>
                        <br><br>
                        <el-table :data="sprintData" border style="width: 100%">
                        <el-table-column prop="topic" label="标题" width="180" />
                        <!-- <el-table-column prop="status" label="状态" width="180" /> -->
                        <el-table-column prop="type" label="类型" />
                        </el-table>
                        <br><br><br>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="发布范围">
                    <!-- <template #inner>
                    <el-dialog v-modle="innerRelatedDialog" title="需求详情" @close="handleClose" width="80%"></el-dialog>
                </template> -->
                    <el-button type="primary" :icon="Plus" @click="handleAdd" style="float: left;">新添工作项</el-button>
                    <el-table :data="relatedData" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50"></el-table-column>
                        <el-table-column prop="id" label="编号" sortable>
                            <!-- <template #default="{ row }">
                            <span @click="goToRelatedRequirement(row)">{{ row.id }}</span>
                        </template> -->
                        </el-table-column>
                        <el-table-column prop="topic" label="标题">
                            <!-- <template #default="{ row }">
                            <span @click="goToRelatedRequirement(row)">{{ row.topic }}</span>
                        </template> -->
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
                 <el-button type="primary" style="margin-top: 20px" :icon="Check" @click="saveDetails">保存</el-button>
            </el-tabs>
    </el-dialog>

    <!-- 关联工作项弹出框 -->
    <el-dialog v-model="workItemsdialogVisible" title="请选择关联工作项">
      <el-table :data="workItems" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer" style="margin-top: 20px;">
        <el-button @click="workItemsdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script setup>

import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue';
import { getAllRelease, addRelease, deleteRelease } from '@/api/release';
import { getProjectInfo} from '@/api/project'
import { getUserInfo, getUserName } from '@/api/user';
import { getAllBacklogItems } from '@/api/backlogItem'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import store from '@/store';

const route = useRoute();
const projectId = route.params.id;
let formOperate = reactive('新建发布')

const dialogTableVisible = ref(false);
const showDialog = () => {
    dialogTableVisible.value = true;
    console.log("dialogTableVisible",workItems)
};

const handleClose = () => {
    dialogTableVisible.value = false;
};

onMounted(() => {
    getReleaseList();
    workItemsdialogVisible.value = false;
})

let workItems = reactive([{}])
let selectedRows = reactive([])
const handleSelectionChange = (val) => {
    selectedRows = val;
};
const handleConfirm = () => {
    workItemsdialogVisible.value = false;
    console.log("!@#$%^&&*", selectedRows)
};

const releaseData = ref([
  
]);

let selectedRow = reactive({});

let workItemsdialogVisible =ref('false')
const handleAdd = () => {
    workItemsdialogVisible.value = true;
    console.log("workItemsdialogVisible",workItemsdialogVisible.value)
};

const handleRowClick = (row) => {
    selectedRow = row;
    detailDialogVisible.value = true;
    // 获取所有可以选择的工作项
    getAllBacklogItems({ organizationId: "1" })
        .then(resp => {
            // 处理成功的结果
            // 例如，如果 response 是一个包含工作项的数组，你可以将它赋值给一个数据属性
            workItems = resp.data.map(item => ({
                id: item.id,
                name: item.topic,
            }))
            console.log("workItems",workItems)
        })
        .catch(error => {
            // 处理错误
            // 例如，你可以打印错误信息
            console.error(error);
        });
};

const managerIdList = ref([])

const memberList = ref([])

let detailDialogVisible = ref(false);


// 获取项目成员列表
const getMemberList = () => {
  return new Promise((resolve, reject) => {
    getProjectInfo({ projectId: projectId })
      .then(resp => {
        memberList.value = resp.data.projectAggregation.member;
        // console.log("获取project成员列表", memberList.value);
        resolve(); // 表示异步操作成功
      })
      .catch(error => {
        console.log(error);
        reject(error); // 表示异步操作失败
      });
  });
};

async function getSupervisors() {
  try {
    // 获取所有 memberList
    await getMemberList();

    // 获取成员姓名
    const getUserNameResponse = await getUserName({
      accountIdArr: memberList.value,
    });
    memberList.value = getUserNameResponse.data;

  } catch (error) {
    console.log(error);
    ElMessage.error("获取成员信息失败！");
  }
}


const form = reactive({
    topic: '',
    supervisorId: '', //负责人
    sourceEnum: '', //需求来源
    type: '',
    belongProjectId: '',
    start_time: '',
    end_time: '',
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
        case '普通发布':
            return 'success';
        case '修复发布':
            return 'info';
        default:
            return '';
    }
};




//to check userinfo
const getReleaseList = () => {

    //console.log("原releaseData",releaseData.value)
    getAllRelease({
        projectId: projectId,
        organizationId: store.state.user.organizationId,
    })
        .then(resp => {
            //console.log("重新获取resp.data",resp)

            if(resp.code == 500){
                ElMessage.error(resp.msg)
            }
            else{
                releaseData.value = resp.data;

                console.log("releaseData!!!",releaseData.value)

                if(resp.data.length!=null){
                    managerIdList.value = []; //要先清空，不然会保留上一次的！！！
                    for (let i = 0; i < resp.data.length; i++) {
                        managerIdList.value.push(resp.data[i].managerId);
                        const start = new Date(resp.data[i].startTime);
                        const end = new Date(resp.data[i].endTime);
                        releaseData.value[i].startTime = start.toISOString().split("T")[0];
                        releaseData.value[i].endTime = end.toISOString().split("T")[0];
                    }
                    getUserName({
                        accountIdArr: managerIdList.value
                    })
                        .then(resp => {
                            if(resp.data.length!=null){
                                for (let i = 0; i < resp.data.length; i++) {
                                releaseData.value[i] = {
                                    ...releaseData.value[i],
                                    "managerName": resp.data[i].userName
                                };
                            }
                            }
                        })
                        .catch(resp => {
                            console.log(resp);
                        })
                }
            }
        })
        .catch(resp => {
            console.error(resp);
        })

    // 获取所有候选负责人列表
    getSupervisors();

}

//新建发布 to check resp的格式
const addPublish = () => {
    addRelease({
        startTime: form.start_time,
        endTime: form.end_time,
        type: form.type,
        projectId: route.params.id,
        managerId: "0e92f261-504c-442e-9123-94e8ee7f6c00",
        topic: form.topic,
        organizationId: store.state.user.organizationId,
    })
        .then(resp => {
            ElMessage.success('新建发布成功！');
            getReleaseList()
        })
        .catch(resp => {
            console.error(resp);
        })
    
    dialogTableVisible.value = false;

    
}


// 删除发布
const deleteReleaseForRow = (row) =>{
    deleteRelease(row.id)
    .then(resp => {
        if(resp.code === 500){
            ElMessage.error('删除发布失败', resp.msg)
        }
        else{
            ElMessage.success('删除发布成功！')
            getReleaseList();
        }

    })
    .catch(error =>{
        ElMessage.error('删除发布失败，请重试！');
        console.log(error)
    })
    
}

// 不做了
// const editReleaseForRow = (row) =>{
//     formOperate = "修改发布"
//     console.log('edit');
//     dialogTableVisible.value = true;
    
//     form.topic = row.topic;
//     form.supervisorId = row.managerName;
//     form.start_time = row.startTime;
//     form.end_time = row.endTime;
//     form.type = row.type;
//     console.log(form)
//     console.log(row.startTime)

// }

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