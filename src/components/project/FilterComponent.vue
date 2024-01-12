<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <Card>
                我参与的工作项
                <el-table :data="allrequireData" border style="width: 100%" height="500px">
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
import { Plus, Delete } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { onMounted, toRaw } from 'vue';
import {
    getAllBacklogItems, deleteRequirement, deleteRelatedItem, addRelatedItems, getRelatedItemById, updateBacklogItem, addRequirement, getBacklogItemInfo
} from '@/api/backlogItem';
import {
    getProjectInfo,
} from '@/api/project';
import {
    addRequire, updateRequire
} from '@/api/require';
import { getSprintInfo } from '@/api/sprint';
import { getReleaseInfo } from '@/api/release';
import { getUserName, getUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';



const allrequireData = ref([]);
const route = useRoute();
let total = ref(0);
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

            total.value = resp.data.length;
            //ElMessage.success('拉取需求成功');
        })
        .catch(resp => {
            console.log('拉取需求error:', resp);
        })

}

const managerData = ref([]);
const getManageData = () => {

}


</script>

<style></style>