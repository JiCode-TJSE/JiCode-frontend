<template>
    <el-container class="container">
        <el-header class="header">
            <div>
                <span>项目管理</span>
            </div>
            <el-button class="addProject" type="primary" @click="dialogFormVisible = true"><el-icon>
                    <Plus />
                </el-icon>&nbsp;&nbsp;新建项目</el-button>
        </el-header>
        <el-main class="main">
            <el-table :data="allproductsData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }"
                @selection-change="handleSelectionChange">

                <el-table-column prop="project" label="项目" sortable>
                    <template #default="{ row }">
                        <span @click="goToSpecificProject">{{ row.project }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="标识">
                </el-table-column>
                <el-table-column prop="belong" label="所属">
                </el-table-column>
            </el-table>

        </el-main>
    </el-container>


    <el-dialog v-model="dialogFormVisible" title="新建项目">
        <el-form :model="form" :rules="rules">
            <el-form-item label="所属" :label-width="formLabelWidth" prop="owner">
                王琳的公司
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="可见范围" :label-width="formLabelWidth" prop="visibility">
                <el-select v-model="form.visibility" :options="options">

                </el-select>
            </el-form-item>
            <el-form-item label="项目标识" :label-width="formLabelWidth" prop="label">
                <el-input v-model="form.label" />
            </el-form-item>
            <el-form-item label="项目描述" :label-width="formLabelWidth" prop="desc">
                <el-input v-model="form.desc" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
/* eslint-disable */
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
const allproductsData = [
    {
        project: '巴拉巴拉',
        label: 'TSL',
        belong: '王琳的公司',
        date: '2016-05-03'
    },
    {
        project: '巴拉巴拉',
        label: 'TSL',
        belong: '王琳的公司',
        date: '2016-05-02'
    },
    {
        project: '巴拉巴拉',
        label: 'TSL',
        belong: '王琳的公司',
        date: '2016-05-02'
    },
    {
        project: '巴拉巴拉',
        label: 'TSL',
        belong: '王琳的公司',
        date: '2016-05-03'
    },
]

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const router = useRouter();
const goToSpecificProject = () => {
    router.push({ name: 'SpecificProject' });
};
const form = reactive({
    name: '',
    owner: '',
    label: '',
    visibility: '',
    desc: '',
});
const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))


const rules = reactive({
    // owner: [{ required: true }],
    name: [
        { required: true, message: 'Please input project name', trigger: 'blur' },
        { max: 32, message: '超过最大长度', trigger: 'blur' },
    ],
    label: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'blur',
        },
    ],
    visibility: [{ required: true }],
    desc: [
        { max: 200, message: '超过最大长度', trigger: 'blur' },
    ],
})

const props = defineProps({
    selectedItem: String,
})
const emit = defineEmits(['selected-item-change']);
const isTableContentSelected = ref(false);
const handleSelectionChange = (selection) => {
    //判断是否有选中的表格内容
    isTableContentSelected = selection && selection.length > 0;
    // 更新选中的项
    props.selectedItem = selection && selection.length > 0 ? selection[0] : null;

    // 通过自定义事件将选中的项传递给父组件
    emit('selected-item-change', selectedItem);
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