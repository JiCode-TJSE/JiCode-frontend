<template>
    <el-container class="container">
        <el-header class="header">
            <div>
                <span>全部项目</span>
            </div>
            <el-button class="addProject" type="primary" @click="dialogFormVisible = true"><el-icon>
                    <Plus />
                </el-icon>&nbsp;&nbsp;新建项目</el-button>
        </el-header>
        <el-main class="main">
            <el-table :data="allProjectsData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">

                <el-table-column prop="topic" label="项目" sortable>
                    <template #default="{ row }">
                        <span @click="goToSpecificProject(row)">{{ row.topic }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="所属">
                    organization_name
                </el-table-column>

                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleteProjectForRow(row)" :icon="Delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>

        </el-main>
    </el-container>

    <!--新建项目弹出框-->
    <el-dialog v-model="dialogFormVisible" title="新建项目">
        <el-form :model="ProjectForm" :rules="rules">
            <el-form-item label="所属" :label-width="formLabelWidth" prop="owner">
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
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import { getAllProject, deleteProject, addProject } from '@/api/project';
import store from "@/store";
import { getOrganization } from '@/api/user';
//import { defineEmits, defineProps } from 'vue';

onMounted(() => {
    getMyProject();
    getOrgnizationName();
    console.log(localStorage.getItem("organizationId"));
})
//获取项目所属组织
const organization_name = ref();
const getOrgnizationName = () => {
    getOrganization({
        organizationId: localStorage.getItem("organizationId"),
    })
        .then(resp => {

            organization_name.value = resp.data.organization_name;
        })
        .catch(resp => {
            console.log(localStorage.getItem("organizationId"))
            console.error(resp);
        })
}


//获取全部项目列表 ok
const allProjectsData = ref([]);
const getMyProject = () => {
    getAllProject({
        organization_id: localStorage.getItem("organizationId"),
    })
        .then(resp => {

            allProjectsData.value = resp.data;
            console.log(resp);
            console.log(allProjectsData);
            ElMessage.success('拉取全部项目成功！');

        })
        .catch(resp => {
            console.log(resp);
            // ElMessage('拉取全部项目失败，请刷新重试！');
        })
}

//点击具体项目跳转到该项目的详情页面 ok
const router = useRouter();
const goToSpecificProject = (row) => {
    router.push({ name: 'specificProject', params: { id: row.id, name: row.topic } });

};


//删除项目
const deleteProjectForRow = (row) => {
    deleteProject({
        projectId: row.id
    })
        .then((resp) => {
            if (resp.code === 200) {
                console.log(row.id);
                allProjectsData.value = allProjectsData.value.filter(project => project.id !== row.id);
                ElMessage.success('项目删除成功');
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


//新建项目表单填写
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const ProjectForm = reactive({
    name: '',
    desc: '',
});
const rules = reactive({
    // owner: [{ required: true }],
    name: [
        { required: true, message: 'Please input project name', trigger: 'blur' },
        { max: 32, message: '超过最大长度', trigger: 'blur' },
    ],

    desc: [
        { max: 200, message: '超过最大长度', trigger: 'blur' },
    ],
})

//新建项目
const submit = () => {
    addProject({
        organizationId: localStorage.getItem("organizationId"),
        topic: ProjectForm.name,
        description: ProjectForm.desc,
    })
        .then(resp => {
            console.log(resp);
            ElMessage.success('新建项目成功！')
        })
        .catch(resp => {
            console.error(resp);
        })
    dialogFormVisible.value = false;
}

//控制退出表单填写之后，再次进入清空原先填写的内容
const handleclose = () => {
    dialogFormVisible.value = false;
    ProjectForm.name = '';
    ProjectForm.desc = '';
}

</script>

<style scoped>
.container {
    flex: 1;
    height: 100%;
    padding-left: 25px;
    padding-right: 45px;
}

.header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: black;
    align-items: center;
}

.main {
    background-color: white;
    padding-left: 45px;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;

}
</style>